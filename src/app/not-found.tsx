import Link from "next/link";
import { MoveRight } from "lucide-react";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Page Not Found — Shamas Sons Ltd.",
};

const QUICK_LINKS = [
  { label: "Shop All",         href: "/shop"                  },
  { label: "Liquid Polish",    href: "/collections/liquid"    },
  { label: "Wadding & Wipes",  href: "/collections/wadding"   },
  { label: "Bundles & Packs",  href: "/collections/bundle"    },
  { label: "About Us",         href: "/about"                 },
  { label: "Contact",          href: "/contact"               },
];

export default function NotFound() {
  return (
    <>
      <AnnouncementBar />
      <Navbar />

      <main className="bg-[#f5f4f1] dark:bg-[#1a1a1a] min-h-[70vh] flex flex-col items-center justify-center px-8 py-24 transition-colors">
        {/* Large 404 */}
        <p className="text-[120px] font-light leading-none text-neutral-200 dark:text-[#2a2a2a] select-none mb-2">
          404
        </p>

        <h1 className="text-3xl font-light text-neutral-900 dark:text-neutral-100 mb-3 text-center">
          This page doesn&apos;t exist
        </h1>
        <p className="text-[13px] text-gray-500 dark:text-gray-400 max-w-[320px] text-center leading-relaxed mb-12">
          The page you&apos;re looking for may have moved, been removed, or never existed.
          Here are a few places to start:
        </p>

        {/* Quick links */}
        <div className="grid grid-cols-2 gap-2 w-full max-w-[440px] mb-12">
          {QUICK_LINKS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center justify-between px-5 py-3.5 bg-white dark:bg-[#111] rounded-xl text-[13px] text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100 border border-gray-100 dark:border-[#222] hover:border-gray-300 dark:hover:border-[#333] transition-all group"
            >
              {label}
              <MoveRight size={13} strokeWidth={1.5} className="text-neutral-400 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          ))}
        </div>

        <Link
          href="/"
          className="text-[13px] underline underline-offset-4 text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
        >
          ← Back to home
        </Link>
      </main>

      <Footer />
    </>
  );
}
