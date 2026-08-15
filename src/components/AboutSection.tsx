import Image from "next/image";
import Link from "next/link";

export default function AboutSection() {
  return (
    <section className="bg-white dark:bg-[#111] transition-colors">
      <div className="max-w-[1400px] mx-auto grid grid-cols-[38%_62%] min-h-[520px]">

        {/* ── Left: text ── */}
        <div className="flex flex-col justify-between px-10 py-16">
          <h2 className="text-4xl font-light leading-[1.25] text-neutral-900 dark:text-neutral-100">
            UK-Based.<br />Top-Rated.<br />Trusted.
          </h2>
          <div>
            <p className="text-[13px] text-gray-500 dark:text-gray-400 leading-relaxed mb-2 max-w-[320px]">
              Shamas &amp; Sons Ltd is a VAT-registered UK retailer based in Colchester, Essex,
              supplying genuine Brasso metal polish products with fast, reliable dispatch.
            </p>
            <p className="text-[13px] text-gray-500 dark:text-gray-400 leading-relaxed mb-6 max-w-[320px]">
              Rated 4.4 ★ from over 95 verified Amazon reviews with 86% positive feedback.
            </p>
            <Link
              href="/about"
              className="text-[13px] underline underline-offset-4 text-neutral-800 dark:text-neutral-200 hover:text-black dark:hover:text-white"
            >
              More About Us
            </Link>
          </div>
        </div>

        {/* ── Right: product showcase ── */}
        <div className="relative bg-[#f5f4f1] dark:bg-[#1a1a1a] overflow-hidden flex items-center justify-center gap-8 px-12 transition-colors">
          {/* Liquid bottle */}
          <div className="relative w-48 h-64 flex-shrink-0">
            <Image
              src="https://m.media-amazon.com/images/P/B002G0BULU._SL500_.jpg"
              alt="Brasso Metal Polish Liquid"
              fill
              className="object-contain drop-shadow-lg"
              sizes="200px"
            />
          </div>
          {/* Wadding tin */}
          <div className="relative w-48 h-64 flex-shrink-0">
            <Image
              src="https://m.media-amazon.com/images/P/B00BE27CYK._SL500_.jpg"
              alt="Brasso Metal Polish Wadding"
              fill
              className="object-contain drop-shadow-lg"
              sizes="200px"
            />
          </div>
          {/* Multi-pack */}
          <div className="relative w-48 h-64 flex-shrink-0">
            <Image
              src="https://m.media-amazon.com/images/P/B015NOXBCG._SL500_.jpg"
              alt="Brasso Multi-pack"
              fill
              className="object-contain drop-shadow-lg"
              sizes="200px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
