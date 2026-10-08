"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";

interface Destination {
  id: string;
  name: string;
  country: string;
  image: string;
  isPopular?: boolean;
}

const destinationsData: Destination[] = [
  {
    id: "bali",
    name: "Bali",
    country: "Indonesia",
    image: "/Home/destinations/bali.webp"
  },
  {
    id: "paris",
    name: "Paris",
    country: "France",
    image: "/Home/hero/paris.webp"
  },
  {
    id: "santorini",
    name: "Santorini",
    country: "Greece",
    image: "/Home/destinations/santorini.webp",
    isPopular: true
  },
  {
    id: "switzerland",
    name: "Switzerland",
    country: "Europe",
    image: "/Home/destinations/switzerland.webp"
  },
  {
    id: "italy",
    name: "Italy",
    country: "Europe",
    image: "/Home/destinations/italy.webp"
  },
  {
    id: "japan",
    name: "Kyoto",
    country: "Japan",
    image: "/Home/hero/japan.webp"
  },
  {
    id: "maldives",
    name: "Maldives",
    country: "South Asia",
    image: "/Home/hero/maldives.webp",
    isPopular: true
  },
  {
    id: "tokyo",
    name: "Tokyo",
    country: "Japan",
    image: "/Home/hero/japan.webp"
  }
];

