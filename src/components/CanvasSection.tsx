"use client";

import { useEffect, useRef, useState } from "react";

const TOTAL_FRAMES = 210;

// Pre-format frame numbers to '00001.webp' ... '00240.webp'
const FRAME_PATHS = Array.from({ length: TOTAL_FRAMES }, (_, i) => {
  const num = (i + 1).toString().padStart(5, "0");
  return `/Home/section2Frames/${num}.webp`;
});

export default function CanvasSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isReady, setIsReady] = useState(false);

  // Preload all 240 webp frames into memory
  useEffect(() => {
    let active = true;
    const images: HTMLImageElement[] = [];
    let count = 0;

    FRAME_PATHS.forEach((src, idx) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        if (!active) return;
        count++;
        setLoadedCount(count);
        if (count === TOTAL_FRAMES) {
          setIsReady(true);
        }
      };
      images[idx] = img;
    });

    imagesRef.current = images;

    return () => {
      active = false;
    };
  }, []);

  // Canvas render logic linked to scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !canvasRef.current || imagesRef.current.length === 0) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;

      if (totalScrollable <= 0) return;

      // Calculate progress from 0.0 to 1.0 within this pinned section
      const progress = Math.max(0, Math.min(1, -rect.top / totalScrollable));
      const frameIndex = Math.min(
        TOTAL_FRAMES - 1,
        Math.floor(progress * TOTAL_FRAMES)
      );

      const img = imagesRef.current[frameIndex];
      if (img && img.complete) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          // Object-cover calculation for full screen canvas
          const canvasWidth = canvas.width;
          const canvasHeight = canvas.height;
          const imgWidth = img.naturalWidth || canvasWidth;
          const imgHeight = img.naturalHeight || canvasHeight;

          const imgRatio = imgWidth / imgHeight;
          const canvasRatio = canvasWidth / canvasHeight;

          let drawWidth = canvasWidth;
          let drawHeight = canvasHeight;
          let offsetX = 0;
          let offsetY = 0;

          if (canvasRatio > imgRatio) {
            drawHeight = canvasWidth / imgRatio;
            offsetY = (canvasHeight - drawHeight) / 2;
          } else {
            drawWidth = canvasHeight * imgRatio;
            offsetX = (canvasWidth - drawWidth) / 2;
          }

          ctx.clearRect(0, 0, canvasWidth, canvasHeight);
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = "high";
          ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
        }
      }
    };

    // Handle canvas resize with HiDPI / Retina devicePixelRatio support
    const handleResize = () => {
      if (canvasRef.current) {
        const dpr = window.devicePixelRatio || 1;
        canvasRef.current.width = window.innerWidth * dpr;
        canvasRef.current.height = window.innerHeight * dpr;
        handleScroll();
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [isReady]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[700vh] bg-black"
    >
      {/* Sticky Fullscreen Container */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center justify-center">
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover block"
        />

        {/* Subtle Preloading Progress Bar */}
        {!isReady && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center text-white gap-3 z-30">
            <div className="w-[12vw] h-[4px] bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#FF9885] via-[#FF4085] to-[#F51666] transition-all duration-150"
                style={{ width: `${(loadedCount / TOTAL_FRAMES) * 100}%` }}
              />
            </div>
            <span className="text-[0.85vw] font-bold text-white/80 tracking-wider">
              Loading Experience... {Math.round((loadedCount / TOTAL_FRAMES) * 100)}%
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
