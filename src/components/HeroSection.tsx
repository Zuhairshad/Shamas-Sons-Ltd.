"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1563237023-b1e970526dcb?auto=format&fit=crop&w=1800&q=85",
    alt: "Shiny polished metal surface",
    heading: "Restore Brilliance\nto Every Metal",
    sub: "Trusted by homes and workshops across the UK. Genuine Brasso — the original metal polish since 1905.",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?auto=format&fit=crop&w=1800&q=85",
    alt: "Polishing a metal surface",
    heading: "Liquid or Wadding —\nYour Choice",
    sub: "From quick touch-ups to deep restoration. Available in multiple sizes and formats for every job.",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1800&q=85",
    alt: "Metal care products",
    heading: "Brass, Copper, Chrome\n& Stainless Steel",
    sub: "One trusted brand covers all your metals. Shop by format or pack size — fast UK dispatch guaranteed.",
  },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(
    () => setCurrent((c) => (c + 1) % slides.length),
    []
  );
  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);

  useEffect(() => {
    const t = setInterval(next, 5500);
    return () => clearInterval(t);
  }, [next]);

  return (
    <section className="relative w-full h-[calc(100svh-64px)] overflow-hidden bg-neutral-900">
      {/* ── Slides ── */}
      {slides.map((slide, i) => (
        <div
          key={slide.id}
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            className="object-cover"
            priority={i === 0}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      ))}

      {/* ── Prev arrow ── */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 flex items-center justify-center text-white/80 hover:text-white transition-colors"
      >
        <ChevronLeft size={28} strokeWidth={1.2} />
      </button>

      {/* ── Next arrow ── */}
      <button
        onClick={next}
        aria-label="Next slide"
        className="absolute right-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 flex items-center justify-center text-white/80 hover:text-white transition-colors"
      >
        <ChevronRight size={28} strokeWidth={1.2} />
      </button>

      {/* ── Info card ── */}
      <div className="absolute bottom-14 left-10 z-20 bg-white dark:bg-[#1a1a1a] p-7 max-w-[320px] rounded-sm shadow-md transition-colors">
        {/* Brasso product thumbnail */}
        <div className="flex items-center gap-3 mb-4">
          <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-[#f3f3f3] flex-shrink-0">
            <Image
              src="https://m.media-amazon.com/images/P/B002G0BULU._SL500_.jpg"
              alt="Brasso Metal Polish"
              fill
              className="object-contain p-1"
              sizes="48px"
            />
          </div>
          <div>
            <p className="text-[11px] text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
              Featured
            </p>
            <p className="text-[13px] font-medium text-neutral-900 dark:text-neutral-100">
              Brasso Metal Polish
            </p>
          </div>
        </div>
        <h1 className="text-[22px] font-light leading-[1.35] mb-3 whitespace-pre-line text-neutral-900 dark:text-neutral-100">
          {slides[current].heading}
        </h1>
        <p className="text-[13px] text-gray-500 dark:text-gray-400 leading-relaxed mb-5">
          {slides[current].sub}
        </p>
        <Link
          href="/shop"
          className="text-[13px] underline underline-offset-4 text-neutral-800 dark:text-neutral-200 hover:text-black dark:hover:text-white"
        >
          Shop All Products
        </Link>
      </div>

      {/* ── Dot indicators ── */}
      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
            className="w-2 h-2 rounded-full transition-colors duration-300"
            style={{ background: i === current ? "white" : "rgba(255,255,255,0.35)" }}
          />
        ))}
      </div>
    </section>
  );
}
