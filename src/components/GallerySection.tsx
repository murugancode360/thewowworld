"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { scrollToPageTop } from "@/components/SmoothScroll";

interface PlaceItem {
  title: string;
  location: string;
  description: string;
  url: string;
  thumb: string;
}

interface Category {
  id: string;
  title: string;
  subtitle: string;
  items: PlaceItem[];
}

const categoriesData: Category[] = [
  {
    id: "iconic-wonders",
    title: "Iconic City Wonders",
    subtitle: "Category 01 / 04",
    items: [
      {
        title: "Miracle Garden",
        location: "Dubailand, Dubai",
        description: "World's largest natural flower garden featuring over 150 million blooming flowers and iconic floral structures.",
        url: "/Home/destinations/dubai_miracle_garden.webp",
        thumb: "/Home/destinations/dubai_miracle_garden.webp",
      },
      {
        title: "Burj Khalifa Observatory",
        location: "Downtown Dubai, UAE",
        description: "Experience At The Top sky lounge on level 148, offering breathtaking panoramic 360-degree views of Dubai.",
        url: "/Home/destinations/dubai_burj_khalifa.webp",
        thumb: "/Home/destinations/dubai_burj_khalifa.webp",
      },
      {
        title: "Museum of the Future",
        location: "Sheikh Zayed Rd, Dubai",
        description: "Step into 2071 with interactive exhibits showcasing futuristic space travel, wellness, and AI innovations.",
        url: "/Home/destinations/dubai_future_museum.webp",
        thumb: "/Home/destinations/dubai_future_museum.webp",
      },
      {
        title: "Dubai Frame Bridge",
        location: "Zabeel Park, Dubai",
        description: "Walk across the glass sky deck connecting historic Old Dubai with the gleaming skyscrapers of New Dubai.",
        url: "/Home/destinations/dubai_frame.webp",
        thumb: "/Home/destinations/dubai_frame.webp",
      },
      {
        title: "Burj Al Arab Resort",
        location: "Jumeirah Beach, Dubai",
        description: "Discover 7-star luxury, underwater dining, and private beach cabanas on the Arabian Gulf.",
        url: "/Home/destinations/dubai_burj_al_arab.webp",
        thumb: "/Home/destinations/dubai_burj_al_arab.webp",
      },
    ],
  },
  {
    id: "adventures",
    title: "Thrilling Adventures",
    subtitle: "Category 02 / 04",
    items: [
      {
        title: "Skydive Palm Jumeirah",
        location: "Palm Jumeirah, Dubai",
        description: "Feel the ultimate thrill of tandem skydiving from 13,000 feet directly over the world-famous Palm island.",
        url: "/Home/destinations/dubai_adventures.webp",
        thumb: "/Home/destinations/dubai_adventures.webp",
      },
      {
        title: "Dune Bashing & Sandboarding",
        location: "Lahbab Desert, Dubai",
        description: "High-octane 4x4 dune riding across red sand dunes followed by sandboarding and quad biking thrills.",
        url: "/Home/destinations/dubai_desert_safari.webp",
        thumb: "/Home/destinations/dubai_desert_safari.webp",
      },
      {
        title: "Deep Dive Sunken City",
        location: "Nadd Al Sheba, Dubai",
        description: "Explore a 60-meter deep underwater sunken city equipped with submerged arcade games and streetscapes.",
        url: "/Home/destinations/dubai_deep_dive.webp",
        thumb: "/Home/destinations/dubai_deep_dive.webp",
      },
      {
        title: "Jet Ski Watersports",
        location: "Jumeirah Beach, Dubai",
        description: "Race high-speed jet skis past the sail of Burj Al Arab and along Dubai's vibrant turquoise coastline.",
        url: "/Home/destinations/dubai_adventures.webp",
        thumb: "/Home/destinations/dubai_adventures.webp",
      },
      {
        title: "Helicopter Sky Tour",
        location: "Dubai Marina, Dubai",
        description: "Fly high above the Dubai skyline taking in panoramic aerial views of Atlantis and Palm Jumeirah.",
        url: "/Home/destinations/dubai_burj_khalifa.webp",
        thumb: "/Home/destinations/dubai_burj_khalifa.webp",
      },
    ],
  },
  {
    id: "wildlife-nature",
    title: "Wildlife & Nature",
    subtitle: "Category 03 / 04",
    items: [
      {
        title: "African Wildlife Safari",
        location: "Al Warqa 5, Dubai",
        description: "Encounter giraffes, rhinos, lions, and elephants roaming freely in 119 hectares of eco-friendly wildlife villages.",
        url: "/Home/destinations/dubai_safari_park.webp",
        thumb: "/Home/destinations/dubai_safari_park.webp",
      },
      {
        title: "Dubai Aquarium Tunnel",
        location: "Dubai Mall, UAE",
        description: "Walk through a 270-degree acrylic tunnel with over 33,000 aquatic animals and sand tiger sharks overhead.",
        url: "/Home/destinations/dubai_aquarium.webp",
        thumb: "/Home/destinations/dubai_aquarium.webp",
      },
      {
        title: "Bedouin Desert Sanctuary",
        location: "Lahbab Desert, Dubai",
        description: "Experience authentic Bedouin hospitality with camel treks, falconry, henna art, and starry desert BBQ.",
        url: "/Home/destinations/dubai_desert_safari.webp",
        thumb: "/Home/destinations/dubai_desert_safari.webp",
      },
      {
        title: "Asian Forest Explorer",
        location: "Dubai Safari Park",
        description: "Discover moon bears, Komodo dragons, and tropical bird shows inside lush bamboo forest enclosures.",
        url: "/Home/destinations/dubai_safari_park.webp",
        thumb: "/Home/destinations/dubai_safari_park.webp",
      },
      {
        title: "Miracle Garden Oasis",
        location: "Dubailand, Dubai",
        description: "Walk under heart-shaped flower passages and vibrant botanical floral sculptures in full bloom.",
        url: "/Home/destinations/dubai_miracle_garden.webp",
        thumb: "/Home/destinations/dubai_miracle_garden.webp",
      },
    ],
  },
  {
    id: "culture-heritage",
    title: "Culture & Heritage",
    subtitle: "Category 04 / 04",
    items: [
      {
        title: "Global Village World",
        location: "Sheikh Mohammed Rd, Dubai",
        description: "Explore 27 global pavilions representing 90+ cultures with street food, handicrafts, and cultural shows.",
        url: "/Home/destinations/dubai_global_village.webp",
        thumb: "/Home/destinations/dubai_global_village.webp",
      },
      {
        title: "Gold & Spice Souks",
        location: "Deira Old Dubai, UAE",
        description: "Immerse in ancient trading alleyways overflowing with aromatic spices, gold jewelry, and handwoven textiles.",
        url: "/Home/destinations/dubai_frame.webp",
        thumb: "/Home/destinations/dubai_frame.webp",
      },
      {
        title: "Dubai Fountain Symphony",
        location: "Downtown Dubai, UAE",
        description: "Watch water jets shoot 150 meters high synchronized to Arabic and classical music in front of Burj Khalifa.",
        url: "/Home/destinations/dubai_burj_khalifa.webp",
        thumb: "/Home/destinations/dubai_burj_khalifa.webp",
      },
      {
        title: "Traditional Abra Creek Ride",
        location: "Dubai Creek, Dubai",
        description: "Cross historic Dubai Creek on wooden water taxis for just 1 AED per ride as seagulls fly overhead.",
        url: "/Home/destinations/dubai_burj_al_arab.webp",
        thumb: "/Home/destinations/dubai_burj_al_arab.webp",
      },
      {
        title: "Deep Dive Sunken City Pool",
        location: "Nadd Al Sheba, Dubai",
        description: "Explore a 60-meter deep underwater sunken city equipped with submerged arcade games and underwater streets.",
        url: "/Home/destinations/dubai_deep_dive.webp",
        thumb: "/Home/destinations/dubai_deep_dive.webp",
      },
    ],
  },
];

