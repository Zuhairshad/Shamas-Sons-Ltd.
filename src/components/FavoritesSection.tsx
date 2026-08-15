import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const products = [
  {
    name: "Skala",
    sale: "50% OFF",
    src: "https://images.unsplash.com/photo-1549497538-303791108f95?auto=format&fit=crop&w=600&h=700&q=80",
    alt: "Skala spindle chair",
  },
  {
    name: "Nest",
    sale: null,
    src: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=600&h=700&q=80",
    alt: "Nest upholstered chair",
  },
  {
    name: "Runa",
    sale: null,
    src: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=600&h=700&q=80",
    alt: "Runa wooden chair",
  },
  {
    name: "Lykke",
    sale: "54% OFF",
    src: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&h=700&q=80",
    alt: "Lykke modern chair",
  },
];

export default function FavoritesSection() {
  return (
    <section className="bg-white dark:bg-[#111] py-14 px-6 transition-colors">
      {/* ── Section label ── */}
      <div className="text-center mb-10">
        <h2 className="text-[13px] tracking-[0.12em] text-neutral-500 dark:text-neutral-400 uppercase font-medium">
          Our Favorites
        </h2>
      </div>

      {/* ── Product grid ── */}
      <div className="relative max-w-[1400px] mx-auto">
        <div className="grid grid-cols-4 gap-3">
          {products.map((p) => (
            <Link key={p.name} href="/shop" className="group block">
              <p className="text-[13px] text-neutral-600 dark:text-neutral-400 mb-2 font-light">{p.name}</p>
              <div className="relative bg-[#f3f3f3] dark:bg-[#222] rounded-2xl overflow-hidden aspect-[4/5] transition-colors">
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
                {p.sale && (
                  <span className="absolute top-3 right-3 bg-black text-white text-[11px] font-medium px-2.5 py-1 rounded-sm tracking-wide">
                    {p.sale}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>

        {/* ── Scroll arrow ── */}
        <button
          aria-label="Scroll right"
          className="absolute -right-5 top-1/2 translate-y-4 w-10 h-10 rounded-full border border-gray-200 dark:border-[#333] bg-white dark:bg-[#1a1a1a] shadow-sm flex items-center justify-center hover:shadow-md transition-shadow"
        >
          <ChevronRight size={16} strokeWidth={1.5} className="text-neutral-600 dark:text-neutral-400" />
        </button>
      </div>
    </section>
  );
}
