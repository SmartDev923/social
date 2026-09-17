import { NextRequest, NextResponse } from "next/server";
import {
  validateInviteToken,
  INVITE_RESUME_COOKIE_NAME,
  isResumeCookieValid,
} from "@/lib/invite-token";
import { fetchAssessmentByToken } from "@/lib/job-utils";
import { jobsData } from "@/config/jobs";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token } = body;

    if (!token) {
      return NextResponse.json(
        { error: "Token is required" },
        { status: 400 }
      );
    }

    // Get all known jobIds from jobs data
    const knownJobIds = jobsData.jobs.map((job) => job.id);

    // Validate the token (HMAC-based validation)
    let validation = validateInviteToken(token, knownJobIds);

    // If "already used", allow resume when same browser has valid resume cookie
    if (
      !validation.valid &&
      validation.error === "This invite code has already been used"
    ) {
      const resumeCookie = request.cookies.get(INVITE_RESUME_COOKIE_NAME)?.value;
      if (resumeCookie && isResumeCookieValid(token, resumeCookie)) {
        validation = validateInviteToken(token, knownJobIds, {
          skipUsedCheck: true,
        });
      }
    }

    if (!validation.valid || !validation.data) {
      return NextResponse.json({
        valid: false,
        error: validation.error || "Invalid or expired token",
      });
    }

    // Fetch assessment data
    const assessmentData = fetchAssessmentByToken(validation.data);

    return NextResponse.json({
      valid: true,
      data: assessmentData,
      tokenData: validation.data,
    });
  } catch (error) {
    console.error("Validation error:", error);
    return NextResponse.json(
      { valid: false, error: "Failed to validate token" },
      { status: 500 }
    );
  }
}
