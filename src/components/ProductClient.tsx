"use client";

import Image from "next/image";
import Link from "next/link";
import { MoveRight, Star, Truck, RotateCcw, ShieldCheck, ExternalLink } from "lucide-react";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import SocialBar from "@/components/SocialBar";
import Footer from "@/components/Footer";
import { PRODUCTS, type Product } from "@/data/products";

const GUARANTEES = [
  { Icon: Truck,       label: "Fast UK dispatch from Colchester, Essex" },
  { Icon: RotateCcw,   label: "30-day hassle-free returns"               },
  { Icon: ShieldCheck, label: "Genuine Brasso products — VAT-registered UK seller" },
];

/* ── Star rating row ───────────────────────────────────────── */
function StarRating({ rating, count }: { rating: number; count: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={13}
            strokeWidth={0}
            className={
              i < Math.floor(rating)
                ? "fill-amber-400"
                : i < rating
                ? "fill-amber-200"
                : "fill-neutral-300 dark:fill-neutral-600"
            }
          />
        ))}
      </div>
      <span className="text-[13px] text-neutral-500 dark:text-neutral-400">
        {rating.toFixed(1)} · {count} reviews
      </span>
    </div>
  );
}

export default function ProductClient({ product }: { product: Product }) {
  const amazonUrl = `https://www.amazon.co.uk/dp/${product.asin}`;

  // Related products from same collection (exclude current)
  const related = PRODUCTS.filter(
    (p) => p.collection === product.collection && p.id !== product.id
  ).slice(0, 3);

  const collectionLabel =
    product.collection === "liquid"
      ? "Liquid Polish"
      : product.collection === "wadding"
      ? "Wadding & Wipes"
      : "Bundles & Packs";

  return (
    <>
      <AnnouncementBar />
      <Navbar />

      {/* ── Breadcrumb ── */}
      <nav className="px-8 py-4 flex items-center gap-2 text-[12px] text-neutral-400 dark:text-neutral-500 border-b border-gray-100 dark:border-[#222] bg-white dark:bg-[#111] transition-colors">
        <Link href="/shop" className="hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors">
          Shop
        </Link>
        <MoveRight size={11} strokeWidth={1.5} className="opacity-50" />
        <Link
          href={`/collections/${product.collection}`}
          className="hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors"
        >
          {collectionLabel}
        </Link>
        <MoveRight size={11} strokeWidth={1.5} className="opacity-50" />
        <span className="text-neutral-700 dark:text-neutral-300">{product.name}</span>
      </nav>

      {/* ── Main split ── */}
      <section className="grid grid-cols-2 min-h-[calc(100svh-120px)] bg-white dark:bg-[#111] transition-colors">

        {/* Left: sticky product image */}
        <div className="relative bg-[#f3f3f3] dark:bg-[#1a1a1a] sticky top-16 self-start h-[calc(100svh-64px)] overflow-hidden flex items-center justify-center transition-colors p-12">
          <div className="relative w-full h-full">
            <Image
              src={product.src}
              alt={product.name}
              fill
              className="object-contain"
              sizes="50vw"
              priority
            />
          </div>
          {product.sale && (
            <span className="absolute top-6 right-6 bg-black text-white text-[11px] font-medium px-3 py-1.5 rounded-sm tracking-widest">
              {product.sale}
            </span>
          )}
        </div>

        {/* Right: details */}
        <div className="px-14 py-14 flex flex-col gap-8 border-l border-gray-100 dark:border-[#222] transition-colors">

          {/* Category tag */}
          <span className="inline-flex self-start text-[10px] tracking-[0.18em] uppercase text-neutral-400 border border-gray-200 dark:border-[#333] rounded-full px-3 py-1">
            {collectionLabel}
          </span>

          {/* Name + rating + price */}
          <div>
            <h1 className="text-4xl font-light text-neutral-900 dark:text-neutral-100 mb-3 leading-snug">
              {product.name}
            </h1>
            <StarRating rating={product.rating} count={product.reviewCount} />
            <p className="text-2xl font-light text-neutral-900 dark:text-neutral-100 mt-4">
              {product.price}
            </p>
          </div>

          {/* Description */}
          <p className="text-[13px] text-gray-500 dark:text-gray-400 leading-relaxed max-w-[420px]">
            {product.desc}
          </p>

          {/* CTA — Buy on Amazon */}
          <div className="flex flex-col gap-3 max-w-[420px]">
            <a
              href={amazonUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 w-full py-4 rounded-xl text-[13px] font-medium tracking-wide bg-[#FF9900] hover:bg-[#e68a00] text-black transition-colors"
            >
              <ExternalLink size={15} strokeWidth={1.5} />
              Buy on Amazon
            </a>
            <a
              href={`https://www.amazon.co.uk/s?k=brasso+${encodeURIComponent(product.name)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 w-full py-4 rounded-xl text-[13px] border border-gray-200 dark:border-[#333] text-neutral-600 dark:text-neutral-400 hover:border-neutral-400 dark:hover:border-neutral-500 transition-all"
            >
              Check other offers
            </a>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-100 dark:border-[#222]" />

          {/* Product specs */}
          <div className="space-y-3">
            {[
              { label: "Format",   value: product.material   },
              { label: "Size",     value: product.dimensions },
              { label: "Weight",   value: product.weight     },
              { label: "ASIN",     value: product.asin       },
            ].map(({ label, value }) => (
              <div key={label} className="flex gap-8">
                <span className="text-[11px] tracking-widest uppercase text-neutral-400 w-24 pt-0.5 flex-shrink-0">
                  {label}
                </span>
                <span className="text-[13px] text-neutral-700 dark:text-neutral-300 leading-relaxed font-mono">
                  {value}
                </span>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="border-t border-gray-100 dark:border-[#222]" />

          {/* Trust signals */}
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
            More {collectionLabel}
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
                <div className="relative bg-[#e8e8e8] dark:bg-[#222] rounded-2xl overflow-hidden aspect-[4/5] transition-colors p-4">
                  <Image
                    src={p.src}
                    alt={p.name}
                    fill
                    className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                    sizes="30vw"
                  />
                </div>
                <p className="text-[13px] text-neutral-600 dark:text-neutral-400 mt-2 font-light leading-snug">
                  {p.name}
                </p>
                <p className="text-[13px] text-neutral-500 dark:text-neutral-400 mt-0.5">{p.price}</p>
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
