"use client";

import Link from "next/link";
import { Search, ShoppingBag, ChevronDown } from "lucide-react";

export default function Navbar() {
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
          <Link
            href="/collections"
            className="flex items-center gap-1 px-4 py-1.5 text-sm text-gray-700 rounded-full hover:bg-white hover:shadow-sm transition-all"
          >
            Collections
            <ChevronDown size={12} strokeWidth={2} className="opacity-50" />
          </Link>
          <Link
            href="/about"
            className="flex items-center gap-1 px-4 py-1.5 text-sm text-gray-700 rounded-full hover:bg-white hover:shadow-sm transition-all"
          >
            About
            <ChevronDown size={12} strokeWidth={2} className="opacity-50" />
          </Link>
          <Link
            href="/blog"
            className="px-4 py-1.5 text-sm text-gray-700 rounded-full hover:bg-white hover:shadow-sm transition-all"
          >
            Blog
          </Link>
          {/* Theme toggle dot */}
          <button className="w-7 h-7 rounded-full bg-gray-900 ml-1 flex-shrink-0 hover:bg-gray-700 transition-colors" aria-label="Toggle theme" />
        </nav>

        {/* ── Right icons ── */}
        <div className="flex items-center gap-5">
          <button aria-label="Search" className="text-gray-700 hover:text-black transition-colors">
            <Search size={18} strokeWidth={1.5} />
          </button>
          <button aria-label="Cart" className="flex items-center gap-1.5 text-gray-700 hover:text-black transition-colors text-sm">
            <ShoppingBag size={18} strokeWidth={1.5} />
            <span>(0)</span>
          </button>
        </div>
      </div>
    </header>
  );
}
