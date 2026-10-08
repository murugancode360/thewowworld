"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";

// Reusable scroll-reveal hook
function useScrollReveal(threshold = 0.82) {
  const ref = useRef<any>(null);
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
        if (rect.top >= window.innerHeight * 0.98) {
          if (hasPlayedRef.current) {
            hasPlayedRef.current = false;
            isPlayingRef.current = false;
            setIsVisible(false);
          }
        }
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
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return { ref, isVisible };
}

export default function ContactPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const secOffices = useScrollReveal(0.85);
  const secBanner = useScrollReveal(0.82);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    destination: "",
    travelDates: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  // Custom Multi-Date Picker State
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [currentCalendarDate, setCurrentCalendarDate] = useState(new Date());
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const datePickerRef = useRef<HTMLDivElement>(null);

  // Close calendar popover on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (datePickerRef.current && !datePickerRef.current.contains(e.target as Node)) {
        setShowDatePicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const year = currentCalendarDate.getFullYear();
  const month = currentCalendarDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfWeek = new Date(year, month, 1).getDay();

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const prevMonth = () => {
    setCurrentCalendarDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentCalendarDate(new Date(year, month + 1, 1));
  };

  const isSameDay = (d1: Date | null, d2: Date | null) => {
    if (!d1 || !d2) return false;
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  };

  const isDateSelected = (date: Date) => {
    return selectedDates.some((d) => isSameDay(d, date));
  };

  const isBeforeToday = (date: Date) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d < today;
  };

  const handleDateClick = (dayNumber: number) => {
    const clickedDate = new Date(year, month, dayNumber);
    if (isBeforeToday(clickedDate)) return;

    let updatedDates: Date[];
    if (isDateSelected(clickedDate)) {
      updatedDates = selectedDates.filter((d) => !isSameDay(d, clickedDate));
    } else {
      updatedDates = [...selectedDates, clickedDate].sort((a, b) => a.getTime() - b.getTime());
    }

    setSelectedDates(updatedDates);

    if (updatedDates.length === 0) {
      setFormData((prev) => ({ ...prev, travelDates: "" }));
    } else {
      const formattedList = updatedDates
        .map((d) => d.toLocaleDateString("en-US", { month: "short", day: "numeric" }))
        .join(", ");
      setFormData((prev) => ({ ...prev, travelDates: formattedList }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <main className="w-full min-h-screen bg-[#FFF5F8] text-slate-800 relative overflow-hidden select-none font-sans">

        {/* Top-Left Pink Foliage Image Accent */}
        <div
          className="absolute top-0 left-0 w-[16vw] max-w-[16vw] pointer-events-none z-10 origin-top-left animate-flower-wave transition-all duration-1000 ease-out"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "scale(1)" : "scale(0.85)",
          }}
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

        {/* Bottom-Right Pink Foliage Image Accent */}
        <div
          className="absolute top-[35vh] right-0 w-[16vw] max-w-[16vw] pointer-events-none z-10 origin-top-right animate-flower-wave-alt transition-all duration-1000 ease-out"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "scale(1)" : "scale(0.85)",
            transitionDelay: "0.2s",
          }}
        >
          <Image
            src="/aboutAs/hero/bottomleaves.webp"
            alt="Bottom Leaves Decoration"
            width={300}
            height={300}
            className="w-full h-auto object-contain transform scale-x-[-1]"
          />
        </div>

        {/* Ambient Top Pink Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[30vh] bg-gradient-to-b from-[#FFD6E5]/40 via-[#FFEBF2]/20 to-transparent blur-[80px] pointer-events-none z-0" />

        <div className="relative z-10 w-full px-[3.5vw] pt-[3vh] pb-[6vh]">

          {/* MAIN HERO SECTION */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-[2.5vw] items-center mb-[5vh]">

            {/* Left Column: Skyline & Stacked Polaroid Artwork with Soft Watercolor Aura */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center pt-[1vh] relative">

              {/* Soft Pink Watercolor Glow Aura Background (Smooth, Clean & Organic) */}
              <div
                className="absolute -top-[5vh] -left-[4vw] w-[40vw] h-[52vh] pointer-events-none z-0 transition-opacity duration-1000 ease-out"
                style={{ opacity: mounted ? 0.8 : 0 }}
              >
                {/* Soft Radial Ambient Pink Wash */}
                <div className="w-full h-full bg-radial from-[#FFC2D6]/60 via-[#FFDFE9]/40 to-transparent blur-3xl rounded-full transform -rotate-12 scale-110" />
                {/* Secondary Accent Wash */}
                <div className="absolute inset-[10%] bg-gradient-to-tr from-[#FFA8C5]/40 via-[#FFD0DF]/30 to-transparent blur-2xl rounded-full" />
              </div>

              <div className="relative z-10 w-full max-w-[32vw] flex flex-col items-center justify-center pt-[3vh] min-h-[46vh]">

                {/* 1. Floating Pink Sparkle / Diamond Star (Top Center-Left) */}
                <div
                  className="absolute top-[2vh] left-[11.5vw] z-40 pointer-events-none text-[#FF2D75] drop-shadow-md animate-pulse transition-all duration-700 ease-out"
                  style={{
                    opacity: mounted ? 1 : 0,
                    transform: mounted ? "scale(1)" : "scale(0.5)",
                    transitionDelay: "0.45s",
                  }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="w-[1.4vw] h-[1.4vw]">
                    <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 0 Z" fill="#FF2D75" />
                    <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" fill="#FF2D75" />
                  </svg>
                </div>

                {/* 2. Floating Pink Heart Outline Icon (Far Right Canvas) */}
                <div
                  className="absolute top-[8vh] -right-[2vw] z-40 pointer-events-none text-[#FF2D75] drop-shadow-md animate-bounce duration-1000 transition-all duration-700 ease-out"
                  style={{
                    opacity: mounted ? 1 : 0,
                    transform: mounted ? "scale(1)" : "scale(0.5)",
                    transitionDelay: "0.52s",
                  }}
                >
                  <Icon icon="lucide:heart" className="w-[2vw] h-[2vw] stroke-[2.5]" />
                </div>

                {/* 4. Floating Compass / Navigation Star Icon (Bottom Left Canvas) */}
                <div
                  className="absolute -bottom-[2vh] -left-[2.5vw] z-40 pointer-events-none text-[#FF2D75] drop-shadow-md transition-all duration-700 ease-out"
                  style={{
                    opacity: mounted ? 1 : 0,
                    transform: mounted ? "scale(1)" : "scale(0.5)",
                    transitionDelay: "0.58s",
                  }}
                >
                  <div className="w-[2.2vw] h-[2.2vw] rounded-full bg-white/90 p-[0.3vw] shadow-lg border border-pink-100 flex items-center justify-center">
                    <Icon icon="lucide:compass" className="w-[1.5vw] h-[1.5vw] text-[#FF2D75]" />
                  </div>
                </div>

                {/* 5. Floating Solid Pink Heart Icon (Bottom Right Canvas) */}
                <div
                  className="absolute -bottom-[4.5vh] right-[10vw] z-40 pointer-events-none text-[#FF2D75] drop-shadow-md transition-all duration-700 ease-out"
                  style={{
                    opacity: mounted ? 1 : 0,
                    transform: mounted ? "scale(1)" : "scale(0.5)",
                    transitionDelay: "0.64s",
                  }}
                >
                  <Icon icon="lucide:heart" className="w-[1.4vw] h-[1.4vw] fill-[#FF2D75] text-[#FF2D75]" />
                </div>

                {/* 6. Floating Camera Icon (Top Left Corner) */}
                <div
                  className="absolute -top-[3vh] -left-[2vw] z-40 pointer-events-none text-[#FF2D75] drop-shadow-md transition-all duration-700 ease-out"
                  style={{
                    opacity: mounted ? 1 : 0,
                    transform: mounted ? "scale(1) rotate(-12deg)" : "scale(0.5) rotate(-24deg)",
                    transitionDelay: "0.40s",
                  }}
                >
                  <div className="w-[2vw] h-[2vw] rounded-full bg-white/90 p-[0.3vw] shadow-lg border border-pink-100 flex items-center justify-center">
                    <Icon icon="lucide:camera" className="w-[1.3vw] h-[1.3vw] text-[#FF2D75]" />
                  </div>
                </div>

                {/* Main Center Card: Dubai Horizon Sunset (Slightly Tilted Left with White Border & Rounded Corners) */}
                <div
                  className="relative w-[28vw] h-[34vh] bg-white p-[0.6vw] rounded-[2vw] shadow-2xl transition-all duration-800 ease-out z-10 border border-pink-100/60"
                  style={{
                    opacity: mounted ? 1 : 0,
                    transform: mounted ? "rotate(-6deg) scale(1)" : "rotate(-10deg) scale(0.92)",
                    transitionDelay: "0.15s",
                  }}
                >
                  <div className="relative w-full h-full rounded-[1.5vw] overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80"
                      alt="Dubai Horizon Sunset"
                      fill
                      className="object-cover"
                      priority
                      unoptimized
                    />
                  </div>
                </div>

                {/* Polaroid 1: Abu Dhabi (Top Left Tilted Left with White Border) */}
                <div
                  className="absolute -top-[2vh] -left-[1vw] w-[13.5vw] bg-white p-[0.6vw] rounded-[1.2vw] shadow-2xl transition-all duration-800 ease-out z-20 border border-pink-100"
                  style={{
                    opacity: mounted ? 1 : 0,
                    transform: mounted ? "rotate(-12deg) translate3d(0, 0, 0)" : "rotate(-18deg) translate3d(-15px, -15px, 0)",
                    transitionDelay: "0.28s",
                  }}
                >
                  <div className="relative h-[15vh] rounded-[0.8vw] overflow-hidden mb-[0.6vh]">
                    <Image
                      src="https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=80"
                      alt="Abu Dhabi Grand Mosque"
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <div className="text-right pr-[0.4vw]">
                    <span className="font-script text-[1.3vw] font-bold text-[#FF2D75]">Abu Dhabi ♡</span>
                  </div>
                </div>

                {/* Polaroid 2: Dubai Desert Safari (Bottom Right Tilted Right with White Border) */}
                <div
                  className="absolute -bottom-[3vh] -right-[1vw] w-[14vw] bg-white p-[0.6vw] rounded-[1.2vw] shadow-2xl transition-all duration-800 ease-out z-30 border border-pink-100"
                  style={{
                    opacity: mounted ? 1 : 0,
                    transform: mounted ? "rotate(6deg) translate3d(0, 0, 0)" : "rotate(12deg) translate3d(15px, 15px, 0)",
                    transitionDelay: "0.38s",
                  }}
                >
                  <div className="relative h-[14vh] rounded-[0.8vw] overflow-hidden mb-[0.6vh]">
                    <Image
                      src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80"
                      alt="Dubai Desert Safari"
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <div className="text-right pr-[0.4vw]">
                    <span className="font-script text-[1.3vw] font-bold text-[#FF2D75]">Dubai ♡</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Right Column: Headline, Description & Contact Form Card */}
            <div className="lg:col-span-7 flex flex-col items-start pt-[1vh] relative">

              {/* Soft Pink Watercolor Glow Wash bleeding out under Contact Card */}
              <div
                className="absolute -bottom-[4vh] -right-[3vw] w-[28vw] h-[32vh] pointer-events-none z-0 transition-opacity duration-1000 ease-out"
                style={{ opacity: mounted ? 0.7 : 0 }}
              >
                <div className="w-full h-full bg-radial from-[#FFC2D6]/50 via-[#FFE4ED]/30 to-transparent blur-3xl rounded-full transform rotate-12 scale-105" />
              </div>

              {/* Main Headline */}
              <div
                className="relative mb-[1.5vh] w-full z-10 transition-all duration-700 ease-out"
                style={{
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? "translateX(0)" : "translateX(-24px)",
                  transitionDelay: "0.12s",
                }}
              >
                <h1 className="text-[3.5vw] font-extrabold text-slate-900 tracking-tight leading-tight">
                  <span className="font-script text-[3.8vw] text-slate-800 font-bold block sm:inline">Let's Plan Your </span>
                  <span className="font-script text-[4.5vw] font-bold text-[#FF2D75] inline-block transform -rotate-1 hover:rotate-0 transition-transform">
                    Journey
                  </span>
                </h1>
              </div>

              {/* Subtitle Description */}
              <p
                className="text-slate-600 text-[1.1vw] leading-relaxed max-w-[36vw] mb-[2.5vh] font-normal z-10 transition-all duration-700 ease-out"
                style={{
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? "translateY(0)" : "translateY(14px)",
                  transitionDelay: "0.22s",
                }}
              >
                Have questions, need help, or ready to book? We're here for you! Get in touch with our team and let's turn your travel dreams into reality.
              </p>

              {/* FORM CONTAINER CARD (Below the text on the right side) */}
              <div
                className="w-full bg-white/90 backdrop-blur-md rounded-[1.8vw] py-[1vw] px-[2vw] shadow-[0_1vw_2.5vw_rgba(255,45,117,0.06)] border border-pink-100/80 relative z-10 transition-all duration-800 ease-out"
                style={{
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? "translate3d(0, 0, 0)" : "translate3d(0, 24px, 0)",
                  transitionDelay: "0.32s",
                }}
              >

                {/* Form Header Badge & Aeroplane Stroke Image */}
                <div
                  className="flex items-center justify-between mb-[1vh] transition-all duration-600 ease-out"
                  style={{
                    opacity: mounted ? 1 : 0,
                    transform: mounted ? "translateY(0)" : "translateY(10px)",
                    transitionDelay: "0.42s",
                  }}
                >
                  <div className="flex items-center gap-[0.5vw] text-[0.8vw] font-bold tracking-wider text-[#FF2D75] uppercase">
                    <Icon icon="lucide:send" className="w-[1.1vw] h-[1.1vw] text-[#FF2D75]" />
                    <span>SEND US A MESSAGE</span>
                  </div>

                  {/* Aeroplane Stroke Image Asset inside Form */}
                  <div className="hidden sm:block w-[14vw] pointer-events-none -mt-[1.5vh] -mr-[0.5vw]">
                    <Image
                      src="/aboutAs/hero/areplanestroke.webp"
                      alt="Airplane Flight Path"
                      width={320}
                      height={140}
                      className="w-full h-auto object-contain"
                    />
                  </div>
                </div>

                {/* Form Title in Cursive Script */}
                <h2
                  className="font-script text-[2.5vw] font-bold text-slate-900 mt-[-1vw] mb-[0.9vh] transition-all duration-600 ease-out"
                  style={{
                    opacity: mounted ? 1 : 0,
                    transform: mounted ? "translateX(0)" : "translateX(-15px)",
                    transitionDelay: "0.48s",
                  }}
                >
                  Get in Touch
                </h2>

                {submitted ? (
                  <div className="p-[1.5vw] rounded-[1.2vw] bg-pink-50 border border-pink-200 text-center animate-fade-in">
                    <div className="w-[3vw] h-[3vw] rounded-full bg-[#FF2D75] text-white flex items-center justify-center mx-auto mb-[1vh] shadow-md">
                      <Icon icon="lucide:check" className="w-[1.5vw] h-[1.5vw]" />
                    </div>
                    <h3 className="font-bold text-slate-900 text-[1.2vw] mb-[0.3vh]">Message Sent Successfully!</h3>
                    <p className="text-[0.9vw] text-slate-600">
                      Thank you for reaching out. Our travel concierges will contact you shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} suppressHydrationWarning className="space-y-[1.5vh]">

                    {/* Row 1: Full Name & Email Address */}
                    <div
                      className="grid grid-cols-1 sm:grid-cols-2 gap-[1.2vw] transition-all duration-600 ease-out"
                      style={{
                        opacity: mounted ? 1 : 0,
                        transform: mounted ? "translateY(0)" : "translateY(12px)",
                        transitionDelay: "0.54s",
                      }}
                    >
                      <div>
                        <label className="block text-[0.85vw] font-bold text-slate-700 mb-[0.5vh]">
                          Full Name <span className="text-[#FF2D75]">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-[0.8vw] flex items-center pointer-events-none text-slate-400">
                            <Icon icon="lucide:user" className="w-[1vw] h-[1vw]" />
                          </div>
                          <input
                            type="text"
                            required
                            suppressHydrationWarning
                            placeholder="Your full name"
                            value={formData.fullName}
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                            className="w-full pl-[2.4vw] pr-[1vw] py-[0.7vw] bg-white border border-pink-100 rounded-[0.8vw] text-[0.9vw] text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#FF2D75] focus:ring-2 focus:ring-pink-100 transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[0.85vw] font-bold text-slate-700 mb-[0.5vh]">
                          Email Address <span className="text-[#FF2D75]">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-[0.8vw] flex items-center pointer-events-none text-slate-400">
                            <Icon icon="lucide:mail" className="w-[1vw] h-[1vw]" />
                          </div>
                          <input
                            type="email"
                            required
                            suppressHydrationWarning
                            placeholder="your@email.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full pl-[2.4vw] pr-[1vw] py-[0.7vw] bg-white border border-pink-100 rounded-[0.8vw] text-[0.9vw] text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#FF2D75] focus:ring-2 focus:ring-pink-100 transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Row 2: Phone Number & Destination */}
                    <div
                      className="grid grid-cols-1 sm:grid-cols-2 gap-[1.2vw] transition-all duration-600 ease-out"
                      style={{
                        opacity: mounted ? 1 : 0,
                        transform: mounted ? "translateY(0)" : "translateY(12px)",
                        transitionDelay: "0.60s",
                      }}
                    >
                      <div>
                        <label className="block text-[0.85vw] font-bold text-slate-700 mb-[0.5vh]">
                          Phone Number <span className="text-[#FF2D75]">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-[0.8vw] flex items-center pointer-events-none text-slate-400">
                            <Icon icon="lucide:phone" className="w-[1vw] h-[1vw]" />
                          </div>
                          <input
                            type="tel"
                            required
                            suppressHydrationWarning
                            placeholder="+91 98765 43210"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full pl-[2.4vw] pr-[1vw] py-[0.7vw] bg-white border border-pink-100 rounded-[0.8vw] text-[0.9vw] text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#FF2D75] focus:ring-2 focus:ring-pink-100 transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[0.85vw] font-bold text-slate-700 mb-[0.5vh]">
                          Destination
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-[0.8vw] flex items-center pointer-events-none text-slate-400">
                            <Icon icon="lucide:compass" className="w-[1vw] h-[1vw]" />
                          </div>
                          <input
                            type="text"
                            suppressHydrationWarning
                            placeholder="e.g. Dubai, Thailand, Europe"
                            value={formData.destination}
                            onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                            className="w-full pl-[2.4vw] pr-[1vw] py-[0.7vw] bg-white border border-pink-100 rounded-[0.8vw] text-[0.9vw] text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#FF2D75] focus:ring-2 focus:ring-pink-100 transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Travel Dates with Custom Interactive Pink Range Calendar */}
                    <div
                      className="relative transition-all duration-600 ease-out"
                      ref={datePickerRef}
                      style={{
                        opacity: mounted ? 1 : 0,
                        transform: mounted ? "translateY(0)" : "translateY(12px)",
                        transitionDelay: "0.66s",
                      }}
                    >
                      <label className="block text-[0.85vw] font-bold text-slate-700 mb-[0.5vh]">
                        Travel Dates
                      </label>
                      <div
                        onClick={() => setShowDatePicker(!showDatePicker)}
                        className="relative cursor-pointer"
                      >
                        <div className="absolute inset-y-0 left-0 pl-[0.8vw] flex items-center pointer-events-none text-slate-400">
                          <Icon icon="lucide:calendar" className="w-[1vw] h-[1vw] text-[#FF2D75]" />
                        </div>
                        <input
                          type="text"
                          readOnly
                          suppressHydrationWarning
                          placeholder="Select travel dates"
                          value={formData.travelDates}
                          className="w-full pl-[2.4vw] pr-[2.4vw] py-[0.7vw] bg-white border border-pink-200 rounded-[0.8vw] text-[0.9vw] text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#FF2D75] focus:ring-2 focus:ring-pink-100 transition-all cursor-pointer select-none"
                        />
                        <div className="absolute inset-y-0 right-0 pr-[0.8vw] flex items-center pointer-events-none text-[#FF2D75]">
                          <Icon icon="lucide:calendar-days" className="w-[1vw] h-[1vw]" />
                        </div>
                      </div>

                      {/* Custom Interactive Pink Calendar Popover */}
                      {showDatePicker && (
                        <div className="absolute bottom-full mb-[0.8vh] left-0 right-0 sm:right-auto sm:w-[26vw] bg-white/95 backdrop-blur-xl rounded-[1.6vw] p-[1.4vw] shadow-[0_1.5vw_4vw_rgba(255,45,117,0.18)] border border-pink-200/80 z-50 animate-fade-in select-none">

                          {/* Calendar Header: Month + Navigation */}
                          <div className="flex items-center justify-between mb-[1.2vh] px-[0.2vw]">
                            <button
                              type="button"
                              suppressHydrationWarning
                              onClick={prevMonth}
                              className="w-[2.2vw] h-[2.2vw] rounded-full bg-pink-50 hover:bg-[#FF2D75] hover:text-white flex items-center justify-center text-slate-600 transition-all duration-200 shadow-sm hover:scale-110 active:scale-95 cursor-pointer"
                            >
                              <Icon icon="lucide:chevron-left" className="w-[1.1vw] h-[1.1vw]" />
                            </button>

                            <span className="font-extrabold text-[1.1vw] text-slate-900 tracking-tight flex items-center gap-[0.3vw]">
                              <span>{monthNames[month]}</span>
                              <span className="text-[#FF2D75]">{year}</span>
                            </span>

                            <button
                              type="button"
                              suppressHydrationWarning
                              onClick={nextMonth}
                              className="w-[2.2vw] h-[2.2vw] rounded-full bg-pink-50 hover:bg-[#FF2D75] hover:text-white flex items-center justify-center text-slate-600 transition-all duration-200 shadow-sm hover:scale-110 active:scale-95 cursor-pointer"
                            >
                              <Icon icon="lucide:chevron-right" className="w-[1.1vw] h-[1.1vw]" />
                            </button>
                          </div>

                          {/* Days of Week Row */}
                          <div className="grid grid-cols-7 text-center mb-[0.8vh]">
                            {["SU", "MO", "TU", "WE", "TH", "FR", "SA"].map((day, idx) => (
                              <span key={idx} className="text-[0.75vw] font-black tracking-wider text-pink-400 uppercase py-[0.3vh]">
                                {day}
                              </span>
                            ))}
                          </div>

                          {/* Calendar Days Grid */}
                          <div className="grid grid-cols-7 gap-[0.3vw] text-center">
                            {/* Empty slots before day 1 */}
                            {Array.from({ length: firstDayOfWeek }).map((_, idx) => (
                              <div key={`empty-${idx}`} className="w-[2.6vw] h-[2.6vw]" />
                            ))}

                            {/* Days of current month */}
                            {Array.from({ length: daysInMonth }).map((_, idx) => {
                              const dayNum = idx + 1;
                              const date = new Date(year, month, dayNum);
                              const disabled = isBeforeToday(date);
                              const isSelected = isDateSelected(date);
                              const isCurrentToday = isSameDay(date, today);

                              return (
                                <button
                                  key={dayNum}
                                  type="button"
                                  suppressHydrationWarning
                                  disabled={disabled}
                                  onClick={() => handleDateClick(dayNum)}
                                  className={`
                                    w-[2.6vw] h-[2.6vw] mx-auto rounded-full flex items-center justify-center text-[0.9vw] transition-all duration-200 cursor-pointer relative
                                    ${disabled ? "text-slate-300 cursor-not-allowed opacity-30 select-none" : ""}
                                    ${isSelected ? "bg-gradient-to-br from-[#FF2D75] to-[#FF5E97] text-white font-black shadow-[0_0.4vw_1vw_rgba(255,45,117,0.35)] scale-105 ring-2 ring-pink-100" : ""}
                                    ${isCurrentToday && !isSelected ? "border-2 border-[#FF2D75] text-[#FF2D75] font-black bg-pink-50/50" : ""}
                                    ${!disabled && !isSelected ? "hover:bg-pink-100 hover:text-[#FF2D75] text-slate-700 font-bold hover:scale-105" : ""}
                                  `}
                                >
                                  {dayNum}
                                </button>
                              );
                            })}
                          </div>

                          {/* Footer Info & Action */}
                          <div className="mt-[1.2vh] pt-[0.8vh] border-t border-pink-100/80 flex items-center justify-between text-[0.8vw]">
                            <div className="flex items-center gap-[0.5vw]">
                              <span className="font-bold text-slate-600">
                                {selectedDates.length === 0
                                    ? "Select dates"
                                    : `${selectedDates.length} date${selectedDates.length > 1 ? "s" : ""} selected`}
                              </span>
                              {selectedDates.length > 0 && (
                                <button
                                  type="button"
                                  suppressHydrationWarning
                                  onClick={() => {
                                    setSelectedDates([]);
                                    setFormData((prev) => ({ ...prev, travelDates: "" }));
                                  }}
                                  className="text-[0.75vw] text-[#FF2D75] font-extrabold hover:underline ml-[0.3vw]"
                                >
                                  Clear
                                </button>
                              )}
                            </div>
                            <button
                              type="button"
                              suppressHydrationWarning
                              onClick={() => {
                                setShowDatePicker(false);
                              }}
                              className="px-[1.2vw] py-[0.4vw] bg-gradient-to-r from-[#FF2D75] to-[#FF5E97] hover:from-[#e62066] hover:to-[#ff4785] text-white font-black text-[0.85vw] rounded-full shadow-[0_0.3vw_1vw_rgba(255,45,117,0.3)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
                            >
                              Done
                            </button>
                          </div>

                        </div>
                      )}
                    </div>

                    {/* Message */}
                    <div
                      className="transition-all duration-600 ease-out"
                      style={{
                        opacity: mounted ? 1 : 0,
                        transform: mounted ? "translateY(0)" : "translateY(12px)",
                        transitionDelay: "0.72s",
                      }}
                    >
                      <label className="block text-[0.85vw] font-bold text-slate-700 mb-[0.5vh]">
                        Message <span className="text-[#FF2D75]">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute top-[0.8vw] left-[0.8vw] flex items-start pointer-events-none text-slate-400">
                          <Icon icon="lucide:message-square" className="w-[1vw] h-[1vw]" />
                        </div>
                        <textarea
                          rows={4}
                          required
                          suppressHydrationWarning
                          placeholder="Tell us about your travel plans, questions or special requests..."
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="w-full pl-[2.4vw] pr-[1vw] py-[0.7vw] bg-white border border-pink-100 rounded-[0.8vw] text-[0.9vw] text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#FF2D75] focus:ring-2 focus:ring-pink-100 transition-all resize-none"
                        />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div
                      className="pt-[1vh] transition-all duration-600 ease-out"
                      style={{
                        opacity: mounted ? 1 : 0,
                        transform: mounted ? "translateY(0) scale(1)" : "translateY(12px) scale(0.96)",
                        transitionDelay: "0.78s",
                      }}
                    >
                      <button
                        type="submit"
                        suppressHydrationWarning
                        className="w-full sm:w-auto px-[2vw] py-[0.75vw] bg-gradient-to-r from-[#FF2D75] to-[#FF5E97] hover:from-[#e62066] hover:to-[#ff4785] text-white font-bold text-[0.95vw] rounded-full shadow-[0_0.5vw_1.5vw_rgba(255,45,117,0.3)] hover:shadow-[0_0.8vw_2vw_rgba(255,45,117,0.4)] transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-[0.5vw] cursor-pointer"
                      >
                        <Icon icon="lucide:send" className="w-[1vw] h-[1vw]" />
                        <span>Send Message</span>
                        <Icon icon="lucide:arrow-right" className="w-[1vw] h-[1vw]" />
                      </button>
                    </div>

                  </form>
                )}

              </div>

            </div>

          </div>

          {/* OUR OFFICES SECTION (Matching Uploaded Reference Design) */}
          <div ref={secOffices.ref} className="relative pt-[4vh] pb-[6vh]">

            {/* Left Flower Petal Accent Asset - Kept static without wave animation per user instruction */}
            <div
              className="absolute -top-[18vh] -left-[4vw] w-[14vw] h-auto pointer-events-none z-0 transition-opacity duration-1000 ease-out"
              style={{
                opacity: secOffices.isVisible ? 0.9 : 0,
                transitionDelay: "0.1s",
              }}
            >
              <Image
                src="/contact as/flower.webp"
                alt="Pink Flower Petal Accent"
                width={300}
                height={300}
                className="w-full h-auto object-contain transform -rotate-12"
                unoptimized
              />
            </div>

            {/* Header Title & Subtitle */}
            <div className="text-center mb-[4vh] relative z-10">
              <h2
                className="font-script text-[4vw] font-bold leading-none mb-[1vh] relative inline-block transition-all duration-700 ease-out"
                style={{
                  opacity: secOffices.isVisible ? 1 : 0,
                  transform: secOffices.isVisible ? "translate3d(0, 0, 0)" : "translate3d(0, 20px, 0)",
                  transitionDelay: "0.1s",
                }}
              >
                <span className="text-[#FF2D75]">Our Offices </span>
                <span className="text-slate-900">Around the World</span>
              </h2>
              <p
                className="text-[0.95vw] text-slate-500 font-medium max-w-[32vw] mx-auto leading-relaxed transition-all duration-700 ease-out"
                style={{
                  opacity: secOffices.isVisible ? 1 : 0,
                  transform: secOffices.isVisible ? "translate3d(0, 0, 0)" : "translate3d(0, 16px, 0)",
                  transitionDelay: "0.2s",
                }}
              >
                Six global locations. One mission — to bring your travel dreams closer to you. Visit us, get in touch, or drop by anytime!
              </p>
            </div>

            {/* 6 OFFICES CARDS GRID (Exact Reference Card Design with Staggered One-By-One Animations) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[2vw] relative z-10">

              {/* Card 1: Address (India) */}
              <div
                className="relative bg-white/90 backdrop-blur-md rounded-[2vw] p-[2vw] border border-pink-200/80 shadow-[0_0.8vw_2.5vw_rgba(255,45,117,0.06)] hover:shadow-xl hover:border-pink-300 transition-all duration-700 ease-out overflow-hidden flex flex-col justify-between min-h-[26vh]"
                style={{
                  opacity: secOffices.isVisible ? 1 : 0,
                  transform: secOffices.isVisible ? "translate3d(0, 0, 0)" : "translate3d(0, 30px, 0)",
                  transitionDelay: "0.2s",
                }}
              >
                
                {/* Landmark Illustration Background (Taj Mahal & India Gate) */}
                <div className="absolute bottom-0 right-0 w-[24vw] h-[26vh] pointer-events-none opacity-90 mix-blend-multiply flex items-end justify-end overflow-hidden">
                  <Image
                    src="/contact as/india.webp"
                    alt="Taj Mahal India Gate Skyline"
                    fill
                    className="object-contain object-bottom-right transform scale-110 origin-bottom-right opacity-90 mix-blend-multiply [mask-image:linear-gradient(to_right,transparent_0%,black_35%)]"
                    unoptimized
                  />
                </div>

                <div className="flex items-start justify-between mb-[1.5vh] relative z-10">
                  <div>
                    <h3 className="font-script text-[2.2vw] font-bold text-slate-900 leading-tight">Address</h3>
                    <div className="flex items-center gap-[0.3vw] text-[#FF2D75] font-bold text-[0.95vw]">
                      <Icon icon="lucide:map-pin" className="w-[0.9vw] h-[0.9vw]" />
                      <span>India</span>
                    </div>
                  </div>
                  <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="px-[1vw] py-[0.5vw] rounded-full border border-pink-200 hover:border-[#FF2D75] bg-white text-[#FF2D75] text-[0.8vw] font-bold flex items-center gap-[0.4vw] hover:bg-pink-50 transition-all shadow-sm">
                    <Icon icon="lucide:map-pin" className="w-[0.8vw] h-[0.8vw]" />
                    <span>View on Map →</span>
                  </a>
                </div>

                <div className="space-y-[0.6vh] text-[0.85vw] text-slate-600 relative z-10">
                  <p className="font-medium max-w-[20vw] leading-snug">
                    151,2A shop No 121 camp road, Selaiyur Chennai - 600073, Tamilnadu.
                  </p>
                  <div className="flex items-center gap-[0.5vw] text-slate-700 pt-[0.4vh]">
                    <Icon icon="lucide:phone" className="w-[0.9vw] h-[0.9vw] text-[#FF2D75]" />
                    <span>+91 98765 43210</span>
                  </div>
                  <div className="flex items-center gap-[0.5vw] text-slate-700">
                    <Icon icon="lucide:mail" className="w-[0.9vw] h-[0.9vw] text-[#FF2D75]" />
                    <span>india@tourvista.com</span>
                  </div>
                </div>

              </div>

              {/* Card 2: Head Office (New York, USA) */}
              <div
                className="relative bg-white/90 backdrop-blur-md rounded-[2vw] p-[2vw] border border-pink-200/80 shadow-[0_0.8vw_2.5vw_rgba(255,45,117,0.06)] hover:shadow-xl hover:border-pink-300 transition-all duration-700 ease-out overflow-hidden flex flex-col justify-between min-h-[26vh]"
                style={{
                  opacity: secOffices.isVisible ? 1 : 0,
                  transform: secOffices.isVisible ? "translate3d(0, 0, 0)" : "translate3d(0, 30px, 0)",
                  transitionDelay: "0.32s",
                }}
              >

                {/* Landmark Illustration Background (Statue of Liberty & Skyline) */}
                <div className="absolute bottom-0 right-0 w-[24vw] h-[26vh] pointer-events-none opacity-90 mix-blend-multiply flex items-end justify-end overflow-hidden">
                  <Image
                    src="/contact as/head.webp"
                    alt="Statue of Liberty Skyline"
                    fill
                    className="object-contain object-bottom-right transform scale-110 origin-bottom-right opacity-90 mix-blend-multiply [mask-image:linear-gradient(to_right,transparent_0%,black_35%)]"
                    unoptimized
                  />
                </div>

                <div className="flex items-start justify-between mb-[1.5vh] relative z-10">
                  <div>
                    <h3 className="font-script text-[2.2vw] font-bold text-slate-900 leading-tight">Head Office</h3>
                    <div className="flex items-center gap-[0.3vw] text-[#FF2D75] font-bold text-[0.95vw]">
                      <Icon icon="lucide:map-pin" className="w-[0.9vw] h-[0.9vw]" />
                      <span>New York, USA</span>
                    </div>
                  </div>
                  <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="px-[1vw] py-[0.5vw] rounded-full border border-pink-200 hover:border-[#FF2D75] bg-white text-[#FF2D75] text-[0.8vw] font-bold flex items-center gap-[0.4vw] hover:bg-pink-50 transition-all shadow-sm">
                    <Icon icon="lucide:map-pin" className="w-[0.8vw] h-[0.8vw]" />
                    <span>View on Map →</span>
                  </a>
                </div>

                <div className="space-y-[0.6vh] text-[0.85vw] text-slate-600 relative z-10">
                  <p className="font-medium max-w-[18vw] leading-snug">
                    350 Madison Ave, 12th Floor, New York, NY 10017, United States
                  </p>
                  <div className="flex items-center gap-[0.5vw] text-slate-700 pt-[0.4vh]">
                    <Icon icon="lucide:phone" className="w-[0.9vw] h-[0.9vw] text-[#FF2D75]" />
                    <span>+1 212 555 0187</span>
                  </div>
                  <div className="flex items-center gap-[0.5vw] text-slate-700">
                    <Icon icon="lucide:mail" className="w-[0.9vw] h-[0.9vw] text-[#FF2D75]" />
                    <span>hello@tourvista.com</span>
                  </div>
                </div>

              </div>

              {/* Card 3: London Office */}
              <div
                className="relative bg-white/90 backdrop-blur-md rounded-[2vw] p-[2vw] border border-pink-200/80 shadow-[0_0.8vw_2.5vw_rgba(255,45,117,0.06)] hover:shadow-xl hover:border-pink-300 transition-all duration-700 ease-out overflow-hidden flex flex-col justify-between min-h-[26vh]"
                style={{
                  opacity: secOffices.isVisible ? 1 : 0,
                  transform: secOffices.isVisible ? "translate3d(0, 0, 0)" : "translate3d(0, 30px, 0)",
                  transitionDelay: "0.44s",
                }}
              >

                {/* Landmark Illustration Background (Big Ben & London Skyline) */}
                <div className="absolute bottom-0 right-0 w-[24vw] h-[26vh] pointer-events-none opacity-90 mix-blend-multiply flex items-end justify-end overflow-hidden">
                  <Image
                    src="/contact as/london.webp"
                    alt="Big Ben London Skyline"
                    fill
                    className="object-contain object-bottom-right transform scale-110 origin-bottom-right opacity-90 mix-blend-multiply [mask-image:linear-gradient(to_right,transparent_0%,black_35%)]"
                    unoptimized
                  />
                </div>

                <div className="flex items-start justify-between mb-[1.5vh] relative z-10">
                  <div>
                    <h3 className="font-script text-[2.2vw] font-bold text-slate-900 leading-tight">London Office</h3>
                    <div className="flex items-center gap-[0.3vw] text-[#FF2D75] font-bold text-[0.95vw]">
                      <Icon icon="lucide:map-pin" className="w-[0.9vw] h-[0.9vw]" />
                      <span>London, UK</span>
                    </div>
                  </div>
                  <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="px-[1vw] py-[0.5vw] rounded-full border border-pink-200 hover:border-[#FF2D75] bg-white text-[#FF2D75] text-[0.8vw] font-bold flex items-center gap-[0.4vw] hover:bg-pink-50 transition-all shadow-sm">
                    <Icon icon="lucide:map-pin" className="w-[0.8vw] h-[0.8vw]" />
                    <span>View on Map →</span>
                  </a>
                </div>

                <div className="space-y-[0.6vh] text-[0.85vw] text-slate-600 relative z-10">
                  <p className="font-medium max-w-[18vw] leading-snug">
                    71-75 Shelton Street, Covent Garden, London WC2H 9JQ, United Kingdom
                  </p>
                  <div className="flex items-center gap-[0.5vw] text-slate-700 pt-[0.4vh]">
                    <Icon icon="lucide:phone" className="w-[0.9vw] h-[0.9vw] text-[#FF2D75]" />
                    <span>+44 20 7123 4567</span>
                  </div>
                  <div className="flex items-center gap-[0.5vw] text-slate-700">
                    <Icon icon="lucide:mail" className="w-[0.9vw] h-[0.9vw] text-[#FF2D75]" />
                    <span>london@tourvista.com</span>
                  </div>
                </div>

              </div>

              {/* Card 4: Asia Pacific Office (Singapore) */}
              <div
                className="relative bg-white/90 backdrop-blur-md rounded-[2vw] p-[2vw] border border-pink-200/80 shadow-[0_0.8vw_2.5vw_rgba(255,45,117,0.06)] hover:shadow-xl hover:border-pink-300 transition-all duration-700 ease-out overflow-hidden flex flex-col justify-between min-h-[26vh]"
                style={{
                  opacity: secOffices.isVisible ? 1 : 0,
                  transform: secOffices.isVisible ? "translate3d(0, 0, 0)" : "translate3d(0, 30px, 0)",
                  transitionDelay: "0.56s",
                }}
              >

                {/* Landmark Illustration Background (Marina Bay Sands Singapore) */}
                <div className="absolute bottom-0 right-0 w-[24vw] h-[26vh] pointer-events-none opacity-90 mix-blend-multiply flex items-end justify-end overflow-hidden">
                  <Image
                    src="/contact as/singapore.webp"
                    alt="Marina Bay Sands Singapore"
                    fill
                    className="object-contain object-bottom-right transform scale-110 origin-bottom-right opacity-90 mix-blend-multiply [mask-image:linear-gradient(to_right,transparent_0%,black_35%)]"
                    unoptimized
                  />
                </div>

                <div className="flex items-start justify-between mb-[1.5vh] relative z-10">
                  <div>
                    <h3 className="font-script text-[2.2vw] font-bold text-slate-900 leading-tight">Asia Pacific Office</h3>
                    <div className="flex items-center gap-[0.3vw] text-[#FF2D75] font-bold text-[0.95vw]">
                      <Icon icon="lucide:map-pin" className="w-[0.9vw] h-[0.9vw]" />
                      <span>Singapore</span>
                    </div>
                  </div>
                  <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="px-[1vw] py-[0.5vw] rounded-full border border-pink-200 hover:border-[#FF2D75] bg-white text-[#FF2D75] text-[0.8vw] font-bold flex items-center gap-[0.4vw] hover:bg-pink-50 transition-all shadow-sm">
                    <Icon icon="lucide:map-pin" className="w-[0.8vw] h-[0.8vw]" />
                    <span>View on Map →</span>
                  </a>
                </div>

                <div className="space-y-[0.6vh] text-[0.85vw] text-slate-600 relative z-10">
                  <p className="font-medium max-w-[18vw] leading-snug">
                    8 Marina Boulevard, #12-01 Marina Bay Financial Centre, Singapore 018981
                  </p>
                  <div className="flex items-center gap-[0.5vw] text-slate-700 pt-[0.4vh]">
                    <Icon icon="lucide:phone" className="w-[0.9vw] h-[0.9vw] text-[#FF2D75]" />
                    <span>+65 6812 3456</span>
                  </div>
                  <div className="flex items-center gap-[0.5vw] text-slate-700">
                    <Icon icon="lucide:mail" className="w-[0.9vw] h-[0.9vw] text-[#FF2D75]" />
                    <span>singapore@tourvista.com</span>
                  </div>
                </div>

              </div>

              {/* Card 5: Middle East Office (Dubai, UAE) */}
              <div
                className="relative bg-white/90 backdrop-blur-md rounded-[2vw] p-[2vw] border border-pink-200/80 shadow-[0_0.8vw_2.5vw_rgba(255,45,117,0.06)] hover:shadow-xl hover:border-pink-300 transition-all duration-700 ease-out overflow-hidden flex flex-col justify-between min-h-[26vh]"
                style={{
                  opacity: secOffices.isVisible ? 1 : 0,
                  transform: secOffices.isVisible ? "translate3d(0, 0, 0)" : "translate3d(0, 30px, 0)",
                  transitionDelay: "0.68s",
                }}
              >

                {/* Landmark Illustration Background (Burj Khalifa Dubai Skyline) */}
                <div className="absolute bottom-0 right-0 w-[24vw] h-[26vh] pointer-events-none opacity-90 mix-blend-multiply flex items-end justify-end overflow-hidden">
                  <Image
                    src="/contact as/dubai.webp"
                    alt="Burj Khalifa Dubai Skyline"
                    fill
                    className="object-contain object-bottom-right transform scale-110 origin-bottom-right opacity-90 mix-blend-multiply [mask-image:linear-gradient(to_right,transparent_0%,black_35%)]"
                    unoptimized
                  />
                </div>

                <div className="flex items-start justify-between mb-[1.5vh] relative z-10">
                  <div>
                    <h3 className="font-script text-[2.2vw] font-bold text-slate-900 leading-tight">Middle East Office</h3>
                    <div className="flex items-center gap-[0.3vw] text-[#FF2D75] font-bold text-[0.95vw]">
                      <Icon icon="lucide:map-pin" className="w-[0.9vw] h-[0.9vw]" />
                      <span>Dubai, UAE</span>
                    </div>
                  </div>
                  <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="px-[1vw] py-[0.5vw] rounded-full border border-pink-200 hover:border-[#FF2D75] bg-white text-[#FF2D75] text-[0.8vw] font-bold flex items-center gap-[0.4vw] hover:bg-pink-50 transition-all shadow-sm">
                    <Icon icon="lucide:map-pin" className="w-[0.8vw] h-[0.8vw]" />
                    <span>View on Map →</span>
                  </a>
                </div>

                <div className="space-y-[0.6vh] text-[0.85vw] text-slate-600 relative z-10">
                  <p className="font-medium max-w-[18vw] leading-snug">
                    Level 24, The Prism Tower, Business Bay, Dubai 334035, United Arab Emirates
                  </p>
                  <div className="flex items-center gap-[0.5vw] text-slate-700 pt-[0.4vh]">
                    <Icon icon="lucide:phone" className="w-[0.9vw] h-[0.9vw] text-[#FF2D75]" />
                    <span>+971 4 567 8910</span>
                  </div>
                  <div className="flex items-center gap-[0.5vw] text-slate-700">
                    <Icon icon="lucide:mail" className="w-[0.9vw] h-[0.9vw] text-[#FF2D75]" />
                    <span>dubai@tourvista.com</span>
                  </div>
                </div>

              </div>

              {/* Card 6: Quick Contact / Need Assistance (Full Height Covering Layout) */}
              <div
                className="relative bg-white/95 backdrop-blur-md rounded-[2vw] p-[2vw] border border-pink-200/80 shadow-[0_0.8vw_2.5vw_rgba(255,45,117,0.06)] hover:shadow-xl hover:border-pink-300 transition-all duration-700 ease-out overflow-hidden flex flex-col justify-between min-h-[26vh]"
                style={{
                  opacity: secOffices.isVisible ? 1 : 0,
                  transform: secOffices.isVisible ? "translate3d(0, 0, 0)" : "translate3d(0, 30px, 0)",
                  transitionDelay: "0.80s",
                }}
              >
                
                {/* Soft Gradient Backdrop Accent */}
                <div className="absolute top-0 right-0 w-[15vw] h-[15vw] bg-radial from-pink-100/50 via-transparent to-transparent pointer-events-none rounded-full blur-2xl -mr-[4vw] -mt-[4vw]" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-[1.5vw] w-full h-full items-stretch relative z-10">
                  
                  {/* Left Column: Heading & Subtitle */}
                  <div className="flex flex-col justify-between">
                    <div>
                      {/* Header Badge */}
                      <div className="flex items-center gap-[0.4vw] text-[0.85vw] font-extrabold tracking-wider text-[#FF2D75] uppercase mb-[0.8vh]">
                        <div className="w-[1.8vw] h-[1.8vw] rounded-full bg-pink-100 flex items-center justify-center text-[#FF2D75]">
                          <Icon icon="lucide:contact-2" className="w-[0.9vw] h-[0.9vw]" />
                        </div>
                        <span className="border-b-2 border-[#FF2D75] pb-[0.1vh]">QUICK CONTACT</span>
                      </div>

                      {/* Headline */}
                      <h3 className="font-script text-[2.4vw] font-bold text-slate-900 leading-tight mb-[0.6vh]">
                        Need Assistance?
                      </h3>
                    </div>

                    {/* Subtitle */}
                    <p className="text-[0.85vw] text-slate-600 font-medium leading-relaxed">
                      For urgent product enquiries or quotation requirements, contact our team directly.
                    </p>
                  </div>

                  {/* Right Column: Contact Links Stack (Spread Evenly) */}
                  <div className="flex flex-col justify-between text-[0.85vw] sm:border-l sm:border-pink-100 sm:pl-[1.5vw] py-[0.2vh]">
                    
                    {/* Phone Numbers */}
                    <div className="flex items-center gap-[0.8vw]">
                      <div className="w-[2vw] h-[2vw] rounded-full bg-[#FF2D75] text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                        <Icon icon="lucide:phone-call" className="w-[0.9vw] h-[0.9vw]" />
                      </div>
                      <div className="flex flex-col text-slate-800 font-bold text-[0.85vw] leading-tight">
                        <span>+91 98422 04966</span>
                        <span>+91 88830 11166</span>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="flex items-center gap-[0.8vw]">
                      <div className="w-[2vw] h-[2vw] rounded-full bg-[#FF2D75] text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                        <Icon icon="lucide:mail" className="w-[0.9vw] h-[0.9vw]" />
                      </div>
                      <span className="text-slate-800 font-bold text-[0.82vw] truncate">
                        mathuramindia@gmail.com
                      </span>
                    </div>

                    {/* Whatsapp Enquiry Button */}
                    <a
                      href="https://wa.me/919842204966"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-[0.6vw] text-[#25D366] hover:text-[#1eb854] font-extrabold text-[0.9vw] transition-colors group cursor-pointer"
                    >
                      <div className="w-[2vw] h-[2vw] rounded-full bg-[#25D366] text-white flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-110 transition-transform">
                        <Icon icon="lucide:message-circle" className="w-[1vw] h-[1vw]" />
                      </div>
                      <span>Whatsapp Enquiry →</span>
                    </a>

                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* BOTTOM BANNER: READY TO EXPLORE? (Slides from right, contents fade in one by one) */}
          <div
            ref={secBanner.ref}
            className="relative rounded-[2vw] overflow-hidden p-[3.5vw] text-center border border-pink-200/60 shadow-[0_1vw_3vw_rgba(255,45,117,0.08)] transition-all duration-800 ease-out"
            style={{
              opacity: secBanner.isVisible ? 1 : 0,
              transform: secBanner.isVisible ? "translate3d(0, 0, 0)" : "translate3d(50px, 0, 0)",
            }}
          >

            {/* High-Resolution Generated Background Image with Pale Pink Backdrop & #FF2D75 Silhouettes */}
            <Image
              src="/explore_banner_bg_v3.webp"
              alt="Ready to Explore Travel Silhouette Background"
              fill
              className="object-cover object-center pointer-events-none z-0"
              unoptimized
            />

            {/* Dotted Grid Pattern Overlay for Authentic Texture */}
            <div
              className="absolute inset-0 opacity-20 pointer-events-none z-0"
              style={{
                backgroundImage: 'radial-gradient(#FF2D75 1.2px, transparent 1.2px)',
                backgroundSize: '1.2vw 1.2vw'
              }}
            />

            {/* Center Content */}
            <div className="relative z-10 max-w-[40vw] mx-auto flex flex-col items-center">

              {/* Script Title with Decorative Sparkles */}
              <h2
                className="font-script text-[3.4vw] font-bold text-slate-900 mb-[0.5vh] flex items-center justify-center gap-[0.5vw] transition-all duration-600 ease-out"
                style={{
                  opacity: secBanner.isVisible ? 1 : 0,
                  transform: secBanner.isVisible ? "translate3d(0, 0, 0)" : "translate3d(0, 16px, 0)",
                  transitionDelay: "0.2s",
                }}
              >
                <span className="text-[#FF2D75] text-[2.5vw]">✨</span>
                <span>Ready to explore?</span>
                <span className="text-[#FF2D75] text-[2.5vw]">✨</span>
              </h2>

              <p
                className="text-[1vw] text-slate-700 font-semibold mb-[2vh] transition-all duration-600 ease-out"
                style={{
                  opacity: secBanner.isVisible ? 1 : 0,
                  transform: secBanner.isVisible ? "translate3d(0, 0, 0)" : "translate3d(0, 14px, 0)",
                  transitionDelay: "0.35s",
                }}
              >
                Your next adventure is just a message away.
              </p>

              {/* Start Your Journey Button */}
              <div
                className="transition-all duration-600 ease-out"
                style={{
                  opacity: secBanner.isVisible ? 1 : 0,
                  transform: secBanner.isVisible ? "translate3d(0, 0, 0) scale(1)" : "translate3d(0, 12px, 0) scale(0.95)",
                  transitionDelay: "0.5s",
                }}
              >
                <button
                  suppressHydrationWarning
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="px-[2.4vw] py-[0.9vw] bg-gradient-to-r from-[#FF2D75] to-[#FF5E97] hover:from-[#e62066] hover:to-[#ff4785] text-white font-bold text-[1vw] rounded-full shadow-[0_0.5vw_1.5vw_rgba(255,45,117,0.35)] hover:shadow-[0_0.8vw_2vw_rgba(255,45,117,0.45)] transition-all duration-300 hover:scale-105 flex items-center gap-[0.6vw] cursor-pointer"
                >
                  <Icon icon="lucide:send" className="w-[1.1vw] h-[1.1vw]" />
                  <span>Start Your Journey</span>
                  <Icon icon="lucide:arrow-right" className="w-[1.1vw] h-[1.1vw]" />
                </button>
              </div>

            </div>

          </div>

        </div>
      </main>
  );
}

