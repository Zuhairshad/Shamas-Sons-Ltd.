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
    <Link
      href={`/shop/${product.id}`}
      className="group relative block bg-[#f3f3f3] dark:bg-[#222] rounded-2xl overflow-hidden aspect-[4/5] transition-colors"
    >
      {/* Name — top left, always visible; arrow fades in on hover */}
      <span className="absolute top-3.5 left-4 z-10 text-[13px] font-light text-neutral-600 dark:text-neutral-400 leading-none">
        {product.name}
        <span className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          →
        </span>
      </span>

      {/* Sale badge — top right */}
      {product.sale && (
        <span className="absolute top-3 right-3 z-10 bg-black text-white text-[11px] font-medium px-2.5 py-1 rounded-sm tracking-wide">
          {product.sale}
        </span>
      )}

      {/* Image */}
      <Image
        src={product.src}
        alt={product.name}
        fill
        className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-[1.04]"
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
      />

      {/* Hover overlay — price + View at bottom */}
      <div
        className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between px-4 pb-4 pt-20
          bg-gradient-to-t from-[#efefef]/95 via-[#efefef]/60 to-transparent
          dark:from-[#222]/95 dark:via-[#222]/60
          opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <span className="text-[13px] text-neutral-800 dark:text-neutral-200 font-light">
          {product.price}
        </span>
        <span className="text-[13px] underline underline-offset-4 text-neutral-700 dark:text-neutral-300">
          View
        </span>
      </div>
    </Link>
  );
}

/* ─── Shared shop layout ─────────────────────────────────── */
interface ShopClientProps {
  defaultCollection?: FilterId;
}

const FILTER_TABS: { id: FilterId; label: string }[] = [
  { id: "liquid",  label: "Liquid Polish"  },
  { id: "wadding", label: "Wadding"        },
  { id: "bundle",  label: "Bundles"        },
];

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
      <div className="bg-[#f5f4f1] dark:bg-[#1a1a1a] px-10 pt-16 pb-16 transition-colors">
        <h1 className="text-5xl font-light text-neutral-900 dark:text-neutral-100 mb-4">
          {active === "all" ? "Shop" : meta.title}
        </h1>
        <p className="text-[13px] text-gray-500 dark:text-gray-400 leading-relaxed max-w-[360px]">
          {meta.desc}
        </p>
      </div>

      {/* ── Category filter tabs ── */}
      <div className="border-y border-gray-200 dark:border-[#2a2a2a] transition-colors">
        <div className="grid grid-cols-4 divide-x divide-gray-200 dark:divide-[#2a2a2a]">
          {/* All tab */}
          <button
            onClick={() => setActive("all")}
            aria-label="All products"
            className={`flex items-center justify-between px-8 py-5 hover:bg-gray-50 dark:hover:bg-[#1a1a1a] transition-colors ${
              active === "all" ? "bg-gray-50 dark:bg-[#1a1a1a]" : ""
            }`}
          >
            <Home size={15} strokeWidth={1.5} className="text-neutral-600 dark:text-neutral-400" />
          </button>

          {FILTER_TABS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setActive(id)}
              className={`flex items-center justify-between px-8 py-5 hover:bg-gray-50 dark:hover:bg-[#1a1a1a] transition-colors text-[13px] ${
                active === id
                  ? "bg-gray-50 dark:bg-[#1a1a1a] font-medium text-neutral-900 dark:text-neutral-100"
                  : "text-neutral-600 dark:text-neutral-400"
              }`}
            >
              <span>{label}</span>
              <MoveRight
                size={14}
                strokeWidth={1.5}
                className={`transition-transform duration-200 ${
                  active === id ? "translate-x-1 text-neutral-900 dark:text-neutral-100" : "text-neutral-400"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* ── Product grid ── */}
      <section className="bg-white dark:bg-[#111] px-6 py-10 transition-colors">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 max-w-[1400px] mx-auto">
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
