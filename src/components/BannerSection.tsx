"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function BannerSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const isPlayingRef = useRef(false);
  const hasPlayedRef = useRef(false);

  // Scroll Detection:
  // - Plays sequence whenever scrolling DOWN into this banner section
  // - NEVER resets or plays when scrolling bottom to top
  // - Resets quietly when user is above this section so coming down into it always animates!
  useEffect(() => {
    let lastScrollY = typeof window !== "undefined" ? window.scrollY : 0;

    const handleScroll = () => {
      if (typeof window === "undefined") return;
      const currentY = window.scrollY;
      const isScrollingDown = currentY >= lastScrollY;
      lastScrollY = currentY;

      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();

        // Reset quietly when user has scrolled above this section
        if (rect.top >= window.innerHeight * 0.95 || currentY < 180) {
          if (hasPlayedRef.current) {
            hasPlayedRef.current = false;
            isPlayingRef.current = false;
            setIsVisible(false);
          }
        }

        // Trigger animation whenever scrolling DOWN into this banner
        if (
          isScrollingDown &&
          !hasPlayedRef.current &&
          !isPlayingRef.current &&
          rect.top <= window.innerHeight * 0.82 &&
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
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 1000);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 400);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener("resize", handleResize);

    // Floating Doodles data (Airplanes, Hearts, Stars, Dotted Flight Trails, Sparkles)
    const items = Array.from({ length: 32 }).map((_, i) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 24 + 14,
      type: i % 5, // 0: airplane, 1: heart, 2: sparkle/star, 3: flight loop, 4: pin
      speedX: (Math.random() - 0.5) * 1.8,
      speedY: (Math.random() - 0.5) * 1.6,
      rot: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.04,
      opacity: Math.random() * 0.45 + 0.25,
      floatOffset: Math.random() * Math.PI * 2,
    }));

    let time = 0;

    const render = () => {
      time += 0.05;
      ctx.clearRect(0, 0, width, height);

      items.forEach((item) => {
        item.x += item.speedX;
        item.y += item.speedY + Math.sin(time + item.floatOffset) * 0.6;
        item.rot += item.rotSpeed;

        // Wrap around boundaries
        if (item.x < -40) item.x = width + 40;
        if (item.x > width + 40) item.x = -40;
        if (item.y < -40) item.y = height + 40;
        if (item.y > height + 40) item.y = -40;

        ctx.save();
        ctx.translate(item.x, item.y);
        ctx.rotate(item.rot);
        ctx.globalAlpha = item.opacity;
        ctx.strokeStyle = "#FF2A75";
        ctx.fillStyle = "#FF2A75";
        ctx.lineWidth = 1.8;
        ctx.lineCap = "round";

        const s = item.size;

        if (item.type === 0) {
          // Paper Airplane Doodle
          ctx.beginPath();
          ctx.moveTo(-s / 2, -s / 3);
          ctx.lineTo(s / 2, 0);
          ctx.lineTo(-s / 2, s / 3);
          ctx.lineTo(-s / 4, 0);
          ctx.closePath();
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(-s / 4, 0);
          ctx.lineTo(s / 2, 0);
          ctx.stroke();
        } else if (item.type === 1) {
          // Cute Heart Doodle
          ctx.beginPath();
          ctx.moveTo(0, s / 4);
          ctx.bezierCurveTo(-s / 2, -s / 3, -s, s / 3, 0, s);
          ctx.bezierCurveTo(s, s / 3, s / 2, -s / 3, 0, s / 4);
          ctx.stroke();
        } else if (item.type === 2) {
          // 4-Point Sparkle Star Doodle
          ctx.beginPath();
          for (let k = 0; k < 8; k++) {
            const r = k % 2 === 0 ? s / 1.8 : s / 4.5;
            const a = (k * Math.PI) / 4;
            const px = Math.cos(a) * r;
            const py = Math.sin(a) * r;
            if (k === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.closePath();
          ctx.stroke();
        }  else if (item.type === 3) {
          // Location Map Pin Doodle
          ctx.beginPath();
          ctx.arc(0, -s / 4, s / 3, 0, Math.PI * 2);
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(-s / 3.5, -s / 6);
          ctx.lineTo(0, s / 2);
          ctx.lineTo(s / 3.5, -s / 6);
          ctx.stroke();
        }

        ctx.restore();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#FFF0F5] py-[6vh] flex flex-col items-center justify-center select-none z-20"
    >
      {/* Full Width Background Canvas for Floating Paper Doodles Across Entire Section */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />

      {/* Center Container with max-w-[65vw] strictly for the Card Banner */}
      <div className="relative w-full max-w-[65vw] flex items-center justify-center z-10 px-[1vw]">
        {/* Main Banner Image Container - Smooth Spring Entrance from Right Side */}
        <div
          style={{
            transform: isVisible
              ? "translate3d(0, 0, 0) scale(1)"
              : "translate3d(140px, 0, 0) scale(0.92)",
            opacity: isVisible ? 1 : 0,
            filter: isVisible ? "blur(0px)" : "blur(8px)",
            transition:
              "transform 1.05s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.85s ease-out, filter 0.75s ease-out",
          }}
          className="relative z-10 w-full overflow-hidden rounded-[2vw] shadow-[0_1vw_3vw_rgba(255,42,117,0.2)] group transition-transform duration-500 hover:scale-[1.01]"
        >
          <Image
            src="/Home/banner.webp"
            alt="The Wow World Banner"
            width={1920}
            height={600}
            className="w-full h-auto object-cover rounded-[2vw]"
            priority={false}
            unoptimized
          />
        </div>
      </div>
    </section>
  );
}
