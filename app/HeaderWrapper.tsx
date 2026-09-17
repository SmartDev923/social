"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";

export default function HeaderWrapper() {
  const pathname = usePathname();
  
  // Hide header for invite routes
  if (pathname?.startsWith("/invite")) {
    return null;
  }
  
  return <Header />;
}

