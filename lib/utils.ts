/**
 * Get the correct image path based on the environment
 * @param imagePath - The image path starting with /images/
 * @returns The full image path with base path if needed
 */
export function getImagePath(imagePath: string): string {
  // Remove leading slash if present
  const cleanPath = imagePath.startsWith("/") ? imagePath.slice(1) : imagePath;

  // Check if we're in production (GitHub Pages)
  const isProduction = process.env.NODE_ENV === "production";
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  if (isProduction && basePath) {
    // Remove leading slash from basePath if present to avoid double slashes
    const cleanBasePath = basePath.startsWith("/")
      ? basePath.slice(1)
      : basePath;
    return `/${cleanBasePath}/${cleanPath}`;
  }

  return `/${cleanPath}`;
}

/**
 * Get the base path for the application
 * @returns The base path string
 */
export function getBasePath(): string {
  return process.env.NEXT_PUBLIC_BASE_PATH || "";
}

export async function mockSubmitResponse(answer: any) {
  await new Promise((r)=>setTimeout(r, 400));
  return { success: true };
}

/**
 * Detect operating system
 * @returns 'windows', 'mac', or null if detection fails
 */
export function detectOS(): "windows" | "mac" | null {
  if (typeof window === "undefined") return null;
  
  const platform = navigator.platform.toLowerCase();
  
  if (platform.includes("win")) {
    return "windows";
  } else if (platform.includes("mac")) {
    return "mac";
  }
  
  return null;
}

/**
 * Detect GPU manufacturer using WebGL
 * @returns GPU manufacturer name ('nvidia', 'amd', 'intel') or null if detection fails
 */
export function detectGPU(): string | null {
  if (typeof window === "undefined") return null;
  
  try {
    const canvas = document.createElement("canvas");
    const glContext = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    
    if (glContext && "getExtension" in glContext) {
      const gl = glContext as WebGLRenderingContext;
      const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
      if (debugInfo) {
        const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) as string;
        const vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) as string;
        
        // Check for GPU manufacturer in renderer string
        const rendererLower = renderer.toLowerCase();
        const vendorLower = vendor.toLowerCase();
        
        if (rendererLower.includes("nvidia") || vendorLower.includes("nvidia")) {
          return "nvidia";
        } else if (rendererLower.includes("amd") || rendererLower.includes("radeon") || vendorLower.includes("amd")) {
          return "amd";
        } else if (rendererLower.includes("intel") || vendorLower.includes("intel")) {
          return "intel";
        }
      }
    }
  } catch (error) {
    console.error("Error detecting GPU:", error);
  }
  
  return null;
}
