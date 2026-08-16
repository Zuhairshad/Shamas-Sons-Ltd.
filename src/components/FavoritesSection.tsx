import Image from "next/image";
import Link from "next/link";
import { MoveRight } from "lucide-react";

const products = [
  {
    id: 14,
    name: "Brasso Wadding 75 g",
    price: "£2.99",
    src: "https://m.media-amazon.com/images/P/B00BE27CYK._SL500_.jpg",
    alt: "Brasso Metal Polish Wadding 75g",
    badge: "Bestseller",
  },
  {
    id: 1,
    name: "Brasso Liquid 175 ml",
    price: "£2.99",
    src: "https://m.media-amazon.com/images/P/B002G0BULU._SL500_.jpg",
    alt: "Brasso Metal Polish 175ml",
    badge: "1K+ sold/month",
  },
  {
    id: 8,
    name: "Brasso Liquid 1 L × 2",
    price: "£14.99",
    src: "https://m.media-amazon.com/images/P/B002G0BULU._SL500_.jpg",
    alt: "Brasso Metal Polish 1L Pack of 2",
    badge: "Best Value",
  },
  {
    id: 4,
    name: "Brasso Liquid 175 ml × 4",
    price: "£9.99",
    src: "https://m.media-amazon.com/images/P/B015NOXBCG._SL500_.jpg",
    alt: "Brasso Metal Polish 175ml Pack of 4",
    badge: null,
  },
];

export default function FavoritesSection() {
  return (
    <section className="bg-white dark:bg-[#111] py-14 px-6 transition-colors">

      {/* ── Section label ── */}
      <div className="text-center mb-10">
        <h2 className="text-[13px] tracking-[0.12em] text-neutral-500 dark:text-neutral-400 uppercase font-medium">
          Best Sellers
        </h2>
      </div>

      {/* ── Product grid + view-all arrow ── */}
      <div className="relative max-w-[1400px] mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {products.map((p) => (
            /* Single self-contained card — no text above or below */
            <Link
              key={p.id}
              href={`/shop/${p.id}`}
              className="group relative block bg-[#f3f3f3] dark:bg-[#222] rounded-2xl overflow-hidden aspect-[4/5] transition-colors"
            >
              {/* Name — top left inside card */}
              <span className="absolute top-3.5 left-4 z-10 text-[13px] font-light text-neutral-600 dark:text-neutral-400 leading-none">
                {p.name}
                <span className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  →
                </span>
              </span>

              {/* Badge — top right */}
              {p.badge && (
                <span className="absolute top-3 right-3 z-10 bg-black text-white text-[10px] font-medium px-2.5 py-1 rounded-sm tracking-wide">
                  {p.badge}
                </span>
              )}

              {/* Image */}
              <Image
                src={p.src}
                alt={p.alt}
                fill
                className="object-contain p-8 group-hover:scale-[1.04] transition-transform duration-500"
                sizes="(max-width: 640px) 50vw, 25vw"
              />

              {/* Hover overlay — price + View */}
              <div
                className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between px-4 pb-4 pt-20
                  bg-gradient-to-t from-[#efefef]/95 via-[#efefef]/60 to-transparent
                  dark:from-[#222]/95 dark:via-[#222]/60
                  opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <span className="text-[13px] text-neutral-800 dark:text-neutral-200 font-light">
                  {p.price}
                </span>
                <span className="text-[13px] underline underline-offset-4 text-neutral-700 dark:text-neutral-300">
                  View
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* ── View all ── */}
        <Link
          href="/shop"
          aria-label="View all products"
          className="absolute -right-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-gray-200 dark:border-[#333] bg-white dark:bg-[#1a1a1a] shadow-sm flex items-center justify-center hover:shadow-md transition-all group"
        >
          <MoveRight size={15} strokeWidth={1.5} className="text-neutral-600 dark:text-neutral-400 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </section>
  );
}
