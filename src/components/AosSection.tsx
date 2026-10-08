"use client";

import React, { useEffect, useRef, useState } from "react";

interface AosSectionProps {
  children: React.ReactNode;
  animation?: "fade-up" | "fade-down" | "fade" | "zoom-in";
  duration?: number;
  delay?: number;
  className?: string;
  id?: string;
}

export default function AosSection({
  children,
  animation = "fade-up",
  duration = 900,
  delay = 0,
  className = "",
  id,
}: AosSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || hasAnimated) return;

    let lastScrollY = typeof window !== "undefined" ? window.scrollY : 0;
    let isScrollingDown = true;

    const onScroll = () => {
      const currentY = window.scrollY;
      isScrollingDown = currentY >= lastScrollY;
      lastScrollY = currentY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate only if scrolling down or if initially visible in top viewport
            if (isScrollingDown || window.scrollY < 120) {
              setHasAnimated(true);
              observer.unobserve(entry.target);
            }
          }
        });
      },
      {
        threshold: 0,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    observer.observe(el);

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, [hasAnimated]);

  useEffect(() => {
    if (hasAnimated) {
      const timer = setTimeout(() => {
        setIsDone(true);
      }, duration + delay + 50);
      return () => clearTimeout(timer);
    }
  }, [hasAnimated, duration, delay]);

  return (
    <div
      ref={ref}
      id={id}
      className={`aos-wrapper ${hasAnimated ? "aos-animate" : ""} ${isDone ? "aos-done" : ""} ${className}`}
      data-aos={animation}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