export default function PopularDestinationsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(2); // Santorini active initially
  const [isPaused, setIsPaused] = useState(false);

  // Staggered Entrance Animation States
  const [titleVisible, setTitleVisible] = useState(false);
  const [subtitleVisible, setSubtitleVisible] = useState(false);
  const [revealedCards, setRevealedCards] = useState(0); // 0 to 5
  const [carouselStarted, setCarouselStarted] = useState(false);

  const timeoutIdsRef = useRef<NodeJS.Timeout[]>([]);
  const isPlayingRef = useRef(false);
  const hasPlayedRef = useRef(false);

  const clearAllTimeouts = () => {
    timeoutIdsRef.current.forEach((t) => clearTimeout(t));
    timeoutIdsRef.current = [];
  };

  // Scroll Detection:
  // - Plays animation whenever scrolling DOWN into this section
  // - NEVER plays or resets when scrolling from bottom to top
  // - Resets only when returning to the very top (Hero section) so scrolling down again replays
  useEffect(() => {
    let lastScrollY = typeof window !== "undefined" ? window.scrollY : 0;

    const playAnimationSequence = () => {
      isPlayingRef.current = true;
      hasPlayedRef.current = true;
      clearAllTimeouts();

      // 1. Dramatic reveal of First Line: "Top Travel Destinations"
      setTitleVisible(true);

      // 2. Next line subtitle slides up and unblurs
      const t1 = setTimeout(() => {
        setSubtitleVisible(true);
      }, 350);

      // 3. Cards spring up one by one with elastic bounce physics
      const t2 = setTimeout(() => setRevealedCards(1), 600);
      const t3 = setTimeout(() => setRevealedCards(2), 760);
      const t4 = setTimeout(() => setRevealedCards(3), 920);
      const t5 = setTimeout(() => setRevealedCards(4), 1080);
      const t6 = setTimeout(() => setRevealedCards(5), 1240);

      // 4. Start carousel auto-rotation automatically once cards have entered
      const t7 = setTimeout(() => {
        setCarouselStarted(true);
        isPlayingRef.current = false;
      }, 1700);

      timeoutIdsRef.current.push(t1, t2, t3, t4, t5, t6, t7);
    };

    const handleScroll = () => {
      if (typeof window === "undefined") return;
      const currentY = window.scrollY;
      const isScrollingDown = currentY >= lastScrollY;
      lastScrollY = currentY;

      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();

        // Reset quietly when user has scrolled above this section
        // When scrolling bottom-to-top, rect.top is <= 0 or inside viewport, so it NEVER resets or replays!
        if (rect.top >= window.innerHeight * 0.95 || currentY < 180) {
          if (hasPlayedRef.current) {
            hasPlayedRef.current = false;
            isPlayingRef.current = false;
            clearAllTimeouts();
            setTitleVisible(false);
            setSubtitleVisible(false);
            setRevealedCards(0);
            setCarouselStarted(false);
          }
        }

        // Trigger animation whenever scrolling DOWN into this section
        if (
          isScrollingDown &&
          !hasPlayedRef.current &&
          !isPlayingRef.current &&
          rect.top <= window.innerHeight * 0.78 &&
          rect.bottom >= 0
        ) {
          playAnimationSequence();
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Check initially in case page was loaded or refreshed directly at this position
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearAllTimeouts();
    };
  }, []);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : destinationsData.length - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev < destinationsData.length - 1 ? prev + 1 : 0));
  };

  // Automatic Smooth Sliding to the Left every 3.5 seconds (only after carouselStarted is true)
  useEffect(() => {
    if (!carouselStarted || isPaused) return;
    const interval = setInterval(() => {
      handleNext();
    }, 3500);
    return () => clearInterval(interval);
  }, [carouselStarted, isPaused, activeIndex]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[100vh] min-h-[100vh] max-h-[100vh] bg-[#FFF0F4] py-[6vh] px-[4vw] overflow-hidden flex flex-col items-center select-none z-10"
    >
      {/* Background Graphic Stream (section2bg.webp) with Soft Faded Edge Blends */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <Image
          src="/Home/section2bg.webp"
          alt="Popular Destinations Background"
          fill
          className="object-cover object-center opacity-90"
          unoptimized
        />
        <div className="absolute top-0 left-0 right-0 h-[4vh] bg-gradient-to-b from-[#FFF0F4] to-transparent z-10" />
        <div className="absolute bottom-0 left-0 right-0 h-[4vh] bg-gradient-to-t from-[#FFF0F4] to-transparent z-10" />
      </div>

      {/* Main Header Container with Staggered Entrance */}
      <div className="relative z-10 flex flex-col items-center text-center w-full">
        {/* Stacked Heading: Faded "Destinations" + Foreground "Top Travel" (1st Line) */}
        <div className="relative flex flex-col items-center justify-center mt-[6vw] mb-[4vw] w-full">
          {/* Faded Background Text with Dramatic Zoom, Blur & Fade */}
          <h2
            className={`text-[clamp(75px,14vw,190px)] font-black text-[#FFB6C1] tracking-normal italic leading-none select-none [mask-image:linear-gradient(to_bottom,rgba(0,0,0,1)_40%,rgba(0,0,0,0.15)_85%,rgba(0,0,0,0)_100%)] [-webkit-mask-image:linear-gradient(to_bottom,rgba(0,0,0,1)_40%,rgba(0,0,0,0.15)_85%,rgba(0,0,0,0)_100%)] transition-all duration-900 ease-out ${
              titleVisible
                ? "opacity-100 scale-100 translate-y-0 blur-none"
                : "opacity-0 scale-90 translate-y-12 blur-sm"
            }`}
          >
            Destinations
          </h2>

          {/* Foreground Script Title with Elastic Spring Entrance */}
          <div
            className={`absolute top-[10%] left-[50%] transform -translate-x-[50%] whitespace-nowrap flex items-center gap-2 z-20 transition-all duration-900 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
              titleVisible
                ? "opacity-100 -translate-y-[55%] scale-100 rotate-0"
                : "opacity-0 -translate-y-[110%] scale-75 -rotate-6"
            }`}
          >
            <span className="text-[clamp(42px,7.5vw,95px)] font-bold text-[#141416]/80 italic font-serif tracking-tight drop-shadow-sm">
              Top Travel
            </span>
          </div>

          {/* Subtitle (Next Line): Fades in smoothly after the title */}
          <p
            className={`absolute -bottom-[5%] left-[50%] transform -translate-x-[50%] z-20 text-[clamp(15px,1.5vw,17px)] text-gray-600 font-semibold tracking-wide whitespace-nowrap transition-all duration-700 ease-out ${
              subtitleVisible
                ? "opacity-100 translate-y-0 blur-none"
                : "opacity-0 translate-y-8 blur-xs"
            }`}
          >
            Explore breathtaking places, create unforgettable memories.
          </p>
        </div>
      </div>

      {/* Interactive Destination Cards Fan-Out Carousel Container */}
      <div
        className="relative z-10 w-full max-w-[1400px] flex items-center justify-center px-[2vw]"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Left Arrow Button with Pop-in Entrance */}
        <button
          onClick={handlePrev}
          aria-label="Previous Destination"
          className={`absolute left-[1vw] z-40 w-12 h-12 rounded-full bg-white/90 backdrop-blur-md border border-white shadow-[0_8px_20px_rgba(0,0,0,0.1)] text-gray-700 hover:bg-[#FF2A75] hover:text-white transition-all duration-500 flex items-center justify-center group cursor-pointer hover:scale-110 ${
            carouselStarted ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-75 pointer-events-none"
          }`}
        >
          <Icon icon="ph:arrow-left-bold" className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
        </button>

        {/* Absolute Position Stacking Container - 5 Visible Arched Cards with Dramatic Spring Stagger */}
        <div className="relative w-full h-[360px] md:h-[420px] flex items-center justify-center overflow-visible">
          {destinationsData.map((item, i) => {
            // Pos calculation: (i - activeIndex + length) % length
            const rawPos = (i - activeIndex + destinationsData.length) % destinationsData.length;

            // Compute relative offset index centered at 0 (-2, -1, 0, 1, 2)
            let relativeOffset = rawPos;
            if (rawPos > destinationsData.length / 2) {
              relativeOffset = rawPos - destinationsData.length;
            }

            const absOffset = Math.abs(relativeOffset);
            const isCenter = relativeOffset === 0;

            // Slot index: 0 (-2), 1 (-1), 2 (0), 3 (1), 4 (2)
            const slotIndex = relativeOffset + 2;
            const isCardRevealed = revealedCards > slotIndex;

            // 5 Visible Card Slots: -2 (far left), -1 (left), 0 (center), 1 (right), 2 (far right)
            let posX = relativeOffset * 220; // 220px step distance per slot
            let posY = isCenter ? -10 : absOffset * 12; // Arched vertical curve
            let scale = isCenter ? 1.05 : absOffset === 1 ? 0.88 : 0.76; // Card scaling
            let rotate = relativeOffset * 4.5; // Fan-out rotation
            let baseOpacity = absOffset <= 2 ? 1 : 0; // Show 5 cards, hide offscreen
            let zIndex = isCenter ? 30 : 30 - absOffset * 10;

            // Dynamic size classes
            const widthClass = isCenter
              ? "w-[15vw] min-w-[185px]"
              : absOffset === 1
              ? "w-[13vw] min-w-[160px]"
              : "w-[11.5vw] min-w-[140px]";

            const heightClass = isCenter
              ? "h-[19.5vw] min-h-[245px]"
              : absOffset === 1
              ? "h-[17vw] min-h-[215px]"
              : "h-[15vw] min-h-[190px]";

            // Dramatic, highly visible spring entrance before reveal
            const currentOpacity = isCardRevealed ? baseOpacity : 0;
            const currentTransform = isCardRevealed
              ? `translate(-50%, -50%) translate3d(${posX}px, ${posY}px, 0px) scale(${scale}) rotate(${rotate}deg)`
              : `translate(-50%, -50%) translate3d(${posX}px, ${posY + 140}px, 0px) scale(${scale * 0.55}) rotate(${rotate + (relativeOffset < 0 ? -18 : 18)}deg)`;
            const currentFilter = isCardRevealed ? "blur(0px)" : "blur(6px)";

            const transitionStyle = carouselStarted
              ? "all 1.2s cubic-bezier(0.4, 0, 0.2, 1)"
              : "transform 0.85s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.75s ease-out, filter 0.65s ease-out";

            return (
              <div
                key={item.id}
                onClick={() => setActiveIndex(i)}
                style={{
                  transform: currentTransform,
                  opacity: currentOpacity,
                  filter: currentFilter,
                  zIndex: zIndex,
                  transition: transitionStyle,
                }}
                className={`absolute top-[50%] left-[50%] flex-shrink-0 cursor-pointer rounded-[26px] bg-white p-[8px] shadow-[0_20px_50px_rgba(255,42,117,0.14)] border-2 border-white ${widthClass} ${heightClass} ${
                  isCenter
                    ? "shadow-[0_30px_60px_rgba(255,42,117,0.28)] border-[#FF2A75]/50 z-30"
                    : "hover:border-[#FF2A75]/30"
                }`}
              >
                {/* Most Popular Badge */}
                {item.isPopular && (
                  <div className="absolute top-[14px] left-[14px] z-20 flex items-center gap-1.5 bg-[#FF2A75] text-white px-3 py-1 rounded-full text-[11px] font-bold shadow-md">
                    <span className="text-xs">🔥</span>
                    <span>Most Popular</span>
                  </div>
                )}

                {/* Inner Image Container */}
                <div className="relative w-full h-[calc(100%-60px)] rounded-[20px] overflow-hidden bg-gray-100">
                  <Image
                    src={item.image}
                    alt={`${item.name}, ${item.country}`}
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-110"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Bottom Floating Info Pill with Pink Glow Shadow on Hover */}
                <div className="absolute bottom-[8px] left-[8px] right-[8px] bg-white/95 backdrop-blur-md rounded-[16px] p-2.5 shadow-md hover:shadow-[0_8px_25px_rgba(255,42,117,0.35)] flex items-center justify-between border border-white/80 hover:border-[#FF2A75]/40 transition-all duration-300 group/pill">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-[#FF2A75]/10 flex items-center justify-center flex-shrink-0">
                      <Icon icon="ph:map-pin-fill" className="w-3.5 h-3.5 text-[#FF2A75]" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-extrabold text-[#141416] leading-tight">
                        {item.name}
                      </span>
                      <span className="text-[10px] font-medium text-gray-500">
                        {item.country}
                      </span>
                    </div>
                  </div>

                  {/* Arrow Action Button with Pink Faded Glow Shadow on Hover */}
                  <div className="w-7 h-7 rounded-full bg-[#FF2A75] text-white flex items-center justify-center shadow-sm hover:scale-115 hover:shadow-[0_0_16px_rgba(255,42,117,0.8)] transition-all duration-300">
                    <Icon icon="ph:arrow-right-bold" className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Arrow Button with Pop-in Entrance */}
        <button
          onClick={handleNext}
          aria-label="Next Destination"
          className={`absolute right-[1vw] z-40 w-12 h-12 rounded-full bg-white/90 backdrop-blur-md border border-white shadow-[0_8px_20px_rgba(0,0,0,0.1)] text-gray-700 hover:bg-[#FF2A75] hover:text-white transition-all duration-500 flex items-center justify-center group cursor-pointer hover:scale-110 ${
            carouselStarted ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-75 pointer-events-none"
          }`}
        >
          <Icon icon="ph:arrow-right-bold" className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </section>
  );
}
