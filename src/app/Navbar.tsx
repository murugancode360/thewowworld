"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@iconify/react";
import { scrollToPageTop } from "@/components/SmoothScroll";
import { useAuthModal } from "@/context/AuthModalContext";

export default function Navbar() {
  const pathname = usePathname();
  const { openAuthModal } = useAuthModal();

  const navItems = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "About As",
      href: "/about",
    },
    {
      name: "Explore",
      href: "/explore",
    },
    {
      name: "Plan Trip",
      href: "/plan-trip",
    },
    {
      name: "Contact As",
      href: "/contact",
    },
  ];

  return (
    <header className="w-full h-[7.5vh] bg-white text-zinc-800 flex items-center justify-between px-[3vw] shadow-md border-b border-zinc-100 rounded-b-[1.2vw] sticky top-0 z-50">
      {/* Brand Logo & Title */}
      <Link
        href="/"
        onClick={() => scrollToPageTop(true)}
        className="flex items-center gap-[0.15vw] group cursor-pointer"
      >
        <div className="relative w-[3.8vw] h-[3.8vw]">
          <Image
            src="/navBar/logo.svg"
            alt="The Wow World Logo"
            fill
            className="object-contain transition-transform duration-300 group-hover:scale-105"
            priority
          />
        </div>
        <div className="flex flex-col text-[0.95vw] font-bold">
          <span
            className="tracking-widest uppercase  bg-clip-text text-transparent"
            style={{
              backgroundImage: "linear-gradient(to right, #FC0780 0%, #FB352E 20%, #F6AB03 43%, #0DC36B 64%, #089889 84%, #04ACBF 100%)"
            }}
          >
            THE
          </span>
          <span
            className="tracking-widest bg-clip-text text-transparent "
            style={{
              backgroundImage: "linear-gradient(to right, #FC0780 0%, #FB352E 20%, #F6AB03 43%, #0DC36B 64%, #089889 84%, #04ACBF 100%)"
            }}
          >
            WOW WORLD
          </span>
        </div>
      </Link>

      {/* Navigation Links */}
      <nav className="flex items-center gap-[3vw]">
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => scrollToPageTop(true)}
              className="flex items-center font-bold text-[1.02vw] transition-colors duration-200 group"
            >
              {/* Text rendering: Gradient text when active, solid dark text when inactive */}
              {isActive ? (
                <span
                  className="tracking-tight bg-clip-text text-transparent font-bold"
                  style={{
                    backgroundImage: "linear-gradient(to right, #FC0780 0%, #FB352E 20%, #F6AB03 43%, #0DC36B 64%, #089889 84%, #04ACBF 100%)"
                  }}
                >
                  {item.name}
                </span>
              ) : (
                <span className="tracking-tight font-semibold text-zinc-800 group-hover:text-black">
                  {item.name}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User Login & Register Button */}
      <div className="flex items-center">
        <button
          type="button"
          onClick={() => openAuthModal("signin")}
          suppressHydrationWarning
          className="flex items-center gap-[0.5vw] bg-white hover:bg-pink-50/50 text-[#FF2D75] font-semibold px-[1.2vw] py-[0.6vh] rounded-full border border-pink-200 hover:border-pink-300 transition-all duration-200 shadow-xs cursor-pointer active:scale-95"
        >
          <Icon
            icon="carbon:user-avatar-filled-alt"
            className="w-[1.6vw] h-[1.6vw] text-[#FF2D75]"
          />
          <span className="text-[0.95vw] tracking-wide font-semibold text-[#FF2D75]">
            <span className="underline underline-offset-2">Login</span> &{" "}
            <span className="underline underline-offset-2">Register</span>
          </span>
        </button>
      </div>
    </header>
  );
}
