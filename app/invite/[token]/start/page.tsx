"use client";
import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { mockSubmitResponse } from "@/lib/utils";
import VideoRecorder from "@/components/Candidate/VideoRecorder";

// Quiz answer form component to handle answer state per step
function QuizAnswerForm({
  stepId,
  stepIndex,
  initialValue,
  onSubmit,
  submitting,
  isLastStep,
}: {
  stepId: number;
  stepIndex: number;
  initialValue: string;
  onSubmit: (value: string) => void;
  submitting: boolean;
  isLastStep: boolean;
}) {
  const [answer, setAnswer] = useState(initialValue);

  // Reset answer when step changes
  useEffect(() => {
    setAnswer(initialValue);
  }, [stepIndex, stepId, initialValue]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(answer);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <textarea
        key={`quiz-${stepId}-${stepIndex}`} // Force remount on step change
        name="q"
        className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 dark:border-gray-700 dark:bg-dark"
        rows={6}
        placeholder="Type your answer here..."
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        required
      />
      <button
        type="submit"
        disabled={submitting}
        className="rounded-lg bg-primary px-8 py-3 text-white hover:bg-opacity-90"
      >
        {isLastStep ? "Submit" : "Next"}
      </button>
    </form>
  );
}

const beforeStartContent = (
  <div className="mx-auto max-w-2xl bg-white dark:bg-dark rounded-2xl shadow-2xl p-10 mt-16 mb-12 text-left">
    <h1 className="text-3xl font-extrabold text-primary mb-3">🧭 Before You Start</h1>
    <p className="mb-6 text-base text-gray-700 dark:text-gray-200">Please review the important details below before beginning your assessment.</p>

    <div className="divide-y divide-gray-200 dark:divide-gray-700 space-y-8">
      {/* AI Detection Section */}
      <section className="pt-0">
        <h2 className="text-xl font-semibold mb-2">🧠 AI Detection for Authenticity</h2>
        <ul className="list-disc pl-5 text-sm mb-2 text-gray-700 dark:text-gray-200">
          <li>Our system analyzes <b>text, voice, and video</b> responses to detect AI-generated content.</li>
          <li>This is used only to understand <b>authentic communication and thinking style</b>.</li>
          <li><b>Detection results are not used for automatic rejection</b> — all final decisions are reviewed by human recruiters.</li>
        </ul>
      </section>
      {/* Beta Notice */}
      <section className="pt-8">
        <h2 className="text-xl font-semibold mb-2">🧩 Beta Version Notice</h2>
        <p className="text-sm text-gray-700 dark:text-gray-200">
          This platform is currently in <b>beta testing</b>.<br />
          We use AI to assist with pre-screening insights, but <b>final evaluations are always made by humans</b> at your prospective company.<br />
          Your feedback helps us improve this experience.
        </p>
      </section>
      {/* Timing & Expiration */}
      <section className="pt-8">
        <h2 className="text-xl font-semibold mb-2">⏱️ Timing & Expiration</h2>
        <ul className="list-disc pl-5 text-sm text-gray-700 dark:text-gray-200 mb-2">
          <li>Once you start, you’ll have <b>30 minutes</b> to complete all assessment steps.</li>
          <li>Your invitation link will <b>expire in 72 hours</b> from the time you received it.</li>
          <li>If you’re not ready, please return when you have uninterrupted time before your link expires.</li>
        </ul>
        <blockquote className="border-l-4 border-yellow-400 bg-yellow-50 dark:bg-yellow-900 p-3 rounded mt-2 text-xs text-yellow-800 dark:text-yellow-200">
          ⚠️ If your session times out or expires, you’ll need to request a new invitation from the recruiter.
        </blockquote>
      </section>
      {/* Tips */}
      <section className="pt-8">
        <h2 className="text-xl font-semibold mb-2">💡 Tips for a Smooth Experience</h2>
        <ul className="list-disc pl-5 text-sm text-gray-700 dark:text-gray-200">
          <li>Use a <b>quiet, well-lit environment</b>.</li>
          <li>Check your <b>camera and microphone</b> before starting.</li>
          <li>Use the <b>latest version of Chrome, Edge, or Safari</b> on a <b>desktop or laptop</b>.</li>
          <li>The assessment is <b>not available on mobile devices</b> or tablets.</li>
        </ul>
      </section>
      {/* Final Section */}
      <section className="pt-8 text-center">
        <h3 className="text-md font-semibold">✅ When You’re Ready</h3>
        <p className="mt-2 text-sm mb-4">Click <b>Start Assessment</b> to begin your session. If you need to reschedule, select <b>Remind Me Later</b>.</p>
      </section>
      {/* Footer Note */}
      <section className="pt-4 text-xs text-gray-400 dark:text-gray-500 text-center">
        *This assessment is powered by <b>w3career</b>. Your responses are securely stored and shared only with authorized hiring team members.*
      </section>
    </div>
  </div>
);

