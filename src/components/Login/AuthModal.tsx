"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { useAuthModal } from "@/context/AuthModalContext";
import AuthCard from "./AuthCard";

export default function AuthModal() {
  const { isAuthModalOpen, closeAuthModal, authModalMode } = useAuthModal();
  const videoRef = useRef<HTMLVideoElement>(null);

  // Close on Escape key press
  useEffect(() => {
    if (!isAuthModalOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeAuthModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isAuthModalOpen, closeAuthModal]);

  useEffect(() => {
    if (isAuthModalOpen && videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.warn("Autoplay notice:", err);
      });
    }
  }, [isAuthModalOpen]);

  if (!isAuthModalOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-[4px] flex items-center justify-center p-[1vw] cursor-pointer select-none transition-all duration-300 animate-in fade-in"
      onClick={closeAuthModal}
    >
      {/* Split Modal Window with Video on the Left & Full Auth Card on the Right */}
      <div
        className="relative w-[76vw] max-w-[1180px] h-[84vh] max-h-[780px] min-w-[320px] rounded-[1.8vw] overflow-hidden shadow-[0_1.5vw_4vw_rgba(0,0,0,0.6)] flex flex-col md:flex-row cursor-default select-text border border-white/20 bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left Side: Video Section */}
        <div className="relative w-full md:w-[54%] h-full overflow-hidden bg-black flex items-center justify-center">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            src="/login.mp4"
            className="w-full h-full object-cover pointer-events-none"
          >
            <source src="/login.mp4" type="video/mp4" />
          </video>

          {/* Subtle vignette overlay on video edge */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/30 pointer-events-none" />
        </div>

        {/* Right Side: Auth Card Section - Fully Covers Right Side */}
        <div className="relative w-full md:w-[46%] h-full bg-white flex flex-col justify-center overflow-hidden">
          {/* Aeroplane Stroke Accent Graphic */}
          <div className="absolute top-[0.8vw] right-[3.5vw] w-[8.5vw] min-w-[95px] max-w-[140px] pointer-events-none opacity-85 select-none z-20">
            <Image
              src="/aboutAs/hero/areplanestroke.webp"
              alt="Airplane Flight Path"
              width={240}
              height={100}
              className="w-full h-auto object-contain drop-shadow-xs"
            />
          </div>

          <AuthCard initialMode={authModalMode} onSuccess={closeAuthModal} />
        </div>

        {/* Close button at top right */}
        <button
          type="button"
          onClick={closeAuthModal}
          className="absolute top-[1.2vw] right-[1.2vw] z-30 w-[2.2vw] h-[2.2vw] min-w-[34px] min-h-[34px] rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900 flex items-center justify-center transition-all cursor-pointer shadow-sm border border-gray-200"
          title="Close (Esc)"
        >
          <Icon icon="lucide:x" className="w-[1.2vw] h-[1.2vw] min-w-[18px] min-h-[18px]" />
        </button>
      </div>
    </div>
  );
}
