import { NextRequest, NextResponse } from "next/server";
import { generateInviteToken } from "@/lib/invite-token";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { jobId } = body;

    if (!jobId) {
      return NextResponse.json(
        { error: "Job ID is required" },
        { status: 400 }
      );
    }

    const token = generateInviteToken(jobId);

    return NextResponse.json({ token });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to generate invite token" },
      { status: 500 }
    );
  }
}
