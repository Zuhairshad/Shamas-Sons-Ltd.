"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MoveRight, ShoppingBag, Heart, Truck, RotateCcw, ShieldCheck } from "lucide-react";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import SocialBar from "@/components/SocialBar";
import Footer from "@/components/Footer";
import { PRODUCTS, type Product } from "@/data/products";

const GUARANTEES = [
  { Icon: Truck,       label: "Free shipping over €300" },
  { Icon: RotateCcw,   label: "30-day free returns"     },
  { Icon: ShieldCheck, label: "10-year craftsmanship guarantee" },
];

function parsePrice(price: string): number {
  return parseFloat(price.replace(".", "").replace(",", ".").replace(" €", ""));
}

export default function ProductClient({ product }: { product: Product }) {
  const [added, setAdded] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);

  // Build a high-res version of the image URL
  const srcLg = product.src.replace("w=600&h=700&q=80", "w=1200&q=90");

  // Compute original price if on sale
  const currentPrice = parsePrice(product.price);
  let originalPrice: string | null = null;
  if (product.sale) {
    const pct = parseInt(product.sale) / 100;
    const orig = Math.round(currentPrice / (1 - pct));
    originalPrice = `${orig.toLocaleString("de-DE", { minimumFractionDigits: 2 })} €`;
  }

  // Related products from same collection (exclude current)
  const related = PRODUCTS.filter(
    (p) => p.collection === product.collection && p.id !== product.id
  ).slice(0, 3);

  return (
    <>
      <AnnouncementBar />
      <Navbar />

      {/* ── Breadcrumb ── */}
      <nav className="px-8 py-4 flex items-center gap-2 text-[12px] text-neutral-400 dark:text-neutral-500 border-b border-gray-100 dark:border-[#222] bg-white dark:bg-[#111] transition-colors">
        <Link href="/shop" className="hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors">Shop</Link>
        <MoveRight size={11} strokeWidth={1.5} className="opacity-50" />
        <Link
          href={`/collections/${product.collection}`}
          className="hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors capitalize"
        >
          {product.collection}
        </Link>
        <MoveRight size={11} strokeWidth={1.5} className="opacity-50" />
        <span className="text-neutral-700 dark:text-neutral-300">{product.name}</span>
      </nav>

      {/* ── Main split ── */}
      <section className="grid grid-cols-2 min-h-[calc(100svh-120px)] bg-white dark:bg-[#111] transition-colors">

        {/* Left: sticky image */}
        <div className="relative bg-[#f3f3f3] dark:bg-[#1a1a1a] sticky top-16 self-start h-[calc(100svh-64px)] overflow-hidden transition-colors">
          <Image
            src={srcLg}
            alt={product.name}
            fill
            className="object-cover"
            sizes="50vw"
            priority
          />
          {product.sale && (
            <span className="absolute top-6 right-6 bg-black text-white text-[11px] font-medium px-3 py-1.5 rounded-sm tracking-widest">
              {product.sale}
            </span>
          )}
        </div>

        {/* Right: details */}
        <div className="px-14 py-14 flex flex-col gap-8 border-l border-gray-100 dark:border-[#222] transition-colors">

          {/* Collection tag */}
          <span className="inline-flex self-start text-[10px] tracking-[0.18em] uppercase text-neutral-400 border border-gray-200 dark:border-[#333] rounded-full px-3 py-1 capitalize">
            {product.collection} Collection
          </span>

          {/* Name + Price */}
          <div>
            <h1 className="text-5xl font-light text-neutral-900 dark:text-neutral-100 mb-5">
              {product.name}
            </h1>
            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-light text-neutral-900 dark:text-neutral-100">
                {product.price}
              </span>
              {originalPrice && (
                <span className="text-[14px] text-neutral-400 line-through">{originalPrice}</span>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="text-[13px] text-gray-500 dark:text-gray-400 leading-relaxed max-w-[420px]">
            {product.desc}
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col gap-3 max-w-[420px]">
            <button
              onClick={() => setAdded(true)}
              className={`flex items-center justify-center gap-2.5 w-full py-4 rounded-xl text-[13px] font-medium tracking-wide transition-all ${
                added
                  ? "bg-green-700 dark:bg-green-800 text-white"
                  : "bg-neutral-900 dark:bg-white text-white dark:text-black hover:bg-neutral-700 dark:hover:bg-gray-100"
              }`}
            >
              <ShoppingBag size={15} strokeWidth={1.5} />
              {added ? "Added to Cart ✓" : "Add to Cart"}
            </button>
            <button
              onClick={() => setWishlisted((w) => !w)}
              className={`flex items-center justify-center gap-2.5 w-full py-4 rounded-xl text-[13px] border transition-all ${
                wishlisted
                  ? "border-neutral-900 dark:border-white bg-neutral-50 dark:bg-[#1a1a1a] text-neutral-900 dark:text-neutral-100"
                  : "border-gray-200 dark:border-[#333] text-neutral-600 dark:text-neutral-400 hover:border-neutral-400 dark:hover:border-neutral-500"
              }`}
            >
              <Heart size={15} strokeWidth={1.5} className={wishlisted ? "fill-current" : ""} />
              {wishlisted ? "Saved to Wishlist" : "Add to Wishlist"}
            </button>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-100 dark:border-[#222]" />

          {/* Product specs */}
          <div className="space-y-3">
            {[
              { label: "Material",   value: product.material   },
              { label: "Dimensions", value: product.dimensions },
              { label: "Weight",     value: product.weight     },
            ].map(({ label, value }) => (
              <div key={label} className="flex gap-8">
                <span className="text-[11px] tracking-widest uppercase text-neutral-400 w-24 pt-0.5 flex-shrink-0">
                  {label}
                </span>
                <span className="text-[13px] text-neutral-700 dark:text-neutral-300 leading-relaxed">
                  {value}
                </span>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="border-t border-gray-100 dark:border-[#222]" />

          {/* Guarantees */}
          <div className="space-y-3">
            {GUARANTEES.map(({ Icon, label }) => (
              <div key={label} className="flex items-center gap-3 text-[13px] text-neutral-600 dark:text-neutral-400">
                <Icon size={14} strokeWidth={1.5} className="flex-shrink-0 opacity-70" />
                {label}
              </div>
            ))}
          </div>

          {/* Collection link */}
          <Link
            href={`/collections/${product.collection}`}
            className="inline-flex items-center gap-2 text-[12px] text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors self-start"
          >
            View full {product.collection} collection
            <MoveRight size={12} strokeWidth={1.5} />
          </Link>
        </div>
      </section>

      {/* ── Related products ── */}
      {related.length > 0 && (
        <section className="bg-[#f5f4f1] dark:bg-[#1a1a1a] px-8 py-16 border-t border-gray-200 dark:border-[#222] transition-colors">
          <p className="text-[11px] tracking-widest uppercase text-neutral-400 mb-8">You May Also Like</p>
          <div className="grid grid-cols-3 gap-4 max-w-[900px]">
            {related.map((p) => (
              <Link key={p.id} href={`/shop/${p.id}`} className="group block">
                <p className="text-[13px] text-neutral-600 dark:text-neutral-400 mb-2 font-light">{p.name}</p>
                <div className="relative bg-[#e8e8e8] dark:bg-[#222] rounded-2xl overflow-hidden aspect-[4/5] transition-colors">
                  <Image
                    src={p.src}
                    alt={p.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="30vw"
                  />
                </div>
                <p className="text-[13px] text-neutral-600 dark:text-neutral-400 mt-2">{p.price}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <SocialBar />
      <Footer />
    </>
  );
}
