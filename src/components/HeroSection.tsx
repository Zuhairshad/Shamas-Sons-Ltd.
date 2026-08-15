"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1800&q=85",
    alt: "Black leather armchair",
    heading: "Crafting Comfort,\nInspired by the North",
    sub: "Crafted for style and lasting durability, perfect for any space.",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1800&q=85",
    alt: "Wooden lounge chair",
    heading: "Timeless Design,\nEnduring Quality",
    sub: "Each piece tells a story of craftsmanship and care.",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1800&q=85",
    alt: "Scandinavian interior chair",
    heading: "Natural Materials,\nModern Aesthetic",
    sub: "Bringing Scandinavian warmth into contemporary homes.",
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
          <div className="absolute inset-0 bg-black/30" />
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
      <div className="absolute bottom-14 left-10 z-20 bg-white dark:bg-[#1a1a1a] p-7 max-w-[300px] rounded-sm shadow-md transition-colors">
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
          View Product
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
