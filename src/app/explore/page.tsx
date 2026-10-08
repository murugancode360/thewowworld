"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";

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

        // Reset quietly when user has scrolled back up above this section
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

export default function ExplorePage() {
  const [selectedStyle, setSelectedStyle] = useState<string>("All");

  // Hero section mounts on initial page visit
  const [heroVisible, setHeroVisible] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setHeroVisible(true), 60);
    return () => clearTimeout(timer);
  }, []);

  // Scroll detectors for individual section contents
  const secGuides = useScrollReveal(0.85);
  const secPackages = useScrollReveal(0.85);
  const secStyles = useScrollReveal(0.85);
  const secTrending = useScrollReveal(0.85);
  const secDeals = useScrollReveal(0.85);
  const secBanner = useScrollReveal(0.80);

  const popularPackages = [
    {
      id: "dubai-luxury",
      title: "Dubai Luxury Escape",
      location: "Dubai, UAE",
      duration: "5 Days / 4 Nights",
      rating: "4.8",
      reviews: "124+",
      price: "₹49,999",
      tag: "Most Popular",
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "maldives-paradise",
      title: "Maldives Island Paradise",
      location: "Maldives",
      duration: "4 Days / 3 Nights",
      rating: "4.7",
      reviews: "98+",
      price: "₹39,999",
      tag: null,
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "switzerland-alpine",
      title: "Switzerland Alpine Adventure",
      location: "Switzerland",
      duration: "7 Days / 6 Nights",
      rating: "4.9",
      reviews: "156+",
      price: "₹1,29,999",
      tag: null,
      image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "bali-explorer",
      title: "Bali Explorer",
      location: "Bali, Indonesia",
      duration: "6 Days / 5 Nights",
      rating: "4.6",
      reviews: "112+",
      price: "₹59,999",
      tag: null,
      image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
    },
  ];

  const travelStyles = [
    { name: "Beach Holidays", icon: "lucide:palmtree", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80" },
    { name: "Mountain Adventures", icon: "lucide:mountain", image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400&q=80" },
    { name: "Cultural Tours", icon: "lucide:landmark", image: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=400&q=80" },
    { name: "Desert Experiences", icon: "lucide:sun", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=400&q=80" },
    { name: "Romantic Getaways", icon: "lucide:heart", image: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=400&q=80" },
    { name: "Family Holidays", icon: "lucide:users", image: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=400&q=80" },
    { name: "Adventure Trips", icon: "lucide:compass", image: "https://images.unsplash.com/photo-1507034589631-9433cc6bc453?auto=format&fit=crop&w=400&q=80" },
    { name: "Luxury Escapes", icon: "lucide:crown", image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=400&q=80" },
  ];

  const trendingNow = [
    { title: "Dubai", subtitle: "Luxury Dubai Escape", duration: "5D / 4N", price: "₹49,999", rating: "4.8 (124+)", tag: "Best Seller", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=600&q=80" },
    { title: "Maldives", subtitle: "Island Paradise", duration: "4D / 3N", price: "₹39,999", rating: "4.7 (98+)", tag: "Top Rated", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80" },
    { title: "Switzerland", subtitle: "Alpine Adventure", duration: "7D / 6N", price: "₹1,29,999", rating: "4.9 (156+)", tag: "Trending", image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80" },
    { title: "Bali", subtitle: "Bali Explorer", duration: "6D / 5N", price: "₹59,999", rating: "4.6 (112+)", tag: "Popular", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80" },
  ];

  const specialDeals = [
    { title: "Summer Escapes", subtitle: "Dubai Family Escape", originalPrice: "₹64,999", dealPrice: "₹51,999", discount: "20% OFF", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=500&q=80" },
    { title: "Winter Holidays", subtitle: "Switzerland Snow Tour", originalPrice: "₹1,24,999", dealPrice: "₹1,05,999", discount: "15% OFF", image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=500&q=80" },
    { title: "Christmas & New Year", subtitle: "Europe Festive Tour", originalPrice: "₹1,49,999", dealPrice: "₹1,12,499", discount: "25% OFF", image: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=500&q=80" },
    { title: "Honeymoon Specials", subtitle: "Maldives Romantic Getaway", originalPrice: "₹89,999", dealPrice: "₹71,999", discount: "20% OFF", image: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=500&q=80" },
    { title: "Family Offers", subtitle: "Bali Family Package", originalPrice: "₹74,999", dealPrice: "₹61,999", discount: "18% OFF", image: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=500&q=80" },
  ];

  return (
    <>
      {/* Import Caveat Cursive Font for Handwritten Script Elements */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        
        .font-script {
          font-family: 'Caveat', cursive, sans-serif;
        }
      `}</style>

      <main className="w-full min-h-screen bg-[#FFF5F8] text-slate-800 relative overflow-hidden select-none font-sans pb-16">
        
        {/* ========================================================================= */}
        {/* SECTION 1: 95VH FULL-WIDTH PANORAMIC HERO SECTION WITH ELEMENT REVEAL     */}
        {/* ========================================================================= */}
        <section className="relative w-full h-[95vh] min-h-[660px] max-h-[95vh] flex flex-col justify-between overflow-hidden px-[4vw] lg:px-[5vw] pt-[3vh] pb-[3.5vh] mb-[7vh] shadow-sm">

          {/* Hero Background Image */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <Image
              src="/explore/herobg.webp"
              alt="Hero Background"
              fill
              className="object-center"
              priority
              unoptimized
            />
          </div>

          {/* Left Side Flower Artwork - Fades in First & Waves */}
          <div
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "scale(1)" : "scale(0.85)",
              transition: "opacity 0.8s ease-out 0.05s, transform 0.8s ease-out 0.05s",
            }}
            className="absolute -top-[10vh] -left-[1vw] w-[22vw] max-w-[340px] h-[55vh] z-10 pointer-events-none flex items-center justify-start origin-top-left animate-flower-wave"
          >
            <div className="relative w-full h-full">
              <Image
                src="/explore/left flower.webp"
                alt="Left Flower Artwork"
                fill
                className="object-contain object-left"
                priority
                unoptimized
              />
            </div>
          </div>

          {/* Right Side Blush Hero Artwork */}
          <div
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translate3d(0, 0, 0)" : "translate3d(50px, 0, 0)",
              transition: "opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.2s, transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.2s",
            }}
            className="absolute top-[3vh] -right-[1.5vw] w-[49vw] h-[82vh] z-0 pointer-events-none flex items-center justify-end"
          >
            <div className="relative w-full h-full">
              <Image
                src="/explore/rightblushhero.webp"
                alt="Explore The World Right Blush"
                fill
                className="object-contain object-right"
                priority
                unoptimized
              />
            </div>
          </div>

          {/* Airplane Stroke in Sky */}
          <div
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translate3d(0, 0, 0)" : "translate3d(40px, -20px, 0)",
              transition: "opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.35s, transform 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.35s",
            }}
            className="absolute top-[3vh] right-[3.5vw] pointer-events-none z-10 hidden lg:block"
          >
            <Image
              src="/aboutAs/hero/areplanestroke.webp"
              alt="Airplane Flight Path"
              width={340}
              height={200}
              className="w-[20vw] h-auto object-contain drop-shadow-xs"
            />
          </div>

          {/* Bottom-Right Stacked Polaroids */}
          <div
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translate3d(0, 0, 0)" : "translate3d(35px, 25px, 0)",
              transition: "opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.5s, transform 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.5s",
            }}
            className="absolute bottom-[14.5vh] right-[8.5vw] z-20 flex items-center gap-[0.6vw] pointer-events-none select-none"
          >
            {/* Right Polaroid - Maldives */}
            <div className="w-[9vw] min-w-[110px] bg-white p-[0.45vw] pb-[1.3vw] rounded-[0.75vw] shadow-2xl transform -rotate-12 -ml-[0.8vw] border border-slate-100">
              <div className="relative h-[7.6vw] min-h-[90px] rounded-[0.5vw] overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80"
                  alt="Tropical Paradise"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            </div>

            {/* Left Polaroid - Dubai Burj Khalifa Skyline */}
            <div className="w-[9vw] min-w-[110px] bg-white p-[0.45vw] pb-[1.3vw] rounded-[0.75vw] shadow-2xl transform rotate-3 border border-slate-100">
              <div className="relative h-[7.6vw] min-h-[90px] rounded-[0.5vw] overflow-hidden">
                <Image
                  src="/Home/destinations/dubai_burj_khalifa.webp"
                  alt="Dubai Skyline"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            </div>
          </div>

          {/* MAIN HERO CONTENT (LEFT COLUMN) - Line by Line Reveal */}
          <div className="relative z-10 pl-[7%] flex flex-col justify-center h-full max-w-[68vw] -mt-[5vh]">

            {/* Main Header with Cursive Script & Underline */}
            <h1 className="text-[5vw] font-semibold text-slate-800 tracking-tight leading-[1.05] mb-[3vh]">
              {/* Line 1: Explore the World */}
              <span
                style={{
                  opacity: heroVisible ? 1 : 0,
                  transform: heroVisible ? "translate3d(0, 0, 0)" : "translate3d(-40px, 0, 0)",
                  transition: "opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1) 0.25s, transform 0.75s cubic-bezier(0.16, 1, 0.3, 1) 0.25s",
                }}
                className="inline-block"
              >
                Explore the World
              </span>
              <br />
              {/* Line 2: Your Way + Brush Underline */}
              <div
                style={{
                  opacity: heroVisible ? 1 : 0,
                  transform: heroVisible ? "translate3d(0, 0, 0)" : "translate3d(-40px, 0, 0)",
                  transition: "opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1) 0.45s, transform 0.75s cubic-bezier(0.16, 1, 0.3, 1) 0.45s",
                }}
                className="relative inline-block mt-[0.4vh]"
              >
                <span className="font-script text-[6.4vw] font-bold text-[#FF2D75] inline-block transform -rotate-1">
                  Your Way
                </span>
                <svg viewBox="0 0 200 16" className="w-[102%] h-[0.75vw] min-h-[8px] absolute -bottom-[0.5vh] left-0 text-[#FF2D75]" fill="none">
                  <path d="M 4 10 C 60 2, 140 14, 196 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </div>
            </h1>

            {/* Line 3: Description Subtext */}
            <p
              style={{
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? "translate3d(0, 0, 0)" : "translate3d(-35px, 0, 0)",
                transition: "opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1) 0.65s, transform 0.75s cubic-bezier(0.16, 1, 0.3, 1) 0.65s",
              }}
              className="text-slate-600 text-base sm:text-lg lg:text-[1.12vw] leading-relaxed max-w-[37vw] mt-[1.8vh] mb-[4vh]"
            >
              Handpicked destinations, unforgettable experiences.
              <br />
              Find your next adventure with ease.
            </p>

            {/* Line 4: SEARCH DESTINATION BAR */}
            <div
              style={{
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? "translate3d(0, 0, 0)" : "translate3d(-30px, 0, 0)",
                transition: "opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1) 0.8s, transform 0.75s cubic-bezier(0.16, 1, 0.3, 1) 0.8s",
              }}
              className="w-full max-w-[28vw] min-h-[52px] lg:min-h-[3.6vw] bg-white/95 backdrop-blur-md rounded-full p-[0.35vw] pl-[1.3vw] pr-[0.35vw] shadow-[0_0.8vw_2.5vw_rgba(255,45,117,0.12)] border border-pink-100 flex items-center justify-between gap-[0.5vw] z-20 transition-all focus-within:ring-2 focus-within:ring-[#FF2D75]/25 focus-within:border-[#FF2D75]"
            >
              <div className="flex items-center gap-[0.6vw] flex-1">
                <Icon icon="lucide:map-pin" className="w-4 h-4 lg:w-[1.25vw] lg:h-[1.25vw] text-[#FF2D75] shrink-0" />
                <input
                  type="text"
                  placeholder="Enter destination or city..."
                  className="w-full text-xs lg:text-[0.9vw] font-medium text-slate-800 placeholder-slate-400 bg-transparent focus:outline-none py-[0.4vh]"
                />
              </div>

              <button
                type="button"
                className="px-5 lg:px-[1.8vw] py-2.5 lg:py-[1.05vh] bg-gradient-to-r from-[#FF2D75] to-[#FF5E97] hover:from-[#e62066] text-white font-bold text-xs lg:text-[0.88vw] rounded-full shadow-md hover:scale-105 transition-all flex items-center justify-center gap-[0.3vw] cursor-pointer shrink-0"
              >
                <Icon icon="lucide:search" className="w-3.5 h-3.5 lg:w-[0.95vw] lg:h-[0.95vw]" />
                <span>Search</span>
              </button>
            </div>

            {/* Line 5: BOTTOM STATS & HIGHLIGHTS ROW */}
            <div
              style={{
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? "translate3d(0, 0, 0)" : "translate3d(0, 25px, 0)",
                transition: "opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1) 0.95s, transform 0.75s cubic-bezier(0.16, 1, 0.3, 1) 0.95s",
              }}
              className="flex items-center justify-between w-full max-w-[37vw] pt-[5vh] pb-[0.5vh]"
            >
              {/* Highlight 1: Global Destinations */}
              <div className="flex items-center gap-[0.55vw]">
                <div className="w-8 h-8 lg:w-[2.4vw] lg:h-[2.4vw] rounded-full bg-white shadow-xs border border-pink-100 flex items-center justify-center text-[#FF2D75] shrink-0">
                  <Icon icon="ph:globe-hemisphere-east-fill" className="w-3.5 h-3.5 lg:w-[1.3vw] lg:h-[1.3vw]" />
                </div>
                <span className="text-[11px] lg:text-[0.8vw] font-bold text-slate-800 leading-tight">
                  Global<br />Destinations
                </span>
              </div>

              <div className="w-[1px] h-[2.2vh] bg-pink-200/60" />

              {/* Highlight 2: Safe & Reliable */}
              <div className="flex items-center gap-[0.55vw]">
                <div className="w-8 h-8 lg:w-[2.4vw] lg:h-[2.4vw] rounded-full bg-white shadow-xs border border-pink-100 flex items-center justify-center text-[#FF2D75] shrink-0">
                  <Icon icon="ph:shield-check-fill" className="w-3.5 h-3.5 lg:w-[1.3vw] lg:h-[1.3vw]" />
                </div>
                <span className="text-[11px] lg:text-[0.8vw] font-bold text-slate-800 leading-tight">
                  Safe &<br />Reliable
                </span>
              </div>

              <div className="w-[1px] h-[2.2vh] bg-pink-200/60" />

              {/* Highlight 3: Memorable Experiences */}
              <div className="flex items-center gap-[0.55vw]">
                <div className="w-8 h-8 lg:w-[2.4vw] lg:h-[2.4vw] rounded-full bg-white shadow-xs border border-pink-100 flex items-center justify-center text-[#FF2D75] shrink-0">
                  <Icon icon="ph:heart-fill" className="w-3.5 h-3.5 lg:w-[1.3vw] lg:h-[1.3vw]" />
                </div>
                <span className="text-[11px] lg:text-[0.8vw] font-bold text-slate-800 leading-tight">
                  Memorable<br />Experiences
                </span>
              </div>

              <div className="w-[1px] h-[2.2vh] bg-pink-200/60" />

              {/* Highlight 4: Expert Guidance */}
              <div className="flex items-center gap-[0.55vw]">
                <div className="w-8 h-8 lg:w-[2.4vw] lg:h-[2.4vw] rounded-full bg-white shadow-xs border border-pink-100 flex items-center justify-center text-[#FF2D75] shrink-0">
                  <Icon icon="ph:compass-fill" className="w-3.5 h-3.5 lg:w-[1.3vw] lg:h-[1.3vw]" />
                </div>
                <span className="text-[11px] lg:text-[0.8vw] font-bold text-slate-800 leading-tight">
                  Expert<br />Guidance
                </span>
              </div>
            </div>

          </div>

        </section>

        {/* CONTAINER FOR SECTIONS 2-7 */}
        <div className="max-w-[92vw] mx-auto">

          {/* ========================================================================= */}
          {/* SECTION 2: DUBAI BUCKET LIST & GUIDES - CARDS ONE BY ONE                  */}
          {/* ========================================================================= */}
          <section ref={secGuides.ref} className="mb-[7vh]">
            
            {/* Header: Fades in from Left */}
            <div
              style={{
                opacity: secGuides.isVisible ? 1 : 0,
                transform: secGuides.isVisible ? "translate3d(0, 0, 0)" : "translate3d(-40px, 0, 0)",
                transition: "opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.1s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.1s",
              }}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-[0.8vw] mb-[3.5vh]"
            >
              <div className="flex items-center gap-[0.8vw]">
                <div>
                  <div className="flex items-center gap-[0.4vw] text-xs lg:text-[0.8vw] font-bold tracking-[0.15em] text-[#FF2D75] uppercase">
                    <span>EXPLORE DUBAI GUIDES</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl lg:text-[1.8vw] font-extrabold text-slate-900 leading-tight">
                    <span>Discover Dubai </span>
                    <span className="font-script text-3xl sm:text-4xl lg:text-[2.3vw] font-bold text-[#FF2D75]">Your Way</span>
                  </h2>
                </div>
              </div>
            </div>

            {/* 3 Featured Category Cards Grid: Fade in One by One */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-[1.8vw]">
              
              {/* Category 1: 99 Things to Do in Dubai */}
              <div
                style={{
                  opacity: secGuides.isVisible ? 1 : 0,
                  transform: secGuides.isVisible ? "translate3d(0, 0, 0) scale(1)" : "translate3d(0, 35px, 0) scale(0.95)",
                  transition: "opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0.25s, transform 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0.25s",
                }}
              >
                <Link
                  href="/explore/99-things-to-do-in-dubai"
                  className="group relative bg-white rounded-3xl lg:rounded-[1.8vw] overflow-hidden border border-pink-100 shadow-[0_0.8vw_2.5vw_rgba(255,45,117,0.06)] hover:shadow-2xl hover:-translate-y-[0.6vh] transition-all duration-300 flex flex-col justify-between cursor-pointer h-full"
                >
                  <div className="relative h-60 lg:h-[15vw] w-full overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80"
                      alt="99 things to do in dubai"
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

                    <div className="absolute top-[1vw] right-[1vw] bg-black/60 backdrop-blur-md px-[0.8vw] py-[0.4vh] rounded-full text-white font-bold text-[10px] lg:text-[0.68vw]">
                      Ultimate Guide
                    </div>

                    <div className="absolute bottom-[0.8vw] right-[1vw] flex items-center gap-[0.2vw] bg-yellow-400 text-slate-750 font-bold text-[10px] lg:text-[0.7vw] px-[0.6vw] py-[0.3vh] rounded-full shadow-sm">
                      <Icon icon="lucide:star" className="w-3 h-3 fill-slate-950 text-slate-950" />
                      <span>4.9 (18k+ reviews)</span>
                    </div>
                  </div>

                  <div className="p-6 lg:p-[1.5vw] flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-semibold text-2xl lg:text-[1.6vw] text-gray-800 group-hover:text-[#FF2D75] transition-colors leading-tight mb-[0.8vh]">
                        99 things to do in dubai
                      </h3>

                      <p className="text-slate-600 text-xs sm:text-sm lg:text-[0.82vw] leading-relaxed mb-[2vh]">
                        The comprehensive master bucket list: Desert safaris, Burj Khalifa sky views, spice souks, luxury beach clubs & hidden local eateries.
                      </p>

                      <div className="flex flex-wrap gap-[0.4vw] mb-[2vh]">
                        <span className="px-3.5 py-1 bg-pink-100/90 text-[#FF2D75] text-[11px] lg:text-[0.72vw] font-bold rounded-full border border-pink-200 shadow-2xs">
                          Desert Safari & Dunes
                        </span>
                        <span className="px-3.5 py-1 bg-pink-100/90 text-[#FF2D75] text-[11px] lg:text-[0.72vw] font-bold rounded-full border border-pink-200 shadow-2xs">
                          Burj Khalifa 148F
                        </span>
                        <span className="px-3.5 py-1 bg-pink-100/90 text-[#FF2D75] text-[11px] lg:text-[0.72vw] font-bold rounded-full border border-pink-200 shadow-2xs">
                          Marina Yacht
                        </span>
                      </div>
                    </div>

                    <div className="pt-[1.2vh] border-t border-pink-100/80 flex items-center justify-between">
                      <span className="text-xs lg:text-[0.78vw] font-bold text-slate-500">
                        99 Iconic Highlights
                      </span>
                      <span className="px-4 lg:px-[1.1vw] py-2 lg:py-[0.7vh] bg-gradient-to-r from-[#FF2D75] to-[#FF5E97] text-white text-xs lg:text-[0.8vw] font-bold rounded-full shadow-md group-hover:scale-105 transition-all flex items-center gap-[0.3vw]">
                        <span>Open Guide</span>
                        <Icon icon="lucide:arrow-right" className="w-3.5 h-3.5 lg:w-[0.9vw] lg:h-[0.9vw]" />
                      </span>
                    </div>
                  </div>
                </Link>
              </div>

              {/* Category 2: Amazing Things to Do in Dubai */}
              <div
                style={{
                  opacity: secGuides.isVisible ? 1 : 0,
                  transform: secGuides.isVisible ? "translate3d(0, 0, 0) scale(1)" : "translate3d(0, 35px, 0) scale(0.95)",
                  transition: "opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0.40s, transform 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0.40s",
                }}
              >
                <Link
                  href="/explore/amazing-things-to-do-in-dubai"
                  className="group relative bg-white rounded-3xl lg:rounded-[1.8vw] overflow-hidden border border-pink-100 shadow-[0_0.8vw_2.5vw_rgba(255,45,117,0.06)] hover:shadow-2xl hover:-translate-y-[0.6vh] transition-all duration-300 flex flex-col justify-between cursor-pointer h-full"
                >
                  <div className="relative h-60 lg:h-[15vw] w-full overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=800&q=80"
                      alt="Amazing things to do in Dubai"
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

                    <div className="absolute top-[1vw] right-[1vw] bg-black/60 backdrop-blur-md px-[0.8vw] py-[0.4vh] rounded-full text-white font-bold text-[10px] lg:text-[0.68vw]">
                      VIP & Thrills
                    </div>

                    <div className="absolute bottom-[0.8vw] right-[1vw] flex items-center gap-[0.2vw] bg-yellow-400 text-slate-750 font-bold text-[10px] lg:text-[0.7vw] px-[0.6vw] py-[0.3vh] rounded-full shadow-sm">
                      <Icon icon="lucide:star" className="w-3 h-3 fill-slate-950 text-slate-950" />
                      <span>4.9 (12k+ reviews)</span>
                    </div>
                  </div>

                  <div className="p-6 lg:p-[1.5vw] flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-semibold text-2xl lg:text-[1.6vw] text-gray-800 group-hover:text-[#FF2D75] transition-colors leading-tight mb-[0.8vh]">
                        Amazing things to do in Dubai
                      </h3>

                      <p className="text-slate-600 text-xs sm:text-sm lg:text-[0.82vw] leading-relaxed mb-[2vh]">
                        Extraordinary bucket-list marvels: Skydiving over the Palm, 360° Aura Skypool, 60m Deep Dive city & Michelin sky dining.
                      </p>

                      <div className="flex flex-wrap gap-[0.4vw] mb-[2vh]">
                        <span className="px-3.5 py-1 bg-pink-100/90 text-[#FF2D75] text-[11px] lg:text-[0.72vw] font-bold rounded-full border border-pink-200 shadow-2xs">
                          Skydiving & Flyboard
                        </span>
                        <span className="px-3.5 py-1 bg-pink-100/90 text-[#FF2D75] text-[11px] lg:text-[0.72vw] font-bold rounded-full border border-pink-200 shadow-2xs">
                          Aura Skypool
                        </span>
                        <span className="px-3.5 py-1 bg-pink-100/90 text-[#FF2D75] text-[11px] lg:text-[0.72vw] font-bold rounded-full border border-pink-200 shadow-2xs">
                          Dinner in Sky
                        </span>
                      </div>
                    </div>

                    <div className="pt-[1.2vh] border-t border-pink-100/80 flex items-center justify-between">
                      <span className="text-xs lg:text-[0.78vw] font-bold text-slate-500">
                        Unmissable bucket list
                      </span>
                      <span className="px-4 lg:px-[1.1vw] py-2 lg:py-[0.7vh] bg-gradient-to-r from-[#FF2D75] to-[#FF5E97] text-white text-xs lg:text-[0.8vw] font-bold rounded-full shadow-md group-hover:scale-105 transition-all flex items-center gap-[0.3vw]">
                        <span>Open Guide</span>
                        <Icon icon="lucide:arrow-right" className="w-3.5 h-3.5 lg:w-[0.9vw] lg:h-[0.9vw]" />
                      </span>
                    </div>
                  </div>
                </Link>
              </div>

              {/* Category 3: 50 Things to Do in Dubai */}
              <div
                style={{
                  opacity: secGuides.isVisible ? 1 : 0,
                  transform: secGuides.isVisible ? "translate3d(0, 0, 0) scale(1)" : "translate3d(0, 35px, 0) scale(0.95)",
                  transition: "opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0.55s, transform 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0.55s",
                }}
              >
                <Link
                  href="/explore/50-things-to-do-in-dubai"
                  className="group relative bg-white rounded-3xl lg:rounded-[1.8vw] overflow-hidden border border-pink-100 shadow-[0_0.8vw_2.5vw_rgba(255,45,117,0.06)] hover:shadow-2xl hover:-translate-y-[0.6vh] transition-all duration-300 flex flex-col justify-between cursor-pointer h-full"
                >
                  <div className="relative h-60 lg:h-[15vw] w-full overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=800&q=80"
                      alt="50 Things to do in Dubai"
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

                    <div className="absolute top-[1vw] right-[1vw] bg-black/60 backdrop-blur-md px-[0.8vw] py-[0.4vh] rounded-full text-white font-bold text-[10px] lg:text-[0.68vw]">
                      Essential Picks
                    </div>

                    <div className="absolute bottom-[0.8vw] right-[1vw] flex items-center gap-[0.2vw] bg-yellow-400 text-slate-750 font-bold text-[10px] lg:text-[0.7vw] px-[0.6vw] py-[0.3vh] rounded-full shadow-sm">
                      <Icon icon="lucide:star" className="w-3 h-3 fill-slate-950 text-slate-950" />
                      <span>4.8 (9.5k+ reviews)</span>
                    </div>
                  </div>

                  <div className="p-6 lg:p-[1.5vw] flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-semibold text-2xl lg:text-[1.6vw] text-gray-800 group-hover:text-[#FF2D75] transition-colors leading-tight mb-[0.8vh]">
                        50 Things to do in Dubai
                      </h3>

                      <p className="text-slate-600 text-xs sm:text-sm lg:text-[0.82vw] leading-relaxed mb-[2vh]">
                        The quintessential 50 must-dos for first-timers & returnees: Miracle Garden, Dubai Mall aquarium, Frame Skydeck & Fountain show.
                      </p>

                      <div className="flex flex-wrap gap-[0.4vw] mb-[2vh]">
                        <span className="px-3.5 py-1 bg-pink-100/90 text-[#FF2D75] text-[11px] lg:text-[0.72vw] font-bold rounded-full border border-pink-200 shadow-2xs">
                          Miracle Garden
                        </span>
                        <span className="px-3.5 py-1 bg-pink-100/90 text-[#FF2D75] text-[11px] lg:text-[0.72vw] font-bold rounded-full border border-pink-200 shadow-2xs">
                          Dubai Frame
                        </span>
                        <span className="px-3.5 py-1 bg-pink-100/90 text-[#FF2D75] text-[11px] lg:text-[0.72vw] font-bold rounded-full border border-pink-200 shadow-2xs">
                          Global Village
                        </span>
                      </div>
                    </div>

                    <div className="pt-[1.2vh] border-t border-pink-100/80 flex items-center justify-between">
                      <span className="text-xs lg:text-[0.78vw] font-bold text-slate-500">
                        Top 50 Curated Essentials
                      </span>
                      <span className="px-4 lg:px-[1.1vw] py-2 lg:py-[0.7vh] bg-gradient-to-r from-[#FF2D75] to-[#FF5E97] text-white text-xs lg:text-[0.8vw] font-bold rounded-full shadow-md group-hover:scale-105 transition-all flex items-center gap-[0.3vw]">
                        <span>Open Guide</span>
                        <Icon icon="lucide:arrow-right" className="w-3.5 h-3.5 lg:w-[0.9vw] lg:h-[0.9vw]" />
                      </span>
                    </div>
                  </div>
                </Link>
              </div>

            </div>

          </section>

          {/* ========================================================================= */}
          {/* SECTION 3: POPULAR PACKAGES - CARDS ONE BY ONE                            */}
          {/* ========================================================================= */}
          <section ref={secPackages.ref} className="mb-[7vh]">
            
            {/* Header: Fades in from Left */}
            <div
              style={{
                opacity: secPackages.isVisible ? 1 : 0,
                transform: secPackages.isVisible ? "translate3d(0, 0, 0)" : "translate3d(-40px, 0, 0)",
                transition: "opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.1s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.1s",
              }}
              className="flex items-center justify-between mb-[3vh]"
            >
              <div className="flex items-center gap-[0.8vw]">
                <div>
                  <div className="flex items-center gap-[0.4vw] text-xs lg:text-[0.8vw] font-bold tracking-[0.15em] text-[#FF2D75] uppercase">
                    <span>POPULAR PACKAGES</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl lg:text-[1.8vw] font-extrabold text-slate-900 leading-tight">
                    <span>Handpicked Journeys </span>
                    <span className="font-script text-3xl sm:text-4xl lg:text-[2.3vw] font-bold text-[#FF2D75]">for You</span>
                  </h2>
                </div>
              </div>

              <Link href="#" className="hidden sm:flex items-center gap-[0.4vw] text-xs lg:text-[0.8vw] font-bold text-[#FF2D75] hover:underline">
                <span>View All Packages</span>
                <Icon icon="lucide:arrow-right" className="w-4 h-4 lg:w-[1vw] lg:h-[1vw]" />
              </Link>
            </div>

            {/* 4 Package Cards Grid: Fade in One by One */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[1.5vw]">
              {popularPackages.map((pkg, idx) => (
                <div
                  key={pkg.id}
                  style={{
                    opacity: secPackages.isVisible ? 1 : 0,
                    transform: secPackages.isVisible ? "translate3d(0, 0, 0) scale(1)" : "translate3d(0, 35px, 0) scale(0.95)",
                    transition: `opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1) ${0.25 + idx * 0.12}s, transform 0.65s cubic-bezier(0.16, 1, 0.3, 1) ${0.25 + idx * 0.12}s`,
                  }}
                >
                  <Link
                    href={`/explore/${pkg.id}`}
                    className="bg-white rounded-3xl lg:rounded-[1.6vw] overflow-hidden border border-pink-100/80 shadow-[0_0.8vw_2.5vw_rgba(255,45,117,0.05)] hover:shadow-xl hover:-translate-y-[0.4vh] transition-all duration-300 flex flex-col justify-between group cursor-pointer h-full"
                  >
                    <div className="relative h-48 lg:h-[12vw] w-full overflow-hidden">
                      <Image
                        src={pkg.image}
                        alt={pkg.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        unoptimized
                      />
                      {pkg.tag && (
                        <div className="absolute top-[0.8vw] left-[0.8vw] bg-gradient-to-r from-[#FF2D75] to-[#FF5E97] text-white text-[10px] lg:text-[0.68vw] font-bold px-[0.8vw] py-[0.4vh] rounded-full shadow-md">
                          {pkg.tag}
                        </div>
                      )}
                      <button
                        type="button"
                        aria-label="Add to favorites"
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                        className="absolute top-[0.8vw] right-[0.8vw] w-8 h-8 lg:w-[2vw] lg:h-[2vw] rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-slate-600 hover:text-[#FF2D75] transition-colors shadow-sm"
                      >
                        <Icon icon="lucide:heart" className="w-4 h-4 lg:w-[1vw] lg:h-[1vw]" />
                      </button>
                    </div>

                    <div className="p-5 lg:p-[1.2vw] flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-extrabold text-slate-900 text-sm lg:text-[0.95vw] mb-[0.4vh] group-hover:text-[#FF2D75] transition-colors leading-snug">{pkg.title}</h3>
                        
                        <div className="flex items-center gap-[0.3vw] text-[11px] lg:text-[0.75vw] text-slate-500 mb-[1vh]">
                          <Icon icon="lucide:map-pin" className="w-3.5 h-3.5 lg:w-[0.9vw] lg:h-[0.9vw] text-[#FF2D75]" />
                          <span>{pkg.location}</span>
                        </div>

                        <div className="flex items-center justify-between text-[11px] lg:text-[0.75vw] text-slate-500 mb-[1.5vh] pt-[0.8vh] border-t border-slate-100">
                          <div className="flex items-center gap-[0.3vw]">
                            <Icon icon="lucide:calendar" className="w-3.5 h-3.5 lg:w-[0.9vw] lg:h-[0.9vw] text-slate-400" />
                            <span>{pkg.duration}</span>
                          </div>
                          <div className="flex items-center gap-[0.3vw] text-slate-700 font-bold">
                            <Icon icon="lucide:star" className="w-3.5 h-3.5 lg:w-[0.9vw] lg:h-[0.9vw] fill-amber-400 text-amber-400" />
                            <span>{pkg.rating} ({pkg.reviews})</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-[0.8vh] border-t border-pink-50">
                        <div>
                          <span className="text-[10px] lg:text-[0.65vw] text-slate-400 font-medium block">From</span>
                          <span className="text-sm lg:text-[0.95vw] font-extrabold text-[#FF2D75]">{pkg.price}</span>
                        </div>

                        <span className="px-4 lg:px-[1vw] py-2 lg:py-[0.6vh] bg-gradient-to-r from-[#FF2D75] to-[#FF5E97] text-white text-xs lg:text-[0.75vw] font-bold rounded-full shadow-md group-hover:scale-105 transition-all flex items-center gap-[0.3vw]">
                          <span>View Package</span>
                          <Icon icon="lucide:arrow-right" className="w-3 h-3 lg:w-[0.8vw] lg:h-[0.8vw]" />
                        </span>
                      </div>

                    </div>
                  </Link>
                </div>
              ))}
            </div>

          </section>


          {/* ========================================================================= */}
          {/* SECTION 4: EXPLORE BY TRAVEL STYLE - PILL CARDS ONE BY ONE                */}
          {/* ========================================================================= */}
          <section ref={secStyles.ref} className="mb-[7vh]">
            
            {/* Header: Fades in from Left */}
            <div
              style={{
                opacity: secStyles.isVisible ? 1 : 0,
                transform: secStyles.isVisible ? "translate3d(0, 0, 0)" : "translate3d(-40px, 0, 0)",
                transition: "opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.1s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.1s",
              }}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-[0.8vw] mb-[3vh]"
            >
              <div className="flex items-center gap-[0.8vw]">
                <div className="w-8 h-8 lg:w-[2.2vw] lg:h-[2.2vw] min-w-[28px] min-h-[28px] rounded-full bg-[#FF2D75] text-white font-extrabold text-sm lg:text-[0.9vw] flex items-center justify-center shadow-md">
                  4
                </div>
                <div>
                  <div className="flex items-center gap-[0.4vw] text-xs lg:text-[0.8vw] font-bold tracking-[0.15em] text-[#FF2D75] uppercase">
                    <span>EXPLORE BY TRAVEL STYLE</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl lg:text-[1.8vw] font-extrabold text-slate-900 leading-tight">
                    <span>Find Your Perfect </span>
                    <span className="font-script text-3xl sm:text-4xl lg:text-[2.3vw] font-bold text-[#FF2D75]">Vibe</span>
                  </h2>
                </div>
              </div>

              <span className="text-xs lg:text-[0.8vw] text-slate-500 font-medium italic">
                Different styles. Same destination — <strong className="text-[#FF2D75] font-semibold">Happiness.</strong>
              </span>
            </div>

            {/* 8 Filter Pill Cards Grid: Fade in One by One */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-[0.8vw]">
              {travelStyles.map((style, idx) => (
                <div
                  key={idx}
                  style={{
                    opacity: secStyles.isVisible ? 1 : 0,
                    transform: secStyles.isVisible ? "translate3d(0, 0, 0) scale(1)" : "translate3d(0, 25px, 0) scale(0.92)",
                    transition: `opacity 0.55s cubic-bezier(0.16, 1, 0.3, 1) ${0.2 + idx * 0.08}s, transform 0.55s cubic-bezier(0.16, 1, 0.3, 1) ${0.2 + idx * 0.08}s`,
                  }}
                >
                  <button
                    onClick={() => setSelectedStyle(style.name)}
                    className={`w-full bg-white rounded-2xl lg:rounded-[1.2vw] p-2.5 lg:p-[0.6vw] text-center border shadow-sm transition-all duration-300 flex flex-col items-center cursor-pointer group hover:-translate-y-[0.3vh] ${
                      selectedStyle === style.name ? "border-[#FF2D75] ring-2 ring-pink-100 shadow-md" : "border-pink-100/70 hover:border-pink-300"
                    }`}
                  >
                    <div className="relative w-full h-16 lg:h-[4.5vw] rounded-xl lg:rounded-[0.9vw] overflow-hidden mb-[0.6vh]">
                      <Image
                        src={style.image}
                        alt={style.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        unoptimized
                      />
                    </div>
                    
                    <div className="flex items-center gap-[0.2vw] text-[#FF2D75] mb-[0.2vh]">
                      <Icon icon={style.icon} className="w-3.5 h-3.5 lg:w-[0.9vw] lg:h-[0.9vw]" />
                    </div>

                    <span className="text-[11px] lg:text-[0.72vw] font-bold text-slate-800 leading-tight group-hover:text-[#FF2D75] transition-colors">
                      {style.name}
                    </span>
                  </button>
                </div>
              ))}
            </div>

          </section>


          {/* ========================================================================= */}
          {/* SECTION 5: TRENDING DESTINATIONS - CARDS ONE BY ONE                       */}
          {/* ========================================================================= */}
          <section ref={secTrending.ref} className="mb-[7vh]">
            
            {/* Header: Fades in from Left */}
            <div
              style={{
                opacity: secTrending.isVisible ? 1 : 0,
                transform: secTrending.isVisible ? "translate3d(0, 0, 0)" : "translate3d(-40px, 0, 0)",
                transition: "opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.1s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.1s",
              }}
              className="flex items-center justify-between mb-[3vh]"
            >
              <div className="flex items-center gap-[0.8vw]">
                <div className="w-8 h-8 lg:w-[2.2vw] lg:h-[2.2vw] min-w-[28px] min-h-[28px] rounded-full bg-[#FF2D75] text-white font-extrabold text-sm lg:text-[0.9vw] flex items-center justify-center shadow-md">
                  5
                </div>
                <div>
                  <div className="flex items-center gap-[0.4vw] text-xs lg:text-[0.75vw] font-bold tracking-[0.15em] text-[#FF2D75] uppercase">
                    <span>TRENDING DESTINATIONS & PACKAGES</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl lg:text-[1.8vw] font-extrabold text-slate-900 leading-tight">
                    <span className="font-script text-3xl sm:text-4xl lg:text-[2.3vw] font-bold text-[#FF2D75]">Trending Now</span>
                  </h2>
                </div>
              </div>

              <Link href="#" className="hidden sm:flex items-center gap-[0.4vw] text-xs lg:text-[0.8vw] font-bold text-[#FF2D75] hover:underline">
                <span>View All Trending</span>
                <Icon icon="lucide:arrow-right" className="w-4 h-4 lg:w-[1vw] lg:h-[1vw]" />
              </Link>
            </div>

            {/* 4 Wide Landscape Cards Grid: Fade in One by One */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[1.5vw]">
              {trendingNow.map((item, index) => {
                const pkgId = popularPackages[index % popularPackages.length].id;
                return (
                  <div
                    key={index}
                    style={{
                      opacity: secTrending.isVisible ? 1 : 0,
                      transform: secTrending.isVisible ? "translate3d(0, 0, 0) scale(1)" : "translate3d(0, 35px, 0) scale(0.95)",
                      transition: `opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1) ${0.25 + index * 0.12}s, transform 0.65s cubic-bezier(0.16, 1, 0.3, 1) ${0.25 + index * 0.12}s`,
                    }}
                  >
                    <Link
                      href={`/explore/${pkgId}`}
                      className="bg-white rounded-3xl lg:rounded-[1.6vw] overflow-hidden border border-pink-100/80 shadow-[0_0.8vw_2.5vw_rgba(255,45,117,0.04)] hover:shadow-xl hover:-translate-y-[0.4vh] transition-all duration-300 flex flex-col justify-between group cursor-pointer h-full"
                    >
                      <div className="relative h-44 lg:h-[11vw] w-full overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          unoptimized
                        />
                        <div className="absolute top-[0.8vw] right-[0.8vw] bg-gradient-to-r from-[#FF2D75] to-[#FF5E97] text-white text-[10px] lg:text-[0.68vw] font-bold px-[0.8vw] py-[0.3vh] rounded-full shadow-md">
                          {item.tag}
                        </div>
                      </div>

                      <div className="p-4 lg:p-[1.1vw] flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="font-extrabold text-slate-900 text-sm lg:text-[0.9vw] group-hover:text-[#FF2D75] transition-colors leading-snug">{item.title}</h3>
                          <p className="text-xs lg:text-[0.75vw] text-slate-500 font-medium mb-[1.2vh]">{item.subtitle}</p>
                        </div>

                        <div className="flex items-center justify-between pt-[0.8vh] border-t border-slate-100 text-[11px] lg:text-[0.75vw]">
                          <span className="text-slate-500">{item.duration} • <strong className="text-slate-900 font-bold">From {item.price}</strong></span>
                          <span className="flex items-center gap-[0.2vw] font-bold text-amber-500">
                            <Icon icon="lucide:star" className="w-3 h-3 lg:w-[0.8vw] lg:h-[0.8vw] fill-amber-400" /> {item.rating}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>

          </section>


          {/* ========================================================================= */}
          {/* SECTION 6: SPECIAL DEALS - CARDS ONE BY ONE                               */}
          {/* ========================================================================= */}
          <section ref={secDeals.ref} className="mb-[7vh]">
            
            {/* Header: Fades in from Left */}
            <div
              style={{
                opacity: secDeals.isVisible ? 1 : 0,
                transform: secDeals.isVisible ? "translate3d(0, 0, 0)" : "translate3d(-40px, 0, 0)",
                transition: "opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.1s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.1s",
              }}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-[0.8vw] mb-[3vh]"
            >
              <div className="flex items-center gap-[0.8vw]">
                <div className="w-8 h-8 lg:w-[2.2vw] lg:h-[2.2vw] min-w-[28px] min-h-[28px] rounded-full bg-[#FF2D75] text-white font-extrabold text-sm lg:text-[0.9vw] flex items-center justify-center shadow-md">
                  6
                </div>
                <div>
                  <div className="flex items-center gap-[0.4vw] text-xs lg:text-[0.75vw] font-bold tracking-[0.15em] text-[#FF2D75] uppercase">
                    <span>SPECIAL DEALS & SEASONAL PACKAGES</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl lg:text-[1.8vw] font-extrabold text-slate-900 leading-tight">
                    <span className="font-script text-3xl sm:text-4xl lg:text-[2.3vw] font-bold text-[#FF2D75]">Travel More, Spend Less</span>
                  </h2>
                </div>
              </div>

              <span className="text-xs lg:text-[0.8vw] text-slate-500 font-medium italic">
                Limited time offers. Unforgettable memories.
              </span>
            </div>

            {/* 5 Deal Cards Grid: Fade in One by One */}
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-[1vw]">
              {specialDeals.map((deal, i) => {
                const pkgId = popularPackages[i % popularPackages.length].id;
                return (
                  <div
                    key={i}
                    style={{
                      opacity: secDeals.isVisible ? 1 : 0,
                      transform: secDeals.isVisible ? "translate3d(0, 0, 0) scale(1)" : "translate3d(0, 30px, 0) scale(0.95)",
                      transition: `opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${0.2 + i * 0.1}s, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${0.2 + i * 0.1}s`,
                    }}
                  >
                    <Link
                      href={`/explore/${pkgId}`}
                      className="bg-white rounded-3xl lg:rounded-[1.5vw] overflow-hidden border border-pink-100/80 shadow-[0_0.6vw_2vw_rgba(255,45,117,0.04)] hover:shadow-xl hover:-translate-y-[0.4vh] transition-all duration-300 flex flex-col justify-between group cursor-pointer h-full"
                    >
                      <div className="relative h-36 lg:h-[9vw] w-full overflow-hidden">
                        <Image
                          src={deal.image}
                          alt={deal.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          unoptimized
                        />
                        <div className="absolute top-[0.6vw] right-[0.6vw] bg-[#FF2D75] text-white font-black text-[10px] lg:text-[0.68vw] w-9 h-9 lg:w-[2.2vw] lg:h-[2.2vw] rounded-full flex items-center justify-center shadow-md leading-tight text-center">
                          {deal.discount}
                        </div>
                      </div>

                      <div className="p-4 lg:p-[1vw] flex-1 flex flex-col justify-between text-left">
                        <div>
                          <h3 className="font-extrabold text-slate-900 text-xs lg:text-[0.85vw] mb-[0.2vh] group-hover:text-[#FF2D75] transition-colors leading-snug">{deal.title}</h3>
                          <p className="text-[11px] lg:text-[0.72vw] text-slate-500 mb-[1.2vh]">{deal.subtitle}</p>
                        </div>

                        <div className="pt-[0.6vh] border-t border-slate-100 flex items-center justify-between">
                          <div>
                            <span className="text-[10px] lg:text-[0.65vw] text-slate-400 line-through mr-[0.3vw]">{deal.originalPrice}</span>
                            <span className="text-xs lg:text-[0.88vw] font-black text-[#FF2D75]">{deal.dealPrice}</span>
                          </div>
                          
                          <span className="px-3 lg:px-[0.8vw] py-1 lg:py-[0.4vh] bg-gradient-to-r from-[#FF2D75] to-[#FF5E97] text-white text-[10px] lg:text-[0.68vw] font-bold rounded-full shadow-sm group-hover:scale-105 transition-all">
                            View Deal →
                          </span>
                        </div>

                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>

          </section>


          {/* ========================================================================= */}
          {/* SECTION 7: BUILD YOUR PERFECT TRIP - BANNER FROM RIGHT SIDE               */}
          {/* ========================================================================= */}
          <section ref={secBanner.ref} className="mb-[6vh]">
            <div
              style={{
                opacity: secBanner.isVisible ? 1 : 0,
                transform: secBanner.isVisible ? "translate3d(0, 0, 0) scale(1)" : "translate3d(140px, 0, 0) scale(0.93)",
                filter: secBanner.isVisible ? "blur(0px)" : "blur(8px)",
                transition: "transform 1.05s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.85s ease-out, filter 0.75s ease-out",
              }}
              className="relative rounded-3xl lg:rounded-[2.2vw] overflow-hidden bg-gradient-to-r from-[#FFE8F0] via-[#FFF0F5] to-[#FFE8F0] p-8 sm:p-10 lg:p-[2.5vw] border border-pink-200/60 shadow-xl"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-[2vw] items-center">
                
                {/* Left Title & Intro - Fades in from Left */}
                <div
                  style={{
                    opacity: secBanner.isVisible ? 1 : 0,
                    transform: secBanner.isVisible ? "translate3d(0, 0, 0)" : "translate3d(-35px, 0, 0)",
                    transition: "opacity 0.75s ease-out 0.25s, transform 0.75s ease-out 0.25s",
                  }}
                  className="lg:col-span-4 flex flex-col items-start text-left"
                >
                  <div className="flex items-center gap-[0.8vw] mb-[0.8vh]">
                    <div className="flex items-center gap-[0.4vw] text-xs lg:text-[0.8vw] font-bold tracking-[0.15em] text-[#FF2D75] uppercase">
                      <span>BUILD YOUR PERFECT TRIP</span>
                    </div>
                  </div>

                  <h2 className="text-3xl sm:text-4xl lg:text-[2.2vw] font-extrabold text-slate-900 tracking-tight leading-tight mb-[0.8vh]">
                    <span className="font-script text-4xl sm:text-5xl lg:text-[2.8vw] font-bold text-[#FF2D75]">Your Trip. Your Way.</span>
                  </h2>

                  <p className="text-slate-600 text-xs sm:text-sm lg:text-[0.85vw] leading-relaxed max-w-sm lg:max-w-[22vw]">
                    Tell us what you&apos;re looking for and we&apos;ll create a personalized package just for you.
                  </p>
                </div>

                {/* Right Interactive Selection Form - Fades in with slight delay */}
                <div
                  style={{
                    opacity: secBanner.isVisible ? 1 : 0,
                    transform: secBanner.isVisible ? "translate3d(0, 0, 0)" : "translate3d(30px, 0, 0)",
                    transition: "opacity 0.75s ease-out 0.4s, transform 0.75s ease-out 0.4s",
                  }}
                  className="lg:col-span-8 bg-white/90 backdrop-blur-md rounded-2xl lg:rounded-[1.6vw] p-4 sm:p-6 lg:p-[1.5vw] shadow-md border border-pink-100 grid grid-cols-1 sm:grid-cols-4 gap-[0.8vw] items-center"
                >
                  
                  {/* Select 1: Destination */}
                  <div>
                    <label className="block text-[11px] lg:text-[0.72vw] font-bold text-slate-700 mb-[0.4vh]">
                      <Icon icon="lucide:map-pin" className="w-3 h-3 lg:w-[0.8vw] lg:h-[0.8vw] inline text-[#FF2D75] mr-[0.2vw]" />
                      Destination
                    </label>
                    <select aria-label="Select Destination" className="w-full text-xs lg:text-[0.78vw] py-2 lg:py-[0.7vh] px-3 lg:px-[0.7vw] bg-pink-50/50 border border-pink-100 rounded-xl lg:rounded-[0.8vw] text-slate-700 focus:outline-none">
                      <option>Select Destination</option>
                      <option>Dubai, UAE</option>
                      <option>Maldives</option>
                      <option>Switzerland</option>
                      <option>Bali, Indonesia</option>
                    </select>
                  </div>

                  {/* Select 2: Duration */}
                  <div>
                    <label className="block text-[11px] lg:text-[0.72vw] font-bold text-slate-700 mb-[0.4vh]">
                      <Icon icon="lucide:calendar" className="w-3 h-3 lg:w-[0.8vw] lg:h-[0.8vw] inline text-[#FF2D75] mr-[0.2vw]" />
                      Duration
                    </label>
                    <select aria-label="Select Duration" className="w-full text-xs lg:text-[0.78vw] py-2 lg:py-[0.7vh] px-3 lg:px-[0.7vw] bg-pink-50/50 border border-pink-100 rounded-xl lg:rounded-[0.8vw] text-slate-700 focus:outline-none">
                      <option>Duration</option>
                      <option>3 - 5 Days</option>
                      <option>5 - 7 Days</option>
                      <option>7 - 10 Days</option>
                      <option>10+ Days</option>
                    </select>
                  </div>

                  {/* Select 3: Travelers */}
                  <div>
                    <label className="block text-[11px] lg:text-[0.72vw] font-bold text-slate-700 mb-[0.4vh]">
                      <Icon icon="lucide:users" className="w-3 h-3 lg:w-[0.8vw] lg:h-[0.8vw] inline text-[#FF2D75] mr-[0.2vw]" />
                      Travelers
                    </label>
                    <select aria-label="Select Travelers" className="w-full text-xs lg:text-[0.78vw] py-2 lg:py-[0.7vh] px-3 lg:px-[0.7vw] bg-pink-50/50 border border-pink-100 rounded-xl lg:rounded-[0.8vw] text-slate-700 focus:outline-none">
                      <option>Travelers</option>
                      <option>Solo Traveler</option>
                      <option>Couple (2)</option>
                      <option>Family (3 - 5)</option>
                      <option>Group (5+)</option>
                    </select>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2 sm:pt-0">
                    <label className="block text-[11px] lg:text-[0.72vw] font-bold text-transparent mb-[0.4vh] select-none">
                      Action
                    </label>
                    <button
                      type="button"
                      className="w-full py-2 lg:py-[0.7vh] px-4 bg-gradient-to-r from-[#FF2D75] to-[#FF5E97] hover:from-[#e62066] text-white text-xs lg:text-[0.78vw] font-bold rounded-xl lg:rounded-[0.8vw] shadow-md hover:scale-105 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Icon icon="lucide:sparkles" className="w-3.5 h-3.5 lg:w-[0.9vw] lg:h-[0.9vw]" />
                      <span>Create Plan</span>
                    </button>
                  </div>

                </div>

              </div>
            </div>
          </section>

        </div>

      </main>
    </>
  );
}
