"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

export default function FooterWrapper() {
  const pathname = usePathname();
  
  // Hide footer and scroll to top for invite routes
  if (pathname?.startsWith("/invite")) {
    return null;
  }
  
  return (
    <>
      <Footer />
      <ScrollToTop />
    </>
  );
}

