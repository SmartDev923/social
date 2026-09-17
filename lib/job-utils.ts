/**
 * Utilities for fetching job data based on company and position
 */

import { jobsData, AssessmentStep } from "@/config/jobs";
import { InviteTokenData } from "@/lib/invite-token";

export interface AssessmentData {
  job: {
    title: string;
    requirements: string[];
    responsibilities: string[];
    company: string;
    companyUrl?: string;
  };
  assessment: {
    totalTime: number;
    steps: AssessmentStep[];
  };
  status: "valid" | "expired";
}

/**
 * Fetch assessment data based on invite token data
 */
export function fetchAssessmentByToken(tokenData: InviteTokenData): AssessmentData {
  // Find the job matching jobId
  const job = jobsData.jobs.find(
    (j) => j.id === tokenData.jobId
  );

  if (!job) {
    return {
      job: {
        title: "",
        requirements: [],
        responsibilities: [],
        company: "",
      },
      assessment: {
        totalTime: 0,
        steps: [],
      },
      status: "expired",
    };
  }

  return {
    status: "valid",
    job: {
      title: job.title,
      company: job.company.name,
      companyUrl: job.company.url,
      requirements: job.requirements,
      responsibilities: job.responsibilities,
    },
    assessment: {
      totalTime: job.assessment.totalTime,
      steps: job.assessment.steps,
    },
  };
}
