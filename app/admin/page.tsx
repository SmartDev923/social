"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { jobsData } from "@/config/jobs";

export default function AdminPage() {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedPosition, setSelectedPosition] = useState("");
  const [generatedToken, setGeneratedToken] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [copied, setCopied] = useState(false);
  const [baseUrl, setBaseUrl] = useState("");

  useEffect(() => {
    // Check authentication
    const isAuthenticated = localStorage.getItem("admin-authenticated") === "true";
    const adminEmail = localStorage.getItem("admin-email");
    const adminPassword = localStorage.getItem("admin-password");

    if (!isAuthenticated || !adminEmail || !adminPassword) {
      router.push("/signin");
      return;
    }

    // Validate credentials via API
    const validateCredentials = async () => {
      try {
        const response = await fetch("/api/auth/signin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: adminEmail, password: adminPassword }),
        });

        const data = await response.json();

        if (!response.ok || !data.success || !data.isAdmin) {
          // Credentials are invalid, clear localStorage and redirect
          localStorage.removeItem("admin-authenticated");
          localStorage.removeItem("admin-email");
          localStorage.removeItem("admin-password");
          router.push("/signin");
        } else {
          // Credentials are valid
          setAuthenticated(true);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error validating credentials:", error);
        // On error, clear credentials and redirect
        localStorage.removeItem("admin-authenticated");
        localStorage.removeItem("admin-email");
        localStorage.removeItem("admin-password");
        router.push("/signin");
      }
    };

    validateCredentials();

    // Get base URL for invite link
    if (typeof window !== "undefined") {
      setBaseUrl(window.location.origin);
    }
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (!authenticated) {
    return null;
  }

  // Get unique companies from jobs
  const companies = Array.from(
    new Set(jobsData.jobs.map((job) => job.company.name))
  );

  // Get positions for selected company
  const positions = selectedCompany
    ? jobsData.jobs
      .filter((job) => job.company.name === selectedCompany)
      .map((job) => job.title)
    : [];

  const handleGenerateToken = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setGeneratedToken("");

    if (!selectedCompany || !selectedPosition) {
      setError("Please select both company and position");
      return;
    }

    // Find the jobId from company and position
    const selectedJob = jobsData.jobs.find(
      (job) => job.company.name === selectedCompany && job.title === selectedPosition
    );

    if (!selectedJob) {
      setError("Job not found");
      return;
    }

    try {
      const response = await fetch("/api/generate-invite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jobId: selectedJob.id,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate invite code");
      }

      setGeneratedToken(data.token);
      setSuccess("Invite link generated successfully! It will expire in 72 hours.");
    } catch (err: any) {
      setError(err.message || "Failed to generate invite code. Please try again.");
    }
  };

  const handleCopyToken = async () => {
    if (generatedToken) {
      const inviteUrl = `${baseUrl}/invite/${generatedToken}`;
      try {
        await navigator.clipboard.writeText(inviteUrl);
        setCopied(true);
        // Reset checkmark after 1.5-2 seconds
        setTimeout(() => {
          setCopied(false);
        }, 1750); // 1.75 seconds
      } catch (err) {
        console.error("Failed to copy:", err);
        setError("Failed to copy to clipboard");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-light dark:bg-gray-dark py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-primary mt-16 mb-8">Admin Dashboard</h1>

          {/* Create Invite Code Form */}
          <div className="bg-white dark:bg-dark rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-dark dark:text-white">
              Create Invite Link
            </h2>
            <p className="text-sm text-body-color mb-6">
              Select a company and position to generate an invite code. The code will expire in 72 hours.
            </p>

            <form onSubmit={handleGenerateToken} className="space-y-6">
              <div>
                <label
                  htmlFor="company"
                  className="block text-sm font-medium mb-2 text-dark dark:text-white"
                >
                  Company
                </label>
                <select
                  id="company"
                  value={selectedCompany}
                  onChange={(e) => {
                    setSelectedCompany(e.target.value);
                    setSelectedPosition(""); // Reset position when company changes
                    setGeneratedToken("");
                    setError("");
                    setSuccess("");
                  }}
                  className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-4 pr-10 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                  required
                >
                  <option value="">Select a company</option>
                  {companies.map((company) => (
                    <option key={company} value={company}>
                      {company}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="position"
                  className="block text-sm font-medium mb-2 text-dark dark:text-white"
                >
                  Position
                </label>
                <select
                  id="position"
                  value={selectedPosition}
                  onChange={(e) => {
                    setSelectedPosition(e.target.value);
                    setGeneratedToken("");
                    setError("");
                    setSuccess("");
                  }}
                  disabled={!selectedCompany}
                  className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-4 pr-10 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none disabled:opacity-50 disabled:cursor-not-allowed"
                  required
                >
                  <option value="">Select a position</option>
                  {positions.map((position) => (
                    <option key={position} value={position}>
                      {position}
                    </option>
                  ))}
                </select>
              </div>

              {error && (
                <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded text-red-600 dark:text-red-400">
                  {error}
                </div>
              )}

              {success && (
                <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded text-green-600 dark:text-green-400">
                  {success}
                </div>
              )}

              <button
                type="submit"
                className="shadow-submit dark:shadow-submit-dark flex w-full items-center justify-center rounded-sm bg-primary px-9 py-4 text-base font-medium text-white duration-300 hover:bg-primary/90"
              >
                Generate Invite Link
              </button>
            </form>

            {generatedToken && (
              <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">
                <label className="block text-sm font-medium mb-2 text-dark dark:text-white">
                  Generated Invite Link:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={baseUrl ? `${baseUrl}/invite/${generatedToken}` : `Loading.../invite/${generatedToken}`}
                    readOnly
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-dark dark:text-white font-mono text-sm"
                  />
                  <button
                    onClick={handleCopyToken}
                    className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition-colors flex items-center justify-center min-w-[100px]"
                    disabled={!baseUrl}
                  >
                    {copied ? (
                      <span className="text-white">Copied!</span>
                    ) : (
                      <span className="text-white">Copy</span>
                    )}
                  </button>
                </div>
                <p className="mt-2 text-xs text-body-color">
                  Share this link with candidates. Valid for 72 hours.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
