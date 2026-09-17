import { NextRequest, NextResponse } from "next/server";
import { BACKEND_URL } from "@/config/credentials";

export const dynamic = 'force-dynamic';

// Helper function to extract client IP address from request
function getClientIP(request: NextRequest): string {
  // Check X-Forwarded-For header (first IP in comma-separated list)
  const xForwardedFor = request.headers.get("x-forwarded-for");
  if (xForwardedFor) {
    const ip = xForwardedFor.split(",")[0].trim();
    if (ip) return ip;
  }

  // Check X-Real-IP header
  const xRealIP = request.headers.get("x-real-ip");
  if (xRealIP) {
    const ip = xRealIP.trim();
    if (ip) return ip;
  }

  // Fallback to direct connection IP (if available)
  // Note: In Next.js, we can't directly access REMOTE_ADDR,
  // but we can try to get it from the request
  const forwarded = request.headers.get("forwarded");
  if (forwarded) {
    // Parse Forwarded header if present
    const forMatch = forwarded.match(/for=([^;,\s]+)/);
    if (forMatch && forMatch[1]) {
      return forMatch[1].replace(/[\[\]"]/g, "");
    }
  }

  // Last resort: try to get from request URL or return empty string
  // The backend will handle empty IP appropriately
  return "";
}

export async function GET(request: NextRequest) {
  try {
    // Extract client IP address
    const clientIP = getClientIP(request);

    // Prepare headers to forward to backend
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    // Forward IP address in headers that Django expects
    if (clientIP) {
      headers["X-Forwarded-For"] = clientIP;
      headers["X-Real-IP"] = clientIP;
    }

    // Forward GET request to backend control/check endpoint (note: Django URLs typically require trailing slash)
    const backendResponse = await fetch(`${BACKEND_URL}/control/check/`, {
      method: "GET",
      headers,
    });

    // Check content type before parsing
    const contentType = backendResponse.headers.get("content-type") || "";
    const isJson = contentType.includes("application/json");

    // Handle non-OK responses
    if (!backendResponse.ok) {
      let errorMessage = `Backend returned ${backendResponse.status}`;
      try {
        if (isJson) {
          const errorData = await backendResponse.json();
          errorMessage = errorData.error || errorData.message || errorMessage;
        } else {
          const text = await backendResponse.text();
          errorMessage = text.substring(0, 200) || errorMessage;
        }
      } catch (e) {
        console.error("Error parsing error response:", e);
      }
      
      console.error(`Backend check error (${backendResponse.status}):`, errorMessage);
      return NextResponse.json(
        { error: errorMessage },
        { status: backendResponse.status }
      );
    }

    // Parse JSON response
    let backendData;
    try {
      if (isJson) {
        backendData = await backendResponse.json();
      } else {
        const text = await backendResponse.text();
        console.error("Backend returned non-JSON response:", text.substring(0, 500));
        return NextResponse.json(
          { error: "Backend returned non-JSON response" },
          { status: 500 }
        );
      }
    } catch (error) {
      console.error("Failed to parse JSON response:", error);
      return NextResponse.json(
        { error: "Failed to parse backend response" },
        { status: 500 }
      );
    }

    // Return the backend response with appropriate status
    return NextResponse.json(backendData, {
      status: backendResponse.status,
    });
  } catch (error) {
    console.error("Check connection error:", error);
    return NextResponse.json(
      { error: "Failed to check connection" },
      { status: 500 }
    );
  }
}
