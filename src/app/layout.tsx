import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "./Navbar";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import { AuthModalProvider } from "@/context/AuthModalContext";
import { AuthModal } from "@/components/Login";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "The Wow World | Discover & Explore World Attractions",
    template: "%s | The Wow World",
  },
  description:
    "Discover amazing things to do, top travel destinations, unique experiences, and explore the world with The Wow World.",
  keywords: [
    "travel",
    "attractions",
    "things to do",
    "explore the world",
    "travel guide",
    "destinations",
    "The Wow World",
  ],
  authors: [{ name: "The Wow World Team" }],
  creator: "The Wow World",
  publisher: "The Wow World",
  metadataBase: new URL("https://thewowworld.com"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      {
        url: "/navBar/logo.svg",
        type: "image/svg+xml",
      },
    ],
    shortcut: "/navBar/logo.svg",
    apple: "/navBar/logo.svg",
  },
  openGraph: {
    title: "The Wow World | Discover & Explore World Attractions",
    description:
      "Discover amazing things to do, top travel destinations, unique experiences, and explore the world with The Wow World.",
    url: "https://thewowworld.com",
    siteName: "The Wow World",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/navBar/logo.svg",
        width: 1200,
        height: 630,
        alt: "The Wow World Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Wow World | Discover & Explore World Attractions",
    description:
      "Discover amazing things to do, top travel destinations, unique experiences, and explore the world with The Wow World.",
    images: ["/navBar/logo.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${outfit.variable} ${plusJakarta.variable} h-full antialiased`}
    >
      <head>
        <link rel="icon" href="/navBar/logo.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/navBar/logo.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning className="min-h-screen flex flex-col bg-white text-zinc-900 font-sans">
        <AuthModalProvider>
          <SmoothScroll>
            <Navbar />
            <main id="main-content" className="flex-1 -mt-[2vh] flex flex-col relative w-full">{children}</main>
            <Footer />
          </SmoothScroll>
          <AuthModal />
        </AuthModalProvider>
      </body>
    </html>
  );
}

