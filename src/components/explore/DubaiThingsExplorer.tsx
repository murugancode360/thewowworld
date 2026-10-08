"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { DubaiPlace } from "@/data/dubaiThings";

interface DubaiThingsExplorerProps {
  title: string;
  scriptHighlight: string;
  subtitle: string;
  badgeText: string;
  places: DubaiPlace[];
  heroImage: string;
  accentColor?: string;
}

// Reusable scroll-reveal hook
function useScrollReveal(threshold = 0.82) {
  const ref = useRef<any>(null);
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
        if (rect.top >= window.innerHeight * 0.98) {
          if (hasPlayedRef.current) {
            hasPlayedRef.current = false;
            isPlayingRef.current = false;
            setIsVisible(false);
          }
        }
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
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return { ref, isVisible };
}

export default function DubaiThingsExplorer({
  title,
  scriptHighlight,
  subtitle,
  badgeText,
  places,
  heroImage,
}: DubaiThingsExplorerProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const secCards = useScrollReveal(0.88);
  const secCta = useScrollReveal(0.82);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedPrice, setSelectedPrice] = useState<string>("All");
  const [sortBy, setSortBy] = useState<"number" | "rating" | "reviews">("number");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<DubaiPlace | null>(null);

  // Searchable Category Dropdown State
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [categorySearch, setCategorySearch] = useState("");
  const categoryDropdownRef = useRef<HTMLDivElement>(null);

  // Close Category Dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        categoryDropdownRef.current &&
        !categoryDropdownRef.current.contains(event.target as Node)
      ) {
        setIsCategoryOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Lock background screen scroll when modal is open
  useEffect(() => {
    if (selectedPlace) {
      const originalOverflow = document.body.style.overflow;
      const originalTouchAction = document.body.style.touchAction;
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
      return () => {
        document.body.style.overflow = originalOverflow;
        document.body.style.touchAction = originalTouchAction;
      };
    }
  }, [selectedPlace]);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(places.map((p) => p.category)));
    return ["All", ...cats];
  }, [places]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: places.length };
    places.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, [places]);

  const filteredCategories = useMemo(() => {
    if (!categorySearch.trim()) return categories;
    const q = categorySearch.toLowerCase().trim();
    return categories.filter((c) => c.toLowerCase().includes(q));
  }, [categories, categorySearch]);

  const toggleSave = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredPlaces = useMemo(() => {
    return places
      .filter((place) => {
        const matchesCategory =
          selectedCategory === "All" || place.category === selectedCategory;
        const matchesPrice =
          selectedPrice === "All" || place.priceLevel === selectedPrice;
        const query = searchQuery.toLowerCase().trim();
        const matchesQuery =
          query === "" ||
          place.title.toLowerCase().includes(query) ||
          place.description.toLowerCase().includes(query) ||
          place.location.toLowerCase().includes(query) ||
          place.tag.toLowerCase().includes(query) ||
          place.number.toString() === query;

        return matchesCategory && matchesPrice && matchesQuery;
      })
      .sort((a, b) => {
        if (sortBy === "rating") return b.rating - a.rating;
        if (sortBy === "reviews")
          return parseInt(b.reviews.replace(/[^0-9]/g, "")) -
            parseInt(a.reviews.replace(/[^0-9]/g, ""));
        return a.number - b.number;
      });
  }, [places, selectedCategory, selectedPrice, searchQuery, sortBy]);

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        .font-script {
          font-family: 'Caveat', cursive, sans-serif;
        }
        .modal-scroll-area {
          scrollbar-width: thin;
          scrollbar-color: #FF2D75 #FFF0F4;
          overscroll-behavior: contain;
          -webkit-overflow-scrolling: touch;
        }
        .modal-scroll-area::-webkit-scrollbar {
          width: 6px;
        }
        .modal-scroll-area::-webkit-scrollbar-track {
          background: #FFF0F4;
          border-radius: 9999px;
        }
        .modal-scroll-area::-webkit-scrollbar-thumb {
          background: #FF2D75;
          border-radius: 9999px;
        }
      `}</style>

      <main className="w-full min-h-screen bg-[#FFF5F8] text-slate-800 relative font-sans pb-24 selection:bg-pink-200">
        
        {/* ========================================================================= */}
        {/* HERO BANNER - FULL-BLEED RIGHT IMAGE WITH FADED OVERLAY & LEFT LEAVES */}
        {/* ========================================================================= */}
        <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#FFF0F4] via-[#FFE8F0] to-[#FFF5F8] pt-10 sm:pt-12 pb-12 sm:pb-16 px-4 sm:px-8 lg:px-12 border-b border-pink-100">
          
          {/* Left Side Tropical Leaves Artwork */}
          <div
            className="absolute -top-[4vh] -left-[2vw] w-[18vw] max-w-[280px] min-w-[150px] h-[55vh] z-0 pointer-events-none origin-top-left animate-flower-wave transition-all duration-1000 ease-out"
            style={{
              opacity: mounted ? 0.9 : 0,
              transform: mounted ? "scale(1)" : "scale(0.85)",
            }}
          >
            <Image
              src="/explore/left flower.webp"
              alt="Decorative Leaves"
              fill
              className="object-contain object-left"
              priority
              unoptimized
            />
          </div>

          {/* Full-Width Background Photo with Ultra-Smooth Silk Gradient Fade from Left to Right */}
          <div 
            className="absolute inset-0 z-0 pointer-events-none overflow-hidden [mask-image:linear-gradient(to_right,transparent_0%,transparent_30%,rgba(0,0,0,0.05)_42%,rgba(0,0,0,0.2)_55%,rgba(0,0,0,0.55)_70%,rgba(0,0,0,0.9)_85%,rgba(0,0,0,1)_96%)] [-webkit-mask-image:linear-gradient(to_right,transparent_0%,transparent_30%,rgba(0,0,0,0.05)_42%,rgba(0,0,0,0.2)_55%,rgba(0,0,0,0.55)_70%,rgba(0,0,0,0.9)_85%,rgba(0,0,0,1)_96%)] transition-opacity duration-1000"
            style={{ opacity: mounted ? 1 : 0 }}
          >
            <Image
              src={heroImage}
              alt={title}
              fill
              className="object-cover object-right"
              priority
              unoptimized
            />
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            
            {/* Top Navigation & Breadcrumbs */}
            <div
              className="flex flex-wrap items-center justify-between gap-4 mb-6 transition-all duration-700 ease-out"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(-14px)",
              }}
            >
              <Link
                href="/explore"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 hover:bg-white text-[#FF2D75] font-bold text-xs sm:text-sm rounded-full shadow-sm border border-pink-200 hover:scale-105 transition-all"
              >
                <Icon icon="lucide:arrow-left" className="w-4 h-4" />
                <span>Back to Explore Hub</span>
              </Link>

              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold px-3 py-1.5 bg-white/85 backdrop-blur-sm rounded-full border border-pink-200 text-slate-600 flex items-center gap-1.5 shadow-2xs">
                  <Icon icon="lucide:bookmark" className="w-3.5 h-3.5 text-[#FF2D75]" />
                  Saved: <strong className="text-[#FF2D75]">{savedIds.length}</strong>
                </span>

                <Link
                  href="/plan-trip"
                  className="px-4 py-1.5 bg-gradient-to-r from-[#FF2D75] to-[#FF5E97] text-white text-xs sm:text-sm font-bold rounded-full shadow-md hover:opacity-95 transition-all flex items-center gap-1.5"
                >
                  <Icon icon="lucide:sparkles" className="w-3.5 h-3.5" />
                  <span>Plan My Trip</span>
                </Link>
              </div>
            </div>

            {/* Main Hero Content */}
            <div className="max-w-2xl lg:max-w-3xl flex flex-col items-start pt-2">
           
              {/* Hero Title */}
              <h1
                className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.15] mb-4 transition-all duration-700 ease-out"
                style={{
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? "translateX(0)" : "translateX(-24px)",
                  transitionDelay: "0.12s",
                }}
              >
                <span>{title} </span>
                <span className="font-script text-4xl sm:text-5xl lg:text-6xl text-[#FF2D75] inline-block font-bold">
                  {scriptHighlight}
                </span>
              </h1>

              {/* Subtitle */}
              <p
                className="text-slate-600 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl mb-6 drop-shadow-2xs transition-all duration-700 ease-out"
                style={{
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? "translateY(0)" : "translateY(14px)",
                  transitionDelay: "0.24s",
                }}
              >
                {subtitle}
              </p>

              {/* Search Bar */}
              <div
                className="w-full max-w-xl bg-white rounded-full p-1.5 pl-5 shadow-[0_0.8vw_2.5vw_rgba(255,45,117,0.12)] border border-pink-200 flex items-center justify-between gap-3 focus-within:ring-2 focus-within:ring-[#FF2D75]/30 transition-all duration-700 ease-out"
                style={{
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? "translateY(0) scale(1)" : "translateY(18px) scale(0.97)",
                  transitionDelay: "0.36s",
                }}
              >
                <div className="flex items-center gap-2.5 flex-1">
                  <Icon icon="lucide:search" className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF2D75] shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search landmarks, desert tours, free spots, #number..."
                    className="w-full text-xs sm:text-sm font-medium text-slate-800 placeholder-slate-400 bg-transparent focus:outline-none"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="text-slate-400 hover:text-slate-600 p-1"
                      aria-label="Clear search"
                    >
                      <Icon icon="lucide:x" className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <span className="px-4 py-2 bg-gradient-to-r from-[#FF2D75] to-[#FF5E97] text-white font-bold text-xs sm:text-sm rounded-full shadow-sm shrink-0 flex items-center gap-1.5">
                  <span>{filteredPlaces.length} Found</span>
                </span>
              </div>

              {/* Quick stats pills */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-6 text-xs text-slate-600 font-semibold">
                <span
                  className="flex items-center gap-1.5 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-pink-100 shadow-2xs transition-all duration-600 ease-out"
                  style={{
                    opacity: mounted ? 1 : 0,
                    transform: mounted ? "translateY(0)" : "translateY(12px)",
                    transitionDelay: "0.46s",
                  }}
                >
                  <Icon icon="lucide:check-circle-2" className="w-3.5 h-3.5 text-emerald-500" />
                  {places.length} Handpicked Spots
                </span>
                <span
                  className="flex items-center gap-1.5 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-pink-100 shadow-2xs transition-all duration-600 ease-out"
                  style={{
                    opacity: mounted ? 1 : 0,
                    transform: mounted ? "translateY(0)" : "translateY(12px)",
                    transitionDelay: "0.54s",
                  }}
                >
                  <Icon icon="lucide:camera" className="w-3.5 h-3.5 text-[#FF2D75]" />
                  Photo & Insider Tips
                </span>
                <span
                  className="flex items-center gap-1.5 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-pink-100 shadow-2xs transition-all duration-600 ease-out"
                  style={{
                    opacity: mounted ? 1 : 0,
                    transform: mounted ? "translateY(0)" : "translateY(12px)",
                    transitionDelay: "0.62s",
                  }}
                >
                  <Icon icon="lucide:map" className="w-3.5 h-3.5 text-indigo-500" />
                  Interactive Filters
                </span>
              </div>

            </div>

          </div>

        </section>

        {/* ========================================================================= */}
        {/* FILTER & CONTROLS TOOLBAR - WITH SEARCHABLE AUTOCOMPLETE CATEGORY DROPDOWN */}
        {/* ========================================================================= */}
        <section
          className="bg-white/95 backdrop-blur-md border-b border-pink-100 py-3.5 px-4 sm:px-8 lg:px-12 shadow-xs transition-all duration-700 ease-out relative z-20"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(12px)",
            transitionDelay: "0.5s",
          }}
        >
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs">
            
            {/* Left: Active Results Counter & Reset */}
            <div className="flex items-center gap-2.5">
              <span className="text-slate-700 font-bold">
                Showing <strong className="text-[#FF2D75]">{filteredPlaces.length}</strong> of{" "}
                {places.length} experiences
                {selectedCategory !== "All" && (
                  <span className="ml-1 text-slate-500 font-normal">
                    in <strong className="text-[#FF2D75]">{selectedCategory}</strong>
                  </span>
                )}
              </span>

              {(selectedCategory !== "All" || selectedPrice !== "All" || searchQuery) && (
                <button
                  onClick={() => {
                    setSelectedCategory("All");
                    setSelectedPrice("All");
                    setSearchQuery("");
                  }}
                  className="text-xs font-bold text-[#FF2D75] hover:underline flex items-center gap-1 bg-pink-50 px-2.5 py-1 rounded-full border border-pink-100 cursor-pointer shadow-2xs"
                >
                  <Icon icon="lucide:rotate-ccw" className="w-3 h-3" />
                  <span>Reset All</span>
                </button>
              )}
            </div>

            {/* Right: Searchable Category Dropdown + Cost + Sort + View Mode */}
            <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
              
              {/* ================= SEARCHABLE AUTOCOMPLETE CATEGORY DROPDOWN ================= */}
              <div className="relative" ref={categoryDropdownRef}>
                <button
                  type="button"
                  onClick={() => setIsCategoryOpen((prev) => !prev)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-xs font-bold transition-all cursor-pointer shadow-2xs ${
                    selectedCategory !== "All"
                      ? "bg-[#FF2D75] text-white border-[#FF2D75] shadow-pink-500/20"
                      : "bg-pink-50/90 hover:bg-pink-100 text-slate-700 border-pink-100"
                  }`}
                  aria-expanded={isCategoryOpen}
                  aria-haspopup="listbox"
                >
                  <Icon icon="lucide:layers" className={`w-3.5 h-3.5 ${selectedCategory !== "All" ? "text-white" : "text-[#FF2D75]"}`} />
                  <span>
                    {selectedCategory === "All" ? "All Categories" : selectedCategory}
                  </span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-extrabold ${
                    selectedCategory !== "All" ? "bg-white/20 text-white" : "bg-white text-slate-600"
                  }`}>
                    {categoryCounts[selectedCategory] || 0}
                  </span>
                  <Icon
                    icon="lucide:chevron-down"
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      isCategoryOpen ? "rotate-180" : ""
                    } ${selectedCategory !== "All" ? "text-white" : "text-slate-400"}`}
                  />
                </button>

                {/* Dropdown Popover Menu with Live Search & Auto-Complete */}
                {isCategoryOpen && (
                  <div className="absolute top-full right-0 mt-2 w-72 sm:w-80 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-pink-100 p-3 z-50 animate-fadeIn">
                    
                    {/* Live Category Search Input */}
                    <div className="relative mb-2.5">
                      <Icon
                        icon="lucide:search"
                        className="w-3.5 h-3.5 text-[#FF2D75] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                      />
                      <input
                        type="text"
                        value={categorySearch}
                        onChange={(e) => setCategorySearch(e.target.value)}
                        placeholder="Search category (e.g. Adventure, Food)..."
                        autoFocus
                        className="w-full pl-8.5 pr-8 py-2 bg-pink-50/60 hover:bg-pink-50 focus:bg-white text-xs font-semibold text-slate-800 placeholder-slate-400 rounded-xl border border-pink-100 focus:outline-none focus:ring-2 focus:ring-[#FF2D75]/30 transition-all"
                      />
                      {categorySearch && (
                        <button
                          onClick={() => setCategorySearch("")}
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
                          aria-label="Clear category search"
                        >
                          <Icon icon="lucide:x" className="w-3 h-3" />
                        </button>
                      )}
                    </div>

                    {/* Category Options List */}
                    <div className="max-h-60 overflow-y-auto space-y-1 pr-1 scrollbar-thin">
                      {filteredCategories.length === 0 ? (
                        <div className="text-center py-6 text-slate-400 text-xs">
                          <Icon icon="lucide:search-x" className="w-6 h-6 mx-auto mb-1 text-pink-300" />
                          <span>No categories matching &quot;{categorySearch}&quot;</span>
                        </div>
                      ) : (
                        filteredCategories.map((cat) => {
                          const isSelected = selectedCategory === cat;
                          return (
                            <button
                              key={cat}
                              onClick={() => {
                                setSelectedCategory(cat);
                                setIsCategoryOpen(false);
                                setCategorySearch("");
                              }}
                              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer text-left ${
                                isSelected
                                  ? "bg-[#FF2D75] text-white shadow-sm"
                                  : "hover:bg-pink-50 text-slate-700"
                              }`}
                            >
                              <span className="flex items-center gap-2">
                                <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? "bg-white" : "bg-pink-400"}`} />
                                <span>{cat === "All" ? "All Categories" : cat}</span>
                              </span>
                              <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                                isSelected ? "bg-white/20 text-white" : "bg-pink-100/70 text-slate-600"
                              }`}>
                                {categoryCounts[cat] || 0}
                              </span>
                            </button>
                          );
                        })
                      )}
                    </div>

                    {/* Dropdown Footer */}
                    {selectedCategory !== "All" && (
                      <div className="mt-2 pt-2 border-t border-pink-100 flex items-center justify-between">
                        <span className="text-[10px] text-slate-400">Active category</span>
                        <button
                          onClick={() => {
                            setSelectedCategory("All");
                            setIsCategoryOpen(false);
                            setCategorySearch("");
                          }}
                          className="text-[11px] font-bold text-[#FF2D75] hover:underline cursor-pointer"
                        >
                          Clear Selection
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Price Filter */}
              <div className="flex items-center gap-1 bg-pink-50/90 px-3 py-1.5 rounded-full border border-pink-100 shadow-2xs">
                <span className="text-slate-500 font-medium">Cost:</span>
                <select
                  value={selectedPrice}
                  onChange={(e) => setSelectedPrice(e.target.value)}
                  className="bg-transparent font-bold text-slate-800 focus:outline-none cursor-pointer"
                  aria-label="Filter by cost"
                >
                  <option value="All">All Costs</option>
                  <option value="Free">Free</option>
                  <option value="Budget">Budget</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Luxury">Luxury</option>
                </select>
              </div>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-1 bg-pink-50/90 px-3 py-1.5 rounded-full border border-pink-100 shadow-2xs">
                <span className="text-slate-500 font-medium">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent font-bold text-slate-800 focus:outline-none cursor-pointer"
                  aria-label="Sort places"
                >
                  <option value="number"># Number Order</option>
                  <option value="rating">Top Rated (★)</option>
                  <option value="reviews">Most Reviews</option>
                </select>
              </div>

              {/* Grid / List View Toggle */}
              <div className="flex items-center bg-pink-50 rounded-full p-0.5 border border-pink-100 shadow-2xs">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-1.5 rounded-full transition-all cursor-pointer ${
                    viewMode === "grid"
                      ? "bg-[#FF2D75] text-white shadow-xs"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                  aria-label="Grid View"
                >
                  <Icon icon="lucide:layout-grid" className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-1.5 rounded-full transition-all cursor-pointer ${
                    viewMode === "list"
                      ? "bg-[#FF2D75] text-white shadow-xs"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                  aria-label="List View"
                >
                  <Icon icon="lucide:list" className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* PLACES LISTING GRID / LIST */}
        {/* ========================================================================= */}
        <div ref={secCards.ref} className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 mt-8">

          {filteredPlaces.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-pink-100 p-8 shadow-sm">
              <Icon icon="lucide:compass" className="w-16 h-16 text-[#FF2D75]/40 mx-auto mb-4 animate-bounce" />
              <h3 className="text-xl font-bold text-slate-800 mb-2">No places found matching your search</h3>
              <p className="text-slate-500 text-sm max-w-md mx-auto mb-6">
                Try searching for general keywords like "desert", "burj", "beach", "aquarium", or clear your filter tags.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                  setSelectedPrice("All");
                }}
                className="px-6 py-2.5 bg-gradient-to-r from-[#FF2D75] to-[#FF5E97] text-white font-bold text-sm rounded-full shadow-md hover:scale-105 transition-all"
              >
                Show All {places.length} Things
              </button>
            </div>
          ) : viewMode === "grid" ? (
            /* ================= GRID VIEW ================= */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPlaces.map((place, idx) => {
                const isSaved = savedIds.includes(place.id);
                const isCardVisible = secCards.isVisible || mounted;
                const cardDelay = Math.min((idx % 9) * 0.07, 0.6);
                return (
                  <div
                    key={place.id}
                    onClick={() => setSelectedPlace(place)}
                    className="bg-white rounded-3xl overflow-hidden border border-pink-100/90 shadow-[0_0.8vw_2.5vw_rgba(255,45,117,0.04)] hover:shadow-xl hover:-translate-y-1.5 transition-all duration-500 flex flex-col justify-between group cursor-pointer"
                    style={{
                      opacity: isCardVisible ? 1 : 0,
                      transform: isCardVisible ? "translate3d(0, 0, 0) scale(1)" : "translate3d(0, 24px, 0) scale(0.98)",
                      transitionDelay: `${cardDelay}s`,
                    }}
                  >
                    {/* Image Box */}
                    <div className="relative h-56 sm:h-60 w-full overflow-hidden">
                      <Image
                        src={place.image}
                        alt={place.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        unoptimized
                      />

                      {/* Top Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                      {/* Big Number Badge */}
                      <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5">
                        <div className="w-9 h-9 rounded-full bg-white/95 backdrop-blur-md text-[#FF2D75] font-black text-sm flex items-center justify-center shadow-lg border border-pink-100 shrink-0">
                          #{place.number}
                        </div>
                        <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white font-bold text-[11px] shadow-sm">
                          {place.category}
                        </span>
                      </div>

                      {/* Bookmark & Price Tag */}
                      <div className="absolute top-3.5 right-3.5 flex items-center gap-2">
                        <span
                          className={`px-2.5 py-0.8 rounded-full text-[10px] font-extrabold shadow-sm ${
                            place.priceLevel === "Free"
                              ? "bg-emerald-500 text-white"
                              : place.priceLevel === "Luxury"
                              ? "bg-amber-400 text-slate-900"
                              : "bg-white/90 text-slate-800 backdrop-blur-xs"
                          }`}
                        >
                          {place.priceLevel}
                        </span>

                        <button
                          type="button"
                          onClick={(e) => toggleSave(place.id, e)}
                          aria-label="Bookmark place"
                          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-md ${
                            isSaved
                              ? "bg-[#FF2D75] text-white scale-110"
                              : "bg-white/90 text-slate-700 hover:text-[#FF2D75]"
                          }`}
                        >
                          <Icon icon={isSaved ? "lucide:bookmark-check" : "lucide:bookmark"} className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Tag pill at bottom of image */}
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                        <span className="bg-[#FF2D75]/90 backdrop-blur-xs px-2.5 py-0.5 rounded-full font-bold text-[10px] uppercase tracking-wide">
                          {place.tag}
                        </span>
                        <div className="flex items-center gap-1 font-bold text-amber-300 drop-shadow-sm">
                          <Icon icon="lucide:star" className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span>{place.rating} ({place.reviews})</span>
                        </div>
                      </div>
                    </div>

                    {/* Content Body */}
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-black text-slate-900 text-base sm:text-lg mb-2 group-hover:text-[#FF2D75] transition-colors leading-snug">
                          {place.title}
                        </h3>

                        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed line-clamp-3 mb-4">
                          {place.description}
                        </p>
                      </div>

                      <div>
                        {/* Highlights & Metadata */}
                        <div className="pt-3 border-t border-pink-50 flex flex-col gap-1.5 text-xs text-slate-500 mb-4">
                          <div className="flex items-center gap-1.5 text-slate-700 font-semibold">
                            <Icon icon="lucide:sparkles" className="w-3.5 h-3.5 text-[#FF2D75] shrink-0" />
                            <span className="truncate">{place.highlight}</span>
                          </div>
                          <div className="flex items-center justify-between text-[11px] pt-1 text-slate-500">
                            <span className="flex items-center gap-1">
                              <Icon icon="lucide:map-pin" className="w-3 h-3 text-[#FF2D75]" />
                              {place.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <Icon icon="lucide:clock" className="w-3 h-3 text-slate-400" />
                              {place.duration}
                            </span>
                          </div>
                        </div>

                        {/* CTA Row */}
                        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                          <span className="text-xs text-slate-500">
                            Best time: <strong className="text-slate-800">{place.bestTime}</strong>
                          </span>

                          <button
                            type="button"
                            className="px-3.5 py-1.5 bg-gradient-to-r from-[#FF2D75] to-[#FF5E97] text-white text-xs font-bold rounded-full shadow-xs group-hover:scale-105 transition-all flex items-center gap-1 cursor-pointer"
                          >
                            <span>Details</span>
                            <Icon icon="lucide:arrow-right" className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* ================= LIST VIEW ================= */
            <div className="flex flex-col gap-4">
              {filteredPlaces.map((place, idx) => {
                const isSaved = savedIds.includes(place.id);
                const isCardVisible = secCards.isVisible || mounted;
                const cardDelay = Math.min((idx % 9) * 0.07, 0.6);
                return (
                  <div
                    key={place.id}
                    onClick={() => setSelectedPlace(place)}
                    className="bg-white rounded-3xl overflow-hidden border border-pink-100 shadow-sm hover:shadow-lg transition-all duration-500 p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-5 group cursor-pointer"
                    style={{
                      opacity: isCardVisible ? 1 : 0,
                      transform: isCardVisible ? "translate3d(0, 0, 0) scale(1)" : "translate3d(0, 24px, 0) scale(0.98)",
                      transitionDelay: `${cardDelay}s`,
                    }}
                  >
                    <div className="relative w-full sm:w-56 h-48 sm:h-40 rounded-2xl overflow-hidden shrink-0">
                      <Image
                        src={place.image}
                        alt={place.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        unoptimized
                      />
                      <div className="absolute top-2.5 left-2.5 w-8 h-8 rounded-full bg-white/95 text-[#FF2D75] font-black text-xs flex items-center justify-center shadow-md">
                        #{place.number}
                      </div>
                    </div>

                    <div className="flex-1 w-full flex flex-col justify-between">
                      <div>
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                          <div className="flex items-center gap-2">
                            <span className="px-2.5 py-0.5 rounded-full bg-pink-100 text-[#FF2D75] font-bold text-[10px] uppercase">
                              {place.category}
                            </span>
                            <span className="text-xs font-bold text-amber-500 flex items-center gap-1">
                              <Icon icon="lucide:star" className="w-3 h-3 fill-amber-400 text-amber-400" />
                              {place.rating} ({place.reviews})
                            </span>
                          </div>

                          <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-bold">
                            {place.priceLevel}
                          </span>
                        </div>

                        <h3 className="font-extrabold text-slate-900 text-lg group-hover:text-[#FF2D75] transition-colors">
                          {place.title}
                        </h3>

                        <p className="text-slate-600 text-xs sm:text-sm mt-1 mb-3 line-clamp-2">
                          {place.description}
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs text-slate-500">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1 text-slate-700 font-semibold">
                            <Icon icon="lucide:map-pin" className="w-3.5 h-3.5 text-[#FF2D75]" />
                            {place.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Icon icon="lucide:clock" className="w-3.5 h-3.5 text-slate-400" />
                            {place.duration}
                          </span>
                          <span className="hidden md:inline text-slate-400">•</span>
                          <span className="hidden md:inline text-slate-600">
                            Best time: {place.bestTime}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={(e) => toggleSave(place.id, e)}
                            className={`p-2 rounded-full border border-pink-200 transition-colors ${
                              isSaved ? "bg-[#FF2D75] text-white" : "bg-white text-slate-600 hover:text-[#FF2D75]"
                            }`}
                            aria-label="Save"
                          >
                            <Icon icon={isSaved ? "lucide:bookmark-check" : "lucide:bookmark"} className="w-4 h-4" />
                          </button>

                          <button
                            type="button"
                            className="px-4 py-1.5 bg-gradient-to-r from-[#FF2D75] to-[#FF5E97] text-white font-bold rounded-full shadow-xs group-hover:scale-105 transition-all text-xs flex items-center gap-1"
                          >
                            <span>Explore Spot</span>
                            <Icon icon="lucide:arrow-right" className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>

        {/* ========================================================================= */}
        {/* BOTTOM CALL TO ACTION: PLAN CUSTOM DUBAI TRIP */}
        {/* ========================================================================= */}
        <section ref={secCta.ref} className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 mt-16">
          <div
            className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#FFE8F0] via-[#FFF0F5] to-[#FFE8F0] p-8 sm:p-12 border border-pink-200 shadow-xl text-center transition-all duration-800 ease-out"
            style={{
              opacity: secCta.isVisible ? 1 : 0,
              transform: secCta.isVisible ? "translate3d(0, 0, 0)" : "translate3d(40px, 0, 0)",
            }}
          >
            
            <div className="max-w-2xl mx-auto">
              <span
                className="px-3.5 py-1 bg-white text-[#FF2D75] font-extrabold text-xs uppercase tracking-wider rounded-full shadow-xs border border-pink-200 inline-block mb-3 transition-all duration-600 ease-out"
                style={{
                  opacity: secCta.isVisible ? 1 : 0,
                  transform: secCta.isVisible ? "translateY(0)" : "translateY(12px)",
                  transitionDelay: "0.15s",
                }}
              >
                Ready to Experience Dubai?
              </span>

              <h2
                className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3 transition-all duration-700 ease-out"
                style={{
                  opacity: secCta.isVisible ? 1 : 0,
                  transform: secCta.isVisible ? "translateY(0)" : "translateY(15px)",
                  transitionDelay: "0.25s",
                }}
              >
                Want these places added into your{" "}
                <span className="font-script text-4xl sm:text-5xl text-[#FF2D75] block sm:inline font-bold">
                  custom itinerary?
                </span>
              </h2>

              <p
                className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6 transition-all duration-700 ease-out"
                style={{
                  opacity: secCta.isVisible ? 1 : 0,
                  transform: secCta.isVisible ? "translateY(0)" : "translateY(15px)",
                  transitionDelay: "0.35s",
                }}
              >
                Tell us which spots you love and our travel experts will design your seamless Dubai holiday package with hotels, private cars, skip-the-line tickets, and 24/7 support.
              </p>

              <div
                className="flex flex-wrap items-center justify-center gap-4 transition-all duration-700 ease-out"
                style={{
                  opacity: secCta.isVisible ? 1 : 0,
                  transform: secCta.isVisible ? "translateY(0) scale(1)" : "translateY(15px) scale(0.96)",
                  transitionDelay: "0.45s",
                }}
              >
                <Link
                  href="/plan-trip"
                  className="px-8 py-3.5 bg-gradient-to-r from-[#FF2D75] to-[#FF5E97] text-white font-bold text-sm sm:text-base rounded-full shadow-lg hover:scale-105 transition-all flex items-center gap-2"
                >
                  <Icon icon="lucide:sparkles" className="w-5 h-5" />
                  <span>Build My Dubai Trip</span>
                </Link>

                <Link
                  href="/explore"
                  className="px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-700 font-bold text-sm sm:text-base rounded-full shadow-sm border border-pink-200 transition-all flex items-center gap-2"
                >
                  <Icon icon="lucide:globe" className="w-5 h-5 text-[#FF2D75]" />
                  <span>View Other Destinations</span>
                </Link>
              </div>

            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* INTERACTIVE DETAIL MODAL */}
        {/* ========================================================================= */}
        {selectedPlace && (
          <div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn overscroll-contain"
            onClick={() => setSelectedPlace(null)}
          >
            <div
              className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-pink-100 animate-scaleUp max-h-[90vh] flex flex-col overscroll-contain"
              onClick={(e) => e.stopPropagation()}
              onWheel={(e) => e.stopPropagation()}
            >
              {/* Modal Image Banner */}
              <div className="relative h-64 sm:h-72 w-full shrink-0">
                <Image
                  src={selectedPlace.image}
                  alt={selectedPlace.title}
                  fill
                  className="object-cover"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Close Button */}
                <button
                  onClick={() => setSelectedPlace(null)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/80 transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <Icon icon="lucide:x" className="w-5 h-5" />
                </button>

                {/* Number & Category */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <div className="w-9 h-9 rounded-full bg-white text-[#FF2D75] font-black text-sm flex items-center justify-center shadow-lg shrink-0">
                    #{selectedPlace.number}
                  </div>
                  <span className="px-3 py-1 bg-[#FF2D75] text-white text-xs font-bold rounded-full shadow-sm">
                    {selectedPlace.category}
                  </span>
                </div>

                {/* Place Title in image */}
                <div className="absolute bottom-4 left-5 right-5 text-white">
                  <span className="text-xs uppercase tracking-widest text-pink-300 font-bold">
                    {selectedPlace.tag}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black leading-tight drop-shadow-sm">
                    {selectedPlace.title}
                  </h2>
                </div>
              </div>

              {/* Modal Details Scroll Body */}
              <div
                className="p-6 overflow-y-auto space-y-5 flex-1 modal-scroll-area overscroll-contain"
                onWheel={(e) => e.stopPropagation()}
              >
                
                {/* Key stats row */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3 bg-pink-50/60 rounded-2xl border border-pink-100 text-center">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Rating</span>
                    <span className="text-sm font-black text-amber-500 flex items-center justify-center gap-1">
                      <Icon icon="lucide:star" className="w-3.5 h-3.5 fill-amber-400" />
                      {selectedPlace.rating} ({selectedPlace.reviews})
                    </span>
                  </div>

                  <div className="p-3 bg-pink-50/60 rounded-2xl border border-pink-100 text-center">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Duration</span>
                    <span className="text-sm font-bold text-slate-800">
                      {selectedPlace.duration}
                    </span>
                  </div>

                  <div className="p-3 bg-pink-50/60 rounded-2xl border border-pink-100 text-center">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Price Level</span>
                    <span className="text-sm font-bold text-[#FF2D75]">
                      {selectedPlace.priceLevel}
                    </span>
                  </div>

                  <div className="p-3 bg-pink-50/60 rounded-2xl border border-pink-100 text-center">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Best Time</span>
                    <span className="text-xs font-bold text-slate-800 line-clamp-1">
                      {selectedPlace.bestTime}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Overview</h4>
                  <p className="text-slate-700 text-sm leading-relaxed">
                    {selectedPlace.description}
                  </p>
                </div>

                {/* Highlights Card */}
                <div className="p-4 bg-gradient-to-r from-pink-50 to-pink-100/50 rounded-2xl border border-pink-200">
                  <div className="flex items-center gap-2 text-sm font-bold text-[#FF2D75] mb-1">
                    <Icon icon="lucide:sparkles" className="w-4 h-4" />
                    <span>Top Highlight</span>
                  </div>
                  <p className="text-slate-800 text-xs sm:text-sm font-medium">
                    {selectedPlace.highlight}
                  </p>
                </div>

                {/* Location info */}
                <div className="flex items-center justify-between text-xs text-slate-600 p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Icon icon="lucide:map-pin" className="w-4 h-4 text-[#FF2D75]" />
                    Location: <strong className="text-slate-800">{selectedPlace.location}</strong>
                  </span>
                  <span className="text-[#FF2D75] font-bold">Dubai, UAE</span>
                </div>

              </div>

              {/* Modal Footer CTA */}
              <div className="p-4 sm:p-5 border-t border-pink-100 bg-pink-50/40 flex items-center justify-between gap-3">
                <button
                  onClick={(e) => toggleSave(selectedPlace.id, e)}
                  className={`px-4 py-2.5 rounded-full text-xs font-bold border transition-all flex items-center gap-1.5 cursor-pointer ${
                    savedIds.includes(selectedPlace.id)
                      ? "bg-[#FF2D75] text-white border-[#FF2D75]"
                      : "bg-white text-slate-700 border-pink-200 hover:border-[#FF2D75]"
                  }`}
                >
                  <Icon
                    icon={savedIds.includes(selectedPlace.id) ? "lucide:bookmark-check" : "lucide:bookmark"}
                    className="w-4 h-4"
                  />
                  <span>{savedIds.includes(selectedPlace.id) ? "Saved in Bucket List" : "Save Spot"}</span>
                </button>

                <Link
                  href="/plan-trip"
                  className="px-6 py-2.5 bg-gradient-to-r from-[#FF2D75] to-[#FF5E97] text-white font-bold text-xs sm:text-sm rounded-full shadow-md hover:scale-105 transition-all flex items-center gap-1.5"
                >
                  <Icon icon="lucide:sparkles" className="w-4 h-4" />
                  <span>Add to Custom Itinerary</span>
                </Link>
              </div>

            </div>
          </div>
        )}

      </main>
    </>
  );
}
