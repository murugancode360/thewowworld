import Image from "next/image";
import { Icon } from "@iconify/react";
import HomeHeroSection from "@/components/HomeHeroSection";
import CanvasSection from "@/components/CanvasSection";
import PopularDestinationsSection from "@/components/PopularDestinationsSection";
import GallerySection from "@/components/GallerySection";
import BannerSection from "@/components/BannerSection";
import AosSection from "@/components/AosSection";

export default function Home() {
  return (
    <main className="w-full">
      {/* Hero Section with Typewriter and Staggered Spring Cards */}
      <HomeHeroSection />

      {/* Infinite Running Marquee Banner */}
      <div className="relative w-full z-20">
        <section className="relative w-full h-[30vh] min-h-[25vh] max-h-[25vh] bg-[#FFF5F8] select-none overflow-hidden flex items-center">
          {/* Top & Bottom Soft Blend Gradient Overlay to eliminate hard boundary lines */}
          <div className="absolute top-0 left-0 right-0 h-[3vh] bg-gradient-to-b from-[#FFF0F4] to-transparent pointer-events-none z-20" />
          <div className="absolute bottom-0 left-0 right-0 h-[3vh] bg-gradient-to-t from-[#FFF0F4] to-transparent pointer-events-none z-20" />

          {/* Full Height Moving Background Stream with WebP Banner */}
          <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden flex">
            <div className="animate-marquee-right flex w-max h-full">
              {Array.from({ length: 4 }).map((_, idx) => (
                <div key={idx} className="relative h-full w-[100vw] flex-shrink-0">
                  <Image
                    src="/Home/marqueeBanner.webp"
                    alt="Marquee Background Doodle"
                    fill
                    className={`object-cover object-center blur-[0.5px] ${idx % 2 === 1 ? "scale-x-[-1]" : ""}`}
                    unoptimized
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Running Stream: Stylish Typography + Icons + Edge Photos */}
          <div className="animate-marquee-right flex items-center whitespace-nowrap z-10 w-max h-full">
            {Array.from({ length: 4 }).map((_, loopIdx) => (
              <div key={loopIdx} className="flex items-center gap-[4vw] px-[3vw] h-full">

                {/* Image 1 (Maldives - Top Edge Pinned to Border) */}
                <div className="self-start flex-shrink-0 -mt-[5vh]">
                  <div className="w-[16vw] min-w-[150px] h-[11vw] min-h-[110px] bg-white p-[0.4vw] rounded-[0.8vw] shadow-xl transform -rotate-[16deg] flex-shrink-0">
                    <div className="relative w-full h-full rounded-[0.6vw] overflow-hidden">
                      <Image src="/Home/hero/maldives.webp" alt="Maldives Beach" fill className="object-cover" unoptimized />
                    </div>
                  </div>
                </div>

                {/* EXPLORE (Odd: Font 1 - Pacifico Script, Pink) */}
                <span className="font-pacifico text-[#FF2A75] text-[7.5vw] tracking-wide drop-shadow-sm normal-case">
                  Explore
                </span>

                {/* ✦ Star Icon */}
                <Icon icon="ph:sparkle-fill" className="w-[3.2vw] h-[3.2vw] text-black" />

                {/* DISCOVER (Even: Font 2 - Abril Display, Black) */}
                <span className="font-special-elite text-bold text-gray-700 text-[7.5vw] tracking-tight drop-shadow-sm uppercase">
                  DISCOVER
                </span>

                {/* ✈ Airplane Icon */}
                <Icon icon="ph:airplane-tilt-fill" className="w-[3.4vw] h-[3.4vw] text-[#FF2A75]" />

                {/* Image 2 (Paris - Bottom Edge Pinned to Border) */}
                <div className="self-end flex-shrink-0 -mb-[5vh]">
                  <div className="w-[16vw] min-w-[150px] h-[11vw] min-h-[110px] bg-white p-[0.4vw] rounded-[0.8vw] shadow-xl transform rotate-[16deg] flex-shrink-0">
                    <div className="relative w-full h-full rounded-[0.6vw] overflow-hidden">
                      <Image src="/Home/hero/paris.webp" alt="Paris Sunset" fill className="object-cover" unoptimized />
                    </div>
                  </div>
                </div>

                {/* TRAVEL (Odd: Font 1 - Pacifico Script, Pink) */}
                <span className="font-pacifico text-[#FF2A75] text-[7.5vw] tracking-wide drop-shadow-sm normal-case">
                  Travel
                </span>

                {/* ✦ Star Icon */}
                <Icon icon="ph:sparkle-fill" className="w-[3.2vw] h-[3.2vw] text-black" />

                {/* EXPERIENCE (Even: Font 2 - Abril Display, Black) */}
                <span className="font-special-elite text-bold text-gray-700 text-[7.5vw] tracking-tight drop-shadow-sm uppercase">
                  EXPERIENCE
                </span>

                {/* ♡ Heart Icon */}
                <Icon icon="ph:heart-fill" className="w-[3.4vw] h-[3.4vw] text-[#FF2A75]" />

                {/* ADVENTURE (Odd: Font 1 - Pacifico Script, Pink) */}
                <span className="font-pacifico text-[#FF2A75] text-[7.5vw] tracking-wide drop-shadow-sm normal-case">
                  Adventure
                </span>

                {/* ✦ Star Icon */}
                <Icon icon="ph:sparkle-fill" className="w-[3.2vw] h-[3.2vw] text-black" />

                {/* CREATE MEMORIES (Even: Font 2 - Abril Display, Black) */}
                <span className="font-special-elite text-bold text-gray-700 text-[7.5vw] tracking-tight drop-shadow-sm uppercase">
                  CREATE MEMORIES
                </span>

                {/* ✈ Airplane Icon */}
                <Icon icon="ph:airplane-tilt-fill" className="w-[3.4vw] h-[3.4vw] text-[#FF2A75]" />

              </div>
            ))}
          </div>
        </section>

          {/* Bottom Smooth Merge Transition (Marquee into Bottom Section) */}
        </div>

      {/* Section 2: Popular Destinations Curved Fan-Out Carousel Experience */}
      <PopularDestinationsSection />

      {/* Section 3: Scroll-Driven 240-Frame Interactive Canvas Experience */}
      <AosSection animation="fade" duration={800}>
        <CanvasSection />
      </AosSection>

      {/* Section 4: Interactive Three.js Shader Gallery Section */}
      <GallerySection />

      {/* Section 5: Home Page Bottom Promotional Banner Section with Floating Paper Doodles */}
      <BannerSection />
    </main>
  );
}