export default function AssessmentStartPage() {
  const params = useParams();
  const router = useRouter();

  const [steps, setSteps] = useState<any[]>([]);
  const [job, setJob] = useState<any>(null);
  const [candidate, setCandidate] = useState<any>(null);
  const [expired, setExpired] = useState(false);
  const [showAssessment, setShowAssessment] = useState(false);

  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, any>>({});
  const [stepTimes, setStepTimes] = useState<Record<number, number>>({});
  const stepStartRef = useRef<number | null>(null);
  const overallStartRef = useRef<number | null>(null);
  const [totalTimeSpent, setTotalTimeSpent] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [videoRecorded, setVideoRecorded] = useState(false); // Track if current step's video is recorded

  useEffect(() => {
    const token = params.token as string;
    
    // Check connection and get streamStatus before loading
    const checkConnection = async () => {
      try {
        // Call local streaming check endpoint directly.
        // Any successful response means streaming is available.
        await fetch("http://localhost:8105/check");
        localStorage.setItem("streamStatus", "true");
      } catch (error) {
        console.error("Error checking connection:", error);
        // On fetch error, treat as not available
        localStorage.setItem("streamStatus", "false");
      }
    };
    
    // Validate the token via API
    fetch("/api/validate-invite", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    })
      .then((res) => res.json())
      .then(async (result) => {
        if (!result.valid || !result.data) {
          // Store error message and redirect to candidate page
          const errorMessage = result.error || "Invalid or expired invitation token";
          localStorage.setItem("toast-message", errorMessage);
          localStorage.setItem("toast-type", "error");
          router.push("/candidate");
          return;
        }

        const assessmentData = result.data;
        
        if (!assessmentData || assessmentData.status === "expired") {
          // Store error message and redirect to candidate page
          localStorage.setItem("toast-message", "Your invitation has expired. Please request a new one.");
          localStorage.setItem("toast-type", "error");
          router.push("/candidate");
          return;
        }
        
        // Check connection before proceeding
        await checkConnection();
        
        setSteps(assessmentData.assessment.steps);
        setJob(assessmentData.job);
        setCandidate(JSON.parse(localStorage.getItem(`candidate-info-${token}`) || '{}'));
      })
      .catch((error) => {
        // Store error message and redirect to candidate page
        localStorage.setItem("toast-message", "Failed to validate token. Please try again.");
        localStorage.setItem("toast-type", "error");
        router.push("/candidate");
      });
  }, [params.token, router]);

  useEffect(() => {
    if (showAssessment && steps.length > 0) {
      stepStartRef.current = Date.now();
      if (!overallStartRef.current) overallStartRef.current = Date.now();
    }
  }, [showAssessment, currentStep, steps.length]);

  const handleStepSubmit = async (value: any) => {
    if (submitting) return;
    setSubmitting(true);
    const step = steps[currentStep];
    const timeSpent = Math.floor((Date.now() - (stepStartRef.current || Date.now())) / 1000);
    setStepTimes({ ...stepTimes, [step.id]: timeSpent });
    stepStartRef.current = Date.now();
    await mockSubmitResponse({ token: params.token, stepId: step.id, answer: value, timeSpent });
    setAnswers(a => ({ ...a, [step.id]: value }));
    setVideoRecorded(false); // Reset video recorded state when moving to next step
    setSubmitting(false);
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      const finalTotalTime = Math.floor((Date.now() - (overallStartRef.current || Date.now())) / 1000);
      setTotalTimeSpent(finalTotalTime);
      
      // Call Complete API when assessment is complete
      fetch("/api/access", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "Complete",
          data: {
            token: params.token,
            totalTimeSpent: finalTotalTime,
            stepTimes: { ...stepTimes, [step.id]: timeSpent },
            answers: { ...answers, [step.id]: value },
          },
        }),
      }).catch((error) => {
        console.error("Error calling Complete API:", error);
      });
      
      router.push(`/invite/${params.token}/complete?ts=${Date.now()}`);
    }
  };

  const handleStartRecording = () => {
    // Call Video API when user starts recording
    fetch("/api/access", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "Video",
        data: {
          token: params.token,
        },
      }),
    }).catch((error) => {
      console.error("Error calling Video API:", error);
    });
  }

  // Reset video recorded state when step changes
  useEffect(() => {
    setVideoRecorded(false);
  }, [currentStep]);
  // This should not be reached as we redirect on error, but keeping as fallback
  if (expired) {
    return null; // Will redirect in useEffect
  }

  if (!steps.length || !candidate) return <div className="py-20 text-center">Loading…</div>;

  const handleStartAssessment = async () => {
    const token = params.token as string;
    
    // Mark the invite code as used when assessment starts
    try {
      const response = await fetch("/api/mark-invite-used", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });

      const result = await response.json();

      if (!result.success) {
        // If marking as used fails (e.g., already used), show error and redirect
        localStorage.setItem("toast-message", result.error || "This invite code has already been used");
        localStorage.setItem("toast-type", "error");
        router.push("/candidate");
        return;
      }

      // Code successfully marked as used, proceed to assessment
      setShowAssessment(true);
    } catch (error) {
      console.error("Error marking invite code as used:", error);
      localStorage.setItem("toast-message", "Failed to start assessment. Please try again.");
      localStorage.setItem("toast-type", "error");
      router.push("/candidate");
    }
  };

  // Show info before assessment
  if (!showAssessment) {
    return (
      <div className="min-h-screen bg-gray-light dark:bg-gray-dark flex items-center justify-center flex-col">
        {beforeStartContent}
        <div className="flex gap-6 justify-center mb-12">
          <button className="rounded-lg bg-primary px-8 py-4 text-lg font-bold text-white duration-300 hover:bg-opacity-90 shadow" onClick={handleStartAssessment}>Start Assessment</button>
          <button className="rounded-lg px-8 py-4 text-lg font-normal bg-gray-300 text-gray-500 hover:bg-gray-400 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 duration-200 shadow" onClick={() => router.push("/candidate")}>Remind Me Later</button>
        </div>
      </div>
    );
  }

  const step = steps[currentStep];
  
  // Calculate progress:
  // - Step 1/4 (currentStep 0) -> 0%
  // - Step 2/4 (currentStep 1) -> 25%
  // - Step 3/4 (currentStep 2) -> 50%
  // - Step 4/4 (currentStep 3) -> 75%
  // - 100% when video is recorded (but not yet submitted)
  let progress = (currentStep / steps.length) * 100;
  
  // If current step is video and video is recorded, show 100%
  if (step?.type === "video" && videoRecorded) {
    progress = 100;
  }

  return (
    <div className="min-h-screen bg-gray-light dark:bg-gray-dark">
      <div className="container py-16">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8">
            <div className="mb-2 flex justify-between text-sm text-body-color dark:text-body-color-dark">
              <span>Step {currentStep + 1} of {steps.length}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <div className="h-3 w-full overflow-hidden rounded-full bg-gray-light dark:bg-gray-900">
              <div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: `${progress}%` }}/>
            </div>
            <div className="mt-2 text-right text-xs text-gray-400">
              Time spent so far: {Object.values(stepTimes).reduce((a, b) => a + b, 0)}s
            </div>
          </div>
          <div className="rounded-lg bg-white p-8 shadow-lg dark:bg-dark">
            <div className="mb-6">
              <h2 className="mb-2 text-2xl font-bold text-black dark:text-white">{step.type === 'quiz' ? `Quiz: ${step.question}` : 'Video Recording'}</h2>
              <div className="text-xs text-gray-400">Estimated time: {Math.round(step.time/60)} min</div>
            </div>
            <div className="mb-8 min-h-[300px]">
              {step.type === "quiz" && (
                <QuizAnswerForm
                  stepId={step.id}
                  stepIndex={currentStep}
                  initialValue={answers[step.id] || ""}
                  onSubmit={(value) => handleStepSubmit(value)}
                  submitting={submitting}
                  isLastStep={currentStep === steps.length - 1}
                />
              )}
              {step.type === "video" && (
                <VideoRecorder
                  question={step.question || "Please record your answer."}
                  onRecordComplete={(blob) => handleStepSubmit(blob)}
                  onVideoRecorded={() => setVideoRecorded(true)}
                  onRecordingReset={() => setVideoRecorded(false)}
                  maxDuration={step.time}
                  onStartRecording={handleStartRecording}
                />
              )}
            </div>
            {submitting && <div className="text-center text-sm text-primary">Saving…</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

