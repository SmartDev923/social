"use client";

import { useState } from "react";
import Link from "next/link";
import Toast from "@/components/Common/Toast";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    website: "",
    fullName: "",
    jobTitle: "",
    workEmail: "",
    companySize: "",
    useCase: "",
    hiringNeeds: "",
    additionalInfo: "",
    terms: false,
  });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "error" | "success" | "info" } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit signup request");
      }

      // Show success toast
      setToast({
        message: "We will review and notify you via email",
        type: "success",
      });

      // Reset form
      setFormData({
        companyName: "",
        website: "",
        fullName: "",
        jobTitle: "",
        workEmail: "",
        companySize: "",
        useCase: "",
        hiringNeeds: "",
        additionalInfo: "",
        terms: false,
      });
    } catch (err: any) {
      setToast({
        message: err.message || "Failed to submit signup request. Please try again.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="relative z-10 overflow-hidden pb-16 pt-36 md:pb-20 lg:pb-28 lg:pt-[180px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="shadow-three mx-auto max-w-[680px] rounded bg-white px-6 py-10 dark:bg-dark sm:p-[60px]">
                <h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
                  Create your company account
                </h3>
                <p className="mb-10 text-center text-base font-medium text-body-color">
                  Tell us about your company and how you plan to use talentgauges.
                </p>
                {toast && (
                  <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                  />
                )}
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <label htmlFor="companyName" className="mb-2 block text-sm text-dark dark:text-white">
                        Company Name
                      </label>
                      <input
                        id="companyName"
                        name="companyName"
                        type="text"
                        value={formData.companyName}
                        onChange={handleChange}
                        placeholder="Binance"
                        className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-4 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="website" className="mb-2 block text-sm text-dark dark:text-white">
                        Company Website
                      </label>
                      <input
                        id="website"
                        name="website"
                        type="url"
                        value={formData.website}
                        onChange={handleChange}
                        placeholder="https://binance.com"
                        className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-4 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="fullName" className="mb-2 block text-sm text-dark dark:text-white">
                        Your Name
                      </label>
                      <input
                        id="fullName"
                        name="fullName"
                        type="text"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Jane Doe"
                        className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-4 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="jobTitle" className="mb-2 block text-sm text-dark dark:text-white">
                        Role / Title
                      </label>
                      <input
                        id="jobTitle"
                        name="jobTitle"
                        type="text"
                        value={formData.jobTitle}
                        onChange={handleChange}
                        placeholder="Head of Talent"
                        className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-4 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="workEmail" className="mb-2 block text-sm text-dark dark:text-white">
                        Work Email
                      </label>
                      <input
                        id="workEmail"
                        name="workEmail"
                        type="email"
                        value={formData.workEmail}
                        onChange={handleChange}
                        placeholder="name@company.com"
                        className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-4 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="companySize" className="mb-2 block text-sm text-dark dark:text-white">
                        Company Size
                      </label>
                      <div className="relative">
                        <select
                          id="companySize"
                          name="companySize"
                          value={formData.companySize}
                          onChange={handleChange}
                          className="border-stroke dark:text-body-color-dark dark:shadow-two w-full appearance-none rounded-sm border bg-[#f8f8f8] px-4 pr-10 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                          required
                        >
                          <option value="">Select company size</option>
                          <option value="1-10">1-10</option>
                          <option value="11-50">11-50</option>
                          <option value="51-200">51-200</option>
                          <option value="201-500">201-500</option>
                          <option value=">500">500+</option>
                        </select>
                        <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-body-color">
                          <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </span>
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="useCase" className="mb-2 block text-sm text-dark dark:text-white">
                        Primary Use Case
                      </label>
                      <div className="relative">
                        <select
                          id="useCase"
                          name="useCase"
                          value={formData.useCase}
                          onChange={handleChange}
                          className="border-stroke dark:text-body-color-dark dark:shadow-two w-full appearance-none rounded-sm border bg-[#f8f8f8] px-4 pr-10 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                          required
                        >
                          <option value="">Select use case</option>
                          <option value="executive">Executive hiring</option>
                          <option value="technical">Technical leadership hiring</option>
                          <option value="volume">High-volume screening</option>
                          <option value="other">Other</option>
                        </select>
                        <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-body-color">
                          <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </span>
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="hiringNeeds" className="mb-2 block text-sm text-dark dark:text-white">
                        Current Hiring Needs
                      </label>
                      <textarea
                        id="hiringNeeds"
                        name="hiringNeeds"
                        value={formData.hiringNeeds}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Describe roles, timeline, and key requirements"
                        className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-4 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="additionalInfo" className="mb-2 block text-sm text-dark dark:text-white">
                        Additional Information (optional)
                      </label>
                      <textarea
                        id="additionalInfo"
                        name="additionalInfo"
                        value={formData.additionalInfo}
                        onChange={handleChange}
                        rows={3}
                        placeholder="Anything else we should know?"
                        className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-4 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                      />
                    </div>
                  </div>
                  <div className="mt-6 flex items-center">
                    <label htmlFor="terms" className="flex cursor-pointer select-none items-center text-sm font-medium text-body-color">
                      <input
                        type="checkbox"
                        id="terms"
                        name="terms"
                        checked={formData.terms}
                        onChange={handleChange}
                        className="peer sr-only"
                        aria-label="Agree to terms and privacy"
                        required
                      />
                      <div className="mr-3 flex h-5 w-5 items-center justify-center rounded border border-body-color/20 dark:border-white/10 peer-checked:border-primary peer-checked:[&>span]:opacity-100">
                        <span className="opacity-0 transition-opacity">
                          <svg width="11" height="8" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.0915 0.951972L10.0867 0.946075L10.0813 0.940568C9.90076 0.753564 9.61034 0.753146 9.42927 0.939309L4.16201 6.22962L1.58507 3.63469C1.40401 3.44841 1.11351 3.44879 0.932892 3.63584C0.755703 3.81933 0.755703 4.10875 0.932892 4.29224L0.932878 4.29225L0.934851 4.29424L3.58046 6.95832C3.73676 7.11955 3.94983 7.2 4.1473 7.2C4.36196 7.2 4.55963 7.11773 4.71406 6.9584L10.0468 1.60234C10.2436 1.4199 10.2421 1.1339 10.0915 0.951972ZM4.2327 6.30081L4.2317 6.2998C4.23206 6.30015 4.23237 6.30049 4.23269 6.30082L4.2327 6.30081Z" fill="#3056D3" stroke="#3056D3" strokeWidth="0.4" />
                          </svg>
                        </span>
                      </div>
                      <span className="leading-none">
                        I agree to the <Link href="/terms-of-service" className="text-primary hover:underline">Terms</Link> and <Link href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</Link>.
                      </span>
                    </label>
                  </div>
                  <div className="mt-8">
                    <button
                      type="submit"
                      disabled={loading}
                      className="shadow-submit dark:shadow-submit-dark flex w-full items-center justify-center rounded-sm bg-primary px-9 py-4 text-base font-medium text-white duration-300 hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? "Submitting..." : "Create company account"}
                    </button>
                  </div>
                </form>
                <p className="mt-6 text-center text-base font-medium text-body-color">
                  Already have an account? {" "}
                  <Link href="/signin" className="text-primary hover:underline">Sign in</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignupPage;
