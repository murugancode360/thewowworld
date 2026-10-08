"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  // Staggered Entrance Animation States
  const [frameVisible, setFrameVisible] = useState(false);
  const [col1Visible, setCol1Visible] = useState(false);
  const [col2Visible, setCol2Visible] = useState(false);
  const [col3Visible, setCol3Visible] = useState(false);
  const [col4Visible, setCol4Visible] = useState(false);
  const [bottomBarVisible, setBottomBarVisible] = useState(false);

  const timeoutIdsRef = useRef<NodeJS.Timeout[]>([]);
  const isPlayingRef = useRef(false);
  const hasPlayedRef = useRef(false);

  const clearAllTimeouts = () => {
    timeoutIdsRef.current.forEach((t) => clearTimeout(t));
    timeoutIdsRef.current = [];
  };

  const playAnimationSequence = () => {
    isPlayingRef.current = true;
    hasPlayedRef.current = true;
    clearAllTimeouts();

    // 1. Dark pink glass card springs up with elastic bounce
    setFrameVisible(true);

    // 2. Col 1: Brand Info & Socials
    const t1 = setTimeout(() => setCol1Visible(true), 180);

    // 3. Col 2: Quick Links
    const t2 = setTimeout(() => setCol2Visible(true), 320);

    // 4. Col 3: Popular Tours
    const t3 = setTimeout(() => setCol3Visible(true), 460);

    // 5. Col 4: Contact Us
    const t4 = setTimeout(() => setCol4Visible(true), 600);

    // 6. Bottom Copyright Bar
    const t5 = setTimeout(() => {
      setBottomBarVisible(true);
      isPlayingRef.current = false;
    }, 760);

    timeoutIdsRef.current.push(t1, t2, t3, t4, t5);
  };

  // Scroll Detection:
  // - Plays sequence whenever scrolling DOWN into the footer
  // - NEVER resets or plays when scrolling bottom to top
  // - Resets quietly when user is above the footer so coming down into it always animates!
  useEffect(() => {
    let lastScrollY = typeof window !== "undefined" ? window.scrollY : 0;

    const handleScroll = () => {
      if (typeof window === "undefined") return;
      const currentY = window.scrollY;
      const isScrollingDown = currentY >= lastScrollY;
      lastScrollY = currentY;

      if (footerRef.current) {
        const rect = footerRef.current.getBoundingClientRect();

        // Reset quietly when user has scrolled above the footer
        if (rect.top >= window.innerHeight * 0.95 || currentY < 180) {
          if (hasPlayedRef.current) {
            hasPlayedRef.current = false;
            isPlayingRef.current = false;
            clearAllTimeouts();
            setFrameVisible(false);
            setCol1Visible(false);
            setCol2Visible(false);
            setCol3Visible(false);
            setCol4Visible(false);
            setBottomBarVisible(false);
          }
        }

        // Trigger animation whenever scrolling DOWN into the footer
        if (
          isScrollingDown &&
          !hasPlayedRef.current &&
          !isPlayingRef.current &&
          rect.top <= window.innerHeight * 0.92 &&
          rect.bottom >= 0
        ) {
          playAnimationSequence();
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearAllTimeouts();
    };
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative w-full bg-gradient-to-b from-[#110519] via-[#1a0724] to-[#0c0312] text-white overflow-hidden border-t border-[#FF2A75]/30 z-30 select-none"
    >
      {/* Ambient Multi-layered Glowing Orbs */}
      <div className="absolute -top-24 left-1/4 w-[40vw] h-[20vw] bg-[#FF2A75]/15 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-0 right-1/4 w-[35vw] h-[18vw] bg-[#9C27B0]/15 rounded-full blur-[100px] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,42,117,0.18),transparent_70%)] pointer-events-none z-0" />

      {/* Calm Ambient Animated Cyber-Pink Grid Overlay */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-15"
        style={{
          backgroundImage: `radial-gradient(#FF2A75 1.5px, transparent 1.5px)`,
          backgroundSize: `1.8vw 1.8vw`,
          animation: "gridPan 24s linear infinite",
        }}
      />

      {/* Main Footer Container */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-[5vw] pt-[7vh] pb-[4.5vh]">
        {/* Top Grid: 4 Columns inside a dark pink glass frame with spring bounce physics */}
        <div
          style={{
            transform: frameVisible ? "translate3d(0, 0, 0) scale(1)" : "translate3d(0, 45px, 0) scale(0.96)",
            opacity: frameVisible ? 1 : 0,
            filter: frameVisible ? "blur(0px)" : "blur(6px)",
            transition: "transform 0.9s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.8s ease-out, filter 0.7s ease-out",
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[3.5vw] p-[3vw] rounded-3xl bg-white/[0.02] backdrop-blur-md border border-pink-500/15 shadow-[0_10px_40px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.1)] mb-[4vh]"
        >
          {/* Column 1: Brand Info & Socials */}
          <div
            style={{
              transform: col1Visible ? "translate3d(0, 0, 0) scale(1)" : "translate3d(0, 30px, 0) scale(0.9)",
              opacity: col1Visible ? 1 : 0,
              filter: col1Visible ? "blur(0px)" : "blur(4px)",
              transition: "transform 0.85s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.75s ease-out, filter 0.65s ease-out",
            }}
            className="flex flex-col items-start gap-[2vh]"
          >
            {/* Logo & Text like in Navbar */}
            <div className="flex flex-col items-start">
              <Link href="/" className="flex items-center gap-[0.4vw] group cursor-pointer">
                <div className="relative w-[3vw] h-[3vw] min-w-[38px] min-h-[38px] drop-shadow-[0_0_12px_rgba(255,42,117,0.4)]">
                  <Image
                    src="/navBar/logo.svg"
                    alt="The Wow World Logo"
                    fill
                    className="object-contain transition-transform duration-300 group-hover:scale-105"
                    priority
                  />
                </div>
                <div className="flex flex-col text-[0.88vw] font-bold leading-none">
                  <span
                    className="tracking-widest uppercase bg-clip-text text-transparent"
                    style={{
                      backgroundImage: "linear-gradient(to right, #FC0780 0%, #FB352E 20%, #F6AB03 43%, #0DC36B 64%, #089889 84%, #04ACBF 100%)"
                    }}
                  >
                    THE
                  </span>
                  <span
                    className="tracking-widest uppercase bg-clip-text text-transparent font-black mt-[2px]"
                    style={{
                      backgroundImage: "linear-gradient(to right, #FC0780 0%, #FB352E 20%, #F6AB03 43%, #0DC36B 64%, #089889 84%, #04ACBF 100%)"
                    }}
                  >
                    WOW WORLD
                  </span>
                </div>
              </Link>

              {/* Hot Pink Glowing Accent Bar */}
              <div className="w-[4vw] min-w-[45px] h-[3px] rounded-full bg-gradient-to-r from-[#FF2A75] via-[#FF5493] to-[#FF80AB] mt-[1.4vh] shadow-[0_0_14px_rgba(255,42,117,0.7)]" />
            </div>

            {/* Description Paragraph */}
            <p className="text-pink-100/80 text-[clamp(13px,0.95vw,16px)] font-medium leading-relaxed max-w-[22vw] min-w-[240px]">
              Crafting unforgettable travel experiences in Dubai and beyond since 2010. Discover extraordinary luxury, culture, and adventure.
            </p>

            {/* Social Media Dark Neon Glass Buttons */}
            <div className="flex items-center gap-[0.8vw] mt-[0.5vh]">
              {[
                { icon: "ph:facebook-logo-bold", href: "https://facebook.com", label: "Facebook" },
                { icon: "ph:twitter-logo-bold", href: "https://twitter.com", label: "Twitter" },
                { icon: "ph:instagram-logo-bold", href: "https://instagram.com", label: "Instagram" },
                { icon: "ph:linkedin-logo-bold", href: "https://linkedin.com", label: "LinkedIn" },
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-[2.6vw] h-[2.6vw] min-w-[38px] min-h-[38px] rounded-2xl bg-gradient-to-br from-pink-500/10 to-purple-900/20 hover:from-[#FF2A75] hover:to-[#E040FB] border border-pink-500/25 hover:border-[#FF2A75] text-pink-200 hover:text-white transition-all duration-300 flex items-center justify-center hover:-translate-y-1 shadow-[0_4px_15px_rgba(0,0,0,0.3)] hover:shadow-[0_0_22px_rgba(255,42,117,0.7)]"
                >
                  <Icon icon={social.icon} className="w-[1.2vw] h-[1.2vw] min-w-[18px] min-h-[18px]" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div
            style={{
              transform: col2Visible ? "translate3d(0, 0, 0) scale(1)" : "translate3d(0, 30px, 0) scale(0.9)",
              opacity: col2Visible ? 1 : 0,
              filter: col2Visible ? "blur(0px)" : "blur(4px)",
              transition: "transform 0.85s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.75s ease-out, filter 0.65s ease-out",
            }}
            className="flex flex-col items-start"
          >
            <h3 className="text-[clamp(16px,1.2vw,20px)] font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-pink-100 to-pink-200 tracking-wide mb-[0.6vh]">
              Quick Links
            </h3>
            <div className="w-[2.8vw] min-w-[32px] h-[3px] rounded-full bg-gradient-to-r from-[#FF2A75] to-[#FF80AB] mb-[2.2vh] shadow-[0_0_12px_rgba(255,42,117,0.6)]" />

            <ul className="flex flex-col items-start gap-[1.3vh] text-[clamp(13px,0.95vw,16px)] font-medium text-pink-100/75">
              {[
                { name: "Home", href: "/" },
                { name: "Dubai Packages", href: "/packages" },
                { name: "About Us", href: "/about" },
                { name: "Travel Blog", href: "/blog" },
                { name: "Contact Us", href: "/contact" },
              ].map((link, idx) => (
                <li key={idx}>
                  <Link href={link.href} className="group flex items-center gap-2 hover:text-white transition-all duration-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF2A75] opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-[0_0_8px_#FF2A75] group-hover:scale-125" />
                    <span className="group-hover:translate-x-1.5 group-hover:text-[#FF2A75] group-hover:drop-shadow-[0_0_10px_rgba(255,42,117,0.8)] transition-all duration-300">
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Popular Tours */}
          <div
            style={{
              transform: col3Visible ? "translate3d(0, 0, 0) scale(1)" : "translate3d(0, 30px, 0) scale(0.9)",
              opacity: col3Visible ? 1 : 0,
              filter: col3Visible ? "blur(0px)" : "blur(4px)",
              transition: "transform 0.85s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.75s ease-out, filter 0.65s ease-out",
            }}
            className="flex flex-col items-start"
          >
            <h3 className="text-[clamp(16px,1.2vw,20px)] font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-pink-100 to-pink-200 tracking-wide mb-[0.6vh]">
              Popular Tours
            </h3>
            <div className="w-[2.8vw] min-w-[32px] h-[3px] rounded-full bg-gradient-to-r from-[#FF2A75] to-[#FF80AB] mb-[2.2vh] shadow-[0_0_12px_rgba(255,42,117,0.6)]" />

            <ul className="flex flex-col items-start gap-[1.3vh] text-[clamp(13px,0.95vw,16px)] font-medium text-pink-100/75">
              {[
                { name: "Desert Safari", href: "/tours/desert-safari" },
                { name: "Burj Khalifa Tour", href: "/tours/burj-khalifa" },
                { name: "Dubai Marina Cruise", href: "/tours/marina-cruise" },
                { name: "Abu Dhabi Day Trip", href: "/tours/abu-dhabi" },
                { name: "Global Village Visit", href: "/tours/global-village" },
              ].map((tour, idx) => (
                <li key={idx}>
                  <Link href={tour.href} className="group flex items-center gap-2 hover:text-white transition-all duration-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF2A75] opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-[0_0_8px_#FF2A75] group-hover:scale-125" />
                    <span className="group-hover:translate-x-1.5 group-hover:text-[#FF2A75] group-hover:drop-shadow-[0_0_10px_rgba(255,42,117,0.8)] transition-all duration-300">
                      {tour.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Us */}
          <div
            style={{
              transform: col4Visible ? "translate3d(0, 0, 0) scale(1)" : "translate3d(0, 30px, 0) scale(0.9)",
              opacity: col4Visible ? 1 : 0,
              filter: col4Visible ? "blur(0px)" : "blur(4px)",
              transition: "transform 0.85s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.75s ease-out, filter 0.65s ease-out",
            }}
            className="flex flex-col items-start"
          >
            <h3 className="text-[clamp(16px,1.2vw,20px)] font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-pink-100 to-pink-200 tracking-wide mb-[0.6vh]">
              Contact Us
            </h3>
            <div className="w-[2.8vw] min-w-[32px] h-[3px] rounded-full bg-gradient-to-r from-[#FF2A75] to-[#FF80AB] mb-[2.2vh] shadow-[0_0_12px_rgba(255,42,117,0.6)]" />

            <div className="flex flex-col items-start gap-[1.8vh] text-[clamp(13px,0.95vw,15px)] font-medium text-pink-100/85">
              {/* Address */}
              <div className="flex items-start gap-[0.8vw] group">
                <div className="w-8 h-8 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:border-[#FF2A75] group-hover:bg-[#FF2A75]/20 transition-all duration-300">
                  <Icon icon="ph:map-pin-fill" className="text-[#FF2A75] w-4 h-4 drop-shadow-[0_0_6px_rgba(255,42,117,0.8)]" />
                </div>
                <span className="leading-relaxed">
                  47/5B , VOC NAGAR, NAGARAM ROAD, PATTUKOTTAI, THANJAVOUR-614609, TN, INDIA.
                </span>
              </div>

              {/* Phone */}
              <a href="tel:+919384589936" className="flex items-center gap-[0.8vw] group hover:text-white transition-all font-semibold">
                <div className="w-8 h-8 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center flex-shrink-0 group-hover:border-[#FF2A75] group-hover:bg-[#FF2A75]/20 transition-all duration-300">
                  <Icon icon="ph:phone-fill" className="text-[#FF2A75] w-4 h-4 drop-shadow-[0_0_6px_rgba(255,42,117,0.8)]" />
                </div>
                <span className="group-hover:text-[#FF2A75] group-hover:drop-shadow-[0_0_8px_rgba(255,42,117,0.8)] transition-all">+91 93845 89936</span>
              </a>

              {/* Email */}
              <a href="mailto:info@thewowworld.com" className="flex items-center gap-[0.8vw] group hover:text-white transition-all font-semibold">
                <div className="w-8 h-8 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center flex-shrink-0 group-hover:border-[#FF2A75] group-hover:bg-[#FF2A75]/20 transition-all duration-300">
                  <Icon icon="ph:envelope-fill" className="text-[#FF2A75] w-4 h-4 drop-shadow-[0_0_6px_rgba(255,42,117,0.8)]" />
                </div>
                <span className="group-hover:text-[#FF2A75] group-hover:drop-shadow-[0_0_8px_rgba(255,42,117,0.8)] transition-all">info@thewowworld.com</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Copyright Bar with Spring Reveal */}
        <div
          style={{
            transform: bottomBarVisible ? "translate3d(0, 0, 0)" : "translate3d(0, 20px, 0)",
            opacity: bottomBarVisible ? 1 : 0,
            transition: "transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.7s ease-out",
          }}
          className="flex flex-col md:flex-row items-center justify-between gap-4 text-[clamp(12px,0.85vw,14px)] text-pink-200/50 font-medium px-4"
        >
          <p>&copy; {new Date().getFullYear()} The Wow World. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-[#FF2A75] hover:drop-shadow-[0_0_8px_rgba(255,42,117,0.8)] transition-all">Privacy Policy</Link>
            <span className="text-pink-500/30">&bull;</span>
            <Link href="/terms" className="hover:text-[#FF2A75] hover:drop-shadow-[0_0_8px_rgba(255,42,117,0.8)] transition-all">Terms of Service</Link>
            <span className="text-pink-500/30">&bull;</span>
            <Link href="/cookies" className="hover:text-[#FF2A75] hover:drop-shadow-[0_0_8px_rgba(255,42,117,0.8)] transition-all">Cookie Settings</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
