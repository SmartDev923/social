"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

/**
 * Component that validates admin credentials on app load
 * If credentials exist in localStorage, it validates them via API
 */
export default function AuthValidator() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return;

    // Check if admin credentials exist in localStorage
    const isAuthenticated = localStorage.getItem("admin-authenticated") === "true";
    const adminEmail = localStorage.getItem("admin-email");
    const adminPassword = localStorage.getItem("admin-password");

    // If authenticated flag exists but we're not on signin page, validate credentials
    if (isAuthenticated && adminEmail && adminPassword && pathname !== "/signin") {
      // Validate credentials via API
      fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: adminEmail, password: adminPassword }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (!data.success || !data.isAdmin) {
            // Credentials are invalid, clear localStorage and redirect to signin
            localStorage.removeItem("admin-authenticated");
            localStorage.removeItem("admin-email");
            localStorage.removeItem("admin-password");
            
            // Only redirect if we're on a protected page (like /admin)
            if (pathname?.startsWith("/admin")) {
              router.push("/signin");
            }
          }
          // If validation succeeds, do nothing - user stays authenticated
        })
        .catch((error) => {
          console.error("Error validating credentials:", error);
          // On error, clear credentials to be safe
          localStorage.removeItem("admin-authenticated");
          localStorage.removeItem("admin-email");
          localStorage.removeItem("admin-password");
          
          if (pathname?.startsWith("/admin")) {
            router.push("/signin");
          }
        });
    } else if (isAuthenticated && (!adminEmail || !adminPassword)) {
      // If authenticated flag exists but credentials are missing, clear everything
      localStorage.removeItem("admin-authenticated");
      localStorage.removeItem("admin-email");
      localStorage.removeItem("admin-password");
      
      if (pathname?.startsWith("/admin")) {
        router.push("/signin");
      }
    }
  }, [router, pathname]);

  // This component doesn't render anything
  return null;
}
