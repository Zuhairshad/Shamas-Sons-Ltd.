"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, ShoppingBag, X } from "lucide-react";
import { MoveRight } from "lucide-react";
import { COLLECTION_THUMBNAILS, type CollectionSlug } from "@/data/products";

const COLLECTIONS: { slug: CollectionSlug; label: string }[] = [
  { slug: "dark",   label: "Dark"   },
  { slug: "modern", label: "Modern" },
  { slug: "wood",   label: "Wood"   },
];

export default function Navbar() {
  const [collectionsOpen, setCollectionsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  /* close on outside click */
  useEffect(() => {
    function onPointerDown(e: PointerEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setCollectionsOpen(false);
      }
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-100">
      <div className="flex items-center justify-between px-6 h-16">

        {/* ── Logo ── */}
        <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
          <span className="w-3.5 h-3.5 rounded-full bg-black inline-block" />
          <span className="text-[15px] font-semibold tracking-tight">Shamas Sons</span>
        </Link>

        {/* ── Centre pill nav ── */}
        <nav className="flex items-center gap-0.5 bg-gray-50 rounded-full px-1.5 py-1.5 border border-gray-200">
          <Link
            href="/shop"
            className="px-4 py-1.5 text-sm text-gray-700 rounded-full hover:bg-white hover:shadow-sm transition-all"
          >
            Shop
          </Link>

          {/* Collections with dropdown */}
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setCollectionsOpen((o) => !o)}
              className={`flex items-center gap-1.5 px-4 py-1.5 text-sm rounded-full transition-all ${
                collectionsOpen
                  ? "bg-white shadow-sm text-neutral-900"
                  : "text-gray-700 hover:bg-white hover:shadow-sm"
              }`}
            >
              Collections
              {collectionsOpen ? (
                <X size={11} strokeWidth={2} className="opacity-60" />
              ) : (
                <span className="text-xs opacity-60">+</span>
              )}
            </button>

            {/* Dropdown */}
            {collectionsOpen && (
              <div className="absolute top-[calc(100%+12px)] left-1/2 -translate-x-1/2 w-[260px] bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50">
                {COLLECTIONS.map(({ slug, label }) => (
                  <Link
                    key={slug}
                    href={`/collections/${slug}`}
                    onClick={() => setCollectionsOpen(false)}
                    className="flex items-center gap-3.5 px-4 py-3 hover:bg-gray-50 transition-colors group"
                  >
                    {/* Thumbnail */}
                    <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100 relative">
                      <Image
                        src={COLLECTION_THUMBNAILS[slug]}
                        alt={label}
                        fill
                        className="object-cover"
                        sizes="56px"
                      />
                    </div>

                    <span className="text-[14px] text-neutral-700 flex-1 group-hover:text-neutral-900 transition-colors">
                      {label}
                    </span>

                    <MoveRight
                      size={14}
                      strokeWidth={1.5}
                      className="text-neutral-400 group-hover:text-neutral-600 group-hover:translate-x-0.5 transition-all"
                    />
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/about"
            className="flex items-center gap-1 px-4 py-1.5 text-sm text-gray-700 rounded-full hover:bg-white hover:shadow-sm transition-all"
          >
            About
            <span className="text-xs opacity-60">+</span>
          </Link>

          <Link
            href="/blog"
            className="px-4 py-1.5 text-sm text-gray-700 rounded-full hover:bg-white hover:shadow-sm transition-all"
          >
            Blog
          </Link>

          {/* Theme toggle dot */}
          <button
            className="w-7 h-7 rounded-full bg-gray-900 ml-1 flex-shrink-0 hover:bg-gray-700 transition-colors"
            aria-label="Toggle theme"
          />
        </nav>

        {/* ── Right icons ── */}
        <div className="flex items-center gap-5">
          <button aria-label="Search" className="text-gray-700 hover:text-black transition-colors">
            <Search size={18} strokeWidth={1.5} />
          </button>
          <button
            aria-label="Cart"
            className="flex items-center gap-1.5 text-gray-700 hover:text-black transition-colors text-sm"
          >
            <ShoppingBag size={18} strokeWidth={1.5} />
            <span>(0)</span>
          </button>
        </div>

      </div>
    </header>
  );
}
