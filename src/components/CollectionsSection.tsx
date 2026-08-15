import Image from "next/image";
import Link from "next/link";

export default function CollectionsSection() {
  return (
    <section className="bg-white dark:bg-[#111] py-14 px-6 transition-colors">
      {/* ── Section label ── */}
      <div className="text-center mb-10">
        <h2 className="text-[13px] tracking-[0.12em] text-neutral-500 dark:text-neutral-400 uppercase font-medium">
          Shop by Category
        </h2>
      </div>

      {/* ── Grid ── */}
      <div className="max-w-[1400px] mx-auto grid grid-cols-2 h-[680px] gap-2">

        {/* ── Left: Liquid Polish (large) ── */}
        <div className="relative rounded-2xl overflow-hidden bg-[#f3f3f3] dark:bg-[#1a1a1a]">
          <div className="absolute inset-0 flex items-center justify-center p-16">
            <Image
              src="https://m.media-amazon.com/images/P/B002G0BULU._SL500_.jpg"
              alt="Brasso Liquid Metal Polish"
              fill
              className="object-contain p-16"
              sizes="50vw"
            />
          </div>
          {/* gradient overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          {/* Info card overlay */}
          <div className="absolute bottom-8 left-8 bg-white dark:bg-[#1a1a1a] p-6 rounded-xl max-w-[240px] shadow-sm transition-colors z-10">
            <h3 className="text-xl font-light text-neutral-900 dark:text-neutral-100 mb-1.5">Liquid Polish</h3>
            <p className="text-[12px] text-gray-500 dark:text-gray-400 leading-relaxed mb-4">
              The original Brasso formula — from 175 ml to 1 L, singles to 8-packs.
            </p>
            <Link
              href="/collections/liquid"
              className="text-[12px] underline underline-offset-4 text-neutral-800 dark:text-neutral-200 hover:text-black dark:hover:text-white"
            >
              View Collection
            </Link>
          </div>
        </div>

        {/* ── Right: 2 × 2 grid ── */}
        <div className="grid grid-cols-2 grid-rows-2 gap-2">

          {/* Row 1, Col 1 — Wadding image */}
          <div className="relative rounded-2xl overflow-hidden bg-[#f3f3f3] dark:bg-[#1a1a1a]">
            <Image
              src="https://m.media-amazon.com/images/P/B00BE27CYK._SL500_.jpg"
              alt="Brasso Wadding"
              fill
              className="object-contain p-8"
              sizes="25vw"
            />
          </div>

          {/* Row 1, Col 2 — Wadding text card */}
          <div className="bg-[#111] rounded-2xl p-8 flex flex-col justify-end">
            <h3 className="text-3xl font-light text-white mb-3">Wadding</h3>
            <p className="text-[12px] text-gray-400 leading-relaxed mb-5">
              Pre-soaked cotton wadding — ideal for intricate metalwork, jewellery, and fine details.
            </p>
            <Link
              href="/collections/wadding"
              className="text-[12px] underline underline-offset-4 text-white/80 hover:text-white"
            >
              View Collection
            </Link>
          </div>

          {/* Row 2, Col 1 — Bundles text card */}
          <div className="bg-[#111] rounded-2xl p-8 flex flex-col justify-end">
            <h3 className="text-3xl font-light text-white mb-3">Bundles</h3>
            <p className="text-[12px] text-gray-400 leading-relaxed mb-5">
              Mix-and-match packs of Brasso liquid and wadding — complete metal care in one purchase.
            </p>
            <Link
              href="/collections/bundle"
              className="text-[12px] underline underline-offset-4 text-white/80 hover:text-white"
            >
              View Collection
            </Link>
          </div>

          {/* Row 2, Col 2 — Bundle image */}
          <div className="relative rounded-2xl overflow-hidden bg-[#f3f3f3] dark:bg-[#1a1a1a]">
            <Image
              src="https://m.media-amazon.com/images/P/B015NOXBCG._SL500_.jpg"
              alt="Brasso Multi-pack"
              fill
              className="object-contain p-8"
              sizes="25vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
