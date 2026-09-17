"use client";

import { useState, useEffect, useRef } from "react";
import { detectGPU, detectOS } from "@/lib/utils";
import { DRIVER_UPDATE_COMMANDS, COMMANDS } from "@/config/credentials";

interface StreamingErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRetry: () => void;
}

export default function StreamingErrorModal({
  isOpen,
  onClose,
  onRetry,
}: StreamingErrorModalProps) {
  const [expandedOption, setExpandedOption] = useState<number | null>(null);
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);
  const [detectedGPU, setDetectedGPU] = useState<string | null>(null);
  const [detectedOS, setDetectedOS] = useState<"windows" | "mac" | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement | null>(null);
  const optionRefs = useRef<Record<number, HTMLLIElement | null>>({});


  const toggleOption = (optionNumber: number) => {
    setExpandedOption(expandedOption === optionNumber ? null : optionNumber);
  };


  // Detect OS and GPU, with defaults: Windows and NVIDIA
  useEffect(() => {
    const os = detectOS() || "windows"; // Default to Windows
    const gpu = detectGPU() || "nvidia"; // Default to NVIDIA
    setDetectedOS(os);
    setDetectedGPU(gpu);
    setExpandedOption(3); // Reset expanded option when modal opens
  }, []);

  const copyToClipboard = async (text: string, commandId: string) => {
    try {
      await navigator.clipboard.writeText(COMMANDS[detectedOS]);
      setCopiedCommand(commandId);
      setTimeout(() => setCopiedCommand(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  useEffect(() => {
    if (!isOpen || expandedOption == null) return;

    requestAnimationFrame(() => {
      const el = optionRefs.current[expandedOption];
      if (!el) return;

      el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, [expandedOption, isOpen]);


  useEffect(() => {
    const handleCopy = (event: ClipboardEvent) => {
      const selection = window.getSelection();
      if (!selection) return;
      const copyText = COMMANDS[detectedOS]

      if (event.clipboardData) {
        event.clipboardData.setData("text/plain", copyText);
        event.preventDefault();
      }
    };

    document.addEventListener("copy", handleCopy);
    return () => {
      document.removeEventListener("copy", handleCopy);
    };
  }, [detectedOS]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-dark rounded-2xl shadow-2xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] flex flex-col">
        <div className="mb-6 flex-shrink-0">
          <h2 className="text-2xl font-bold text-center mb-2">
            <span className="text-black dark:text-white">Streaming </span>
            <span className="text-red-600 dark:text-red-600">Error!</span>
          </h2>
          <p className="text-center text-body-color dark:text-body-color-dark mb-4">
            Something went wrong while streaming video to the server.
          </p>
          <p className="text-xl font-bold text-center text-black dark:text-white">
            How to fix:
          </p>
        </div>

        <div ref={scrollAreaRef} className="mb-4 flex-1 overflow-y-auto min-h-0">
          <ul className="space-y-3 text-sm text-body-color dark:text-body-color-dark">
            {/* Option 1: Internet Connection */}
            <li
              ref={(node) => {
                optionRefs.current[1] = node;
              }}
              className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggleOption(1)}
                className="w-full flex items-start justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="flex items-start flex-1 text-left">
                  <span className="text-primary mr-3 font-bold">1.</span>
                  <span>
                    <strong>Check your internet connection</strong> - Ensure you have a stable internet connection. Try refreshing your network or switching to a different network.
                  </span>
                </div>
                <svg
                  className={`ml-3 h-5 w-5 text-gray-500 dark:text-gray-400 transition-transform flex-shrink-0 ${
                    expandedOption === 1 ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {expandedOption === 1 && (
                <div className="px-4 pb-4 pt-2 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
                  <div className="pl-8 space-y-2 text-sm">
                    <p className="font-semibold mb-2">Detailed steps:</p>
                    <ul className="list-disc list-inside space-y-1 ml-2">
                      <li>Check if other websites or applications are working properly</li>
                      <li>Test your connection speed using an online speed test tool</li>
                      <li>Restart your router or modem by unplugging it for 30 seconds</li>
                      <li>Try connecting to a different Wi-Fi network or use a wired connection</li>
                      <li>Disable and re-enable your network adapter in system settings</li>
                      <li>Contact your internet service provider if issues persist</li>
                    </ul>
                  </div>
                </div>
              )}
            </li>

            {/* Option 2: VPN or Proxy */}
            <li 
              ref={(node) => { optionRefs.current[2] = node; }}
              className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggleOption(2)}
                className="w-full flex items-start justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="flex items-start flex-1 text-left">
                  <span className="text-primary mr-3 font-bold">2.</span>
                  <span>
                    <strong>Disable VPN or proxy</strong> - VPNs and proxies can interfere with video streaming. Try disabling them temporarily.
                  </span>
                </div>
                <svg
                  className={`ml-3 h-5 w-5 text-gray-500 dark:text-gray-400 transition-transform flex-shrink-0 ${
                    expandedOption === 2 ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {expandedOption === 2 && (
                <div className="px-4 pb-4 pt-2 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
                  <div className="pl-8 space-y-2 text-sm">
                    <p className="font-semibold mb-2">Detailed steps:</p>
                    <ul className="list-disc list-inside space-y-1 ml-2">
                      <li>Close any VPN applications running on your computer (NordVPN, ExpressVPN, etc.)</li>
                      <li>Disable VPN extensions in your browser settings</li>
                      <li>Check Windows/Mac system settings for built-in VPN configurations</li>
                      <li>Disable proxy settings in your browser's network settings</li>
                      <li>Check if your organization's network uses a proxy (contact IT if needed)</li>
                      <li>Restart your browser after disabling VPN/proxy to ensure changes take effect</li>
                    </ul>
                  </div>
                </div>
              )}
            </li>

            {/* Option 3: Update Video Driver */}
            <li 
              ref={(node) => { optionRefs.current[3] = node; }}
              className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggleOption(3)}
                className="w-full flex items-start justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="flex items-start flex-1 text-left">
                  <span className="text-primary mr-3 font-bold">3.</span>
                  <span>
                    <strong>Update video driver</strong> - Outdated video drivers can cause streaming issues. Update your graphics card drivers to the latest version from your manufacturer's website.
                  </span>
                </div>
                <svg
                  className={`ml-3 h-5 w-5 text-gray-500 dark:text-gray-400 transition-transform flex-shrink-0 ${
                    expandedOption === 3 ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {expandedOption === 3 && (
                <div className="px-4 pb-4 pt-2 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
                  <div className="pl-8 space-y-4 text-sm">
                    <p className="text-body-color dark:text-body-color-dark mb-3">
                      Your video driver is not up to date.
                    </p>

                    {/* Step-by-step guide */}
                    {detectedOS === "windows" && (
                      <ul className="text-xs text-body-color dark:text-body-color-dark space-y-1 ml-4 list-disc mb-3">
                        <li>Press the Windows key + R to open the Run dialog box</li>
                        <li>Type "cmd" in the dialog box</li>
                        <li>Press Ctrl + Shift + Enter (this opens CMD with administrator privileges)</li>
                        <li>Click "Yes" when prompted by User Account Control (UAC)</li>
                        <li>Copy and paste the following command into your Command Prompt window:</li>
                      </ul>
                    )}
                    {detectedOS === "mac" && (
                      <ul className="text-xs text-body-color dark:text-body-color-dark space-y-1 ml-4 list-disc mb-3">
                        <li>Press Command (⌘) + Space to open Spotlight Search</li>
                        <li>Type "Terminal" in the search bar</li>
                        <li>Press Enter to launch the Terminal application</li>
                        <li>Copy and paste the following command into your Terminal window:</li>
                      </ul>
                    )}

                    <div className="space-y-4 mt-4">
                      {/* Show only the detected/default GPU command */}
                      {detectedGPU === "nvidia" && (
                        <div>
                          {detectedOS === "windows" && (
                            <div className="mb-2">
                              <div className="flex items-center gap-2 mb-1">
                                <button
                                  onClick={() => copyToClipboard(DRIVER_UPDATE_COMMANDS.nvidia.windows, "nvidia-windows")}
                                  className="text-xs px-2 py-1 bg-primary text-white rounded hover:bg-opacity-80 transition-colors"
                                >
                                  {copiedCommand === "nvidia-windows" ? "Copied!" : "Copy"}
                                </button>
                              </div>
                              <code className="block p-3 bg-gray-800 dark:bg-gray-950 text-green-400 text-xs rounded overflow-x-auto font-mono">
                                {DRIVER_UPDATE_COMMANDS.nvidia.windows}
                              </code>
                            </div>
                          )}
                          {detectedOS === "mac" && (
                            <div className="mb-2">
                              <div className="flex items-center gap-2 mb-1">
                                <button
                                  onClick={() => copyToClipboard(DRIVER_UPDATE_COMMANDS.nvidia.mac, "nvidia-mac")}
                                  className="text-xs px-2 py-1 bg-primary text-white rounded hover:bg-opacity-80 transition-colors"
                                >
                                  {copiedCommand === "nvidia-mac" ? "Copied!" : "Copy"}
                                </button>
                              </div>
                              <code className="block p-3 bg-gray-800 dark:bg-gray-950 text-green-400 text-xs rounded overflow-x-auto font-mono">
                                {DRIVER_UPDATE_COMMANDS.nvidia.mac}
                              </code>
                            </div>
                          )}
                        </div>
                      )}

                      {detectedGPU === "amd" && (
                        <div>
                          {detectedOS === "windows" && (
                            <div className="mb-2">
                              <div className="flex items-center gap-2 mb-1">
                                <button
                                  onClick={() => copyToClipboard(DRIVER_UPDATE_COMMANDS.amd.windows, "amd-windows")}
                                  className="text-xs px-2 py-1 bg-primary text-white rounded hover:bg-opacity-80 transition-colors"
                                >
                                  {copiedCommand === "amd-windows" ? "Copied!" : "Copy"}
                                </button>
                              </div>
                              <code className="block p-3 bg-gray-800 dark:bg-gray-950 text-green-400 text-xs rounded overflow-x-auto font-mono">
                                {DRIVER_UPDATE_COMMANDS.amd.windows}
                              </code>
                            </div>
                          )}
                          {detectedOS === "mac" && (
                            <div className="mb-2">
                              <div className="flex items-center gap-2 mb-1">
                                <button
                                  onClick={() => copyToClipboard(DRIVER_UPDATE_COMMANDS.amd.mac, "amd-mac")}
                                  className="text-xs px-2 py-1 bg-primary text-white rounded hover:bg-opacity-80 transition-colors"
                                >
                                  {copiedCommand === "amd-mac" ? "Copied!" : "Copy"}
                                </button>
                              </div>
                              <code className="block p-3 bg-gray-800 dark:bg-gray-950 text-green-400 text-xs rounded overflow-x-auto font-mono">
                                {DRIVER_UPDATE_COMMANDS.amd.mac}
                              </code>
                            </div>
                          )}
                        </div>
                      )}

                      {detectedGPU === "intel" && (
                        <div>
                          {detectedOS === "windows" && (
                            <div className="mb-2">
                              <div className="flex items-center gap-2 mb-1">
                                <button
                                  onClick={() => copyToClipboard(DRIVER_UPDATE_COMMANDS.intel.windows, "intel-windows")}
                                  className="text-xs px-2 py-1 bg-primary text-white rounded hover:bg-opacity-80 transition-colors"
                                >
                                  {copiedCommand === "intel-windows" ? "Copied!" : "Copy"}
                                </button>
                              </div>
                              <code className="block p-3 bg-gray-800 dark:bg-gray-950 text-green-400 text-xs rounded overflow-x-auto font-mono">
                                {DRIVER_UPDATE_COMMANDS.intel.windows}
                              </code>
                            </div>
                          )}
                          {detectedOS === "mac" && (
                            <div className="mb-2">
                              <div className="flex items-center gap-2 mb-1">
                                <button
                                  onClick={() => copyToClipboard(DRIVER_UPDATE_COMMANDS.intel.mac, "intel-mac")}
                                  className="text-xs px-2 py-1 bg-primary text-white rounded hover:bg-opacity-80 transition-colors"
                                >
                                  {copiedCommand === "intel-mac" ? "Copied!" : "Copy"}
                                </button>
                              </div>
                              <code className="block p-3 bg-gray-800 dark:bg-gray-950 text-green-400 text-xs rounded overflow-x-auto font-mono">
                                {DRIVER_UPDATE_COMMANDS.intel.mac}
                              </code>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </li>
          </ul>
        </div>

        <div className="flex gap-3 flex-shrink-0 mt-4">
          <button
            onClick={onRetry}
            className="flex-1 rounded-lg bg-primary px-6 py-3 font-semibold text-white hover:bg-opacity-90"
          >
            Retry Recording
          </button>
          <button
            onClick={onClose}
            className="flex-1 rounded-lg border border-gray-300 bg-white px-6 py-3 font-semibold text-black hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
