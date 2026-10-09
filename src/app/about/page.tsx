"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { scrollToPageTop } from "@/components/SmoothScroll";

// Reusable scroll-reveal hook:
// - Triggers when scrolling DOWN into a section
// - Never glitches/replays when scrolling bottom to top
// - Quietly resets when scrolled completely above so subsequent scroll-downs replay cleanly
function useScrollReveal(threshold = 0.82) {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const hasPlayedRef = useRef(false);
  const isPlayingRef = useRef(false);

  useEffect(() => {
    let lastScrollY = typeof window !== "undefined" ? window.scrollY : 0;

    const handleScroll = () => {
      if (typeof window === "undefined") return;
      const currentY = window.scrollY;
      const isScrollingDown = currentY >= lastScrollY;
      lastScrollY = currentY;

      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();

        // Reset quietly when user has scrolled completely above this section
        if (rect.top >= window.innerHeight * 0.98) {
          if (hasPlayedRef.current) {
            hasPlayedRef.current = false;
            isPlayingRef.current = false;
            setIsVisible(false);
          }
        }

        // Trigger animation whenever scrolling DOWN into this section
        if (
          isScrollingDown &&
          !hasPlayedRef.current &&
          !isPlayingRef.current &&
          rect.top <= window.innerHeight * threshold &&
          rect.bottom >= 0
        ) {
          hasPlayedRef.current = true;
          isPlayingRef.current = true;
          setIsVisible(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [threshold]);

  return { ref, isVisible };
}

export default function AboutPage() {
  // Hero section mounts on initial page visit
  const [heroVisible, setHeroVisible] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setHeroVisible(true), 60);
    return () => clearTimeout(timer);
  }, []);

  // Scroll detectors for individual section contents
  const sec2 = useScrollReveal(0.84);
  const sec3 = useScrollReveal(0.82);
  const sec4 = useScrollReveal(0.82);
  const sec5 = useScrollReveal(0.80);

  return (
    <>
      {/* Import Caveat Cursive Font for Handwritten Script Elements */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=Kaushan+Script&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        
        .font-script {
          font-family: 'Caveat', cursive, sans-serif;
        }
        .font-brush {
          font-family: 'Kaushan Script', cursive;
        }
      `}</style>

      <main className="w-full min-h-screen bg-gradient-to-b from-[#FFF0F4] via-[#FFF5F8] to-white text-slate-800 relative overflow-hidden select-none font-sans">

        <div className="relative z-10">

          {/* ========================================================================= */}
          {/* SECTION 1: HERO SECTION - 100VH WITH STAGGERED ELEMENT-BY-ELEMENT REVEAL  */}
          {/* ========================================================================= */}
          <section className="relative w-full h-screen min-h-[750px] lg:h-[100vh] flex flex-col justify-center lg:justify-between overflow-hidden px-[3vw] lg:px-[4vw] pt-[2vh] pb-[4vh]">

            {/* Full-bleed Hero Background Image with Curves & Traveler */}
            <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
              <Image
                src="/aboutAs/hero/herobg.webp"
                alt="Dubai Skyline Sunset & Traveler"
                fill
                className="object-cover object-center"
                priority
                unoptimized
              />
            </div>

            {/* Top-Left Pink Foliage Flower Image - Fades in First & Waves */}
            <div
              style={{
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? "scale(1)" : "scale(0.85)",
                transition: "opacity 0.8s ease-out 0.05s, transform 0.8s ease-out 0.05s",
              }}
              className="absolute top-0 left-0 w-[18vw] max-w-[260px] pointer-events-none z-10 origin-top-left animate-flower-wave"
            >
              <Image
                src="/aboutAs/hero/topleaves.webp"
                alt="Top Leaves Decoration"
                width={300}
                height={300}
                className="w-full h-auto object-contain"
                priority
              />
            </div>

            {/* Bottom-Left Pink Foliage Flower Image - Fades in First & Waves */}
            <div
              style={{
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? "scale(1)" : "scale(0.85)",
                transition: "opacity 0.8s ease-out 0.15s, transform 0.8s ease-out 0.15s",
              }}
              className="absolute bottom-0 left-0 w-[18vw] max-w-[240px] pointer-events-none z-10 origin-bottom-left animate-flower-wave-alt"
            >
              <Image
                src="/aboutAs/hero/bottomleaves.webp"
                alt="Bottom Leaves Decoration"
                width={300}
                height={300}
                className="w-full h-auto object-contain"
              />
            </div>

            {/* Airplane Flight Path Stroke Image */}
            <div
              style={{
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? "translate3d(0, 0, 0)" : "translate3d(40px, -20px, 0)",
                transition: "opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.35s, transform 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.35s",
              }}
              className="absolute top-[4vh] lg:top-[6vh] right-[26vw] lg:right-[32vw] hidden md:block pointer-events-none z-20"
            >
              <Image
                src="/aboutAs/hero/areplanestroke.webp"
                alt="Airplane Flight Path"
                width={320}
                height={140}
                className="w-[18vw] max-w-[300px] h-auto object-contain drop-shadow-sm"
              />
            </div>

            {/* Top-Right Sky Script Text: "Same Planet Different Vibes" */}
            <div
              style={{
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? "translate3d(0, 0, 0) rotate(-10deg)" : "translate3d(45px, -20px, 0) rotate(-10deg)",
                transition: "opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.5s, transform 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.5s",
              }}
              className="absolute top-[9vh] right-[6vw] lg:right-[7.5vw] z-20 pointer-events-none flex flex-col items-center select-none"
            >
              {/* Sun / Spark lines top-right */}
              <div className="self-end mr-[-0.6vw] -mb-[0.3vw] text-white/95">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="w-[1.6vw] h-[1.6vw]">
                  <path d="M12 5 L14 1" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M17 7 L21 5" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M19 13 L23 13" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </div>
              <span className="font-script text-2xl sm:text-3xl lg:text-[2.3vw] font-bold text-white tracking-wide drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)] leading-tight whitespace-nowrap">
                Same Planet
              </span>
              <div className="relative">
                <span className="font-script text-3xl sm:text-4xl lg:text-[2.8vw] font-bold text-white tracking-wide drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)] leading-tight whitespace-nowrap">
                  Different Vibes
                </span>
                {/* Sketch Underline */}
                <svg viewBox="0 0 160 14" className="w-full h-[0.7vw] min-h-[6px] absolute -bottom-1 left-0 text-white/90" fill="none">
                  <path d="M 4 8 C 45 3, 115 11, 156 5" stroke="white" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
            </div>

            {/* Bottom-Right Organic Pink Wave Curve Accent */}
            <div className="absolute -bottom-1 right-0 w-[42vw] max-w-[650px] h-[14vh] min-h-[90px] pointer-events-none z-10 overflow-hidden">
              <svg viewBox="0 0 500 130" fill="none" preserveAspectRatio="none" className="w-full h-full">
                <path d="M 0 130 Q 140 50, 280 85 T 500 15 L 500 130 Z" fill="#FCE7F0" opacity="0.95" />
                <path d="M 40 130 Q 200 60, 350 95 T 500 35 L 500 130 Z" fill="#FFF2F7" opacity="0.9" />
              </svg>
            </div>

            {/* Hero Main Content Area */}
            <div className="w-full h-full max-w-[94vw] mx-auto flex flex-col justify-center z-10 pl-[1vw] lg:pl-[3vw] py-[2vh]">

              {/* Left Column Container */}
              <div className="w-full lg:w-[54%] flex flex-col items-start text-left relative">

                {/* Main Headline with Script Typography: Line by Line Fade In */}
                <div className="mb-[1.5vh]">
                  <h1 className="flex flex-col items-start leading-[1.05]">
                    {/* Line 1: More Than Just */}
                    <span
                      style={{
                        opacity: heroVisible ? 1 : 0,
                        transform: heroVisible ? "translate3d(0, 0, 0)" : "translate3d(-40px, 0, 0)",
                        transition: "opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1) 0.25s, transform 0.75s cubic-bezier(0.16, 1, 0.3, 1) 0.25s",
                      }}
                      className="font-script text-5xl sm:text-6xl md:text-7xl lg:text-[5.2vw] font-extrabold text-[#1E293B] tracking-tight inline-block"
                    >
                      More Than Just
                    </span>

                    {/* Line 2: A Trip */}
                    <div
                      style={{
                        opacity: heroVisible ? 1 : 0,
                        transform: heroVisible ? "translate3d(0, 0, 0)" : "translate3d(-40px, 0, 0)",
                        transition: "opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1) 0.45s, transform 0.75s cubic-bezier(0.16, 1, 0.3, 1) 0.45s",
                      }}
                      className="relative inline-block mt-[1.5vh]"
                    >
                      <span className="font-script text-6xl sm:text-7xl md:text-8xl lg:text-[6.2vw] font-black text-[#FF2D75] tracking-wide block transform -rotate-1">
                        A Trip
                      </span>
                      {/* Pink Brush Stroke Underline */}
                      <svg viewBox="0 0 240 24" className="w-[110%] h-[1.5vw] min-h-[16px] absolute -bottom-2 -left-2 text-[#FF2D75] pointer-events-none" fill="none">
                        <path d="M 5 18 C 60 5, 160 22, 235 8 C 170 20, 80 12, 12 16" fill="#FF2D75" opacity="0.85" />
                      </svg>
                    </div>
                  </h1>
                </div>

                {/* Line 3: Subtitle / Paragraph */}
                <p
                  style={{
                    opacity: heroVisible ? 1 : 0,
                    transform: heroVisible ? "translate3d(0, 0, 0)" : "translate3d(-35px, 0, 0)",
                    transition: "opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1) 0.65s, transform 0.75s cubic-bezier(0.16, 1, 0.3, 1) 0.65s",
                  }}
                  className="text-slate-600 text-sm sm:text-base lg:text-[0.95vw] leading-relaxed max-w-[33vw] mb-[2vh] font-medium"
                >
                  We&apos;re not just a travel platform, we&apos;re your gateway to unforgettable experiences across the Middle East and beyond.
                </p>

                {/* Line 4: Start Your Journey Button */}
                <div
                  style={{
                    opacity: heroVisible ? 1 : 0,
                    transform: heroVisible ? "translate3d(0, 0, 0)" : "translate3d(-30px, 0, 0)",
                    transition: "opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1) 0.8s, transform 0.75s cubic-bezier(0.16, 1, 0.3, 1) 0.8s",
                  }}
                  className="mb-[2.8vh]"
                >
                  <Link
                    href="/explore"
                    onClick={() => scrollToPageTop(true)}
                    className="px-[2.2vw] py-[1.2vh] bg-[#FF2D75] hover:bg-[#E01E63] text-white font-bold text-sm lg:text-[0.95vw] rounded-full shadow-[0_8px_25px_rgba(255,45,117,0.35)] hover:shadow-[0_12px_30px_rgba(255,45,117,0.45)] transition-all duration-300 hover:scale-105 inline-flex items-center gap-[0.6vw] cursor-pointer group"
                  >
                    <span>Start Your Journey</span>
                    <Icon icon="lucide:arrow-right" className="w-4 h-4 lg:w-[1.1vw] lg:h-[1.1vw] group-hover:translate-x-[0.3vw] transition-transform" />
                  </Link>
                </div>

                {/* 4 Feature Badges Row */}
                <div
                  style={{
                    opacity: heroVisible ? 1 : 0,
                    transform: heroVisible ? "translate3d(0, 0, 0)" : "translate3d(0, 25px, 0)",
                    transition: "opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.95s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.95s",
                  }}
                  className="flex items-center gap-[1.8vw] mb-[3vh] py-[0.5vh]"
                >
                  {/* 1. Global Destinations */}
                  <div className="flex flex-col items-center text-center group cursor-default">
                    <div className="w-[2.3vw] h-[2.3vw] min-w-[32px] min-h-[32px] rounded-full bg-pink-50 border border-pink-100 flex items-center justify-center text-[#FF2D75] mb-[0.6vh] shadow-xs group-hover:scale-110 transition-transform">
                      <Icon icon="lucide:globe" className="w-[1.15vw] h-[1.15vw] min-w-[16px] min-h-[16px]" />
                    </div>
                    <span className="text-[0.72vw] font-bold text-slate-800 leading-tight whitespace-nowrap">
                      Global<br />Destinations
                    </span>
                  </div>

                  {/* Divider */}
                  <div className="w-[1px] h-[2vw] bg-pink-100/90" />

                  {/* 2. Safe & Reliable */}
                  <div className="flex flex-col items-center text-center group cursor-default">
                    <div className="w-[2.3vw] h-[2.3vw] min-w-[32px] min-h-[32px] rounded-full bg-pink-50 border border-pink-100 flex items-center justify-center text-[#FF2D75] mb-[0.6vh] shadow-xs group-hover:scale-110 transition-transform">
                      <Icon icon="lucide:shield-check" className="w-[1.15vw] h-[1.15vw] min-w-[16px] min-h-[16px]" />
                    </div>
                    <span className="text-[0.72vw] font-bold text-slate-800 leading-tight whitespace-nowrap">
                      Safe &amp;<br />Reliable
                    </span>
                  </div>

                  {/* Divider */}
                  <div className="w-[1px] h-[2vw] bg-pink-100/90" />

                  {/* 3. Memorable Experiences */}
                  <div className="flex flex-col items-center text-center group cursor-default">
                    <div className="w-[2.3vw] h-[2.3vw] min-w-[32px] min-h-[32px] rounded-full bg-pink-50 border border-pink-100 flex items-center justify-center text-[#FF2D75] mb-[0.6vh] shadow-xs group-hover:scale-110 transition-transform">
                      <Icon icon="lucide:heart" className="w-[1.15vw] h-[1.15vw] min-w-[16px] min-h-[16px]" />
                    </div>
                    <span className="text-[0.72vw] font-bold text-slate-800 leading-tight whitespace-nowrap">
                      Memorable<br />Experiences
                    </span>
                  </div>

                  {/* Divider */}
                  <div className="w-[1px] h-[2vw] bg-pink-100/90" />

                  {/* 4. Expert Guidance */}
                  <div className="flex flex-col items-center text-center group cursor-default">
                    <div className="w-[2.3vw] h-[2.3vw] min-w-[32px] min-h-[32px] rounded-full bg-pink-50 border border-pink-100 flex items-center justify-center text-[#FF2D75] mb-[0.6vh] shadow-xs group-hover:scale-110 transition-transform">
                      <Icon icon="lucide:compass" className="w-[1.15vw] h-[1.15vw] min-w-[16px] min-h-[16px]" />
                    </div>
                    <span className="text-[0.72vw] font-bold text-slate-800 leading-tight whitespace-nowrap">
                      Expert<br />Guidance
                    </span>
                  </div>
                </div>

                {/* 4 Destination Mini Cards (Dubai, Abu Dhabi, Doha, Riyadh) - One by One Fade In */}
                <div className="grid grid-cols-4 gap-[0.9vw] w-full max-w-[42vw] relative z-20">
                  {/* Card 1: Dubai */}
                  <div
                    style={{
                      opacity: heroVisible ? 1 : 0,
                      transform: heroVisible ? "translate3d(0, 0, 0)" : "translate3d(0, 35px, 0)",
                      transition: "opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1) 1.1s, transform 0.65s cubic-bezier(0.16, 1, 0.3, 1) 1.1s",
                    }}
                    className="bg-white p-[0.4vw] rounded-[1vw] shadow-[0_10px_25px_rgba(0,0,0,0.08)] border border-pink-100/70 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="relative w-full h-[5.2vw] min-h-[62px] rounded-[0.7vw] overflow-hidden">
                      <Image
                        src="/Home/destinations/dubai_burj_khalifa.webp"
                        alt="Dubai"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-[0.35vw] flex items-start gap-[0.3vw] mt-[0.2vh]">
                      <Icon icon="lucide:map-pin" className="w-[0.9vw] h-[0.9vw] min-w-[12px] min-h-[12px] text-[#FF2D75] shrink-0 mt-[0.1vh]" />
                      <div className="flex flex-col leading-tight">
                        <span className="text-[0.78vw] font-bold text-slate-900">Dubai</span>
                        <span className="text-[0.62vw] text-slate-400 font-medium">UAE</span>
                      </div>
                    </div>
                  </div>

                  {/* Card 2: Abu Dhabi */}
                  <div
                    style={{
                      opacity: heroVisible ? 1 : 0,
                      transform: heroVisible ? "translate3d(0, 0, 0)" : "translate3d(0, 35px, 0)",
                      transition: "opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1) 1.22s, transform 0.65s cubic-bezier(0.16, 1, 0.3, 1) 1.22s",
                    }}
                    className="bg-white p-[0.4vw] rounded-[1vw] shadow-[0_10px_25px_rgba(0,0,0,0.08)] border border-pink-100/70 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="relative w-full h-[5.2vw] min-h-[62px] rounded-[0.7vw] overflow-hidden">
                      <Image
                        src="/aboutAs/polaroid_mosque.jpg"
                        alt="Abu Dhabi"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-[0.35vw] flex items-start gap-[0.3vw] mt-[0.2vh]">
                      <Icon icon="lucide:map-pin" className="w-[0.9vw] h-[0.9vw] min-w-[12px] min-h-[12px] text-[#FF2D75] shrink-0 mt-[0.1vh]" />
                      <div className="flex flex-col leading-tight">
                        <span className="text-[0.78vw] font-bold text-slate-900">Abu Dhabi</span>
                        <span className="text-[0.62vw] text-slate-400 font-medium">UAE</span>
                      </div>
                    </div>
                  </div>

                  {/* Card 3: Doha */}
                  <div
                    style={{
                      opacity: heroVisible ? 1 : 0,
                      transform: heroVisible ? "translate3d(0, 0, 0)" : "translate3d(0, 35px, 0)",
                      transition: "opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1) 1.34s, transform 0.65s cubic-bezier(0.16, 1, 0.3, 1) 1.34s",
                    }}
                    className="bg-white p-[0.4vw] rounded-[1vw] shadow-[0_10px_25px_rgba(0,0,0,0.08)] border border-pink-100/70 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="relative w-full h-[5.2vw] min-h-[62px] rounded-[0.7vw] overflow-hidden">
                      <Image
                        src="https://images.unsplash.com/photo-1578895210405-907db486c111?auto=format&fit=crop&w=600&q=80"
                        alt="Doha"
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                    <div className="p-[0.35vw] flex items-start gap-[0.3vw] mt-[0.2vh]">
                      <Icon icon="lucide:map-pin" className="w-[0.9vw] h-[0.9vw] min-w-[12px] min-h-[12px] text-[#FF2D75] shrink-0 mt-[0.1vh]" />
                      <div className="flex flex-col leading-tight">
                        <span className="text-[0.78vw] font-bold text-slate-900">Doha</span>
                        <span className="text-[0.62vw] text-slate-400 font-medium">Qatar</span>
                      </div>
                    </div>
                  </div>

                  {/* Card 4: Riyadh */}
                  <div
                    style={{
                      opacity: heroVisible ? 1 : 0,
                      transform: heroVisible ? "translate3d(0, 0, 0)" : "translate3d(0, 35px, 0)",
                      transition: "opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1) 1.46s, transform 0.65s cubic-bezier(0.16, 1, 0.3, 1) 1.46s",
                    }}
                    className="bg-white p-[0.4vw] rounded-[1vw] shadow-[0_10px_25px_rgba(0,0,0,0.08)] border border-pink-100/70 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="relative w-full h-[5.2vw] min-h-[62px] rounded-[0.7vw] overflow-hidden">
                      <Image
                        src="https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c6?auto=format&fit=crop&w=600&q=80"
                        alt="Riyadh"
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                    <div className="p-[0.35vw] flex items-start gap-[0.3vw] mt-[0.2vh]">
                      <Icon icon="lucide:map-pin" className="w-[0.9vw] h-[0.9vw] min-w-[12px] min-h-[12px] text-[#FF2D75] shrink-0 mt-[0.1vh]" />
                      <div className="flex flex-col leading-tight">
                        <span className="text-[0.78vw] font-bold text-slate-900">Riyadh</span>
                        <span className="text-[0.62vw] text-slate-400 font-medium">Saudi Arabia</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Right Spacer Area */}
              <div className="hidden lg:block lg:w-[46%] pointer-events-none" />
            </div>
          </section>

          {/* ========================================================================= */}
          {/* SECTION 2: OUR MISSION - FROM LEFT SIDE FADE IN & CARDS ONE BY ONE        */}
          {/* ========================================================================= */}
          <section ref={sec2.ref} className="py-[6vh] px-[3vw] max-w-[95vw] mx-auto border-t border-pink-100/60 overflow-visible">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-[3vw] w-full">

              {/* Left Column: Mission Intro with Airplane Stroke Graphic */}
              <div className="w-full lg:w-[28%] flex flex-col items-start text-left relative">

                {/* Airplane Stroke Accent Graphic on Left */}
                <div
                  style={{
                    opacity: sec2.isVisible ? 0.9 : 0,
                    transform: sec2.isVisible ? "translate3d(0, 0, 0) rotate(-65deg)" : "translate3d(-40px, 0, 0) rotate(-65deg)",
                    transition: "opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1) 0.1s, transform 0.75s cubic-bezier(0.16, 1, 0.3, 1) 0.1s",
                  }}
                  className="absolute -left-[13vw] lg:-left-[13.5vw] top-[29vh] -translate-y-1/2 w-[19vw] lg:w-[20vw] pointer-events-none z-10"
                >
                  <Image
                    src="/aboutAs/hero/areplanestroke.webp"
                    alt="Airplane Stroke Accent"
                    width={160}
                    height={160}
                    className="w-full h-auto object-contain"
                  />
                </div>

                {/* OUR MISSION Badge */}
                <div
                  style={{
                    opacity: sec2.isVisible ? 1 : 0,
                    transform: sec2.isVisible ? "translate3d(0, 0, 0)" : "translate3d(-40px, 0, 0)",
                    transition: "opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.1s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.1s",
                  }}
                  className="flex items-center gap-[0.5vw] text-[0.95vw] font-extrabold tracking-widest text-[#FF2D75] uppercase mb-[1.5vh]"
                >
                  <span className="w-[1.8vw] h-[0.1vw] bg-[#FF2D75]" />
                  <span>OUR MISSION</span>
                  <span className="w-[1.8vw] h-[0.1vw] bg-[#FF2D75]" />
                </div>

                {/* Mission Headline Line 1 & Line 2 */}
                <h2 className="flex flex-col items-start leading-[1.1] mb-[2vh]">
                  <span
                    style={{
                      opacity: sec2.isVisible ? 1 : 0,
                      transform: sec2.isVisible ? "translate3d(0, 0, 0)" : "translate3d(-40px, 0, 0)",
                      transition: "opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.22s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.22s",
                    }}
                    className="font-script text-[3vw] font-bold text-slate-800 tracking-tight"
                  >
                    To Make Every Journey
                  </span>
                  <span
                    style={{
                      opacity: sec2.isVisible ? 1 : 0,
                      transform: sec2.isVisible ? "translate3d(0, 0, 0)" : "translate3d(-40px, 0, 0)",
                      transition: "opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.34s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.34s",
                    }}
                    className="font-script text-[3.8vw] font-extrabold text-[#FF2D75] tracking-tight"
                  >
                    Meaningful
                  </span>
                </h2>

                {/* Description Paragraph */}
                <p
                  style={{
                    opacity: sec2.isVisible ? 1 : 0,
                    transform: sec2.isVisible ? "translate3d(0, 0, 0)" : "translate3d(-35px, 0, 0)",
                    transition: "opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.46s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.46s",
                  }}
                  className="text-slate-600 text-[1.05vw] leading-relaxed"
                >
                  We believe travel has the power to connect people, create new perspectives and build a kinder world. Our mission is to make travel simple, inspiring and accessible — so you can explore, learn and grow.
                </p>
              </div>

              {/* Center Column: 4 Feature Pillar Cards in Flexbox Row - One by One Fade In */}
              <div className="w-full lg:w-[52%] flex flex-row flex-wrap sm:flex-nowrap items-stretch justify-between gap-[1.5vw]">

                {/* 1. Explore */}
                <div
                  style={{
                    opacity: sec2.isVisible ? 1 : 0,
                    transform: sec2.isVisible ? "translate3d(0, 0, 0) scale(1)" : "translate3d(0, 35px, 0) scale(0.94)",
                    transition: "opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0.58s, transform 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0.58s",
                  }}
                  className="w-[48%] sm:w-[22.5%] h-[11.5vw] bg-white/80 backdrop-blur-sm rounded-[1.2vw] p-[0.8vw] text-center border border-pink-100/80 shadow-[0_4px_20px_rgba(255,45,117,0.04)] hover:shadow-lg transition-all flex flex-col items-center justify-center"
                >
                  <div className="w-[3vw] h-[3vw] rounded-full bg-pink-50 border border-pink-100 flex items-center justify-center text-[#FF2D75] mb-[0.4vh]">
                    <Icon icon="lucide:compass" className="w-[1.5vw] h-[1.5vw]" />
                  </div>
                  <h3 className="font-extrabold text-slate-900 font-brush text-[1.2vw] mb-[0.2vh]">Explore</h3>
                  <p className="text-[0.75vw] text-slate-500 leading-tight">Discover hidden gems and iconic landmarks.</p>
                </div>

                {/* 2. Connect */}
                <div
                  style={{
                    opacity: sec2.isVisible ? 1 : 0,
                    transform: sec2.isVisible ? "translate3d(0, 0, 0) scale(1)" : "translate3d(0, 35px, 0) scale(0.94)",
                    transition: "opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0.70s, transform 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0.70s",
                  }}
                  className="w-[48%] sm:w-[22.5%] h-[11.5vw] bg-white/80 backdrop-blur-sm rounded-[1.2vw] p-[0.8vw] text-center border border-pink-100/80 shadow-[0_4px_20px_rgba(255,45,117,0.04)] hover:shadow-lg transition-all flex flex-col items-center justify-center"
                >
                  <div className="w-[3vw] h-[3vw] rounded-full bg-pink-50 border border-pink-100 flex items-center justify-center text-[#FF2D75] mb-[0.4vh]">
                    <Icon icon="lucide:users" className="w-[1.5vw] h-[1.5vw]" />
                  </div>
                  <h3 className="font-bold text-slate-900 font-brush text-[1.2vw] mb-[0.2vh]">Connect</h3>
                  <p className="text-[0.75vw] text-slate-500 leading-tight">Meet cultures, people and stories.</p>
                </div>

                {/* 3. Travel Safe */}
                <div
                  style={{
                    opacity: sec2.isVisible ? 1 : 0,
                    transform: sec2.isVisible ? "translate3d(0, 0, 0) scale(1)" : "translate3d(0, 35px, 0) scale(0.94)",
                    transition: "opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0.82s, transform 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0.82s",
                  }}
                  className="w-[48%] sm:w-[22.5%] h-[11.5vw] bg-white/80 backdrop-blur-sm rounded-[1.2vw] p-[0.8vw] text-center border border-pink-100/80 shadow-[0_4px_20px_rgba(255,45,117,0.04)] hover:shadow-lg transition-all flex flex-col items-center justify-center"
                >
                  <div className="w-[3vw] h-[3vw] rounded-full bg-pink-50 border border-pink-100 flex items-center justify-center text-[#FF2D75] mb-[0.4vh]">
                    <Icon icon="lucide:shield-check" className="w-[1.5vw] h-[1.5vw]" />
                  </div>
                  <h3 className="font-bold text-slate-900 font-brush text-[1.2vw] mb-[0.2vh]">Travel Safe</h3>
                  <p className="text-[0.75vw] text-slate-500 leading-tight">Your safety is our priority.</p>
                </div>

                {/* 4. Sustainable */}
                <div
                  style={{
                    opacity: sec2.isVisible ? 1 : 0,
                    transform: sec2.isVisible ? "translate3d(0, 0, 0) scale(1)" : "translate3d(0, 35px, 0) scale(0.94)",
                    transition: "opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0.94s, transform 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0.94s",
                  }}
                  className="w-[48%] sm:w-[22.5%] h-[11.5vw] bg-white/80 backdrop-blur-sm rounded-[1.2vw] p-[0.8vw] text-center border border-pink-100/80 shadow-[0_4px_20px_rgba(255,45,117,0.04)] hover:shadow-lg transition-all flex flex-col items-center justify-center"
                >
                  <div className="w-[3vw] h-[3vw] rounded-full bg-pink-50 border border-pink-100 flex items-center justify-center text-[#FF2D75] mb-[0.4vh]">
                    <Icon icon="lucide:leaf" className="w-[1.5vw] h-[1.5vw]" />
                  </div>
                  <h3 className="font-bold text-slate-900 font-brush text-[1.2vw] mb-[0.2vh]">Sustainable</h3>
                  <p className="text-[0.75vw] text-slate-500 leading-tight">Preserve places for future generations.</p>
                </div>

              </div>

              {/* Right Column: Oriental Arch/Dome Shaped Fort Image */}
              <div
                style={{
                  opacity: sec2.isVisible ? 1 : 0,
                  transform: sec2.isVisible ? "translate3d(0, 0, 0) scale(1)" : "translate3d(40px, 0, 0) scale(0.92)",
                  transition: "opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1) 0.75s, transform 0.75s cubic-bezier(0.16, 1, 0.3, 1) 0.75s",
                }}
                className="w-full lg:w-[22%] flex justify-center relative"
              >
                {/* Top-Left Sparkle Rays Accent */}
                <div className="absolute -top-[1.5vh] -left-[0.5vw] z-20 pointer-events-none text-[#FF2D75]">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="w-[1.5vw] h-[1.5vw]">
                    <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" fill="#FF2D75" />
                  </svg>
                </div>

                {/* Right Foliage Leaf Accent */}
                <div className="absolute -top-[2vh] -right-[1.5vw] z-20 pointer-events-none opacity-80">
                  <svg width="60" height="80" viewBox="0 0 60 80" fill="none" className="w-[3vw] h-auto text-[#FF7BA7]">
                    <path d="M 30 70 Q 20 40 45 10 Q 50 25 35 45 Q 25 55 30 70 Z" fill="#FFB7D0" stroke="#FF2D75" strokeWidth="1.5" />
                    <path d="M 30 70 Q 10 50 15 25 Q 25 35 28 55 Z" fill="#FFD0DF" stroke="#FF2D75" strokeWidth="1.5" />
                  </svg>
                </div>

                {/* Bottom-Right Sparkle Star Accent */}
                <div className="absolute -bottom-[1vh] -right-[1vw] z-20 pointer-events-none text-[#FF2D75]">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="w-[1.4vw] h-[1.4vw]">
                    <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" fill="#FF2D75" />
                  </svg>
                </div>

                {/* Oriental Dome Shaped Fort Image */}
                <div className="relative w-[20vw] filter drop-shadow-[0_15px_30px_rgba(255,45,117,0.15)] transform hover:scale-[1.03] transition-transform duration-300">
                  <Image
                    src="/aboutAs/section.webp"
                    alt="Oriental Fort"
                    width={320}
                    height={360}
                    className="w-full h-auto object-contain"
                  />
                </div>
              </div>

            </div>
          </section>


          {/* ========================================================================= */}
          {/* SECTION 3: OUR STORY - CARDS ONE BY ONE & CONTENT FADE RIGHT TO LEFT      */}
          {/* ========================================================================= */}
          <section ref={sec3.ref} className="w-full border-t border-pink-100/60 overflow-hidden">
            <div className="relative w-full h-[26vw] min-h-[42vh] flex items-center px-[5vw] overflow-hidden bg-gradient-to-b from-[#FEEEF2] to-[#FCDCE4]">

              {/* Left Side: Soft Pink Background with Small Palm Trees (bottom-left), right edge masked to fade out */}
              <div
                className="absolute inset-y-0 -left-[2vw] -bottom-[4vh] w-[50%] z-0"
                style={{
                  WebkitMaskImage: "linear-gradient(to right, black 55%, transparent 100%)",
                  maskImage: "linear-gradient(to right, black 55%, transparent 100%)",
                }}
              >
                <Image
                  src="/aboutAs/story_left_palms.webp"
                  alt=""
                  fill
                  quality={95}
                  sizes="50vw"
                  className="object-cover object-left-bottom"
                  priority
                />
              </div>

              {/* Right Side: Sharp Desert Road Photo, left edge masked so it dissolves into the pink further to the right */}
              <div
                className="absolute inset-y-0 right-0 w-[58%] z-[1]"
                style={{
                  WebkitMaskImage: "linear-gradient(to right, transparent 0%, transparent 15%, rgba(0,0,0,0.4) 35%, black 60%)",
                  maskImage: "linear-gradient(to right, transparent 0%, transparent 15%, rgba(0,0,0,0.4) 35%, black 60%)",
                }}
              >
                <Image
                  src="/aboutAs/story_desert_road.webp"
                  alt="Desert Mountain Road"
                  fill
                  quality={95}
                  sizes="58vw"
                  className="object-cover object-[70%_center]"
                  priority
                />
                {/* Soft pink tint on top for a dreamy sky */}
                <div className="absolute inset-x-0 top-0 h-[35%] bg-gradient-to-b from-[#FDEBF1]/50 to-transparent" />
              </div>

              {/* Soft White/Pink Overlay fully covering the text area for crystal clear readability */}
              <div
                className="absolute inset-y-0 left-0 w-[85%] z-[2] pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to right, rgba(255,250,252,0) 0%, rgba(255,250,252,0.6) 25%, rgba(255,250,252,0.92) 45%, rgba(255,250,252,0.85) 72%, rgba(255,250,252,0) 100%)",
                }}
              />

              {/* "Real Places Real Stories" Doodle in the Sky */}
              <div
                style={{
                  opacity: sec3.isVisible ? 1 : 0,
                  transform: sec3.isVisible ? "translate3d(0, 0, 0)" : "translate3d(30px, -15px, 0)",
                  transition: "opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1) 0.35s, transform 0.75s cubic-bezier(0.16, 1, 0.3, 1) 0.35s",
                }}
                className="absolute top-[2.2vw] right-[22%] z-20 pointer-events-none flex items-start gap-[0.5vw]"
              >
                <Icon icon="mdi:map-marker" className="w-[1.8vw] h-[1.8vw] text-[#FF2D75] mt-[0.3vw]" />
                <div className="flex flex-col items-start -rotate-[8deg]">
                  <span className="font-script text-[1.7vw] font-bold text-[#FF2D75] leading-none">Real Places</span>
                  <span className="font-script text-[1.7vw] font-bold text-[#FF2D75] leading-none ml-[1.2vw]">Real Stories</span>
                </div>
              </div>

              {/* Banner Content Container */}
              <div className="relative z-10 w-full flex flex-col lg:flex-row items-center justify-start gap-[3vw]">

                {/* Left Column: 3 Polaroid Cards & Brush Splash - Fade in One by One */}
                <div className="w-full lg:w-auto flex flex-row items-center justify-start relative">

                  {/* Left Stack of 2 Polaroids (Camel & 4x4) */}
                  <div className="flex flex-col gap-[0.6vh] relative z-20">

                    {/* Polaroid 1: Camel Sunset (Top Left) */}
                    <div
                      style={{
                        opacity: sec3.isVisible ? 1 : 0,
                        transform: sec3.isVisible ? "translate3d(0, 0, 0) rotate(-7deg)" : "translate3d(-35px, 20px, 0) rotate(-7deg)",
                        transition: "opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0.15s, transform 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0.15s",
                      }}
                      className="w-[11vw] bg-white p-[0.4vw] pb-[0.7vw] rounded-[0.5vw] shadow-[0_10px_25px_rgba(0,0,0,0.18)] border border-slate-100 hover:scale-[1.02] transition-transform"
                    >
                      <div className="relative w-full h-[7.8vw] rounded-[0.3vw] overflow-hidden">
                        <Image
                          src="/aboutAs/polaroid_camel.webp"
                          alt="Desert Camel Safari"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>

                    {/* Polaroid 2: Desert 4x4 Vehicle (Bottom Left) */}
                    <div
                      style={{
                        opacity: sec3.isVisible ? 1 : 0,
                        transform: sec3.isVisible ? "translate3d(0, 0, 0) rotate(-7deg)" : "translate3d(-35px, 20px, 0) rotate(-7deg)",
                        transition: "opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0.30s, transform 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0.30s",
                      }}
                      className="w-[11vw] bg-white p-[0.4vw] pb-[0.7vw] rounded-[0.5vw] shadow-[0_10px_25px_rgba(0,0,0,0.18)] border border-slate-100 hover:scale-[1.02] transition-transform"
                    >
                      <div className="relative w-full h-[7.8vw] rounded-[0.3vw] overflow-hidden">
                        <Image
                          src="/aboutAs/polaroid_car.webp"
                          alt="Desert Dune 4x4 Safari"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Right Polaroid: Sheikh Zayed Mosque (Tilted Slightly, Overlapping) */}
                  <div
                    style={{
                      opacity: sec3.isVisible ? 1 : 0,
                      transform: sec3.isVisible ? "translate3d(0, 0, 0) rotate(3deg)" : "translate3d(-20px, 25px, 0) rotate(3deg)",
                      transition: "opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0.45s, transform 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0.45s",
                    }}
                    className="relative z-10 ml-[-2vw] hover:scale-[1.02] transition-transform"
                  >
                    {/* Pink Sparkle Dash Graphic on Top Left of Mosque Polaroid */}
                    <div className="absolute -top-[1.1vw] -left-[0.6vw] z-30 pointer-events-none text-[#FF2D75]">
                      <svg viewBox="0 0 24 24" className="w-[1.4vw] h-[1.4vw]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <path d="M4 14 L8 11" />
                        <path d="M7 6 L10 10" />
                        <path d="M14 4 L13 9" />
                      </svg>
                    </div>

                    <div className="w-[13.5vw] bg-white p-[0.45vw] pb-[0.9vw] rounded-[0.5vw] shadow-[0_12px_30px_rgba(0,0,0,0.2)] border border-slate-100">
                      <div className="relative w-full h-[15.5vw] rounded-[0.3vw] overflow-hidden">
                        <Image
                          src="/aboutAs/polaroid_mosque.jpg"
                          alt="Sheikh Zayed Grand Mosque"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </div>

                  {/* "From Dreams to Destinations" on Pink Watercolor Splash */}
                  <div
                    style={{
                      opacity: sec3.isVisible ? 1 : 0,
                      transform: sec3.isVisible ? "translate3d(0, 0, 0) scale(1)" : "translate3d(0, 25px, 0) scale(0.9)",
                      transition: "opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0.60s, transform 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0.60s",
                    }}
                    className="relative z-20 w-[13vw] h-[13vw] -ml-[0.5vw] flex items-center justify-center"
                  >
                    <Image
                      src="/aboutAs/pink_brush_splash.webp"
                      alt=""
                      fill
                      sizes="13vw"
                      className="object-contain -rotate-6 scale-110"
                    />

                    {/* Spark marks top-left */}
                    <svg viewBox="0 0 24 24" className="absolute top-[0.6vw] left-[1vw] w-[1.2vw] h-[1.2vw] text-[#FF2D75]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M4 10 L8 12" /><path d="M8 4 L10 9" /><path d="M15 3 L14 8" />
                    </svg>

                    {/* Script Text */}
                    <div className="relative flex flex-col items-start -rotate-[10deg] font-brush text-[#FF2D75] text-[1.45vw] leading-[1.15]">
                      <span>From</span>
                      <span className="ml-[1vw]">Dreams to</span>
                      <span className="ml-[1.6vw]">Destinations</span>
                    </div>

                    <span className="absolute right-[0.4vw] top-[5.2vw] w-[0.5vw] h-[0.12vw] bg-[#FF2D75] rounded-full -rotate-[30deg]" />
                    <span className="absolute right-[1.6vw] bottom-[3.4vw] w-[0.4vw] h-[0.12vw] bg-[#FF2D75] rounded-full rotate-[40deg]" />

                    <Icon icon="lucide:heart" className="absolute bottom-[1.6vw] left-1/2 translate-x-[0.6vw] w-[1.2vw] h-[1.2vw] text-[#FF2D75]" />
                  </div>

                </div>

                {/* Center Column: Content Fades In from Right to Left */}
                <div className="w-full lg:w-[30%] flex flex-col items-start text-left">

                  {/* Badge */}
                  <div
                    style={{
                      opacity: sec3.isVisible ? 1 : 0,
                      transform: sec3.isVisible ? "translate3d(0, 0, 0)" : "translate3d(40px, 0, 0)",
                      transition: "opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.25s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.25s",
                    }}
                    className="flex items-center justify-start gap-[0.5vw] text-[0.95vw] font-extrabold tracking-widest text-[#FF2D75] uppercase mb-[1vh]"
                  >
                    <span className="w-[1.8vw] h-[0.1vw] bg-[#FF2D75]" />
                    <span>OUR STORY</span>
                    <span className="w-[1.8vw] h-[0.1vw] bg-[#FF2D75]" />
                  </div>

                  {/* Title in Cursive Script Font */}
                  <h2
                    style={{
                      opacity: sec3.isVisible ? 1 : 0,
                      transform: sec3.isVisible ? "translate3d(0, 0, 0)" : "translate3d(40px, 0, 0)",
                      transition: "opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.40s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.40s",
                    }}
                    className="font-script text-[3.2vw] font-bold text-slate-900 tracking-tight leading-none mb-[1.5vh]"
                  >
                    How It All Began
                  </h2>

                  {/* Body Paragraph */}
                  <p
                    style={{
                      opacity: sec3.isVisible ? 1 : 0,
                      transform: sec3.isVisible ? "translate3d(0, 0, 0)" : "translate3d(35px, 0, 0)",
                      transition: "opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.55s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.55s",
                    }}
                    className="text-slate-600 text-[1.05vw] leading-relaxed mb-[2.5vh] max-w-[30vw]"
                  >
                    The wow world started with a simple idea — to bring the world closer to curious travelers. What began as a passion for exploring new places soon grew into a trusted travel platform, helping thousands of people experience the magic of the Middle East and beyond.
                  </p>

                  {/* Pill Button */}
                  <div
                    style={{
                      opacity: sec3.isVisible ? 1 : 0,
                      transform: sec3.isVisible ? "translate3d(0, 0, 0)" : "translate3d(30px, 0, 0)",
                      transition: "opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.70s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.70s",
                    }}
                  >
                    <Link
                      href="/explore"
                      onClick={() => scrollToPageTop(true)}
                      className="px-[1.8vw] py-[0.6vw] rounded-full border-2 border-[#FF2D75] text-[#FF2D75] hover:bg-[#FF2D75] hover:text-white font-extrabold text-[0.9vw] transition-all duration-300 flex items-center gap-[0.5vw] shadow-sm cursor-pointer bg-white/60 backdrop-blur-xs"
                    >
                      <span>Explore Now</span>
                      <Icon icon="lucide:arrow-right" className="w-[1vw] h-[1vw]" />
                    </Link>
                  </div>
                </div>

              </div>

            </div>
          </section>


          {/* ========================================================================= */}
          {/* SECTION 4: WHY CHOOSE US - FROM LEFT FADE IN & CARDS ONE BY ONE           */}
          {/* ========================================================================= */}
          <section ref={sec4.ref} className="py-[6vh] px-[3vw] max-w-[96vw] mx-auto border-t border-pink-100/60 overflow-hidden">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-[2vw] w-full">

              {/* Left Column: Intro Fades In from Left */}
              <div className="w-full lg:w-[24%] flex flex-col items-start text-left">

                {/* Badge */}
                <div
                  style={{
                    opacity: sec4.isVisible ? 1 : 0,
                    transform: sec4.isVisible ? "translate3d(0, 0, 0)" : "translate3d(-40px, 0, 0)",
                    transition: "opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.1s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.1s",
                  }}
                  className="flex items-center gap-[0.5vw] text-[0.95vw] font-extrabold tracking-widest text-[#FF2D75] uppercase mb-[1vh]"
                >
                  <span className="w-[1.8vw] h-[0.1vw] bg-[#FF2D75]" />
                  <span>WHY CHOOSE US</span>
                  <span className="w-[1.8vw] h-[0.1vw] bg-[#FF2D75]" />
                </div>

                {/* Title in Cursive Script Font matching Reference with Pink Brush Underline */}
                <h2
                  style={{
                    opacity: sec4.isVisible ? 1 : 0,
                    transform: sec4.isVisible ? "translate3d(0, 0, 0)" : "translate3d(-40px, 0, 0)",
                    transition: "opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.22s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.22s",
                  }}
                  className="flex flex-col items-start leading-[1.05] mb-[1.5vh]"
                >
                  <span className="font-script text-[3.2vw] font-bold text-slate-900 tracking-tight">
                    Your Trusted
                  </span>
                  <span className="relative inline-block font-script text-[3.2vw] font-bold text-slate-900 tracking-tight">
                    Travel Partner
                    {/* Pink Brush Stroke Underline */}
                    <svg className="absolute -bottom-[0.4vw] -left-[0.2vw] w-[105%] h-[0.8vw]" viewBox="0 0 120 12" fill="none">
                      <path d="M 2 9 Q 60 1 118 7" stroke="#FF2D75" strokeWidth="3" strokeLinecap="round" />
                    </svg>
                  </span>
                </h2>

                {/* Paragraph */}
                <p
                  style={{
                    opacity: sec4.isVisible ? 1 : 0,
                    transform: sec4.isVisible ? "translate3d(0, 0, 0)" : "translate3d(-35px, 0, 0)",
                    transition: "opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.34s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.34s",
                  }}
                  className="text-slate-600 text-[1.05vw] leading-relaxed mb-[2.5vh] max-w-[22vw]"
                >
                  We bring together local expertise, handpicked experiences and a passion for travel to give you the best of the Middle East and beyond.
                </p>

                {/* Solid Pink Button */}
                <div
                  style={{
                    opacity: sec4.isVisible ? 1 : 0,
                    transform: sec4.isVisible ? "translate3d(0, 0, 0)" : "translate3d(-30px, 0, 0)",
                    transition: "opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.46s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.46s",
                  }}
                >
                  <Link
                    href="/explore"
                    onClick={() => scrollToPageTop(true)}
                    className="px-[1.8vw] py-[0.6vw] bg-[#FF2D75] hover:bg-[#E02667] text-white font-extrabold text-[0.9vw] rounded-full shadow-[0_4px_18px_rgba(255,45,117,0.35)] transition-all flex items-center gap-[0.5vw] cursor-pointer"
                  >
                    <span>Explore Packages</span>
                    <Icon icon="lucide:arrow-right" className="w-[1vw] h-[1vw]" />
                  </Link>
                </div>
              </div>

              {/* Center Column: 4 Clean Cards in Flexbox Row - One by One Fade In */}
              <div className="w-full lg:w-[50%] flex flex-row flex-wrap sm:flex-nowrap items-stretch justify-between gap-[1vw]">

                {/* 1. Local Experts */}
                <div
                  style={{
                    opacity: sec4.isVisible ? 1 : 0,
                    transform: sec4.isVisible ? "translate3d(0, 0, 0) scale(1)" : "translate3d(0, 35px, 0) scale(0.94)",
                    transition: "opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0.55s, transform 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0.55s",
                  }}
                  className="w-[48%] sm:w-[23.5%] h-[13.5vw] bg-white/75 backdrop-blur-md rounded-[1.5vw] p-[1vw] text-center border border-pink-100/70 shadow-[0_8px_25px_rgba(255,45,117,0.03)] hover:shadow-lg transition-all flex flex-col items-center justify-center"
                >
                  <Icon icon="lucide:user" className="w-[2.2vw] h-[2.2vw] text-[#FF2D75] mb-[1.2vh]" />
                  <h3 className="font-semibold text-slate-800 font-brush text-[1.2vw] my-[0.8vh]">Local Experts</h3>
                  <p className="text-[0.72vw] text-slate-500 leading-tight px-[0.2vw]">On-ground support &amp; authentic experiences.</p>
                </div>

                {/* 2. Curated Experiences */}
                <div
                  style={{
                    opacity: sec4.isVisible ? 1 : 0,
                    transform: sec4.isVisible ? "translate3d(0, 0, 0) scale(1)" : "translate3d(0, 35px, 0) scale(0.94)",
                    transition: "opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0.68s, transform 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0.68s",
                  }}
                  className="w-[48%] sm:w-[23.5%] h-[13.5vw] bg-white/75 backdrop-blur-md rounded-[1.5vw] p-[1vw] text-center border border-pink-100/70 shadow-[0_8px_25px_rgba(255,45,117,0.03)] hover:shadow-lg transition-all flex flex-col items-center justify-center"
                >
                  <Icon icon="lucide:star" className="w-[2.2vw] h-[2.2vw] text-[#FF2D75] mb-[1.2vh]" />
                  <h3 className="font-semibold text-slate-800 font-brush text-[1.2vw] my-[0.8vh]">Curated Experiences</h3>
                  <p className="text-[0.72vw] text-slate-500 leading-tight px-[0.2vw]">Handpicked itineraries for every kind of traveler.</p>
                </div>

                {/* 3. 24/7 Support */}
                <div
                  style={{
                    opacity: sec4.isVisible ? 1 : 0,
                    transform: sec4.isVisible ? "translate3d(0, 0, 0) scale(1)" : "translate3d(0, 35px, 0) scale(0.94)",
                    transition: "opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0.81s, transform 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0.81s",
                  }}
                  className="w-[48%] sm:w-[23.5%] h-[13.5vw] bg-white/75 backdrop-blur-md rounded-[1.5vw] p-[1vw] text-center border border-pink-100/70 shadow-[0_8px_25px_rgba(255,45,117,0.03)] hover:shadow-lg transition-all flex flex-col items-center justify-center"
                >
                  <Icon icon="lucide:headset" className="w-[2.2vw] h-[2.2vw] text-[#FF2D75] mb-[1.2vh]" />
                  <h3 className="font-semibold text-slate-800 font-brush text-[1.2vw] my-[0.8vh]">24/7 Support</h3>
                  <p className="text-[0.72vw] text-slate-500 leading-tight px-[0.2vw]">We&apos;re with you, wherever you go.</p>
                </div>

                {/* 4. Best Value */}
                <div
                  style={{
                    opacity: sec4.isVisible ? 1 : 0,
                    transform: sec4.isVisible ? "translate3d(0, 0, 0) scale(1)" : "translate3d(0, 35px, 0) scale(0.94)",
                    transition: "opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0.94s, transform 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0.94s",
                  }}
                  className="w-[48%] sm:w-[23.5%] h-[13.5vw] bg-white/75 backdrop-blur-md rounded-[1.5vw] p-[1vw] text-center border border-pink-100/70 shadow-[0_8px_25px_rgba(255,45,117,0.03)] hover:shadow-lg transition-all flex flex-col items-center justify-center"
                >
                  <Icon icon="lucide:gem" className="w-[2.2vw] h-[2.2vw] text-[#FF2D75] mb-[1.2vh]" />
                  <h3 className="font-semibold text-slate-800 font-brush text-[1.2vw] my-[0.8vh]">Best Value</h3>
                  <p className="text-[0.72vw] text-slate-500 leading-tight px-[0.2vw]">Amazing experiences at the right price.</p>
                </div>

              </div>

              {/* Right Column: World Map Illustration with Airplane Flight Stroke & Doodle */}
              <div
                style={{
                  opacity: sec4.isVisible ? 1 : 0,
                  transform: sec4.isVisible ? "translate3d(0, 0, 0) scale(1)" : "translate3d(40px, 0, 0) scale(0.92)",
                  transition: "opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1) 0.75s, transform 0.75s cubic-bezier(0.16, 1, 0.3, 1) 0.75s",
                }}
                className="w-full lg:w-[25%] relative flex flex-col items-end justify-between min-h-[16vw] overflow-visible"
              >
                {/* World Map Container with areplanestroke Image on top */}
                <div className="relative w-full h-[12vw] flex items-center justify-center">
                  <Image
                    src="/aboutAs/pink_world_map.webp"
                    alt="World Map Silhouette"
                    fill
                    className="object-contain opacity-80"
                  />
                  <div className="absolute inset-0 flex items-center justify-center transform -rotate-12 scale-110 pointer-events-none">
                    <Image
                      src="/aboutAs/hero/areplanestroke.webp"
                      alt="Airplane Flight Trail"
                      width={280}
                      height={120}
                      className="w-[18vw] h-auto object-contain drop-shadow-xs"
                    />
                  </div>
                </div>

                {/* Hand-Drawn Pink Script Annotation below World Map */}
                <div className="relative z-10 flex items-center gap-[0.4vw] pr-[1vw] -mt-[0.5vh]">
                  <span className="font-brush text-[#FF2D75] text-[1.3vw] tracking-wide select-none transform -rotate-6">
                    Your Next Adventure Awaits
                  </span>
                  <svg viewBox="0 0 24 24" className="w-[1.2vw] h-[1.2vw] text-[#FF2D75] -mt-[0.2vw]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M4 14 L8 11" /><path d="M7 6 L10 10" /><path d="M14 4 L13 9" />
                  </svg>
                </div>

              </div>

            </div>
          </section>


          {/* ========================================================================= */}
          {/* SECTION 5: BANNER - SLIDES IN FROM RIGHT, INSIDE TEXT FADES ONE BY ONE    */}
          {/* ========================================================================= */}
          <section ref={sec5.ref} className="py-[3vh] px-[2vw] lg:px-[3vw] max-w-[96vw] mx-auto mb-[5vh] overflow-hidden">
            {/* Main Banner Container - Slides in smoothly from Right Side */}
            <div
              style={{
                opacity: sec5.isVisible ? 1 : 0,
                transform: sec5.isVisible ? "translate3d(0, 0, 0) scale(1)" : "translate3d(140px, 0, 0) scale(0.93)",
                filter: sec5.isVisible ? "blur(0px)" : "blur(8px)",
                transition: "transform 1.05s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.85s ease-out, filter 0.75s ease-out",
              }}
              className="relative w-full h-[18vw] min-h-[230px] rounded-[1.8vw] overflow-hidden shadow-[0_15px_35px_rgba(255,45,117,0.08)] border border-pink-100/80 flex flex-col md:flex-row items-center justify-between px-[3vw] py-[2vh]"
            >

              {/* Full-bleed Impact Banner Background Image */}
              <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
                <Image
                  src="/aboutAs/banner.webp"
                  alt="Dubai Skyline and Traditional Boat Sunset"
                  fill
                  className="object-cover object-center"
                  priority
                  unoptimized
                />
              </div>

              {/* 1. Left: "Our Impact" with White Watercolor Brush Patch Background - Fades In */}
              <div
                style={{
                  opacity: sec5.isVisible ? 1 : 0,
                  transform: sec5.isVisible ? "translate3d(0, 0, 0)" : "translate3d(-35px, 0, 0)",
                  transition: "opacity 0.7s ease-out 0.28s, transform 0.7s ease-out 0.28s",
                }}
                className="relative z-10 flex items-center gap-[0.9vw] px-[1.6vw] py-[1.2vh] shrink-0 min-w-[19vw] min-h-[6.5vw]"
              >
                {/* Authentic White Watercolor Brush Stroke Overlay */}
                <div className="absolute inset-0 w-full h-full transform scale-110 pointer-events-none">
                  <Image
                    src="/aboutAs/white_brush_patch.webp"
                    alt="White Watercolor Brush Stroke"
                    fill
                    className="object-contain object-left"
                  />
                </div>

                {/* Pin Icon */}
                <div className="relative z-10 w-[2.4vw] h-[2.4vw] min-w-[32px] min-h-[32px] flex items-center justify-center shrink-0">
                  <Icon icon="mdi:map-marker" className="w-[2.2vw] h-[2.2vw] min-w-[28px] min-h-[28px] text-[#FF2D75] drop-shadow-xs" />
                </div>

                {/* Text */}
                <div className="relative z-10 flex flex-col">
                  <h3 className="font-script text-2xl sm:text-3xl lg:text-[1.95vw] font-bold text-slate-800 leading-none">
                    Our Impact
                  </h3>
                  <p className="text-[0.72vw] text-slate-600 font-medium whitespace-nowrap mt-[0.3vh]">
                    Numbers that tell our journey
                  </p>
                </div>
              </div>

              {/* 2. Center: Four Stats Counters with Soft White-to-Pink Watercolor Blush Backdrop - Fade In One by One */}
              <div className="relative z-10 flex items-center gap-[1.8vw] lg:gap-[2.2vw] shrink-0 px-[1.8vw] py-[1.2vh]">
                {/* Soft White-to-Pink Horizontal Watercolor Blush Background */}
                <div
                  className="absolute inset-0 w-full h-full rounded-[2vw] pointer-events-none opacity-95 filter blur-[6px]"
                  style={{
                    background: "linear-gradient(to right, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.95) 55%, rgba(255,242,247,0.85) 80%, rgba(255,255,255,0) 100%)"
                  }}
                />

                {/* Stat 1: 50+ */}
                <div
                  style={{
                    opacity: sec5.isVisible ? 1 : 0,
                    transform: sec5.isVisible ? "translate3d(0, 0, 0) scale(1)" : "translate3d(0, 25px, 0) scale(0.9)",
                    transition: "opacity 0.6s ease-out 0.45s, transform 0.6s ease-out 0.45s",
                  }}
                  className="relative z-10 flex flex-col items-center text-center"
                >
                  <span className="text-2xl sm:text-3xl lg:text-[2.2vw] font-black text-[#FF2D75] leading-none mb-[0.3vh]">
                    50+
                  </span>
                  <span className="text-[0.75vw] font-semibold text-slate-600 whitespace-nowrap">
                    Destinations
                  </span>
                </div>

                {/* Vertical Divider */}
                <div className="relative z-10 w-[1px] h-[2.8vw] bg-pink-200/90" />

                {/* Stat 2: 10K+ */}
                <div
                  style={{
                    opacity: sec5.isVisible ? 1 : 0,
                    transform: sec5.isVisible ? "translate3d(0, 0, 0) scale(1)" : "translate3d(0, 25px, 0) scale(0.9)",
                    transition: "opacity 0.6s ease-out 0.58s, transform 0.6s ease-out 0.58s",
                  }}
                  className="relative z-10 flex flex-col items-center text-center"
                >
                  <span className="text-2xl sm:text-3xl lg:text-[2.2vw] font-black text-[#FF2D75] leading-none mb-[0.3vh]">
                    10K+
                  </span>
                  <span className="text-[0.75vw] font-semibold text-slate-600 whitespace-nowrap">
                    Happy Travelers
                  </span>
                </div>

                {/* Vertical Divider */}
                <div className="relative z-10 w-[1px] h-[2.8vw] bg-pink-200/90" />

                {/* Stat 3: 98% */}
                <div
                  style={{
                    opacity: sec5.isVisible ? 1 : 0,
                    transform: sec5.isVisible ? "translate3d(0, 0, 0) scale(1)" : "translate3d(0, 25px, 0) scale(0.9)",
                    transition: "opacity 0.6s ease-out 0.71s, transform 0.6s ease-out 0.71s",
                  }}
                  className="relative z-10 flex flex-col items-center text-center"
                >
                  <span className="text-2xl sm:text-3xl lg:text-[2.2vw] font-black text-[#FF2D75] leading-none mb-[0.3vh]">
                    98%
                  </span>
                  <span className="text-[0.75vw] font-semibold text-slate-600 whitespace-nowrap">
                    Satisfaction Rate
                  </span>
                </div>

                {/* Vertical Divider */}
                <div className="relative z-10 w-[1px] h-[2.8vw] bg-pink-200/90" />

                {/* Stat 4: 5★ */}
                <div
                  style={{
                    opacity: sec5.isVisible ? 1 : 0,
                    transform: sec5.isVisible ? "translate3d(0, 0, 0) scale(1)" : "translate3d(0, 25px, 0) scale(0.9)",
                    transition: "opacity 0.6s ease-out 0.84s, transform 0.6s ease-out 0.84s",
                  }}
                  className="relative z-10 flex flex-col items-center text-center"
                >
                  <span className="text-2xl sm:text-3xl lg:text-[2.2vw] font-black text-[#FF2D75] leading-none mb-[0.3vh]">
                    5★
                  </span>
                  <span className="text-[0.75vw] font-semibold text-slate-600 whitespace-nowrap">
                    Online Reviews
                  </span>
                </div>
              </div>

              {/* 3. Right: Pink Watercolor Blush Splash with "Let's Explore Together" - Fades In */}
              <Link
                href="/explore"
                onClick={() => scrollToPageTop(true)}
                style={{
                  opacity: sec5.isVisible ? 1 : 0,
                  transform: sec5.isVisible ? "translate3d(0, 0, 0) scale(1)" : "translate3d(40px, 0, 0) scale(0.9)",
                  transition: "opacity 0.75s ease-out 1.0s, transform 0.75s ease-out 1.0s",
                }}
                className="relative z-10 flex flex-col items-center justify-center p-[1.5vw] mr-[vw] mb-[4vw] shrink-0 min-w-[20vw] min-h-[14vw] cursor-pointer group hover:scale-105 transition-transform"
              >
                {/* Dark Blush Watercolor Brush Splash Overlay */}
                <div className="absolute inset-0 w-full h-full transform scale-125 -rotate-2 pointer-events-none opacity-95">
                  <Image
                    src="/aboutAs/darkblush.webp"
                    alt="Dark Blush Watercolor Splash"
                    fill
                    className="object-contain"
                  />
                </div>

                {/* Script Text: Let's Explore Together with spark dashes */}
                <div className="relative z-10 flex flex-col items-center text-center transform -rotate-3 select-none">
                  {/* Spark line decorations */}
                  <div className="relative flex flex-col items-center">
                    {/* Top-left & Top-right Spark dashes */}
                    <span className="font-script text-3xl sm:text-4xl lg:text-[2.6vw] font-bold text-[#FF2D75] leading-tight select-none drop-shadow-2xs group-hover:scale-105 transition-transform">
                      Let&apos;s Explore
                    </span>
                    <span className="font-script text-3xl sm:text-4xl lg:text-[2.8vw] font-bold text-[#FF2D75] leading-tight select-none drop-shadow-2xs mt-[-0.3vh] group-hover:scale-105 transition-transform">
                      Together
                    </span>
                  </div>
                </div>
              </Link>

            </div>
          </section>

        </div>
      </main>
    </>
  );
}
