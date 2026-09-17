import { NextRequest, NextResponse } from "next/server";
import {
  markCodeAsUsed,
  isCodeUsed,
  validateInviteToken,
  createResumeCookieValue,
  INVITE_RESUME_COOKIE_NAME,
} from "@/lib/invite-token";
import { jobsData } from "@/config/jobs";

const RESUME_COOKIE_MAX_AGE = 72 * 60 * 60; // 72 hours in seconds

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token } = body;

    if (!token) {
      return NextResponse.json(
        { success: false, error: "Token is required" },
        { status: 400 }
      );
    }

    // Check if code is already used first
    if (isCodeUsed(token)) {
      return NextResponse.json({
        success: false,
        error: "This invite code has already been used",
      }, { status: 400 });
    }

    // Validate the token to ensure it's valid before marking as used
    const knownJobIds = jobsData.jobs.map((job) => job.id);
    const validation = validateInviteToken(token, knownJobIds);

    if (!validation.valid || !validation.data) {
      return NextResponse.json({
        success: false,
        error: validation.error || "Invalid or expired token",
      }, { status: 400 });
    }

    // Mark the code as used
    markCodeAsUsed(token);

    const resumeValue = createResumeCookieValue(token);
    const response = NextResponse.json({
      success: true,
      message: "Invite code marked as used",
    });
    response.cookies.set(INVITE_RESUME_COOKIE_NAME, resumeValue, {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: RESUME_COOKIE_MAX_AGE,
    });
    return response;
  } catch (error) {
    console.error("Error marking invite code as used:", error);
    return NextResponse.json(
      { success: false, error: "Failed to mark invite code as used" },
      { status: 500 }
    );
  }
}
