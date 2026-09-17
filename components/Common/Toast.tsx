"use client";

import { useEffect, useState } from "react";

interface ToastProps {
  message: string;
  type?: "error" | "success" | "info";
  duration?: number;
  onClose?: () => void;
}

export default function Toast({ message, type = "error", duration = 5000, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // Trigger animation on mount
    setTimeout(() => setIsVisible(true), 10);

    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        setShouldRender(false);
        onClose?.();
      }, 300); // Wait for fade out animation
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      setShouldRender(false);
      onClose?.();
    }, 300);
  };

  if (!shouldRender) return null;

  const bgColor = {
    error: "bg-red-500",
    success: "bg-green-500",
    info: "bg-blue-500",
  }[type];

  return (
    <div
      className={`fixed top-4 right-4 z-[10000] ${bgColor} text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 min-w-[300px] max-w-md transition-all duration-300 ease-out ${
        isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      }`}
    >
      <div className="flex-1">{message}</div>
      <button
        onClick={handleClose}
        className="text-white hover:text-gray-200 font-bold text-xl leading-none transition-colors"
        aria-label="Close"
      >
        ×
      </button>
    </div>
  );
}
