"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export function scrollToPageTop(immediate = true) {
  if (typeof window === "undefined") return;
  if (window.__lenis) {
    window.__lenis.scrollTo(0, { immediate });
  }
  window.scrollTo({ top: 0, left: 0, behavior: immediate ? "instant" : "smooth" });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const lenis = new Lenis({
      duration: 1.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });

    lenisRef.current = lenis;
    window.__lenis = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
      delete window.__lenis;
    };
  }, []);

  useEffect(() => {
    scrollToPageTop(true);

    const frameId = requestAnimationFrame(() => scrollToPageTop(true));
    const timeoutId = setTimeout(() => scrollToPageTop(true), 50);

    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(timeoutId);
    };
  }, [pathname]);

  return <>{children}</>;
}
