import { NextRequest, NextResponse } from "next/server";
import { BACKEND_URL } from "@/config/credentials";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, data } = body;

    // Validate request structure
    if (!type) {
      return NextResponse.json(
        { error: "Type is required" },
        { status: 400 }
      );
    }

    // Validate type is one of the allowed types
    const allowedTypes = ["Load", "Register", "Video", "Complete"];
    if (!allowedTypes.includes(type)) {
      return NextResponse.json(
        { error: `Invalid type. Must be one of: ${allowedTypes.join(", ")}` },
        { status: 400 }
      );
    }

    // Forward request to backend (note: Django URLs typically require trailing slash)
    const backendResponse = await fetch(`${BACKEND_URL}/access/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type,
        data: data || {},
      }),
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
      
      console.error(`Backend error (${backendResponse.status}):`, errorMessage);
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

    console.log("Backend response:", backendData);

    // Return the backend response with appropriate status
    return NextResponse.json(backendData, {
      status: backendResponse.status,
    });
  } catch (error) {
    console.error("Access API error:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
