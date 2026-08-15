"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, ShoppingBag, X, MoveRight, Menu } from "lucide-react";
import { COLLECTION_THUMBNAILS, type CollectionSlug } from "@/data/products";
import { useTheme } from "@/components/ThemeProvider";

const COLLECTIONS: { slug: CollectionSlug; label: string }[] = [
  { slug: "liquid",  label: "Liquid Polish"   },
  { slug: "wadding", label: "Wadding & Wipes"  },
  { slug: "bundle",  label: "Bundles & Packs"  },
];

const ABOUT_LINKS = [
  { href: "/about",   label: "About"   },
  { href: "/contact", label: "Contact" },
  { href: "/faq",     label: "FAQ"     },
];

const ALL_MOBILE_LINKS = [
  { href: "/shop",                 label: "Shop All"        },
  { href: "/collections/liquid",   label: "Liquid Polish"   },
  { href: "/collections/wadding",  label: "Wadding & Wipes" },
  { href: "/collections/bundle",   label: "Bundles & Packs" },
  { href: "/about",                label: "About"           },
  { href: "/contact",              label: "Contact"         },
  { href: "/faq",                  label: "FAQ"             },
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
  const collections  = useDropdown();
  const about        = useDropdown();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggle } = useTheme();

  function closeAll() {
    collections.setOpen(false);
    about.setOpen(false);
    setMobileOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-white dark:bg-[#111] border-b border-gray-100 dark:border-[#222] transition-colors">

      {/* ── Main bar ── */}
      <div className="flex items-center justify-between px-4 sm:px-6 h-16">

        {/* ── Logo ── */}
        <Link href="/" onClick={closeAll} className="flex items-center flex-shrink-0">
          {/* Full logo: bottle + text — shown sm+ */}
          <Image
            src="/logo.svg"
            alt="Shamas & Sons"
            width={80}
            height={114}
            className="hidden sm:block h-11 w-auto object-contain dark:invert"
            priority
          />
          {/* Compact: bottle-only crop — shown xs only */}
          <Image
            src="/logo.svg"
            alt="Shamas & Sons"
            width={40}
            height={57}
            className="block sm:hidden h-9 w-auto object-contain dark:invert"
            style={{ objectPosition: "top" }}
            priority
          />
        </Link>

        {/* ── Desktop centre pill nav ── */}
        <nav className="hidden md:flex items-center gap-0.5 bg-gray-50 dark:bg-[#1a1a1a] rounded-full px-1.5 py-1.5 border border-gray-200 dark:border-[#2a2a2a] transition-colors">
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
              Categories
              {collections.open
                ? <X size={11} strokeWidth={2} className="opacity-60" />
                : <span className="text-xs opacity-60">+</span>}
            </button>

            {collections.open && (
              <div className="absolute top-[calc(100%+12px)] left-1/2 -translate-x-1/2 w-[280px] bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-xl border border-gray-100 dark:border-[#2a2a2a] overflow-hidden z-50">
                {COLLECTIONS.map(({ slug, label }) => (
                  <Link
                    key={slug}
                    href={`/collections/${slug}`}
                    onClick={() => collections.setOpen(false)}
                    className="flex items-center gap-3.5 px-4 py-3 hover:bg-gray-50 dark:hover:bg-[#222] transition-colors group"
                  >
                    <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-[#f3f3f3] dark:bg-[#2a2a2a] relative flex items-center justify-center">
                      <Image
                        src={COLLECTION_THUMBNAILS[slug]}
                        alt={label}
                        fill
                        className="object-contain p-2"
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

          {/* Theme toggle */}
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

        {/* ── Desktop right icons ── */}
        <div className="hidden md:flex items-center gap-5">
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

        {/* ── Mobile right cluster ── */}
        <div className="flex md:hidden items-center gap-3">
          {/* Theme toggle (small) */}
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className={`w-6 h-6 rounded-full flex-shrink-0 transition-colors ${
              theme === "dark"
                ? "bg-white hover:bg-gray-200"
                : "bg-gray-900 hover:bg-gray-700"
            }`}
          />
          {/* Hamburger */}
          <button
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className="p-1 text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
          >
            {mobileOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {/* ── Mobile slide-down menu ── */}
      {mobileOpen && (
        <div className="md:hidden bg-white dark:bg-[#111] border-t border-gray-100 dark:border-[#222] transition-colors">
          <nav className="px-4 py-3 space-y-0.5">
            {ALL_MOBILE_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-between px-3 py-3.5 rounded-xl text-[14px] text-neutral-700 dark:text-neutral-300 hover:bg-gray-50 dark:hover:bg-[#1a1a1a] hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors group"
              >
                {label}
                <MoveRight size={14} strokeWidth={1.5} className="text-neutral-400 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            ))}
          </nav>

          {/* Mobile search + cart row */}
          <div className="px-4 pb-4 flex gap-3 border-t border-gray-100 dark:border-[#222] pt-3">
            <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-gray-200 dark:border-[#333] text-[13px] text-neutral-600 dark:text-neutral-400">
              <Search size={15} strokeWidth={1.5} />
              Search
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-gray-200 dark:border-[#333] text-[13px] text-neutral-600 dark:text-neutral-400">
              <ShoppingBag size={15} strokeWidth={1.5} />
              Cart (0)
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
