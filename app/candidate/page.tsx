"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Toast from "@/components/Common/Toast";

export default function CandidateEntryPage() {
  const [token, setToken] = useState("");
  const router = useRouter();
  const [toast, setToast] = useState<{ message: string; type: "error" | "success" | "info" } | null>(null);

  useEffect(() => {
    // Check for toast message from localStorage
    const toastMessage = localStorage.getItem("toast-message");
    const toastType = localStorage.getItem("toast-type") as "error" | "success" | "info" | null;
    
    if (toastMessage) {
      setToast({
        message: toastMessage,
        type: toastType || "error",
      });
      
      // Clear the message from localStorage
      localStorage.removeItem("toast-message");
      localStorage.removeItem("toast-type");
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (token.trim()) {
      router.push(`/invite/${token.trim()}`);
    }
  };

  return (
    <>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-gray-light dark:from-primary/30 dark:to-gray-900">
        <div className="bg-white dark:bg-dark px-12 py-10 rounded-2xl shadow-2xl w-full max-w-2xl border border-gray-100 dark:border-gray-800 text-center">
          <h1 className="text-3xl mb-2 font-black text-primary">Welcome Candidate!</h1>
          <p className="mb-6 text-base text-gray-700 dark:text-gray-200">
            You've been invited to participate in a special assessment. Please enter your unique invite code below to continue your journey.
          </p>
          <p className="mb-8 text-[15px] text-gray-500 dark:text-gray-400 italic">
            Don't have an invite code yet? Contact your recruiter or check your email for your invitation link!
          </p>
          <form className="space-y-6 max-w-sm mx-auto" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter your invitation code"
              value={token}
              onChange={e => setToken(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:outline-none text-base dark:bg-gray-800 dark:text-white"
              required
            />
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-primary text-white font-semibold text-lg hover:bg-opacity-90 transition-colors shadow"
            >
              Continue
            </button>
          </form>
          <div className="mt-10 text-xs text-gray-400 dark:text-gray-600">
            For assistance, email: <a href="mailto:support@w3career.io" className="text-primary hover:underline">support@w3career.io</a>
          </div>
        </div>
      </div>
    </>
  );
}
