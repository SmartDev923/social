import { NextRequest, NextResponse } from "next/server";
import { adminCredentials } from "@/config/credentials";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Check admin credentials
    if (email === adminCredentials.username && password === adminCredentials.password) {
      return NextResponse.json({
        success: true,
        isAdmin: true,
        message: "Authentication successful",
      });
    }

    // For now, reject all other credentials
    // In the future, this would check company credentials from a database
    return NextResponse.json(
      { error: "Invalid credentials" },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to authenticate" },
      { status: 500 }
    );
  }
}
