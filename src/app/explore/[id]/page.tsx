"use client";

import React, { useState, useEffect, use, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";

const packagesData: Record<string, any> = {
  "dubai-luxury": {
    id: "dubai-luxury",
    title: "Dubai Luxury Escape",
    subtitle: "Experience 5-star luxury, desert safaris, Burj Khalifa views, and private yacht cruises.",
    location: "Dubai, United Arab Emirates",
    duration: "5 Days / 4 Nights",
    rating: "4.8",
    reviewsCount: 124,
    pricePerPerson: 49999,
    originalPrice: 64999,
    discount: "23% OFF",
    tag: "Most Popular",
    coverImage: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=800&q=80",
    ],
    highlights: [
      "5-Star Luxury Resort Stay with daily buffet breakfast",
      "Burj Khalifa 124th & 125th Floor Observation Deck Tickets",
      "4x4 Premium Desert Safari with Dune Bashing, BBQ Dinner & Belly Dance",
      "Private Sunset Marina Yacht Cruise with complimentary drinks",
      "Airport Transfers in luxury executive vehicles",
    ],
    itinerary: [
      { day: "Day 1", title: "Arrival in Dubai & Marina Dhow Cruise", desc: "Welcome to Dubai! Private luxury transfer to your resort. Evening Dhow Cruise with buffet dinner." },
      { day: "Day 2", title: "Burj Khalifa & Dubai Mall Exploration", desc: "Visit the top of Burj Khalifa (124th floor), watch the Dubai Fountain Show, and shop at Dubai Mall." },
      { day: "Day 3", title: "Desert Safari Adventure & Bedouin Camp", desc: "Afternoon dune bashing in 4x4 Land Cruisers, camel riding, falconry show, henna design, and BBQ dinner." },
      { day: "Day 4", title: "Old Dubai Cultural Tour & Yacht Cruise", desc: "Gold & Spice Souks tour, Abra boat ride across Dubai Creek, followed by a private evening yacht cruise." },
      { day: "Day 5", title: "Leisure Morning & Departure", desc: "Enjoy resort amenities or last-minute souvenir shopping before your private transfer to Dubai International Airport." },
    ],
    inclusions: [
      "4 Nights accommodation in 5-star resort",
      "Daily breakfast & 2 specialty dinners",
      "All airport & sightseeing transfers",
      "Burj Khalifa entry tickets",
      "Desert Safari & Marina Yacht Cruise",
      "English-speaking licensed guide",
    ],
    exclusions: [
      "International Flight Airfare",
      "UAE Tourist Visa fees",
      "Personal expenses & tipping",
      "Tourism Dirham Fee (payable at hotel)",
    ],
  },
  "maldives-paradise": {
    id: "maldives-paradise",
    title: "Maldives Island Paradise",
    subtitle: "Overwater villa stay, crystal clear lagoon diving, bioluminescent beaches & romantic dinners.",
    location: "Male, Maldives",
    duration: "4 Days / 3 Nights",
    rating: "4.7",
    reviewsCount: 98,
    pricePerPerson: 39999,
    originalPrice: 49999,
    discount: "20% OFF",
    tag: "Top Rated",
    coverImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80",
    ],
    highlights: [
      "Overwater Bungalow with glass floor panel & direct ocean access",
      "All-Inclusive Dining (Breakfast, Lunch, Dinner & Unlimited Beverages)",
      "Guided Snorkeling with sea turtles & manta rays",
      "Sunset Dolphin Cruise",
      "Complimentary Spa Couple Massage",
    ],
    itinerary: [
      { day: "Day 1", title: "Speedboat Transfer & Overwater Check-in", desc: "Arrival at Velana International Airport, speedboat ride to island resort, floral welcome." },
      { day: "Day 2", title: "Snorkeling Safari & Sunset Dolphin Cruise", desc: "Discover vibrant coral reefs, swim alongside reef sharks and turtles, evening dolphin cruise." },
      { day: "Day 3", title: "Water Sports & Romantic Candlelight Dinner", desc: "Kayaking, paddleboarding, spa treatment, followed by a romantic private beach dinner under the stars." },
      { day: "Day 4", title: "Island Farewell & Departure Transfer", desc: "Enjoy breakfast overlooking the lagoon, ocean photos, and return speedboat transfer to Male airport." },
    ],
    inclusions: [
      "3 Nights in Luxury Overwater Villa",
      "All-inclusive meal & drink plan",
      "Roundtrip Speedboat Airport Transfers",
      "Snorkeling gear rental & excursion",
      "Couple Spa voucher",
    ],
    exclusions: [
      "International Flights",
      "Scuba Diving certification courses",
      "Personal items",
    ],
  },
  "switzerland-alpine": {
    id: "switzerland-alpine",
    title: "Switzerland Alpine Adventure",
    subtitle: "Scenic Swiss train rides, Jungfraujoch Top of Europe, Lucerne lake cruise & mountain cable cars.",
    location: "Lucerne & Interlaken, Switzerland",
    duration: "7 Days / 6 Nights",
    rating: "4.9",
    reviewsCount: 156,
    pricePerPerson: 129999,
    originalPrice: 149999,
    discount: "15% OFF",
    tag: "Trending",
    coverImage: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1507034589631-9433cc6bc453?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80",
    ],
    highlights: [
      "Jungfraujoch – Top of Europe High Altitude Railway excursion",
      "Swiss Travel Pass (First Class Train Pass included)",
      "Lucerne Chapel Bridge & Lake Cruise",
      "Mount Titlis Cable Car & Ice Flyer",
      "Chocolate Tasting & Swiss Chalet Stay",
    ],
    itinerary: [
      { day: "Day 1", title: "Zurich Arrival to Lucerne", desc: "Board the panoramic Swiss train to Lucerne. Walk through the Old Town and Chapel Bridge." },
      { day: "Day 2", title: "Mount Titlis & Glacier Cave Pass", desc: "Ascend Mt. Titlis in the Rotair revolving cable car. Walk on the Cliff Walk suspension bridge." },
      { day: "Day 3", title: "Lucerne to Interlaken via GoldenPass Line", desc: "Enjoy scenic train vistas through emerald valleys and alpine lakes." },
      { day: "Day 4", title: "Jungfraujoch Excursion", desc: "Ascend to Europe's highest railway station (3,454m). Ice Palace and Sphinx Observatory." },
      { day: "Day 5", title: "Grindelwald First Adventure Peak", desc: "First Cliff Walk by Tissot, zipline adventure, and trottibike ride down to Grindelwald." },
      { day: "Day 6", title: "Bern Old Town & Swiss Chocolate Experience", desc: "Day trip to the capital Bern, UNESCO old city, and artisan chocolate workshop." },
      { day: "Day 7", title: "Zurich Farewell", desc: "Train back to Zurich Airport for your international departure." },
    ],
    inclusions: [
      "6 Nights Alpine Hotel Stays with breakfast",
      "1st Class 8-Day Swiss Travel Pass",
      "Jungfraujoch & Mt Titlis excursion passes",
      "Lake Lucerne boat cruise",
    ],
    exclusions: [
      "International flights to Zurich",
      "Schengen Visa charges",
      "Personal expenses",
    ],
  },
  "bali-explorer": {
    id: "bali-explorer",
    title: "Bali Explorer",
    subtitle: "Ubud monkey forest, jungle swing, Tanah Lot temple sunset, and Nusa Penida island tour.",
    location: "Ubud & Seminyak, Bali, Indonesia",
    duration: "6 Days / 5 Nights",
    rating: "4.6",
    reviewsCount: 112,
    pricePerPerson: 59999,
    originalPrice: 74999,
    discount: "20% OFF",
    tag: "Popular",
    coverImage: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=800&q=80",
    ],
    highlights: [
      "Private Villa with infinity plunge pool",
      "Ubud Rice Terrace & Giant Jungle Swing photo session",
      "Full Day Nusa Penida Island Tour (Kelingking T-Rex Beach & Broken Beach)",
      "Tanah Lot Sea Temple Sunset view",
      "Authentic Balinese Massage & Floating Breakfast",
    ],
    itinerary: [
      { day: "Day 1", title: "Denpasar Arrival & Ubud Villa Welcome", desc: "Private driver pick up from Ngurah Rai airport to your luxury Ubud rainforest villa." },
      { day: "Day 2", title: "Ubud Cultural Tour & Rice Terraces", desc: "Tegalalang Rice Terraces, Sacred Monkey Forest, Coffee Plantation, and Bali Swing." },
      { day: "Day 3", title: "Nusa Penida Island Excursion", desc: "Fast boat to Nusa Penida island, visit Kelingking Beach, Angel's Billabong, Crystal Bay." },
      { day: "Day 4", title: "Waterfall & Uluwatu Kecak Fire Dance", desc: "Tegenungan Waterfall, transfer to Seminyak beach resort, evening Kecak Fire Dance at Uluwatu Cliff." },
      { day: "Day 5", title: "Tanah Lot Temple & Seminyak Beach Club", desc: "Visit Tanah Lot temple, evening relaxation at Potato Head / Finns Beach Club." },
      { day: "Day 6", title: "Floating Breakfast & Departure", desc: "Floating pool breakfast, souvenir shopping, and private airport transfer." },
    ],
    inclusions: [
      "5 Nights Luxury Villa & Beach Resort Stay",
      "Daily breakfast including 1 Floating Breakfast",
      "All private air-conditioned vehicle transfers",
      "Nusa Penida Fast Boat & Island Tour",
      "All entrance tickets to temples & waterfalls",
    ],
    exclusions: [
      "Flight tickets to Denpasar Bali",
      "Indonesia Visa on Arrival fee ($35 USD)",
      "Tips for drivers & guides",
    ],
  },
};

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

