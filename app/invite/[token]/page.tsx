"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import type { AssessmentData } from "@/lib/job-utils";

export default function InviteTokenPage() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<AssessmentData | null>(null);
  const [tokenError, setTokenError] = useState<string>("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    linkedin: "",
    experience: ""
  });
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setTokenError("");

    const token = params.token as string;

    // Validate the token via API
    fetch("/api/validate-invite", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (!mounted) return;
        
        if (!result.valid || !result.data) {
          // Store error message and redirect to candidate page
          const errorMessage = result.error || "Invalid or expired invitation token";
          localStorage.setItem("toast-message", errorMessage);
          localStorage.setItem("toast-type", "error");
          router.push("/candidate");
          return;
        }

        setLoading(false);
        setData(result.data);
        
        if (result.data.status === "valid") {
          const saved = localStorage.getItem(`candidate-info-${token}`);
          if (saved) setForm(JSON.parse(saved));          
          // Call Load API when valid invite code is loaded
          fetch("/api/access", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              type: "Load",
              data: { token },
            }),
          }).catch((error) => {
            console.error("Error calling Load API:", error);
          });
        }
      })
      .catch((error) => {
        if (!mounted) return;
        // Store error message and redirect to candidate page
        localStorage.setItem("toast-message", "Failed to validate token. Please try again.");
        localStorage.setItem("toast-type", "error");
        router.push("/candidate");
      });
    
    return () => { mounted = false; };
  }, [params.token, router]);

  const handleFormChange = (e: any) => {
    setForm(f => {
      const updated = { ...f, [e.target.name]: e.target.value };
      localStorage.setItem(`candidate-info-${params.token}`, JSON.stringify(updated));
      return updated;
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.linkedin || !form.experience) {
      setError("Please complete all fields.");
      return;
    }
    setError("");
    localStorage.setItem(`candidate-info-${params.token}`, JSON.stringify(form));
    
    // Call Register API when user submits the form
    try {
      await fetch("/api/access", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "Register",
          data: {
            token: params.token,
            ...form,
          },
        }),
      });
    } catch (error) {
      console.error("Error calling Register API:", error);
    }
    
    router.push(`/invite/${params.token}/start`);
  };

  if (loading) return <div className="py-20 text-center">Loading…</div>;
  
  // This should not be reached as we redirect on error, but keeping as fallback
  if (!data || data.status === "expired") {
    return null; // Will redirect in useEffect
  }
  const { job } = data;
  return (
    <div className="min-h-screen flex justify-center items-center py-8 bg-gray-light dark:bg-gray-dark">
      <div className="bg-white dark:bg-dark p-10 rounded-2xl shadow-xl w-full max-w-2xl">
        <h1 className="text-3xl font-extrabold text-primary mb-2">{job.title}</h1>
        <div className="mb-4 italic text-sm text-gray-500 dark:text-gray-300">
          at {job.companyUrl ? (
            <a href={job.companyUrl} target="_blank" rel="noopener noreferrer" className="text-primary underline hover:opacity-80">
              {job.company}
            </a>
          ) : job.company}
        </div>
        <h2 className="text-xl mt-4 mb-1 font-bold">Requirements</h2>
        <ul className="list-disc pl-5 text-body-color dark:text-body-color-dark mb-3">
          {job.requirements.map((req: string, i: number) => <li key={i}>{req}</li>)}
        </ul>
        <h2 className="text-xl mt-4 mb-1 font-bold">Responsibilities</h2>
        <ul className="list-disc pl-5 text-body-color dark:text-body-color-dark mb-6">
          {job.responsibilities.map((res: string, i: number) => <li key={i}>{res}</li>)}
        </ul>
        <form className="space-y-4 pt-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input type="text" name="name" value={form.name} onChange={handleFormChange} className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:border-primary" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email Address</label>
            <input type="email" name="email" value={form.email} onChange={handleFormChange} className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:border-primary" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">LinkedIn Profile</label>
            <input type="url" name="linkedin" value={form.linkedin} onChange={handleFormChange} className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:border-primary" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Experience in this field</label>
            <textarea name="experience" value={form.experience} onChange={handleFormChange} rows={2} className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:border-primary" required />
          </div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <button type="submit" className="bg-primary hover:bg-opacity-80 text-white font-bold py-3 px-6 rounded-lg w-full mt-4">Continue</button>
        </form>
      </div>
    </div>
  );
}

