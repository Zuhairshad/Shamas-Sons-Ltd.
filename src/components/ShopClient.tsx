"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Home, MoveRight } from "lucide-react";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import SocialBar from "@/components/SocialBar";
import Footer from "@/components/Footer";
import {
  PRODUCTS,
  COLLECTION_META,
  type FilterId,
  type Product,
} from "@/data/products";

/* ─── Product card ───────────────────────────────────────── */
function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/shop/${product.id}`} className="group block">
      <p className="text-[13px] text-neutral-600 mb-2 font-light">{product.name}</p>

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
        <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between px-5 pb-5 pt-16 bg-gradient-to-t from-[#f0f0f0]/95 via-[#f0f0f0]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-[13px] text-neutral-800 font-light tracking-wide">
            {product.price}
          </span>
          <span className="text-[13px] underline underline-offset-4 text-neutral-700">
            View
          </span>
        </div>
      </div>
    </Link>
  );
}

/* ─── Shared shop layout ─────────────────────────────────── */
interface ShopClientProps {
  /** Which collection tab is pre-selected when the page loads */
  defaultCollection?: FilterId;
}

export default function ShopClient({ defaultCollection = "all" }: ShopClientProps) {
  const [active, setActive] = useState<FilterId>(defaultCollection);

  const filtered =
    active === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.collection === active);

  const meta = COLLECTION_META[active];

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
          {/* Home / all tab */}
          <button
            onClick={() => setActive("all")}
            aria-label="All collections"
            className={`flex items-center justify-between px-8 py-5 hover:bg-gray-50 transition-colors ${
              active === "all" ? "bg-gray-50" : ""
            }`}
          >
            <Home size={15} strokeWidth={1.5} className="text-neutral-600" />
          </button>

          {(["dark", "modern", "wood"] as const).map((id) => (
            <button
              key={id}
              onClick={() => setActive(id)}
              className={`flex items-center justify-between px-8 py-5 hover:bg-gray-50 transition-colors text-[13px] capitalize ${
                active === id
                  ? "bg-gray-50 font-medium text-neutral-900"
                  : "text-neutral-600"
              }`}
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