export default function PackageDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const secDetails = useScrollReveal(0.85);

  const resolvedParams = use(params);
  const packageId = resolvedParams.id;
  const pkg = packagesData[packageId] || packagesData["dubai-luxury"];

  const [activeTab, setActiveTab] = useState<"overview" | "itinerary" | "inclusions">("overview");
  const [guestsCount, setGuestsCount] = useState<number>(2);
  const [selectedDate, setSelectedDate] = useState<string>("2026-10-15");
  const [booked, setBooked] = useState<boolean>(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [activeHeroImg, setActiveHeroImg] = useState<number>(0);

  // Lock background scroll when lightbox is open
  useEffect(() => {
    if (lightboxIndex !== null) {
      const orig = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = orig;
      };
    }
  }, [lightboxIndex]);

  const allImages = [pkg.coverImage, ...pkg.gallery];
  const currentHeroImage = allImages[activeHeroImg] || pkg.coverImage;

  const sceneLabels = ["Featured View", "Ocean Vistas", "Luxury Suites", "Island Moments", "Sunset Dining"];
  const totalPrice = pkg.pricePerPerson * guestsCount;

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        
        .font-script {
          font-family: 'Caveat', cursive, sans-serif;
        }
      `}</style>

      <main className="w-full min-h-screen bg-[#FFF5F8] text-slate-800 relative overflow-hidden select-none font-sans pb-[8vh]">
        
        {/* Top Breadcrumb Header */}
        <div
          className="bg-white/90 backdrop-blur-md border-b border-pink-100 pt-[2.8vh] pb-[1.4vh] px-[3vw] transition-all duration-700 ease-out"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(-14px)",
          }}
        >
          <div className="max-w-[92vw] mx-auto flex items-center justify-between text-xs lg:text-[0.85vw]">
            <div className="flex items-center gap-[0.5vw] text-slate-500 font-medium">
              <Link href="/" className="hover:text-[#FF2D75] transition-colors">Home</Link>
              <span>/</span>
              <Link href="/explore" className="hover:text-[#FF2D75] transition-colors">Explore</Link>
              <span>/</span>
              <span className="text-[#FF2D75] font-bold">{pkg.title}</span>
            </div>

            <Link href="/explore" className="flex items-center gap-[0.4vw] text-[#FF2D75] font-bold hover:underline px-[1vw] py-[0.6vh] rounded-full bg-pink-50 border border-pink-100 shadow-2xs hover:bg-pink-100 transition-colors">
              <Icon icon="lucide:arrow-left" className="w-3.5 h-3.5 lg:w-[0.9vw] lg:h-[0.9vw]" />
              <span>Back to Packages</span>
            </Link>
          </div>
        </div>

        <div className="max-w-[92vw] mx-auto px-[1.5vw] pt-[3vh]">

          {/* TITLE & HIGHLIGHT ROW */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-[1.5vw] mb-[3vh]">
            <div>
              <div
                className="flex items-center gap-[0.5vw] mb-[0.6vh] transition-all duration-600 ease-out"
                style={{
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? "translateX(0)" : "translateX(-20px)",
                  transitionDelay: "0.08s",
                }}
              >
                {pkg.tag && (
                  <span className="bg-gradient-to-r from-[#FF2D75] to-[#FF5E97] text-white text-[10px] lg:text-[0.7vw] font-bold px-[0.9vw] py-[0.4vh] rounded-full shadow-sm">
                    {pkg.tag}
                  </span>
                )}
                <span className="text-xs lg:text-[0.75vw] font-bold text-emerald-600 bg-emerald-50 px-[0.8vw] py-[0.4vh] rounded-full border border-emerald-100">
                  {pkg.discount}
                </span>
                <span className="hidden sm:inline-flex items-center gap-[0.3vw] text-xs lg:text-[0.75vw] font-bold text-pink-600 bg-pink-50 px-[0.8vw] py-[0.4vh] rounded-full border border-pink-200">
                  <Icon icon="lucide:sparkles" className="w-3 h-3 text-[#FF2D75]" />
                  Curated Experience
                </span>
              </div>
              
              <h1
                className="text-3xl sm:text-4xl lg:text-[2.8vw] font-semibold text-slate-900 tracking-tight leading-tight transition-all duration-700 ease-out"
                style={{
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? "translateX(0)" : "translateX(-24px)",
                  transitionDelay: "0.16s",
                }}
              >
                {pkg.title}
              </h1>

              <div
                className="flex flex-wrap items-center gap-x-[1vw] gap-y-[0.5vh] text-xs lg:text-[0.92vw] text-slate-600 mt-[0.8vh] transition-all duration-600 ease-out"
                style={{
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? "translateX(0)" : "translateX(-20px)",
                  transitionDelay: "0.24s",
                }}
              >
                <span className="flex items-center gap-[0.3vw] font-semibold text-[#FF2D75]">
                  <Icon icon="lucide:map-pin" className="w-4 h-4 lg:w-[1vw] lg:h-[1vw]" />
                  {pkg.location}
                </span>
                <span>•</span>
                <span className="flex items-center gap-[0.3vw] font-semibold text-slate-700">
                  <Icon icon="lucide:clock" className="w-4 h-4 lg:w-[1vw] lg:h-[1vw] text-slate-400" />
                  {pkg.duration}
                </span>
                <span>•</span>
                <span className="flex items-center gap-[0.3vw] font-bold text-amber-500">
                  <Icon icon="lucide:star" className="w-4 h-4 lg:w-[1vw] lg:h-[1vw] fill-amber-400" />
                  {pkg.rating} ({pkg.reviewsCount} reviews)
                </span>
              </div>
            </div>

            <div
              className="flex items-center gap-[0.8vw] transition-all duration-600 ease-out"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? "scale(1)" : "scale(0.85)",
                transitionDelay: "0.28s",
              }}
            >
              <button aria-label="Share package" className="w-10 h-10 lg:w-[2.6vw] lg:h-[2.6vw] rounded-full bg-white border border-pink-100 text-slate-600 hover:text-[#FF2D75] shadow-sm transition-colors flex items-center justify-center cursor-pointer">
                <Icon icon="lucide:share-2" className="w-4 h-4 lg:w-[1.1vw] lg:h-[1.1vw]" />
              </button>
              <button aria-label="Save package" className="w-10 h-10 lg:w-[2.6vw] lg:h-[2.6vw] rounded-full bg-white border border-pink-100 text-slate-600 hover:text-[#FF2D75] shadow-sm transition-colors flex items-center justify-center cursor-pointer">
                <Icon icon="lucide:heart" className="w-4 h-4 lg:w-[1.1vw] lg:h-[1.1vw]" />
              </button>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* UNIQUE EDITORIAL ASYMMETRICAL LUXURY SHOWCASE GALLERY */}
          {/* ========================================================================= */}
          <div className="mb-[4.5vh]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-[1.2vw]">
              
              {/* LEFT FOCAL STAGE (8 Columns on desktop): Interactive Main Visual with Scene Switcher */}
              <div
                className="lg:col-span-8 flex flex-col gap-[1vh] transition-all duration-800 ease-out"
                style={{
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? "translate3d(0, 0, 0) scale(1)" : "translate3d(-20px, 0, 0) scale(0.98)",
                  transitionDelay: "0.22s",
                }}
              >
                <div
                  onClick={() => setLightboxIndex(activeHeroImg)}
                  className="relative h-[42vh] sm:h-[48vh] lg:h-[54vh] rounded-[2vw] overflow-hidden border-[3px] border-white shadow-xl group cursor-pointer bg-slate-900"
                >
                  <Image
                    src={currentHeroImage}
                    alt={pkg.title}
                    fill
                    className="object-cover transition-all duration-700 ease-out group-hover:scale-105"
                    priority
                    unoptimized
                  />
                  
                  {/* Subtle Gradient Overlays for Cinematic Depth */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 pointer-events-none" />

                  {/* Top Left: Interactive Scene Switcher Tabs (Clickable Pills) */}
                  <div
                    className="absolute top-[1.2vw] left-[1.2vw] flex flex-wrap items-center gap-[0.4vw] z-10"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {allImages.slice(0, 4).map((img: string, idx: number) => {
                      const isActive = activeHeroImg === idx;
                      return (
                        <button
                          key={idx}
                          onClick={() => setActiveHeroImg(idx)}
                          className={`px-[0.9vw] py-[0.5vh] rounded-full text-[11px] lg:text-[0.72vw] font-bold transition-all duration-300 flex items-center gap-[0.3vw] cursor-pointer shadow-md backdrop-blur-md ${
                            isActive
                              ? "bg-[#FF2D75] text-white ring-2 ring-white/60 scale-105"
                              : "bg-black/40 hover:bg-black/60 text-white/90 border border-white/20"
                          }`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-white animate-pulse" : "bg-white/60"}`} />
                          <span>{sceneLabels[idx] || `Scene ${idx + 1}`}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Top Right: Expand / Fullscreen badge */}
                  <div className="absolute top-[1.2vw] right-[1.2vw] z-10">
                    <span className="px-[0.8vw] py-[0.4vh] rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white text-[10px] lg:text-[0.68vw] font-bold flex items-center gap-[0.3vw]">
                      <Icon icon="lucide:maximize-2" className="w-3 h-3 lg:w-[0.8vw] lg:h-[0.8vw] text-pink-300" />
                      <span>Click to Enlarge</span>
                    </span>
                  </div>

                  {/* Bottom Left: Location Stamp & Highlights */}
                  <div className="absolute bottom-[1.4vw] left-[1.4vw] text-white z-10 pointer-events-none">
                    <div className="flex items-center gap-[0.4vw] mb-[0.3vh]">
                      <span className="bg-[#FF2D75]/90 backdrop-blur-sm text-[10px] lg:text-[0.68vw] font-black uppercase tracking-wider px-[0.6vw] py-[0.2vh] rounded-md">
                        {pkg.duration}
                      </span>
                      <span className="text-white/80 text-xs lg:text-[0.75vw] font-medium drop-shadow">
                        {pkg.location}
                      </span>
                    </div>
                    <p className="text-lg lg:text-[1.4vw] font-bold leading-tight drop-shadow-lg text-white">
                      {pkg.title}
                    </p>
                  </div>

                  {/* Bottom Right: Floating Playful Polaroid Memory Card Accent */}
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      const nextIndex = (activeHeroImg + 1) % allImages.length;
                      setActiveHeroImg(nextIndex);
                    }}
                    className="absolute bottom-[1.2vw] right-[1.2vw] z-10 bg-white p-[0.45vw] pb-[1.4vw] rounded-[0.8vw] shadow-2xl transform -rotate-3 hover:rotate-0 hover:scale-105 transition-all duration-300 border border-pink-100 hidden sm:block cursor-pointer group/polaroid"
                    title="Click to peek next photo"
                  >
                    <div className="relative w-[7vw] h-[6vw] min-w-[90px] min-h-[75px] rounded-[0.5vw] overflow-hidden">
                      <Image
                        src={allImages[(activeHeroImg + 1) % allImages.length]}
                        alt="Next Scene Preview"
                        fill
                        className="object-cover group-hover/polaroid:scale-110 transition-transform duration-300"
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover/polaroid:bg-transparent transition-colors" />
                    </div>
                    <span className="font-script text-xs lg:text-[0.85vw] font-bold text-[#FF2D75] text-center block mt-[0.3vh]">
                      Next Photo ✦
                    </span>
                  </div>
                </div>
              </div>

              {/* RIGHT STAGGERED MEDIA DECK (4 Columns on desktop) */}
              <div className="lg:col-span-4 flex flex-col gap-[1.2vh] h-full justify-between">
                
                {/* Upper Card: Landscape Panorama View with Floating Tag */}
                <div
                  onClick={() => setLightboxIndex(1 % allImages.length)}
                  className="relative h-[22vh] lg:h-[26vh] rounded-[1.6vw] overflow-hidden border-[3px] border-white shadow-md group cursor-pointer bg-slate-900 transition-all duration-800 ease-out"
                  style={{
                    opacity: mounted ? 1 : 0,
                    transform: mounted ? "translate3d(0, 0, 0)" : "translate3d(30px, 0, 0)",
                    transitionDelay: "0.32s",
                  }}
                >
                  <Image
                    src={allImages[1 % allImages.length]}
                    alt={`${pkg.title} scene`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                  
                  {/* Badge */}
                  <div className="absolute top-[0.8vw] left-[0.8vw] flex items-center gap-[0.3vw]">
                    <span className="px-[0.7vw] py-[0.35vh] rounded-full bg-white/90 backdrop-blur-md text-slate-800 font-bold text-[10px] lg:text-[0.68vw] shadow-sm flex items-center gap-[0.3vw]">
                      <Icon icon="lucide:eye" className="w-3 h-3 text-[#FF2D75]" />
                      <span>Ocean Vista</span>
                    </span>
                  </div>

                  <div className="absolute bottom-[0.8vw] left-[0.8vw] text-white">
                    <span className="font-semibold text-xs lg:text-[0.82vw] drop-shadow-md">
                      Scenic Surroundings
                    </span>
                  </div>
                </div>

                {/* Lower Split: Two Micro-Cards + Full Gallery Trigger */}
                <div className="grid grid-cols-2 gap-[0.8vw] h-[22vh] lg:h-[26.5vh]">
                  
                  {/* Lower Left Card */}
                  <div
                    onClick={() => setLightboxIndex(2 % allImages.length)}
                    className="relative h-full rounded-[1.4vw] overflow-hidden border-[3px] border-white shadow-md group cursor-pointer bg-slate-900 transition-all duration-800 ease-out"
                    style={{
                      opacity: mounted ? 1 : 0,
                      transform: mounted ? "translate3d(0, 0, 0)" : "translate3d(30px, 0, 0)",
                      transitionDelay: "0.42s",
                    }}
                  >
                    <Image
                      src={allImages[2 % allImages.length]}
                      alt={`${pkg.title} atmosphere`}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                    <div className="absolute bottom-[0.6vw] left-[0.6vw] right-[0.6vw]">
                      <span className="text-[10px] lg:text-[0.7vw] font-bold text-white bg-black/40 backdrop-blur-sm px-[0.5vw] py-[0.2vh] rounded-md block truncate">
                        Resort Ambiance
                      </span>
                    </div>
                  </div>

                  {/* Lower Right: Interactive "View All Photos" Portal Card */}
                  <div
                    onClick={() => setLightboxIndex(0)}
                    className="relative h-full rounded-[1.4vw] overflow-hidden border-[3px] border-white shadow-md group cursor-pointer bg-gradient-to-br from-[#FF2D75] to-[#D81B60] p-[1vw] flex flex-col items-center justify-center text-white text-center hover:shadow-xl transition-all duration-800 ease-out"
                    style={{
                      opacity: mounted ? 1 : 0,
                      transform: mounted ? "translate3d(0, 0, 0)" : "translate3d(30px, 0, 0)",
                      transitionDelay: "0.52s",
                    }}
                  >
                    <div className="w-10 h-10 lg:w-[2.6vw] lg:h-[2.6vw] rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mb-[0.6vh] group-hover:scale-110 group-hover:bg-white text-white group-hover:text-[#FF2D75] transition-all">
                      <Icon icon="lucide:camera" className="w-5 h-5 lg:w-[1.2vw] lg:h-[1.2vw]" />
                    </div>
                    <span className="text-xs lg:text-[0.85vw] font-black leading-tight">
                      View All Photos
                    </span>
                    <span className="text-[10px] lg:text-[0.68vw] text-pink-100 font-medium mt-[0.2vh]">
                      {allImages.length} HD Scenes ➔
                    </span>
                  </div>

                </div>

              </div>

            </div>

            {/* QUICK FEATURE BADGES RIBBON UNDER GALLERY */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-[0.8vw] mt-[1.5vh]">
              {[
                { icon: "lucide:award", label: "Accommodations", value: "5-Star Luxury Stay" },
                { icon: "lucide:utensils", label: "Meal Plan", value: "Daily Gourmet Breakfast" },
                { icon: "lucide:plane", label: "Transfers", value: "Airport Pickup Included" },
                { icon: "lucide:shield-check", label: "Flexibility", value: "Free Date Rescheduling" },
              ].map((badge, idx) => (
                <div
                  key={idx}
                  className="bg-white/90 backdrop-blur-sm border border-pink-100/80 rounded-2xl lg:rounded-[1vw] p-[0.8vw] px-[1vw] flex items-center gap-[0.6vw] shadow-2xs transition-all duration-600 ease-out"
                  style={{
                    opacity: mounted ? 1 : 0,
                    transform: mounted ? "translateY(0)" : "translateY(16px)",
                    transitionDelay: `${0.45 + idx * 0.08}s`,
                  }}
                >
                  <div className="w-8 h-8 lg:w-[2vw] lg:h-[2vw] rounded-full bg-pink-50 text-[#FF2D75] flex items-center justify-center shrink-0">
                    <Icon icon={badge.icon} className="w-4 h-4 lg:w-[1vw] lg:h-[1vw]" />
                  </div>
                  <div>
                    <span className="text-[10px] lg:text-[0.65vw] uppercase font-bold text-slate-400 block">{badge.label}</span>
                    <span className="text-xs lg:text-[0.78vw] font-bold text-slate-800">{badge.value}</span>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* LIGHTBOX MODAL */}
          {lightboxIndex !== null && (
            <div
              className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-fadeIn"
              onClick={() => setLightboxIndex(null)}
            >
              <div
                className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={() => setLightboxIndex(null)}
                  className="absolute -top-12 right-0 text-white/80 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all cursor-pointer"
                  aria-label="Close lightbox"
                >
                  <Icon icon="lucide:x" className="w-6 h-6" />
                </button>

                {/* Main Lightbox Image */}
                <div className="relative w-full h-[65vh] rounded-3xl overflow-hidden shadow-2xl border border-white/20">
                  <Image
                    src={[pkg.coverImage, ...pkg.gallery][lightboxIndex]}
                    alt={`${pkg.title} full view`}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>

                {/* Bottom Controls */}
                <div className="flex items-center justify-between w-full mt-4 text-white">
                  <button
                    onClick={() =>
                      setLightboxIndex((prev) =>
                        prev !== null && prev > 0 ? prev - 1 : [pkg.coverImage, ...pkg.gallery].length - 1
                      )
                    }
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full font-bold text-xs sm:text-sm flex items-center gap-1 cursor-pointer"
                  >
                    <Icon icon="lucide:chevron-left" className="w-4 h-4" />
                    <span>Previous</span>
                  </button>

                  <span className="text-xs sm:text-sm font-semibold text-slate-300">
                    Photo {lightboxIndex + 1} of {[pkg.coverImage, ...pkg.gallery].length}
                  </span>

                  <button
                    onClick={() =>
                      setLightboxIndex((prev) =>
                        prev !== null && prev < [pkg.coverImage, ...pkg.gallery].length - 1 ? prev + 1 : 0
                      )
                    }
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full font-bold text-xs sm:text-sm flex items-center gap-1 cursor-pointer"
                  >
                    <span>Next</span>
                    <Icon icon="lucide:chevron-right" className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* MAIN CONTENT + SIDEBAR BOOKING CARD */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-[2vw] items-start">
            
            {/* Left Column: Details & Tabs */}
            <div ref={secDetails.ref} className="lg:col-span-8 flex flex-col items-start w-full">
              
              {/* Tab Navigation */}
              <div
                className="flex items-center gap-[0.6vw] border-b border-pink-200/80 w-full mb-[3.5vh] transition-all duration-600 ease-out"
                style={{
                  opacity: secDetails.isVisible || mounted ? 1 : 0,
                  transform: secDetails.isVisible || mounted ? "translateY(0)" : "translateY(12px)",
                }}
              >
                {[
                  { key: "overview", label: "Overview & Highlights", icon: "lucide:sparkles" },
                  { key: "itinerary", label: "Day wise Itinerary", icon: "lucide:calendar" },
                  { key: "inclusions", label: "Inclusions & Exclusions", icon: "lucide:check-circle-2" },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key as any)}
                    className={`flex items-center gap-[0.4vw] px-[1.4vw] py-[1.2vh] font-bold text-xs lg:text-[0.88vw] border-b-2 transition-all cursor-pointer ${
                      activeTab === tab.key
                        ? "border-[#FF2D75] text-[#FF2D75] bg-pink-50/60 rounded-t-xl lg:rounded-t-[0.8vw]"
                        : "border-transparent text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    <Icon icon={tab.icon} className="w-4 h-4 lg:w-[1vw] lg:h-[1vw]" />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>

              {/* TAB 1: OVERVIEW & HIGHLIGHTS */}
              {activeTab === "overview" && (
                <div className="w-full space-y-[3vh] animate-fade-in">
                  <div>
                    <h3 className="text-xl lg:text-[1.3vw] font-extrabold text-slate-900 mb-[1.2vh]">About This Experience</h3>
                    <p className="text-slate-600 text-sm lg:text-[0.9vw] leading-relaxed">
                      {pkg.subtitle}
                    </p>
                  </div>

                  <div className="bg-white/90 backdrop-blur-md rounded-3xl lg:rounded-[1.6vw] p-[1.8vw] border border-pink-100 shadow-sm">
                    <h3 className="font-script text-3xl lg:text-[2.2vw] font-bold text-[#FF2D75] mb-[1.8vh]">
                      ✨ Package Highlights
                    </h3>
                    <div className="space-y-[1.2vh]">
                      {pkg.highlights.map((item: string, i: number) => (
                        <div
                          key={i}
                          className="flex items-start gap-[0.8vw] transition-all duration-600 ease-out"
                          style={{
                            opacity: secDetails.isVisible || mounted ? 1 : 0,
                            transform: secDetails.isVisible || mounted ? "translateX(0)" : "translateX(-16px)",
                            transitionDelay: `${0.1 + i * 0.08}s`,
                          }}
                        >
                          <div className="w-5 h-5 lg:w-[1.4vw] lg:h-[1.4vw] rounded-full bg-pink-100 text-[#FF2D75] flex items-center justify-center shrink-0 mt-0.5">
                            <Icon icon="lucide:check" className="w-3.5 h-3.5 lg:w-[0.9vw] lg:h-[0.9vw]" />
                          </div>
                          <span className="text-xs lg:text-[0.85vw] text-slate-700 font-medium leading-normal">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: DAY WISE ITINERARY */}
              {activeTab === "itinerary" && (
                <div className="w-full space-y-[1.8vh] animate-fade-in">
                  <h3 className="text-xl lg:text-[1.3vw] font-extrabold text-slate-900 mb-[1.8vh]">Detailed Tour Plan</h3>
                  {pkg.itinerary.map((dayPlan: any, i: number) => (
                    <div
                      key={i}
                      className="bg-white rounded-2xl lg:rounded-[1.3vw] p-[1.4vw] border border-pink-100 shadow-sm flex items-start gap-[1.2vw] transition-all duration-600 ease-out hover:shadow-md hover:border-pink-200"
                      style={{
                        opacity: secDetails.isVisible || mounted ? 1 : 0,
                        transform: secDetails.isVisible || mounted ? "translate3d(0, 0, 0)" : "translate3d(-20px, 0, 0)",
                        transitionDelay: `${0.1 + i * 0.09}s`,
                      }}
                    >
                      <div className="px-[1vw] py-[0.6vh] rounded-xl lg:rounded-[0.8vw] bg-gradient-to-r from-[#FF2D75] to-[#FF5E97] text-white text-xs lg:text-[0.78vw] font-black shrink-0">
                        {dayPlan.day}
                      </div>
                      <div>
                        <h4 className="font-extrabold text-slate-900 text-sm lg:text-[0.95vw] mb-[0.4vh]">{dayPlan.title}</h4>
                        <p className="text-xs lg:text-[0.8vw] text-slate-600 leading-relaxed">{dayPlan.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 3: INCLUSIONS & EXCLUSIONS */}
              {activeTab === "inclusions" && (
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-[1.5vw] animate-fade-in">
                  
                  {/* Inclusions */}
                  <div
                    className="bg-white rounded-3xl lg:rounded-[1.6vw] p-[1.8vw] border border-emerald-100 shadow-sm transition-all duration-700 ease-out"
                    style={{
                      opacity: secDetails.isVisible || mounted ? 1 : 0,
                      transform: secDetails.isVisible || mounted ? "translateX(0)" : "translateX(-20px)",
                      transitionDelay: "0.15s",
                    }}
                  >
                    <h3 className="font-extrabold text-emerald-700 text-base lg:text-[1.1vw] mb-[1.8vh] flex items-center gap-[0.5vw]">
                      <Icon icon="lucide:check-circle-2" className="w-5 h-5 lg:w-[1.2vw] lg:h-[1.2vw]" />
                      <span>What's Included</span>
                    </h3>
                    <div className="space-y-[1vh]">
                      {pkg.inclusions.map((inc: string, i: number) => (
                        <div key={i} className="flex items-start gap-[0.5vw] text-xs lg:text-[0.8vw] text-slate-700 font-medium">
                          <span className="text-emerald-500 font-bold">•</span>
                          <span>{inc}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Exclusions */}
                  <div
                    className="bg-white rounded-3xl lg:rounded-[1.6vw] p-[1.8vw] border border-rose-100 shadow-sm transition-all duration-700 ease-out"
                    style={{
                      opacity: secDetails.isVisible || mounted ? 1 : 0,
                      transform: secDetails.isVisible || mounted ? "translateX(0)" : "translateX(20px)",
                      transitionDelay: "0.22s",
                    }}
                  >
                    <h3 className="font-extrabold text-rose-700 text-base lg:text-[1.1vw] mb-[1.8vh] flex items-center gap-[0.5vw]">
                      <Icon icon="lucide:x-circle" className="w-5 h-5 lg:w-[1.2vw] lg:h-[1.2vw]" />
                      <span>What's Excluded</span>
                    </h3>
                    <div className="space-y-[1vh]">
                      {pkg.exclusions.map((exc: string, i: number) => (
                        <div key={i} className="flex items-start gap-[0.5vw] text-xs lg:text-[0.8vw] text-slate-700 font-medium">
                          <span className="text-rose-400 font-bold">•</span>
                          <span>{exc}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}

            </div>

            {/* Right Column: Sticky Booking Widget Card */}
            <div
              className="lg:col-span-4 sticky top-[10vh] w-full transition-all duration-800 ease-out"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translate3d(0, 0, 0)" : "translate3d(40px, 0, 0)",
                transitionDelay: "0.35s",
              }}
            >
              <div className="bg-white/95 backdrop-blur-md rounded-3xl lg:rounded-[1.8vw] p-[1.8vw] border border-pink-100 shadow-[0_0.8vw_2.5vw_rgba(255,45,117,0.08)]">
                
                <div
                  className="flex items-baseline justify-between mb-[1.8vh] pb-[1.8vh] border-b border-slate-100 transition-all duration-600 ease-out"
                  style={{
                    opacity: mounted ? 1 : 0,
                    transform: mounted ? "translateY(0)" : "translateY(10px)",
                    transitionDelay: "0.45s",
                  }}
                >
                  <div>
                    <span className="text-xs lg:text-[0.75vw] text-slate-400 font-medium block">Starting from</span>
                    <div className="flex items-baseline gap-[0.5vw]">
                      <span className="text-2xl lg:text-[1.8vw] font-black text-[#FF2D75]">₹{pkg.pricePerPerson.toLocaleString("en-IN")}</span>
                      <span className="text-xs lg:text-[0.85vw] text-slate-400 line-through">₹{pkg.originalPrice.toLocaleString("en-IN")}</span>
                    </div>
                  </div>
                  <span className="text-[11px] lg:text-[0.75vw] text-slate-500 font-semibold">per person</span>
                </div>

                {booked ? (
                  <div className="p-[1.6vw] rounded-2xl lg:rounded-[1.2vw] bg-emerald-50 border border-emerald-200 text-center animate-fade-in">
                    <div className="w-10 h-10 lg:w-[2.6vw] lg:h-[2.6vw] rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto mb-[1vh]">
                      <Icon icon="lucide:check" className="w-5 h-5 lg:w-[1.2vw] lg:h-[1.2vw]" />
                    </div>
                    <h4 className="font-extrabold text-slate-900 text-sm lg:text-[0.95vw] mb-[0.4vh]">Trip Request Received!</h4>
                    <p className="text-xs lg:text-[0.78vw] text-slate-600">
                      Our concierges will contact you within 2 hours to finalize your itinerary.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-[1.6vh]">
                    
                    {/* Date Selector */}
                    <div
                      className="transition-all duration-600 ease-out"
                      style={{
                        opacity: mounted ? 1 : 0,
                        transform: mounted ? "translateY(0)" : "translateY(10px)",
                        transitionDelay: "0.52s",
                      }}
                    >
                      <label className="block text-xs lg:text-[0.78vw] font-bold text-slate-700 mb-[0.5vh]">Select Travel Date</label>
                      <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full text-xs lg:text-[0.82vw] py-[1vh] px-[0.8vw] bg-pink-50/50 border border-pink-100 rounded-xl lg:rounded-[0.8vw] text-slate-800 focus:outline-none focus:border-[#FF2D75]"
                      />
                    </div>

                    {/* Guests Selector */}
                    <div
                      className="transition-all duration-600 ease-out"
                      style={{
                        opacity: mounted ? 1 : 0,
                        transform: mounted ? "translateY(0)" : "translateY(10px)",
                        transitionDelay: "0.58s",
                      }}
                    >
                      <label className="block text-xs lg:text-[0.78vw] font-bold text-slate-700 mb-[0.5vh]">Number of Guests</label>
                      <div className="flex items-center justify-between p-[0.6vw] bg-pink-50/50 border border-pink-100 rounded-xl lg:rounded-[0.8vw]">
                        <button
                          onClick={() => setGuestsCount(Math.max(1, guestsCount - 1))}
                          className="w-8 h-8 lg:w-[2.2vw] lg:h-[2.2vw] rounded-lg lg:rounded-[0.6vw] bg-white text-slate-700 font-bold hover:bg-[#FF2D75] hover:text-white transition-colors cursor-pointer flex items-center justify-center text-sm lg:text-[1vw]"
                        >
                          -
                        </button>
                        <span className="text-sm lg:text-[0.9vw] font-bold text-slate-800">{guestsCount} Traveler(s)</span>
                        <button
                          onClick={() => setGuestsCount(guestsCount + 1)}
                          className="w-8 h-8 lg:w-[2.2vw] lg:h-[2.2vw] rounded-lg lg:rounded-[0.6vw] bg-white text-slate-700 font-bold hover:bg-[#FF2D75] hover:text-white transition-colors cursor-pointer flex items-center justify-center text-sm lg:text-[1vw]"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Price Breakdown */}
                    <div
                      className="pt-[1.2vh] border-t border-slate-100 text-xs lg:text-[0.8vw] space-y-[0.8vh] transition-all duration-600 ease-out"
                      style={{
                        opacity: mounted ? 1 : 0,
                        transform: mounted ? "translateY(0)" : "translateY(10px)",
                        transitionDelay: "0.64s",
                      }}
                    >
                      <div className="flex justify-between text-slate-600">
                        <span>₹{pkg.pricePerPerson.toLocaleString("en-IN")} × {guestsCount} guest(s)</span>
                        <span>₹{totalPrice.toLocaleString("en-IN")}</span>
                      </div>
                      <div className="flex justify-between text-slate-600">
                        <span>Taxes & Service Fees</span>
                        <span className="text-emerald-600 font-bold">Included</span>
                      </div>
                      <div className="flex justify-between text-slate-900 font-black text-sm lg:text-[1vw] pt-[1vh] border-t border-slate-100">
                        <span>Total Payable</span>
                        <span className="text-[#FF2D75]">₹{totalPrice.toLocaleString("en-IN")}</span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div
                      className="transition-all duration-600 ease-out"
                      style={{
                        opacity: mounted ? 1 : 0,
                        transform: mounted ? "translateY(0) scale(1)" : "translateY(10px) scale(0.97)",
                        transitionDelay: "0.70s",
                      }}
                    >
                      <button
                        onClick={() => setBooked(true)}
                        className="w-full py-[1.4vh] bg-gradient-to-r from-[#FF2D75] to-[#FF5E97] hover:from-[#e62066] text-white font-bold text-sm lg:text-[0.9vw] rounded-full shadow-[0_0.8vw_2.5vw_rgba(255,45,117,0.25)] hover:scale-[1.02] transition-all flex items-center justify-center gap-[0.4vw] cursor-pointer"
                      >
                        <Icon icon="lucide:send" className="w-4 h-4 lg:w-[1vw] lg:h-[1vw]" />
                        <span>Book Package Now</span>
                      </button>
                    </div>

                  </div>
                )}

              </div>
            </div>

          </div>

        </div>
      </main>
    </>
  );
}
