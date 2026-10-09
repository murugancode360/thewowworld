"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { scrollToPageTop } from "@/components/SmoothScroll";

export default function HomeHeroSection() {
  // Typing state for Left Side Headlines & Description
  const [typedLine1, setTypedLine1] = useState("");
  const [typedLine2, setTypedLine2] = useState("");
  const [typedLine3, setTypedLine3] = useState("");
  const [typedDesc, setTypedDesc] = useState("");
  const [cursorLine, setCursorLine] = useState<1 | 2 | 3 | 4 | 0>(1);
  const [isActivelyTyping, setIsActivelyTyping] = useState(true);

  // Staggered reveal flags for Left Side
  const [showDoodleTop, setShowDoodleTop] = useState(false);
  const [showFeature1, setShowFeature1] = useState(false);
  const [showFeature2, setShowFeature2] = useState(false);
  const [showFeature3, setShowFeature3] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);

  // Staggered reveal flags for Right Side
  const [showPinkLayout, setShowPinkLayout] = useState(false);
  const [showAirplane, setShowAirplane] = useState(false);
  const [showCard1, setShowCard1] = useState(false);
  const [showCard2, setShowCard2] = useState(false);
  const [showCard3, setShowCard3] = useState(false);
  const [showMomentsDoodle, setShowMomentsDoodle] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const line1Full = "Your Next";
    const line2Full = "Adventure";
    const line3Full = "Starts Here";
    const descFull =
      "Fly to breathtaking destinations, explore new cultures, and create memories that last a lifetime.";

    const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

    async function runSequence() {
      // 1. Instant start on load: reveal top script doodle and right-side pink layout artwork immediately
      setShowDoodleTop(true);
      setShowPinkLayout(true);
      await wait(20);
      if (!isMounted) return;

      // 2. Type Line 1: "Your Next" briskly & smoothly (18ms per char)
      setIsActivelyTyping(true);
      for (let i = 1; i <= line1Full.length; i++) {
        if (!isMounted) return;
        setTypedLine1(line1Full.slice(0, i));
        await wait(18);
      }

      // 3. Move cursor to Line 2 and type "Adventure", trigger Airplane swoop
      if (!isMounted) return;
      setCursorLine(2);
      setShowAirplane(true);
      await wait(35);

      for (let i = 1; i <= line2Full.length; i++) {
        if (!isMounted) return;
        setTypedLine2(line2Full.slice(0, i));
        await wait(20);
      }

      // 4. Move cursor to Line 3 and type "Starts Here"
      if (!isMounted) return;
      setCursorLine(3);
      await wait(35);

      for (let i = 1; i <= line3Full.length; i++) {
        if (!isMounted) return;
        setTypedLine3(line3Full.slice(0, i));
        await wait(18);
      }

      // Pop Card 1 (Maldives) with bouncy spring physics right as headline completes
      if (!isMounted) return;
      setShowCard1(true);

      // 5. Move cursor to Subheadline Description
      setCursorLine(4);
      await wait(45);

      // Stream description smoothly character-by-character (11ms per char)
      const totalChars = descFull.length;
      const card2Threshold = Math.floor(totalChars * 0.35);
      const card3Threshold = Math.floor(totalChars * 0.7);

      for (let i = 1; i <= totalChars; i++) {
        if (!isMounted) return;
        setTypedDesc(descFull.slice(0, i));
        if (i === card2Threshold) setShowCard2(true);
        if (i === card3Threshold) setShowCard3(true);
        await wait(11);
      }

      setIsActivelyTyping(false);

      // Fade out cursor after brief pause
      if (!isMounted) return;
      setTimeout(() => {
        if (isMounted) setCursorLine(0);
      }, 800);

      // 6. Left side features and action elements appear one by one
      await wait(80);
      if (!isMounted) return;
      setShowFeature1(true);

      await wait(120);
      if (!isMounted) return;
      setShowFeature2(true);

      await wait(120);
      if (!isMounted) return;
      setShowFeature3(true);

      await wait(150);
      if (!isMounted) return;
      setShowButton(true);

      await wait(140);
      if (!isMounted) return;
      setShowScrollIndicator(true);
      setShowMomentsDoodle(true);
    }

    runSequence();

    return () => {
      isMounted = false;
    };
  }, []);

  const renderCursor = (lineNum: number) => {
    if (cursorLine !== lineNum) return null;
    return (
      <span
        className={`inline-block w-[0.25vw] min-w-[3px] h-[0.88em] bg-[#FF2A75] ml-[0.35vw] align-middle rounded-sm shadow-[0_0_14px_#FF2A75] transition-opacity duration-150 ${
          isActivelyTyping ? "opacity-100" : "animate-pulse"
        }`}
        aria-hidden="true"
      />
    );
  };

  return (
    <section className="relative w-full min-h-[calc(100vh-5.5vh)] overflow-hidden bg-black flex flex-col justify-between select-none">
      {/* Animated Hero Background */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <Image
          src="/Home/hero/bg.svg"
          alt="The Wow World Hero Background"
          fill
          priority
          className="object-cover object-center"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/10" />
      </div>

      {/* Main Hero Container */}
      <div className="relative z-10 w-full px-[3.5vw] pt-[4vh] flex flex-col justify-between">
        {/* Upper Content Area: Left Content + Airplane + Right Polaroids */}
        <div className="relative w-full flex items-start justify-between gap-[2vw]">
          {/* Left Hero Column */}
          <div className="w-[58%] flex flex-col items-start z-30">
            {/* Top Script Doodle: New Horizons Same You */}
            <div
              className={`relative h-[17vh] mb-[0.5vh] transition-all duration-700 ease-out ${
                showDoodleTop ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
              }`}
            >
              <Image
                src="/Home/hero/newHorizons_animated.svg"
                alt="New Horizons Same You"
                width={260}
                height={70}
                className="w-auto h-full object-contain object-left"
                priority
                unoptimized
              />
            </div>

            {/* Main Headline with Typewriter Animation */}
            <h1 className="flex flex-col items-start leading-none tracking-tight font-extrabold text-white drop-shadow-md mt-[.3vh]">
              {/* Line 1: Your Next */}
              <span className="text-[4vw] font-bold text-white leading-[1.05] min-h-[4.2vw] flex items-center">
                {typedLine1}
                {renderCursor(1)}
              </span>

              {/* Line 2: Adventure (Gradient) */}
              <span className="text-[6vw] font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FFA0C5] via-[#FF4085] to-[#F51666] leading-[0.92] tracking-tight my-[0.2vh] drop-shadow-[0_4px_12px_rgba(0,0,0,0.55)] min-h-[5.8vw] flex items-center">
                {typedLine2}
                {renderCursor(2)}
              </span>

              {/* Line 3: Starts Here */}
              <span className="text-[4vw] font-bold text-white leading-[1.05] min-h-[4.2vw] flex items-center">
                {typedLine3}
                {renderCursor(3)}
              </span>
            </h1>

            {/* Subheadline Description with Smooth Typewriter Effect */}
            <p className="mt-[1.8vh] text-white/90 text-[1.1vw] max-w-[32vw] font-normal leading-relaxed text-shadow-sm min-h-[3.6vh]">
              {typedDesc}
              {renderCursor(4)}
            </p>

            {/* Features Row: Appears One by One */}
            <div className="mt-[5vh] flex items-center gap-[1.8vw] text-[0.85vw] font-semibold text-white">
              {/* Feature 1: Global Destinations */}
              <div
                className={`flex items-center gap-[0.7vw] transition-all duration-600 ease-out ${
                  showFeature1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
                }`}
              >
                <Image
                  src="/Home/hero/flightIcon.webp"
                  alt="Global Destinations"
                  width={32}
                  height={32}
                  className="w-[2.2vw] h-[2.2vw] object-contain"
                />
                <div className="flex flex-col leading-tight">
                  <span>Global</span>
                  <span>Destinations</span>
                </div>
              </div>

              <div
                className={`h-[6vh] w-[1px] bg-white/35 transition-opacity duration-500 ${
                  showFeature2 ? "opacity-100" : "opacity-0"
                }`}
              />

              {/* Feature 2: Safe & Reliable Travel */}
              <div
                className={`flex items-center gap-[0.7vw] transition-all duration-600 ease-out ${
                  showFeature2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
                }`}
              >
                <Image
                  src="/Home/hero/shield.webp"
                  alt="Safe & Reliable Travel"
                  width={32}
                  height={32}
                  className="w-[2.2vw] h-[2.2vw] object-contain"
                />
                <div className="flex flex-col leading-tight">
                  <span>Safe &amp; Reliable</span>
                  <span>Travel</span>
                </div>
              </div>

              <div
                className={`h-[6vh] w-[1px] bg-white/35 transition-opacity duration-500 ${
                  showFeature3 ? "opacity-100" : "opacity-0"
                }`}
              />

              {/* Feature 3: 24/7 Support */}
              <div
                className={`flex items-center gap-[0.7vw] transition-all duration-600 ease-out ${
                  showFeature3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
                }`}
              >
                <Image
                  src="/Home/hero/headset.webp"
                  alt="24/7 Support"
                  width={32}
                  height={32}
                  className="w-[2.2vw] h-[2.2vw] object-contain"
                />
                <div className="flex flex-col leading-tight">
                  <span>24/7</span>
                  <span>Support</span>
                </div>
              </div>
            </div>

            {/* Explore Packages Button: Pops in smoothly with silver shine */}
            <div
              className={`transition-all duration-700 ease-out ${
                showButton ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-6 scale-95"
              }`}
            >
              <Link
                href="/explore"
                onClick={() => scrollToPageTop(true)}
                className="mt-[3.5vh] relative overflow-hidden px-[1.6vw] py-[0.65vw] bg-white/15 hover:bg-white/25 backdrop-blur-md text-white font-extrabold text-[1vw] rounded-lg border border-white/40 hover:border-white/70 shadow-[0_8px_25px_rgba(0,0,0,0.2)] hover:shadow-[0_0_25px_rgba(255,255,255,0.4)] flex items-center gap-[0.6vw] transition-all duration-300 hover:scale-105 group cursor-pointer z-20 inline-flex"
              >
                {/* Infinite Silver Metallic Shimmer Wave Sweep (Left to Right) */}
                <span className="absolute top-0 bottom-0 left-0 w-[40%] bg-gradient-to-r from-transparent via-white/50 to-transparent animate-silver-shine pointer-events-none" />

                <span className="relative z-10 tracking-wide drop-shadow-sm">Explore Packages</span>
                <Icon icon="lucide:arrow-right" className="relative z-10 w-[1.2vw] h-[1.2vw] text-white" />
              </Link>
            </div>

            {/* Scroll to explore indicator */}
            <div
              onClick={() => {
                const target = document.getElementById("popular-destinations-section") || document.querySelector("section:nth-of-type(2)");
                if (target) {
                  target.scrollIntoView({ behavior: "smooth" });
                } else {
                  window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
                }
              }}
              className={`mt-[6vh] flex items-center gap-[0.7vw] group cursor-pointer z-20 transition-all duration-700 ease-out ${
                showScrollIndicator ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
              }`}
            >
              <div className="w-[2.2vw] h-[2.2vw] rounded-full border border-white/40 bg-white/10 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-white/20 transition-all shadow-md">
                <Icon icon="lucide:arrow-down" className="w-[1.4vw] h-[1.4vw] animate-bounce" />
              </div>
              <div className="relative h-[6vh]">
                <Image
                  src="/Home/hero/scroll_to_explore.svg"
                  alt="Scroll to explore more"
                  width={180}
                  height={40}
                  className="w-auto h-full object-contain object-left"
                  unoptimized
                />
              </div>
            </div>
          </div>

          {/* Right Column: Floating 3D Red Airplane & Polaroid Cards */}
          <div className="w-[40%] relative flex flex-col items-center justify-center min-h-[50vh]">
            {/* Center Floating 3D Red Airplane with Flight Swoop entrance */}
            <div
              className={`absolute top-[10vh] -left-[15vw] w-[38vw] h-auto z-10 pointer-events-none transition-all duration-1100 ease-out ${
                showAirplane
                  ? "opacity-100 translate-x-0 translate-y-0 scale-100 animate-airplane-flight"
                  : "opacity-0 -translate-x-[16vw] -translate-y-[8vh] scale-75"
              }`}
            >
              <Image
                src="/Home/hero/flight.webp"
                alt="TourVista Red Airplane"
                width={620}
                height={380}
                priority
                className="object-contain drop-shadow-2xl"
                unoptimized
              />
            </div>

            {/* Right Side Stacked Polaroid Cards & Cloud Artwork */}
            <div
              className={`absolute -right-[3.5vw] -top-[2vh] w-[33vw] h-[72vh] transition-all duration-1000 ease-out ${
                showPinkLayout ? "opacity-100 scale-100" : "opacity-0 scale-90"
              }`}
            >
              {/* Background Cloud & Illustration Artwork */}
              <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
                <Image
                  src="/Home/hero/rightside.webp"
                  alt="TourVista Destinations Cloud Background"
                  fill
                  className="object-contain object-right"
                  priority
                  unoptimized
                />
              </div>

              {/* Dream Explore Discover Top Annotation */}
              <div
                className={`absolute top-[1vh] right-[10vw] h-[18vh] z-30 pointer-events-none transition-all duration-700 delay-200 ${
                  showPinkLayout ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
                }`}
              >
                <Image
                  src="/Home/hero/dream_explore.svg"
                  alt="Dream Explore Discover"
                  width={240}
                  height={60}
                  className="w-auto h-full object-contain object-right"
                  unoptimized
                />
              </div>

              {/* Right Side 3 Polaroid Cards Stack with Spring Elastic Pop Entrance */}
              <div className="relative w-full h-full flex flex-col justify-between py-[12vh] px-[3vw] z-20">
                {/* Card 1: Maldives */}
                <Link
                  href="/explore/maldives-paradise"
                  onClick={() => scrollToPageTop(true)}
                  className={`w-[7vw] bg-white p-[0.3vw] pb-[0.45vw] rounded-[0.5vw] shadow-[0_12px_28px_rgba(0,0,0,0.4)] z-20 self-end -mr-[2.5vw] transition-all duration-800 ease-[cubic-bezier(0.34,1.56,0.64,1)] group/card ${
                    showCard1
                      ? "opacity-100 scale-100 rotate-[-5deg] hover:rotate-[0deg] hover:scale-110 cursor-pointer animate-polaroid-1"
                      : "opacity-0 scale-25 -translate-y-16 -rotate-25 pointer-events-none"
                  }`}
                >
                  <div className="relative w-full h-[5.8vw] rounded-[0.35vw] overflow-hidden">
                    <Image src="/Home/hero/maldives.webp" alt="Maldives" fill className="object-cover group-hover/card:scale-110 transition-transform duration-500" unoptimized />
                  </div>
                  <div className="flex items-center justify-between mt-[0.3vw] px-[0.15vw]">
                    <div className="flex items-center gap-[0.15vw]">
                      <Icon icon="ph:map-pin-fill" className="w-[0.55vw] h-[0.55vw] text-[#FF2A75]" />
                      <span className="text-[0.52vw] font-extrabold text-gray-800 tracking-tight group-hover/card:text-[#FF2A75] transition-colors">Maldives</span>
                    </div>
                    <Icon
                      icon="ph:arrow-right-bold"
                      className="w-[0.55vw] h-[0.55vw] text-gray-400 group-hover/card:text-[#FF2A75] transition-colors"
                    />
                  </div>
                </Link>

                {/* Card 2: Paris */}
                <Link
                  href="/explore"
                  onClick={() => scrollToPageTop(true)}
                  className={`w-[7vw] bg-white p-[0.3vw] pb-[0.45vw] mt-[3vh] rounded-[0.5vw] shadow-[0_12px_28px_rgba(0,0,0,0.4)] z-20 self-center ml-[10vw] transition-all duration-800 ease-[cubic-bezier(0.34,1.56,0.64,1)] group/card ${
                    showCard2
                      ? "opacity-100 scale-100 -rotate-[2deg] hover:rotate-[0deg] hover:scale-110 cursor-pointer animate-polaroid-2"
                      : "opacity-0 scale-25 -translate-y-16 rotate-20 pointer-events-none"
                  }`}
                >
                  <div className="relative w-full h-[6.1vw] rounded-[0.35vw] overflow-hidden">
                    <Image src="/Home/hero/paris.webp" alt="Paris" fill className="object-cover group-hover/card:scale-110 transition-transform duration-500" unoptimized />
                  </div>
                  <div className="flex items-center justify-between mt-[0.3vw] px-[0.15vw]">
                    <div className="flex items-center gap-[0.15vw]">
                      <Icon icon="ph:map-pin-fill" className="w-[0.55vw] h-[0.55vw] text-[#FF2A75]" />
                      <span className="text-[0.52vw] font-extrabold text-gray-800 tracking-tight group-hover/card:text-[#FF2A75] transition-colors">Paris</span>
                    </div>
                    <Icon
                      icon="ph:arrow-right-bold"
                      className="w-[0.55vw] h-[0.55vw] text-gray-400 group-hover/card:text-[#FF2A75] transition-colors"
                    />
                  </div>
                </Link>

                {/* Card 3: Japan */}
                <Link
                  href="/explore"
                  onClick={() => scrollToPageTop(true)}
                  className={`w-[7vw] bg-white p-[0.3vw] pb-[0.45vw] mt-[2vh] rounded-[0.5vw] shadow-[0_12px_28px_rgba(0,0,0,0.4)] z-20 self-end -mr-[2vw] transition-all duration-800 ease-[cubic-bezier(0.34,1.56,0.64,1)] group/card ${
                    showCard3
                      ? "opacity-100 scale-100 rotate-[4deg] hover:rotate-[0deg] hover:scale-110 cursor-pointer animate-polaroid-3"
                      : "opacity-0 scale-25 -translate-y-16 -rotate-20 pointer-events-none"
                  }`}
                >
                  <div className="relative w-full h-[5.8vw] rounded-[0.35vw] overflow-hidden">
                    <Image src="/Home/hero/japan.webp" alt="Japan" fill className="object-cover group-hover/card:scale-110 transition-transform duration-500" unoptimized />
                  </div>
                  <div className="flex items-center justify-between mt-[0.3vw] px-[0.15vw]">
                    <div className="flex items-center gap-[0.15vw]">
                      <Icon icon="ph:map-pin-fill" className="w-[0.55vw] h-[0.55vw] text-[#FF2A75]" />
                      <span className="text-[0.52vw] font-extrabold text-gray-800 tracking-tight group-hover/card:text-[#FF2A75] transition-colors">Japan</span>
                    </div>
                    <Icon
                      icon="ph:arrow-right-bold"
                      className="w-[0.55vw] h-[0.55vw] text-gray-400 group-hover/card:text-[#FF2A75] transition-colors"
                    />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Right Annotation */}
        <div
          className={`absolute right-[9vw] bottom-[5vh] z-20 transition-all duration-700 ease-out ${
            showMomentsDoodle ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="relative h-[16vh]">
            <Image
              src="/Home/hero/Collect_moments.svg"
              alt="Collect Moments Not Things"
              width={220}
              height={70}
              className="w-auto h-full object-contain object-right"
              unoptimized
            />
          </div>
        </div>
      </div>
    </section>
  );
}
