"use client";

import { useState, useRef, useEffect } from "react";
import StreamingErrorModal from "./StreamingErrorModal";

interface VideoRecorderProps {
  onRecordComplete: (videoBlob: Blob) => void;
  onVideoRecorded?: () => void; // Callback when video is recorded (but not yet submitted)
  onRecordingReset?: () => void; // Callback when recording is reset (re-record clicked)
  onStartRecording?: () => void; // Callback when recording starts
  question: string;
  maxDuration?: number;
}

export default function VideoRecorder({
  onRecordComplete,
  onVideoRecorded,
  onRecordingReset,
  onStartRecording,
  question,
  maxDuration = 300,
}: VideoRecorderProps) {
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string>("");
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [recording, setRecording] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [recordedUrl, setRecordedUrl] = useState<string>("");
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [error, setError] = useState<string>("");
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [showStreamingError, setShowStreamingError] = useState(false);
  const [checkingBeforeProceed, setCheckingBeforeProceed] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const recordedVideoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const checkTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isRecordingRef = useRef<boolean>(false); // Use ref to track recording state for timer
  const stoppedDueToErrorRef = useRef<boolean>(false); // Track if recording was stopped due to error

  // Get list of available camera devices
  const getDevices = async () => {
    try {
      const deviceList = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = deviceList.filter(
        (device) => device.kind === "videoinput"
      );
      setDevices(videoDevices);

      if (videoDevices.length > 0 && !selectedDeviceId) {
        setSelectedDeviceId(videoDevices[0].deviceId);
      }
    } catch (err) {
      console.error("Error fetching devices:", err);
      setError("Error fetching camera devices.");
    }
  };

  // Get devices on mount - request permission first to get device labels
  useEffect(() => {
    const requestPermission = async () => {
      try {
        // Request both video and audio permissions up front
        const permissionStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        setPermissionGranted(true);
        // Stop the permission request stream immediately
        permissionStream.getTracks().forEach((track) => track.stop());
        // Now enumerate devices with labels
        await getDevices();
      } catch (err: any) {
        console.error("Error requesting camera permission:", err);
        if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
          setError("Camera permission denied. Please allow camera access in your browser settings.");
        } else {
          // Don't set error on initial load - user can request access manually
          console.log("Camera permission not granted yet");
        }
      }
    };

    requestPermission();

    return () => {
      // Cleanup function
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (checkTimerRef.current) {
        clearTimeout(checkTimerRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startCamera = async () => {

    try {
      setError("");
      
      // Stop existing stream first
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
        setStream(null);
      }

      // Use 'ideal' instead of 'exact' for better compatibility (like working code)
      const constraints: MediaStreamConstraints = {
        video: selectedDeviceId
          ? { deviceId: { ideal: selectedDeviceId } }
          : true,
        // Enable audio so recordings include microphone input
        audio: true,
      };

      const newStream = await navigator.mediaDevices.getUserMedia(constraints);
      setStream(newStream);

      if (videoRef.current) {
        videoRef.current.srcObject = newStream;
      }
      setPermissionGranted(true);
    } catch (err: any) {
      console.error("Error starting camera:", err);
      setError("Failed to access camera. Please check your permissions.");
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  const startRecording = () => {
    if (!stream) {
      setError("Camera not started. Please start camera first.");
      return;
    }

    try {
      chunksRef.current = [];
      
      // Try different codec options for better browser compatibility
      let mimeType = "";
      const options = [
        "video/webm;codecs=vp9,opus",
        "video/webm;codecs=vp8,opus",
        "video/webm",
        "video/mp4",
      ];

      for (const option of options) {
        if (MediaRecorder.isTypeSupported(option)) {
          mimeType = option;
          break;
        }
      }

      if (!mimeType) {
        // Fallback to default - browser will choose
        mimeType = "";
      }

      const mediaRecorder = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        // If stopped due to error, don't create blob - just clear chunks and return to recording interface
        if (stoppedDueToErrorRef.current) {
          chunksRef.current = [];
          stoppedDueToErrorRef.current = false; // Reset flag
          // Don't set recordedUrl or recordedBlob - this keeps us in recording mode
          // Camera is still running, user can retry
          return;
        }
        
        // Only create blob if we have chunks and it's a normal stop
        if (chunksRef.current.length > 0) {
          const blobType = mimeType || "video/webm";
          const blob = new Blob(chunksRef.current, { type: blobType });
          setRecordedBlob(blob);
          const url = URL.createObjectURL(blob);
          setRecordedUrl(url);
          // Don't automatically call onRecordComplete - let user review first
          // But notify parent that video is recorded (for progress bar)
          if (onVideoRecorded) {
            onVideoRecorded();
          }
          
          // Store only metadata (not the video blob) to avoid localStorage quota issues
          // The blob URL will remain valid as long as the page session is active
          try {
            const key = `video_recording_${Date.now()}`;
            const metadata = {
              url: url,
              timestamp: Date.now(),
              size: blob.size,
              type: blobType,
            };
            localStorage.setItem(key, JSON.stringify(metadata));
            console.log(`Video recording metadata saved. Size: ${(blob.size / 1024 / 1024).toFixed(2)} MB`);
          } catch (err: any) {
            if (err.name === 'QuotaExceededError') {
              console.warn("localStorage quota exceeded. Video is stored in memory only.");
            } else {
              console.error("Error saving video metadata:", err);
            }
          }
        } else {
          // If no chunks, just reset the recording state
          console.warn("Recording stopped but no video chunks were captured");
        }
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
      setRecording(true);
      isRecordingRef.current = true; // Set ref to track recording state
      setTimeElapsed(0);
      
      // Call onStartRecording callback if provided
      if (onStartRecording) {
        onStartRecording();
      }

      // Schedule check API call randomly between 3-5 seconds after recording starts
      const randomDelay = Math.floor(Math.random() * 2000) + 3000; // 3000-5000ms
      checkTimerRef.current = setTimeout(async () => {
        // Only check if still recording
        if (!isRecordingRef.current) return;
        
        try {
          // Call local streaming check endpoint directly.
          // Any successful response means streaming is available, so do nothing.
          await fetch("http://localhost:8105/check");
          // If the call succeeds, continue recording normally.
        } catch (error) {
          console.error("Error checking stream status:", error);
          // On error, assume stream is not working and stop recording
          if (isRecordingRef.current) {
            // Stop recording properly - this will trigger onstop handler and show recorded video
            stopRecordingDueToError();
            setShowStreamingError(true);
          }
        }
      }, randomDelay);

      // Start timer with proper 1-second intervals
      timerRef.current = setInterval(() => {
        // Use ref to check recording state (more reliable than state)
        if (isRecordingRef.current && !recordedUrl) {
          setTimeElapsed((prev) => {
            const newTime = prev + 1;
            if (newTime >= maxDuration) {
              // Stop recording when max duration reached
              if (isRecordingRef.current) {
                stopRecording();
              }
              return prev; // Return previous value since we stopped
            }
            return newTime;
          });
        }
      }, 1000);
    } catch (err) {
      setError("Failed to start recording.");
      console.error("Error starting recording:", err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecordingRef.current) {
      // Mark as not recording immediately
      isRecordingRef.current = false;
      setRecording(false);
      
      // Stop the MediaRecorder
      try {
        if (mediaRecorderRef.current.state !== 'inactive') {
          mediaRecorderRef.current.stop();
        }
      } catch (err) {
        console.error("Error stopping MediaRecorder:", err);
      }
      
      // Stop the timer immediately
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      // Clear check timer if recording is stopped manually
      if (checkTimerRef.current) {
        clearTimeout(checkTimerRef.current);
        checkTimerRef.current = null;
      }
      stopCamera();
    }
  };

  const stopRecordingDueToError = () => {
    // Stop recording but keep camera running for retry
    // Set flag so onstop handler knows not to create blob
    if (mediaRecorderRef.current && isRecordingRef.current) {
      // Mark as stopped due to error BEFORE stopping
      stoppedDueToErrorRef.current = true;
      
      // Mark as not recording immediately
      isRecordingRef.current = false;
      setRecording(false);
      
      // Stop the MediaRecorder
      try {
        if (mediaRecorderRef.current.state !== 'inactive') {
          mediaRecorderRef.current.stop();
        }
      } catch (err) {
        console.error("Error stopping MediaRecorder:", err);
      }
      
      // Stop the timer immediately
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      // Clear check timer
      if (checkTimerRef.current) {
        clearTimeout(checkTimerRef.current);
        checkTimerRef.current = null;
      }
      // Keep camera running - don't call stopCamera()
      // The onstop handler will NOT create blob due to stoppedDueToErrorRef flag
      // This keeps us in recording mode, ready for retry
    }
  };

  const handleRetryRecording = () => {
    setShowStreamingError(false);
    // Reset the recording state and start fresh
    resetRecordingForRetry();
  };

  const resetRecordingForRetry = () => {
    // Ensure recording is stopped
    if (isRecordingRef.current && mediaRecorderRef.current) {
      try {
        if (mediaRecorderRef.current.state !== 'inactive') {
          mediaRecorderRef.current.stop();
        }
      } catch (err) {
        console.error("Error stopping MediaRecorder in retry:", err);
      }
      isRecordingRef.current = false;
      setRecording(false);
    }
    
    // Reset error flag
    stoppedDueToErrorRef.current = false;
    
    // Clear all timers
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (checkTimerRef.current) {
      clearTimeout(checkTimerRef.current);
      checkTimerRef.current = null;
    }
    
    // Clear the recorded blob and URL (in case any were set)
    setRecordedBlob(null);
    if (recordedUrl) {
      URL.revokeObjectURL(recordedUrl);
    }
    setRecordedUrl("");
    setTimeElapsed(0);
    chunksRef.current = [];
    
    // Notify parent that recording is reset (for progress bar)
    if (onRecordingReset) {
      onRecordingReset();
    }
    
    // If camera is still running, wait a moment then start recording again
    if (stream && stream.active) {
      // Small delay to ensure state is reset and MediaRecorder is ready
      setTimeout(() => {
        if (stream && stream.active) {
          startRecording();
        } else {
          // Camera stopped, restart it
          startCamera();
        }
      }, 200);
    } else {
      // Otherwise, start camera first
      startCamera();
    }
  };

  const handleCloseModal = () => {
    setShowStreamingError(false);
  };

  const resetRecording = () => {
    // Stop any ongoing recording first
    if (isRecordingRef.current && mediaRecorderRef.current) {
      try {
        if (mediaRecorderRef.current.state !== 'inactive') {
          mediaRecorderRef.current.stop();
        }
      } catch (err) {
        console.error("Error stopping MediaRecorder in reset:", err);
      }
      isRecordingRef.current = false;
      setRecording(false);
    }
    
    // Clear all timers
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (checkTimerRef.current) {
      clearTimeout(checkTimerRef.current);
      checkTimerRef.current = null;
    }
    
    // Reset state
    setRecordedBlob(null);
    if (recordedUrl) {
      URL.revokeObjectURL(recordedUrl);
    }
    setRecordedUrl("");
    setTimeElapsed(0);
    chunksRef.current = [];
    
    // Notify parent that recording is reset (for progress bar)
    if (onRecordingReset) {
      onRecordingReset();
    }
    
    // Stop camera and restart
    stopCamera();
    // Small delay before restarting camera
    setTimeout(() => {
      startCamera();
    }, 100);
  };

  const proceedWithVideo = async () => {
    if (!recordedBlob) return;
    
    // Check streaming status before proceeding
    setCheckingBeforeProceed(true);
    try {
      // Call local streaming check endpoint directly.
      // Any successful response means streaming is available.
      await fetch("http://localhost:8105/check");
      
      // Streaming is available, proceed normally
      setCheckingBeforeProceed(false);
      onRecordComplete(recordedBlob);
    } catch (error) {
      console.error("Error checking stream status before proceed:", error);
      // On error, assume stream is not working and return to recording
      setCheckingBeforeProceed(false);
      setShowStreamingError(true);
      
      // Reset to recording section
      setRecordedBlob(null);
      if (recordedUrl) {
        URL.revokeObjectURL(recordedUrl);
      }
      setRecordedUrl("");
      setTimeElapsed(0);
      chunksRef.current = [];
      
      // Notify parent that recording is reset (for progress bar)
      if (onRecordingReset) {
        onRecordingReset();
      }
      
      // If camera is not running, start it
      if (!stream || !stream.active) {
        startCamera();
      }
    }
  };

  const downloadVideo = () => {
    if (!recordedBlob) return;

    const url = URL.createObjectURL(recordedBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `video-recording-${Date.now()}.webm`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <>
      <StreamingErrorModal
        isOpen={showStreamingError}
        onClose={handleCloseModal}
        onRetry={handleRetryRecording}
      />
      <div className="w-full space-y-4">
      <div className="rounded-lg bg-gray-light p-4 dark:bg-gray-900">
        <p className="text-lg font-semibold text-black dark:text-white">
          {question}
        </p>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400">
          {error}
        </div>
      )}

      {devices.length > 1 && !recording && !recordedUrl && (
        <div>
          <label className="mb-2 block text-sm font-medium text-black dark:text-white">
            Select Camera:
          </label>
          <select
            value={selectedDeviceId}
            onChange={(e) => setSelectedDeviceId(e.target.value)}
            className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 dark:border-gray-700 dark:bg-dark"
            disabled={recording || !!stream}
          >
            {devices.map((device) => (
              <option key={device.deviceId} value={device.deviceId}>
                {device.label || `Camera ${device.deviceId.slice(0, 8)}`}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="relative w-full overflow-hidden rounded-lg bg-black">
        {recordedUrl ? (
          <div className="relative">
            <video
              ref={recordedVideoRef}
              src={recordedUrl}
              controls
              className="h-auto w-full max-h-[500px]"
            />
          </div>
        ) : (
          <div className="relative">
            {!stream && (
              <div className="flex h-[400px] items-center justify-center bg-gray-900">
                <div className="text-center text-white">
                  <svg
                    className="mx-auto mb-4 h-16 w-16"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                  <p className="text-lg">Camera Preview</p>
                  <p className="mt-2 text-sm text-gray-400">
                    Click &quot;Start Camera&quot; to begin
                  </p>
                </div>
              </div>
            )}
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className={`h-auto w-full max-h-[500px] ${!stream ? "hidden" : ""}`}
            />
            {recording && !recordedUrl && (
              <div className="absolute right-4 top-4 flex items-center space-x-2 rounded-full bg-red-600 px-4 py-2">
                <div className="h-3 w-3 animate-pulse rounded-full bg-white"></div>
                <span className="text-sm font-semibold text-white">
                  {formatTime(timeElapsed)} / {formatTime(maxDuration)}
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4">
        {!recordedUrl && (
          <>
            {!stream ? (
              <button
                onClick={startCamera}
                className="rounded-lg bg-primary px-6 py-3 font-semibold text-white hover:bg-opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                disabled={!!error && error.includes("permission denied")}
              >
                Start Camera
              </button>
            ) : (
              <>
                {!recording ? (
                  <>
                    <button
                      onClick={stopCamera}
                      className="rounded-lg border border-gray-300 bg-white px-6 py-3 font-semibold text-black hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
                    >
                      Stop Camera
                    </button>
                    <button
                      onClick={startRecording}
                      className="flex items-center space-x-2 rounded-lg bg-red-600 px-6 py-3 font-semibold text-white hover:bg-red-700"
                    >
                      <svg
                        className="h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>Start Recording</span>
                    </button>
                  </>
                ) : (
                  <button
                    onClick={stopRecording}
                    className="flex items-center space-x-2 rounded-lg bg-red-600 px-6 py-3 font-semibold text-white hover:bg-red-700"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Stop Recording</span>
                  </button>
                )}
              </>
            )}
          </>
        )}

        {recordedUrl && (
          <>
            <button
              onClick={resetRecording}
              className="rounded-lg border border-gray-300 bg-white px-6 py-3 font-semibold text-black hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
            >
              Re-record
            </button>
            <button
              onClick={downloadVideo}
              className="flex items-center space-x-2 rounded-lg bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <span>Download Video</span>
            </button>
            <button
              onClick={proceedWithVideo}
              disabled={checkingBeforeProceed}
              className="flex items-center space-x-2 rounded-lg bg-primary px-6 py-3 font-semibold text-white hover:bg-opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {checkingBeforeProceed ? (
                <>
                  <svg
                    className="h-5 w-5 animate-spin"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span>Checking...</span>
                </>
              ) : (
                <>
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>Proceed with This Video</span>
                </>
              )}
            </button>
          </>
        )}
      </div>

      <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/20">
        <p className="text-sm text-blue-700 dark:text-blue-400">
          <strong>Instructions:</strong> Start your camera, then click &quot;Start Recording&quot; when ready. 
          After recording, you can review your video, download it, re-record if needed, or proceed to the next step.
        </p>
      </div>
    </div>
    </>
  );
}