const PIXELS = new Float32Array(
  [
    1, 1.5, 2, 2.5, 3, 1, 1.5, 2, 2.5, 3, 3.5, 4, 2, 2.5, 3, 3.5, 4, 4.5, 5,
    5.5, 6, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 20, 100,
  ].map((v) => v / 100)
);

export default function GallerySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasWrapperRef = useRef<HTMLDivElement>(null);

  const [categoryIndex, setCategoryIndex] = useState(0);
  const [itemIndex, setItemIndex] = useState(0);
  const [hasWebGL, setHasWebGL] = useState(true);

  // Staggered Entrance Animation States
  const [headerVisible, setHeaderVisible] = useState(false);
  const [imageVisible, setImageVisible] = useState(false);
  const [categoryVisible, setCategoryVisible] = useState(false);
  const [titleVisible, setTitleVisible] = useState(false);
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [revealedThumbs, setRevealedThumbs] = useState(0);
  const [carouselStarted, setCarouselStarted] = useState(false);

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

    // 1. Header: "POPULAR LANDMARKS" springs in with elastic bounce
    setHeaderVisible(true);

    // 2. Left leaf showcase image container springs up with elastic bounce physics
    const t1 = setTimeout(() => {
      setImageVisible(true);
    }, 280);

    // 3. Category title + chevrons glide in
    const t2 = setTimeout(() => {
      setCategoryVisible(true);
    }, 450);

    // 4. Place title springs in
    const t3 = setTimeout(() => {
      setTitleVisible(true);
    }, 620);

    // 5. Location, description, and action buttons reveal
    const t4 = setTimeout(() => {
      setDetailsVisible(true);
    }, 780);

    // 6. Preview thumbnail cards spring up one by one with elastic bounce physics
    const t5 = setTimeout(() => setRevealedThumbs(1), 940);
    const t6 = setTimeout(() => setRevealedThumbs(2), 1100);
    const t7 = setTimeout(() => setRevealedThumbs(3), 1260);
    const t8 = setTimeout(() => setRevealedThumbs(4), 1420);
    const t9 = setTimeout(() => setRevealedThumbs(5), 1580);

    // 7. Start auto slide rotation only after user has had time to absorb the section
    const t10 = setTimeout(() => {
      setCarouselStarted(true);
      isPlayingRef.current = false;
    }, 3200);

    timeoutIdsRef.current.push(t1, t2, t3, t4, t5, t6, t7, t8, t9, t10);
  };

  // Scroll Detection:
  // - Plays sequence whenever scrolling DOWN into this section
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

        // Reset quietly when user has scrolled above this section (section top is below viewport fold)
        // When scrolling bottom to top through this section, rect.top is <= 0 or inside viewport, so it NEVER resets or replays!
        if (rect.top >= window.innerHeight * 0.95 || currentY < 180) {
          if (hasPlayedRef.current) {
            hasPlayedRef.current = false;
            isPlayingRef.current = false;
            clearAllTimeouts();
            setHeaderVisible(false);
            setImageVisible(false);
            setCategoryVisible(false);
            setTitleVisible(false);
            setDetailsVisible(false);
            setRevealedThumbs(0);
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
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearAllTimeouts();
    };
  }, []);

  const activeCategoryIndexRef = useRef(0);
  const activeItemIndexRef = useRef(0);
  const transitionImageRef = useRef<number | null>(null);
  const progressRef = useRef(1);
  const isAnimatingRef = useRef(false);
  const texturesRef = useRef<THREE.Texture[]>([]);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const animIdRef = useRef<number | null>(null);

  const currentCategory = categoriesData[categoryIndex];
  const currentItems = currentCategory.items;
  const currentLandmark = currentItems[itemIndex] || currentItems[0];

  // Initialize Three.js WebGL Scene & Renderer ONCE on Mount
  useEffect(() => {
    if (!canvasWrapperRef.current) return;

    const container = canvasWrapperRef.current;
    let observer: ResizeObserver | null = null;
    let renderer: THREE.WebGLRenderer | null = null;

    // 1. Probe WebGL support directly to avoid Three.js internal console.error when WebGL is disabled
    let gl: WebGLRenderingContext | WebGL2RenderingContext | null = null;
    const canvas = document.createElement("canvas");
    try {
      gl = (canvas.getContext("webgl2", { alpha: true, antialias: true }) ||
        canvas.getContext("webgl", { alpha: true, antialias: true }) ||
        canvas.getContext("experimental-webgl", { alpha: true, antialias: true })) as WebGLRenderingContext | null;
    } catch {
      gl = null;
    }

    if (!gl) {
      setHasWebGL(false);
      return;
    }

    // 2. Initialize WebGLRenderer with the verified canvas and context
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        context: gl,
        antialias: true,
        alpha: true,
      });
    } catch {
      setHasWebGL(false);
      return;
    }

    const rect = container.getBoundingClientRect();
    const width = rect.width || 500;
    const height = rect.height || 500;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 10);
    cameraRef.current = camera;

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    container.replaceChildren(renderer.domElement);
    rendererRef.current = renderer;

    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      uniform float uProgress;
      uniform vec2 uTextureSize;
      uniform vec2 uElementSize;
      uniform sampler2D uTexture;
      uniform sampler2D uNextTexture;
      varying vec2 vUv;

      float quadraticInOut(float t) {
        float p = 2.0 * t * t;
        return t < 0.5 ? p : -p + (4.0 * t) - 1.0;
      }

      void main() {
        vec2 uv = vUv - vec2(0.5);
        float imageAspect = uTextureSize.x / uTextureSize.y;
        float elementAspect = uElementSize.x / uElementSize.y;

        if (imageAspect > elementAspect) {
          uv.x *= elementAspect / imageAspect;
        } else {
          uv.y *= imageAspect / elementAspect;
        }
        uv += vec2(0.5);

        float progress = quadraticInOut(clamp(uProgress, 0.0, 1.0));
        float s = 40.0;
        vec2 gridSize = vec2(s, floor(s * (uTextureSize.y / uTextureSize.x)));

        float v = smoothstep(0.0, 1.0, vUv.y + sin(vUv.x * 4.0 + progress * 6.0) * 0.15 + (1.0 - progress * 2.0));
        vec2 subUv = mix(uv, floor(uv * gridSize) / gridSize, (vUv.x * 2.0 + (1.0 - v) * 20.0) * (1.0 - progress));

        vec4 colCurrent = texture2D(uTexture, subUv);
        vec4 colNext = texture2D(uNextTexture, uv);

        vec4 finalColor = mix(colCurrent, colNext, progress);
        finalColor.rgb = pow(finalColor.rgb, vec3(1.0 / 1.15));
        gl_FragColor = finalColor;
      }
    `;

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uFillColor: { value: new THREE.Color("#000000") },
        uProgress: { value: 1 },
        uType: { value: 3 },
        uPixels: { value: PIXELS },
        uTextureSize: { value: new THREE.Vector2(500, 500) },
        uElementSize: { value: new THREE.Vector2(width, height) },
        uTexture: { value: null },
        uNextTexture: { value: null },
      },
      transparent: true,
    });
    materialRef.current = material;

    const geometry = new THREE.PlaneGeometry(2, 2);
    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);

    const animate = () => {
      animIdRef.current = requestAnimationFrame(animate);

      if (transitionImageRef.current !== null && isAnimatingRef.current) {
        progressRef.current += 0.015;

        if (progressRef.current >= 1) {
          progressRef.current = 1;
          if (materialRef.current) {
            const nextTex = texturesRef.current[transitionImageRef.current];
            if (nextTex) {
              materialRef.current.uniforms.uTexture.value = nextTex;
              materialRef.current.uniforms.uNextTexture.value = nextTex;
              const imgEl = nextTex.image as HTMLImageElement | undefined;
              if (imgEl && imgEl.width && imgEl.height) {
                materialRef.current.uniforms.uTextureSize.value.set(imgEl.width, imgEl.height);
              }
            }
          }
          activeItemIndexRef.current = transitionImageRef.current;
          transitionImageRef.current = null;
          isAnimatingRef.current = false;
        }

        if (materialRef.current) {
          materialRef.current.uniforms.uProgress.value = progressRef.current;
        }
      }

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };

    animate();

    const handleResize = () => {
      if (!container || !materialRef.current || !rendererRef.current) return;
      const w = container.clientWidth || 500;
      const h = container.clientHeight || 500;
      rendererRef.current.setSize(w, h);
      materialRef.current.uniforms.uElementSize.value.set(w, h);
    };

    observer = new ResizeObserver(handleResize);
    observer.observe(container);

    const onContextLost = (event: Event) => {
      event.preventDefault();
      if (animIdRef.current !== null) {
        cancelAnimationFrame(animIdRef.current);
      }
    };

    renderer.domElement.addEventListener("webglcontextlost", onContextLost, false);

    return () => {
      if (observer) observer.disconnect();
      if (animIdRef.current !== null) {
        cancelAnimationFrame(animIdRef.current);
      }
      if (renderer) {
        renderer.domElement.removeEventListener("webglcontextlost", onContextLost);
        try {
          renderer.forceContextLoss();
          renderer.dispose();
        } catch {
          // Ignore context loss errors during cleanup
        }
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      }
      geometry.dispose();
      material.dispose();
      materialRef.current = null;
      rendererRef.current = null;
      sceneRef.current = null;
      cameraRef.current = null;
    };
  }, []);

  // Load textures when Category changes
  useEffect(() => {
    if (!hasWebGL) return;

    let isMounted = true;
    const loader = new THREE.TextureLoader();
    const items = categoriesData[categoryIndex].items;

    // Dispose old textures
    texturesRef.current.forEach((t) => t?.dispose());
    texturesRef.current = [];
    transitionImageRef.current = null;
    progressRef.current = 1;
    isAnimatingRef.current = false;

    const loadedTextures: THREE.Texture[] = [];
    let loadCount = 0;

    items.forEach((img, idx) => {
      loader.load(
        img.url,
        (tex) => {
          if (!isMounted) {
            tex.dispose();
            return;
          }
          tex.minFilter = THREE.LinearFilter;
          tex.magFilter = THREE.LinearFilter;
          loadedTextures[idx] = tex;
          loadCount++;

          if (loadCount === items.length) {
            texturesRef.current = loadedTextures;
            const initialTex = loadedTextures[0];
            if (materialRef.current && initialTex) {
              materialRef.current.uniforms.uTexture.value = initialTex;
              materialRef.current.uniforms.uNextTexture.value = initialTex;
              materialRef.current.uniforms.uProgress.value = 1;
              const imgEl = initialTex.image as HTMLImageElement | undefined;
              if (imgEl && imgEl.width && imgEl.height) {
                materialRef.current.uniforms.uTextureSize.value.set(imgEl.width, imgEl.height);
              }
            }
          }
        },
        undefined,
        (err) => {
          console.warn("Failed to load texture for item:", img.url, err);
        }
      );
    });

    return () => {
      isMounted = false;
    };
  }, [categoryIndex, hasWebGL]);

  const handleThumbnailClick = (index: number) => {
    if (index === activeItemIndexRef.current || isAnimatingRef.current) return;

    if (hasWebGL && materialRef.current && texturesRef.current[index]) {
      const nextTex = texturesRef.current[index];
      materialRef.current.uniforms.uNextTexture.value = nextTex;
      const imgEl = nextTex.image as HTMLImageElement | undefined;
      if (imgEl && imgEl.width && imgEl.height) {
        materialRef.current.uniforms.uTextureSize.value.set(imgEl.width, imgEl.height);
      }
      transitionImageRef.current = index;
      progressRef.current = 0;
      isAnimatingRef.current = true;
    }

    setItemIndex(index);
    activeItemIndexRef.current = index;
  };

  const handlePrevCategory = () => {
    const nextCat = (categoryIndex - 1 + categoriesData.length) % categoriesData.length;
    setCategoryIndex(nextCat);
    activeCategoryIndexRef.current = nextCat;
    setItemIndex(0);
    activeItemIndexRef.current = 0;
  };

  const handleNextCategory = () => {
    const nextCat = (categoryIndex + 1) % categoriesData.length;
    setCategoryIndex(nextCat);
    activeCategoryIndexRef.current = nextCat;
    setItemIndex(0);
    activeItemIndexRef.current = 0;
  };

  // 5.0-Second Automatic Slide Transition with Hover Pause (starts only after entrance completes)
  // Cycles through all items in a category, then automatically advances to the next category
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!carouselStarted || isPaused) return;
    const timer = setInterval(() => {
      const currItem = activeItemIndexRef.current;
      const totalItems = currentItems.length;

      if (currItem + 1 < totalItems) {
        // Next image in current category
        handleThumbnailClick(currItem + 1);
      } else {
        // All items completed -> advance to next category
        handleNextCategory();
      }
    }, 5000);

    return () => clearInterval(timer);
  }, [isPaused, carouselStarted, categoryIndex, currentItems.length, hasWebGL]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[94vh] min-h-[94vh] max-h-[94vh] bg-[#FFF0F5] overflow-hidden flex flex-col items-center justify-center px-[5vw] py-[2.5vh] gap-[1.5vh] z-20 select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Calm Ambient Faded Dark Pink Dot Grid Pattern Background */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-30"
        style={{
          backgroundImage: `radial-gradient(#FF2A75 1.5px, transparent 1.5px)`,
          backgroundSize: `1.5vw 1.5vw`,
          animation: "gridPan 24s linear infinite",
        }}
      />

      {/* Keyframe animations for word-by-word fade & reveal */}
      <style font-display="swap">{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.96);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes wordFadeIn {
          from {
            opacity: 0;
            transform: translateY(8px);
            filter: blur(4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0px);
          }
        }
        @keyframes slideRight {
          from {
            opacity: 0;
            transform: translateX(-12px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>

      {/* TOP CENTER: Stylish Prominent Section Header Title with Faded Aesthetic */}
      <div
        style={{
          transform: headerVisible ? "translate3d(0, 0, 0) scale(1)" : "translate3d(0, -35px, 0) scale(0.85)",
          opacity: headerVisible ? 1 : 0,
          filter: headerVisible ? "blur(0px)" : "blur(6px)",
          transition: "transform 0.9s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.85s ease-out, filter 0.75s ease-out",
        }}
        className="relative z-20 flex flex-col items-center justify-center text-center"
      >
        {/* Minimal Subtitle: Sample 4 Style (Slate Gray Color) */}
        <div className="flex items-center gap-[0.8vw] mb-[0.6vh]">
          <div className="w-[2.5vw] h-[1px] bg-gradient-to-r from-transparent to-slate-400" />
          <span className="text-[1.1vw] font-extrabold uppercase tracking-[0.15em] text-slate-500">
            Now Showcasing
          </span>
          <div className="w-[2.5vw] h-[1px] bg-gradient-to-l from-transparent to-slate-400" />
        </div>

        {/* POPULAR LANDMARKS with Top-to-Bottom Faded Depth Effect */}
        <h2 className="text-[4.2vw] font-bold tracking-tight leading-none uppercase font-sans drop-shadow-sm">
          <span className="bg-clip-text text-transparent bg-gradient-to-b from-[#1E293B]/70 via-[#1E293B] to-[#0F172A]">
            POPULAR{" "}
          </span>
          <span className="bg-clip-text text-transparent bg-gradient-to-b from-[#FF5C93] via-[#FF2A75] to-[#D90052]">
            LANDMARKS
          </span>
        </h2>
      </div>

      {/* MAIN CONTENT ROW: Left Showcase Image + Right Content */}
      <div className="relative w-full flex items-center justify-center gap-[3.5vw] z-10 mt-[2vh]">

        {/* LEFT COLUMN: Clean Leaf/Arc Shape (Top-Left & Bottom-Right Curves) using Viewport Units */}
        <div
          style={{
            transform: imageVisible ? "translate3d(0, 0, 0) scale(1)" : "translate3d(0, 70px, 0) scale(0.65)",
            opacity: imageVisible ? 1 : 0,
            filter: imageVisible ? "blur(0px)" : "blur(8px)",
            transition: "transform 0.95s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.85s ease-out, filter 0.75s ease-out",
          }}
          className="relative w-[34vw] h-[34vw] flex-shrink-0 z-10 rounded-tl-[8vw] rounded-br-[8vw] rounded-tr-[2vw] rounded-bl-[2vw] overflow-hidden shadow-[0_2vw_4vw_rgba(255,42,117,0.25)] group"
        >
          {/* Inner Canvas Box / Fallback Image */}
          {hasWebGL ? (
            <div
              ref={canvasWrapperRef}
              className="relative w-full h-full rounded-tl-[8vw] rounded-br-[8vw] rounded-tr-[2vw] rounded-bl-[2vw] overflow-hidden bg-slate-950"
            />
          ) : (
            <div className="relative w-full h-full rounded-tl-[8vw] rounded-br-[8vw] rounded-tr-[2vw] rounded-bl-[2vw] overflow-hidden bg-slate-950">
              <Image
                key={currentLandmark.url}
                src={currentLandmark.url}
                alt={currentLandmark.title}
                fill
                className="object-cover transition-opacity duration-500 animate-fadeIn"
                unoptimized
              />
            </div>
          )}

          {/* Floating Top-Right Counter Badge */}
          <div
            className={`absolute top-[1.5vh] right-[1.2vw] z-20 flex items-center gap-[0.5vw] px-[1vw] py-[0.5vh] rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white text-[0.8vw] font-bold tracking-widest shadow-lg pointer-events-none transition-all duration-500 delay-200 ease-out ${
              imageVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
            }`}
          >
            <span key={`badge-${itemIndex}`} className="text-[#FF2A75] inline-block">
              0{itemIndex + 1}
            </span>
            <span className="opacity-40">/</span>
            <span className="opacity-70">0{currentItems.length}</span>
          </div>

          {/* Floating Bottom-Left Landmark Title Glass Chip */}
          <div
            className={`absolute bottom-[2vh] left-[1.5vw] z-20 px-[1.2vw] py-[0.8vh] rounded-2xl bg-black/45 backdrop-blur-md border border-white/20 text-white shadow-xl flex items-center gap-[0.6vw] pointer-events-none transition-all duration-500 delay-200 ease-out ${
              imageVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            }`}
          >
            <span
              key={`chip-${categoryIndex}-${itemIndex}`}
              className="text-[0.9vw] font-bold tracking-wide drop-shadow inline-block"
            >
              {currentLandmark.title}
            </span>
          </div>
        </div>

        {/* RIGHT SIDE CONTAINER: Hierarchy ordered per user specs */}
        <div className="relative flex flex-col justify-around h-[34vw] flex-1 max-w-[48vw] z-20">

          <div className="flex flex-col items-start w-full">
            {/* 1. CATEGORY TITLE WITH CHEVRON BUTTONS */}
            <div
              style={{
                transform: categoryVisible ? "translate3d(0, 0, 0) scale(1)" : "translate3d(-35px, 0, 0) scale(0.85)",
                opacity: categoryVisible ? 1 : 0,
                filter: categoryVisible ? "blur(0px)" : "blur(6px)",
                transition: "transform 0.85s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.75s ease-out, filter 0.65s ease-out",
              }}
              className="flex flex-col w-full max-w-[46vw] pr-[0.5vw] mb-[2.5vh]"
            >
              <div className="flex items-center justify-between w-full pr-[10%]">
                <h3
                  key={`cat-${categoryIndex}`}
                  className="text-[2.6vw] font-bold tracking-wide leading-none uppercase font-sans truncate max-w-[38vw] flex flex-wrap gap-x-[0.35vw] text-transparent bg-clip-text bg-gradient-to-r from-[#FC0780] via-[#FB352E] to-[#F6AB03]"
                >
                  {currentCategory.title.split(" ").map((word, i) => (
                    <span
                      key={`${categoryIndex}-${i}`}
                      style={{
                        animation: `wordFadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.08}s backwards`,
                      }}
                      className="inline-block"
                    >
                      {word}
                    </span>
                  ))}
                </h3>

                {/* Left & Right Chevron Category Controls */}
                <div className="flex items-center gap-[0.5vw] flex-shrink-0">
                  <button
                    onClick={handlePrevCategory}
                    aria-label="Previous Category"
                    className="w-[2.3vw] h-[2.3vw] min-w-[32px] min-h-[32px] rounded-full bg-white hover:bg-[#FF2A75] text-[#2D184D] hover:text-white shadow-md border border-pink-200 transition-all duration-300 flex items-center justify-center group cursor-pointer hover:scale-105"
                  >
                    <Icon icon="ph:caret-left-bold" className="w-[1vw] h-[1vw] group-hover:-translate-x-0.5 transition-transform" />
                  </button>

                  <button
                    onClick={handleNextCategory}
                    aria-label="Next Category"
                    className="w-[2.3vw] h-[2.3vw] min-w-[32px] min-h-[32px] rounded-full bg-white hover:bg-[#FF2A75] text-[#2D184D] hover:text-white shadow-md border border-pink-200 transition-all duration-300 flex items-center justify-center group cursor-pointer hover:scale-105"
                  >
                    <Icon icon="ph:caret-right-bold" className="w-[1vw] h-[1vw] group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            </div>

            {/* 2. PLACE NAME (WORD BY WORD ANIMATION WITH SPRING ENTRANCE) */}
            <h4
              key={`title-${categoryIndex}-${itemIndex}`}
              style={{
                transform: titleVisible ? "translate3d(0, 0, 0) scale(1)" : "translate3d(0, 30px, 0) scale(0.85)",
                opacity: titleVisible ? 1 : 0,
                filter: titleVisible ? "blur(0px)" : "blur(6px)",
                transition: "transform 0.85s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.75s ease-out, filter 0.65s ease-out",
              }}
              className="text-[2vw] font-semibold tracking-wide leading-none drop-shadow-sm mb-[1vh] flex flex-wrap gap-x-[0.35vw]"
            >
              {currentLandmark.title.split(" ").map((word, i) => (
                <span
                  key={`${categoryIndex}-${itemIndex}-${i}`}
                  style={{
                    animation: `wordFadeIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.06}s backwards`,
                  }}
                  className="text-transparent bg-clip-text bg-gradient-to-r from-[#200A15] via-[#9E0B46] to-[#FF2A75] inline-block"
                >
                  {word}
                </span>
              ))}
            </h4>

            {/* 3. LOCATION BELOW PLACE NAME */}
            <div
              key={`loc-${categoryIndex}-${itemIndex}`}
              style={{
                transform: detailsVisible ? "translate3d(0, 0, 0)" : "translate3d(-20px, 0, 0)",
                opacity: detailsVisible ? 1 : 0,
                transition: "transform 0.75s ease-out, opacity 0.65s ease-out",
                animation: `slideRight 0.35s ease-out backwards`,
              }}
              className="flex items-center gap-[0.5vw] text-[#FF2A75] text-[1vw] font-bold tracking-wide uppercase mb-[0.6vh]"
            >
              <Icon icon="ph:map-pin-fill" className="w-[0.9vw] h-[0.9vw]" />
              <span>{currentLandmark.location}</span>
            </div>

            {/* 4. DESCRIPTION BELOW LOCATION (WORD BY WORD STAGGER) */}
            <p
              key={`desc-${categoryIndex}-${itemIndex}`}
              style={{
                transform: detailsVisible ? "translate3d(0, 0, 0)" : "translate3d(0, 20px, 0)",
                opacity: detailsVisible ? 1 : 0,
                transition: "transform 0.75s ease-out, opacity 0.65s ease-out",
              }}
              className="text-[1.05vw] text-gray-700 font-medium leading-relaxed max-w-[32vw] mt-[2vh] flex flex-wrap gap-x-[0.25vw]"
            >
              {currentLandmark.description.split(" ").map((word, i) => (
                <span
                  key={`${categoryIndex}-${itemIndex}-${i}`}
                  style={{
                    animation: `wordFadeIn 0.3s ease-out ${i * 0.02}s backwards`,
                  }}
                  className="inline-block"
                >
                  {word}
                </span>
              ))}
            </p>

            {/* 5. ACTION BUTTONS BELOW DESCRIPTION */}
            <div
              style={{
                transform: detailsVisible ? "translate3d(0, 0, 0) scale(1)" : "translate3d(0, 25px, 0) scale(0.8)",
                opacity: detailsVisible ? 1 : 0,
                transition: "transform 0.85s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.75s ease-out",
              }}
              className="flex items-center gap-[1vw] mt-[1.5vh]"
            >
              <Link
                href="/explore/50-things-to-do-in-dubai"
                onClick={() => scrollToPageTop(true)}
                className="px-[1.6vw] py-[0.7vw] bg-[#FF2A75] text-white font-extrabold text-[0.95vw] rounded-full shadow-[0_0.5vw_1.5vw_rgba(255,42,117,0.35)] hover:shadow-[0_0.8vw_2vw_rgba(255,42,117,0.5)] hover:scale-105 transition-all duration-300 flex items-center gap-[0.5vw] cursor-pointer group"
              >
                <span>Explore Attraction</span>
                <Icon icon="lucide:arrow-right" className="w-[1vw] h-[1vw] group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/plan-trip"
                onClick={() => scrollToPageTop(true)}
                className="px-[1.6vw] py-[0.7vw] bg-white/80 hover:bg-white text-gray-800 font-bold text-[0.95vw] rounded-full border border-gray-200 shadow-sm hover:scale-105 transition-all duration-300 flex items-center gap-[0.5vw] cursor-pointer"
              >
                <Icon icon="ph:heart-bold" className="w-[1vw] h-[1vw] text-[#FF2A75]" />
                <span>Save Place</span>
              </Link>
            </div>
          </div>

          {/* 6. DESTINATION PREVIEWS CARDS BELOW BUTTONS (5 CARDS WITH SPRING BOUNCE PHYSICS EXACTLY LIKE SECTION 2) */}
          <div className="flex flex-col items-start gap-[0.5vh] mt-[2vh] self-start w-full">
            <div className="flex flex-row items-center gap-[1vw] w-full max-w-[48vw] overflow-visible py-[0.8vw] px-[0.2vw]">
              {currentItems.map((img, idx) => {
                const isActive = itemIndex === idx;
                const isCardRevealed = revealedThumbs > idx;

                const cardTransform = isCardRevealed
                  ? "translate3d(0, 0, 0) scale(1)"
                  : "translate3d(0, 80px, 0) scale(0.55)";
                const cardOpacity = isCardRevealed ? 1 : 0;
                const cardFilter = isCardRevealed ? "blur(0px)" : "blur(6px)";
                const transitionStyle = "transform 0.85s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.75s ease-out, filter 0.65s ease-out";

                return (
                  <div
                    key={idx}
                    onClick={() => handleThumbnailClick(idx)}
                    style={{
                      transform: cardTransform,
                      opacity: cardOpacity,
                      filter: cardFilter,
                      transition: transitionStyle,
                    }}
                    className={`relative flex-shrink-0 cursor-pointer group p-[0.3vw] ${
                      !isCardRevealed ? "pointer-events-none" : ""
                    }`}
                  >
                    {/* Active State Pink Corner Brackets with Sharp 45-Degree Pointed Tips */}
                    {isActive && (
                      <>
                        {/* Top-Left Pink Corner Bracket (Sharp Pointed Line Tips) */}
                        <svg className="absolute -top-[0.6vw] -left-[0.6vw] w-[1.8vw] h-[1.8vw] z-20 pointer-events-none overflow-visible" viewBox="0 0 36 36">
                          <path d="M 36 4 L 4 4 L 4 36 L 9 31 L 9 9 L 31 9 Z" fill="#FF2A75" />
                        </svg>
                        {/* Bottom-Right Pink Corner Bracket (Mirrored Sharp Pointed Line Tips) */}
                        <svg className="absolute -bottom-[0.6vw] -right-[0.6vw] w-[1.8vw] h-[1.8vw] z-20 pointer-events-none overflow-visible" viewBox="0 0 36 36">
                          <path d="M 0 32 L 32 32 L 32 0 L 27 5 L 27 27 L 5 27 Z" fill="#FF2A75" />
                        </svg>
                      </>
                    )}

                    {/* Card Container with Sharp Top Notch Cutout & Straight Square Edges */}
                    <div
                      style={{
                        clipPath: "polygon(0% 0%, 22% 0%, 32% 14%, 68% 14%, 78% 0%, 100% 0%, 100% 100%, 0% 100%)",
                      }}
                      className={`relative w-[7.8vw] h-[11.5vw] overflow-hidden transition-all duration-300 ${
                        isActive
                          ? "scale-105 shadow-[0_0.6vw_1.5vw_rgba(255,42,117,0.35)]"
                          : "hover:scale-102"
                      }`}
                    >
                      <Image
                        src={img.thumb}
                        alt={img.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        unoptimized
                      />

                      {/* Title Badge Overlay */}
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-[0.5vw] text-center z-10">
                        <span className="text-[0.68vw] font-extrabold text-white tracking-tight leading-none block truncate">
                          {img.title}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
