"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Home, MoveRight } from "lucide-react";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import SocialBar from "@/components/SocialBar";
import Footer from "@/components/Footer";

/* ─── Types ──────────────────────────────────────────────── */
type Collection = "all" | "dark" | "modern" | "wood";

interface Product {
  id: number;
  name: string;
  price: string;
  sale: string | null;
  collection: Exclude<Collection, "all">;
  src: string;
}

/* ─── Collection meta ────────────────────────────────────── */
const META: Record<Collection, { title: string; desc: string }> = {
  all: {
    title: "Shop",
    desc: "Browse our full collection of handcrafted Scandinavian furniture.",
  },
  dark: {
    title: "Dark",
    desc: "Explore our Dark Collection, where deep hues and refined finishes bring an air of sophistication and drama to any room.",
  },
  modern: {
    title: "Modern",
    desc: "The Modern Collection brings together graceful lines and luxurious finishes for the contemporary home.",
  },
  wood: {
    title: "Wood",
    desc: "Our Wood Collection celebrates the natural beauty of wood and the warmth it brings to every space.",
  },
};

/* ─── Products ───────────────────────────────────────────── */
const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Sage",
    price: "380,00 €",
    sale: "50% OFF",
    collection: "wood",
    src: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=600&h=700&q=80",
  },
  {
    id: 2,
    name: "Venn",
    price: "420,00 €",
    sale: null,
    collection: "dark",
    src: "https://images.unsplash.com/photo-1549497538-303791108f95?auto=format&fit=crop&w=600&h=700&q=80",
  },
  {
    id: 3,
    name: "Holt",
    price: "280,00 €",
    sale: null,
    collection: "wood",
    src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&h=700&q=80",
  },
  {
    id: 4,
    name: "Noor",
    price: "350,00 €",
    sale: null,
    collection: "modern",
    src: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&h=700&q=80",
  },
  {
    id: 5,
    name: "Haven",
    price: "290,00 €",
    sale: "50% OFF",
    collection: "dark",
    src: "https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=600&h=700&q=80",
  },
  {
    id: 6,
    name: "Elm",
    price: "460,00 €",
    sale: null,
    collection: "modern",
    src: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=600&h=700&q=80",
  },
  {
    id: 7,
    name: "Kapp",
    price: "320,00 €",
    sale: null,
    collection: "modern",
    src: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&h=700&q=80",
  },
  {
    id: 8,
    name: "Sol",
    price: "410,00 €",
    sale: null,
    collection: "dark",
    src: "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=600&h=700&q=80",
  },
  {
    id: 9,
    name: "Runa",
    price: "280,00 €",
    sale: null,
    collection: "wood",
    src: "https://images.unsplash.com/photo-1571722288786-61a5d6f05b58?auto=format&fit=crop&w=600&h=700&q=80",
  },
  {
    id: 10,
    name: "Nest",
    price: "390,00 €",
    sale: null,
    collection: "modern",
    src: "https://images.unsplash.com/photo-1581783342308-f792dbdd1696?auto=format&fit=crop&w=600&h=700&q=80",
  },
  {
    id: 11,
    name: "Fynn",
    price: "310,00 €",
    sale: null,
    collection: "dark",
    src: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?auto=format&fit=crop&w=600&h=700&q=80",
  },
  {
    id: 12,
    name: "Lykke",
    price: "440,00 €",
    sale: "54% OFF",
    collection: "wood",
    src: "https://images.unsplash.com/photo-1593702288056-c12ccc571174?auto=format&fit=crop&w=600&h=700&q=80",
  },
];

/* ─── Product card ───────────────────────────────────────── */
function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/shop/${product.id}`} className="group block">
      {/* Name label above card */}
      <p className="text-[13px] text-neutral-600 mb-2 font-light">{product.name}</p>

      {/* Card */}
      <div className="relative bg-[#f3f3f3] rounded-2xl overflow-hidden aspect-[4/5]">

        {/* Product image — blurs on hover */}
        <Image
          src={product.src}
          alt={product.name}
          fill
          className="object-cover transition-all duration-500 ease-in-out group-hover:blur-[3px]"
          sizes="(max-width: 768px) 50vw, 25vw"
        />

        {/* Sale badge */}
        {product.sale && (
          <span className="absolute top-3 right-3 z-20 bg-black text-white text-[11px] font-medium px-2.5 py-1 rounded-sm tracking-wide">
            {product.sale}
          </span>
        )}

        {/* Hover overlay — gradient + price row */}
        <div
          className="
            absolute inset-x-0 bottom-0 z-10
            flex items-end justify-between
            px-5 pb-5 pt-16
            bg-gradient-to-t from-[#f0f0f0]/95 via-[#f0f0f0]/50 to-transparent
            opacity-0 group-hover:opacity-100
            transition-opacity duration-300
          "
        >
          <span className="text-[13px] text-neutral-800 font-light tracking-wide">
            {product.price}
          </span>
          <span className="text-[13px] underline underline-offset-4 text-neutral-700 hover:text-black">
            View
          </span>
        </div>
      </div>
    </Link>
  );
}

/* ─── Page ───────────────────────────────────────────────── */
export default function ShopPage() {
  const [active, setActive] = useState<Collection>("all");

  const filtered =
    active === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.collection === active);

  const meta = META[active];

  return (
    <>
      <AnnouncementBar />
      <Navbar />

      {/* ── Shop header ── */}
      <div className="bg-[#f5f4f1] px-10 pt-16 pb-16">
        <h1 className="text-5xl font-light text-neutral-900 mb-4">
          {active === "all" ? "Shop" : meta.title}
        </h1>
        <p className="text-[13px] text-gray-500 leading-relaxed max-w-[300px]">
          {meta.desc}
        </p>
      </div>

      {/* ── Collection filter tabs ── */}
      <div className="border-y border-gray-200">
        <div className="grid grid-cols-4 divide-x divide-gray-200">
          {/* All / home tab */}
          <button
            onClick={() => setActive("all")}
            className={`
              flex items-center justify-between px-8 py-5
              hover:bg-gray-50 transition-colors
              ${active === "all" ? "bg-gray-50" : ""}
            `}
            aria-label="All collections"
          >
            <Home size={15} strokeWidth={1.5} className="text-neutral-600" />
          </button>

          {/* Collection tabs */}
          {(["dark", "modern", "wood"] as const).map((id) => (
            <button
              key={id}
              onClick={() => setActive(id)}
              className={`
                flex items-center justify-between px-8 py-5
                hover:bg-gray-50 transition-colors text-[13px] capitalize
                ${active === id ? "bg-gray-50 font-medium text-neutral-900" : "text-neutral-600"}
              `}
            >
              <span>{id.charAt(0).toUpperCase() + id.slice(1)}</span>
              <MoveRight
                size={14}
                strokeWidth={1.5}
                className={`transition-transform duration-200 ${
                  active === id ? "translate-x-1 text-neutral-900" : "text-neutral-400"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* ── Product grid ── */}
      <section className="bg-white px-6 py-10">
        <div className="grid grid-cols-4 gap-3 max-w-[1400px] mx-auto">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <SocialBar />
      <Footer />
    </>
  );
}
