import Image from "next/image";
import Link from "next/link";
import { MoveRight, Star } from "lucide-react";

// Top 4 bestsellers by review count / sales
const products = [
  {
    id: 14,
    name: "Brasso Wadding 75 g",
    price: "£2.99",
    reviewCount: "4.7K",
    rating: 4.6,
    src: "https://m.media-amazon.com/images/P/B00BE27CYK._SL500_.jpg",
    alt: "Brasso Metal Polish Wadding 75g",
    badge: "Bestseller",
  },
  {
    id: 1,
    name: "Brasso Liquid 175 ml",
    price: "£2.99",
    reviewCount: "1.6K",
    rating: 4.6,
    src: "https://m.media-amazon.com/images/P/B002G0BULU._SL500_.jpg",
    alt: "Brasso Metal Polish 175ml",
    badge: "1K+ sold/month",
  },
  {
    id: 8,
    name: "Brasso Liquid 1 L × 2",
    price: "£14.99",
    reviewCount: "1.8K",
    rating: 4.7,
    src: "https://m.media-amazon.com/images/P/B002G0BULU._SL500_.jpg",
    alt: "Brasso Metal Polish 1L Pack of 2",
    badge: "Best Value",
  },
  {
    id: 4,
    name: "Brasso Liquid 175 ml × 4",
    price: "£9.99",
    reviewCount: "116",
    rating: 4.7,
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
        <div className="grid grid-cols-4 gap-3">
          {products.map((p) => (
            <Link key={p.id} href={`/shop/${p.id}`} className="group block">
              {/* Name + rating above image */}
              <p className="text-[13px] text-neutral-600 dark:text-neutral-400 mb-1 font-light leading-snug">
                {p.name}
              </p>
              <div className="flex items-center gap-1 mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={9}
                    strokeWidth={0}
                    className={i < Math.floor(p.rating) ? "fill-amber-400" : "fill-neutral-200 dark:fill-neutral-700"}
                  />
                ))}
                <span className="text-[10px] text-neutral-400 ml-0.5">({p.reviewCount})</span>
              </div>

              {/* Image tile */}
              <div className="relative bg-[#f3f3f3] dark:bg-[#222] rounded-2xl overflow-hidden aspect-[4/5] transition-colors">
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  className="object-contain p-6 group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
                {p.badge && (
                  <span className="absolute top-3 right-3 bg-black text-white text-[10px] font-medium px-2 py-0.5 rounded-sm tracking-wide">
                    {p.badge}
                  </span>
                )}
              </div>

              <p className="text-[13px] text-neutral-500 dark:text-neutral-400 mt-2">{p.price}</p>
            </Link>
          ))}
        </div>

        {/* ── View all ── */}
        <Link
          href="/shop"
          aria-label="View all products"
          className="absolute -right-5 top-1/2 translate-y-4 w-10 h-10 rounded-full border border-gray-200 dark:border-[#333] bg-white dark:bg-[#1a1a1a] shadow-sm flex items-center justify-center hover:shadow-md transition-all group"
        >
          <MoveRight size={15} strokeWidth={1.5} className="text-neutral-600 dark:text-neutral-400 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </section>
  );
}
