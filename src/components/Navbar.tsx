"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, ShoppingBag, X, MoveRight } from "lucide-react";
import { COLLECTION_THUMBNAILS, type CollectionSlug } from "@/data/products";
import { useTheme } from "@/components/ThemeProvider";

const COLLECTIONS: { slug: CollectionSlug; label: string }[] = [
  { slug: "liquid",  label: "Liquid Polish"  },
  { slug: "wadding", label: "Wadding & Wipes" },
  { slug: "bundle",  label: "Bundles & Packs" },
];

const ABOUT_LINKS = [
  { href: "/about",   label: "About"   },
  { href: "/contact", label: "Contact" },
  { href: "/faq",     label: "FAQ"     },
];

function useDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onPointerDown(e: PointerEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, []);

  return { open, setOpen, ref };
}

export default function Navbar() {
  const collections = useDropdown();
  const about       = useDropdown();
  const { theme, toggle } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full bg-white dark:bg-[#111] border-b border-gray-100 dark:border-[#222] transition-colors">
      <div className="flex items-center justify-between px-6 h-16">

        {/* ── Logo ── */}
        <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
          <span className="w-3.5 h-3.5 rounded-full bg-black dark:bg-white inline-block" />
          <span className="text-[15px] font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
            Shamas Sons
          </span>
        </Link>

        {/* ── Centre pill nav ── */}
        <nav className="flex items-center gap-0.5 bg-gray-50 dark:bg-[#1a1a1a] rounded-full px-1.5 py-1.5 border border-gray-200 dark:border-[#2a2a2a] transition-colors">
          <Link
            href="/shop"
            className="px-4 py-1.5 text-sm text-gray-700 dark:text-gray-300 rounded-full hover:bg-white dark:hover:bg-[#2a2a2a] hover:shadow-sm transition-all"
          >
            Shop
          </Link>

          {/* Collections dropdown */}
          <div ref={collections.ref} className="relative">
            <button
              onClick={() => { collections.setOpen((o) => !o); about.setOpen(false); }}
              className={`flex items-center gap-1.5 px-4 py-1.5 text-sm rounded-full transition-all ${
                collections.open
                  ? "bg-white dark:bg-[#2a2a2a] shadow-sm text-neutral-900 dark:text-neutral-100"
                  : "text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-[#2a2a2a] hover:shadow-sm"
              }`}
            >
              Collections
              {collections.open
                ? <X size={11} strokeWidth={2} className="opacity-60" />
                : <span className="text-xs opacity-60">+</span>}
            </button>

            {collections.open && (
              <div className="absolute top-[calc(100%+12px)] left-1/2 -translate-x-1/2 w-[260px] bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-xl border border-gray-100 dark:border-[#2a2a2a] overflow-hidden z-50">
                {COLLECTIONS.map(({ slug, label }) => (
                  <Link
                    key={slug}
                    href={`/collections/${slug}`}
                    onClick={() => collections.setOpen(false)}
                    className="flex items-center gap-3.5 px-4 py-3 hover:bg-gray-50 dark:hover:bg-[#222] transition-colors group"
                  >
                    <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100 dark:bg-[#2a2a2a] relative">
                      <Image
                        src={COLLECTION_THUMBNAILS[slug]}
                        alt={label}
                        fill
                        className="object-cover"
                        sizes="56px"
                      />
                    </div>
                    <span className="text-[14px] text-neutral-700 dark:text-neutral-300 flex-1 group-hover:text-neutral-900 dark:group-hover:text-neutral-100 transition-colors">
                      {label}
                    </span>
                    <MoveRight size={14} strokeWidth={1.5} className="text-neutral-400 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* About dropdown */}
          <div ref={about.ref} className="relative">
            <button
              onClick={() => { about.setOpen((o) => !o); collections.setOpen(false); }}
              className={`flex items-center gap-1.5 px-4 py-1.5 text-sm rounded-full transition-all ${
                about.open
                  ? "bg-white dark:bg-[#2a2a2a] shadow-sm text-neutral-900 dark:text-neutral-100"
                  : "text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-[#2a2a2a] hover:shadow-sm"
              }`}
            >
              About
              {about.open
                ? <X size={11} strokeWidth={2} className="opacity-60" />
                : <span className="text-xs opacity-60">+</span>}
            </button>

            {about.open && (
              <div className="absolute top-[calc(100%+12px)] left-1/2 -translate-x-1/2 w-[220px] bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-xl border border-gray-100 dark:border-[#2a2a2a] overflow-hidden z-50">
                {ABOUT_LINKS.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => about.setOpen(false)}
                    className="flex items-center justify-between px-5 py-3.5 hover:bg-gray-50 dark:hover:bg-[#222] transition-colors group"
                  >
                    <span className="text-[14px] text-neutral-700 dark:text-neutral-300 group-hover:text-neutral-900 dark:group-hover:text-neutral-100 transition-colors">
                      {label}
                    </span>
                    <MoveRight size={14} strokeWidth={1.5} className="text-neutral-400 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Theme toggle — dark circle in light mode, light circle in dark mode */}
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className={`w-7 h-7 rounded-full ml-1 flex-shrink-0 transition-colors ${
              theme === "dark"
                ? "bg-white hover:bg-gray-200"
                : "bg-gray-900 hover:bg-gray-700"
            }`}
          />
        </nav>

        {/* ── Right icons ── */}
        <div className="flex items-center gap-5">
          <button aria-label="Search" className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors">
            <Search size={18} strokeWidth={1.5} />
          </button>
          <button
            aria-label="Cart"
            className="flex items-center gap-1.5 text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors text-sm"
          >
            <ShoppingBag size={18} strokeWidth={1.5} />
            <span>(0)</span>
          </button>
        </div>
      </div>
    </header>
  );
}
