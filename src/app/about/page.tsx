import Image from "next/image";
import Link from "next/link";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import SocialBar from "@/components/SocialBar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "About — Shamas Sons Ltd.",
};

const MARQUEE_BRANDS = [
  "TRUSTED SELLER", "UK BASED", "VAT REGISTERED", "FAST DISPATCH", "GREAT VALUE", "TOP RATED",
  "TRUSTED SELLER", "UK BASED", "VAT REGISTERED", "FAST DISPATCH", "GREAT VALUE", "TOP RATED",
];

export default function AboutPage() {
  return (
    <>
      <AnnouncementBar />
      <Navbar />

      {/* ── Split hero ── */}
      <section className="grid grid-cols-2 h-[80vh] min-h-[560px]">
        {/* Left: studio photo */}
        <div className="relative overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&h=900&q=80"
            alt="Our studio"
            fill
            className="object-cover"
            sizes="50vw"
            priority
          />
          {/* Badge */}
          <div className="absolute bottom-8 left-8 bg-white dark:bg-[#1a1a1a] rounded-2xl px-5 py-3 flex items-center gap-3 shadow-sm transition-colors">
            <Image
              src="/logo.svg"
              alt="Shamas & Sons"
              width={32}
              height={46}
              className="h-8 w-auto dark:invert"
            />
            <span className="text-[13px] font-medium tracking-tight text-neutral-900 dark:text-neutral-100">Shamas &amp; Sons Ltd.</span>
          </div>
        </div>

        {/* Right: content */}
        <div className="bg-[#f5f4f1] dark:bg-[#1a1a1a] flex flex-col px-14 py-12 transition-colors">
          <h1 className="text-5xl font-light text-neutral-900 dark:text-neutral-100 leading-tight max-w-[420px]">
            Quality products, delivered to your door
          </h1>

          <div className="flex-1" />

          <div className="space-y-4 max-w-[400px]">
            <p className="text-[13px] text-gray-500 dark:text-gray-400 leading-relaxed">
              Shamas &amp; Sons Ltd is a UK-based, VAT-registered retailer supplying
              quality products across Great Britain. We're proud to be a top-rated
              seller with over 95 verified reviews and an 86% positive rating.
            </p>
            <p className="text-[13px] text-gray-500 dark:text-gray-400 leading-relaxed">
              Based in Colchester, Essex, we source carefully and price fairly —
              so you always get great value with fast, reliable dispatch.
            </p>
          </div>

          <div className="mt-10">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 border border-neutral-900 dark:border-neutral-100 rounded-full px-6 py-2.5 text-[13px] text-neutral-900 dark:text-neutral-100 hover:bg-neutral-900 dark:hover:bg-white hover:text-white dark:hover:text-black transition-all"
            >
              Explore ↓
            </Link>
          </div>
        </div>
      </section>

      {/* ── Brand marquee bar ── */}
      <div className="bg-neutral-900 py-5 overflow-hidden border-t border-neutral-800">
        <div
          className="flex gap-16 whitespace-nowrap"
          style={{ animation: "marquee 24s linear infinite" }}
        >
          {MARQUEE_BRANDS.map((brand, i) => (
            <span
              key={i}
              className="text-[11px] tracking-[0.2em] uppercase text-neutral-400 font-light"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>

      {/* ── Our story section ── */}
      <section className="bg-white dark:bg-[#111] px-10 py-24 transition-colors">
        <div className="max-w-[1100px] mx-auto grid grid-cols-2 gap-24 items-start">
          <div>
            <p className="text-[11px] tracking-widest text-neutral-400 uppercase mb-6">Our Story</p>
            <h2 className="text-4xl font-light text-neutral-900 dark:text-neutral-100 leading-snug">
              A family business built on trust
            </h2>
          </div>
          <div className="space-y-5 pt-2">
            <p className="text-[13px] text-gray-500 dark:text-gray-400 leading-relaxed">
              Founded and incorporated in October 2021, Shamas &amp; Sons Ltd set out
              with a simple mission: to make great products accessible to everyone in
              the UK. As a family-run business, we take every order personally —
              because our reputation depends on yours.
            </p>
            <p className="text-[13px] text-gray-500 dark:text-gray-400 leading-relaxed">
              We operate as a VAT-registered UK business (GB458915253, Company No. 13659351),
              offering reliable, fast-dispatch fulfilment from our base in
              Colchester, Essex.
            </p>
            <p className="text-[13px] text-gray-500 dark:text-gray-400 leading-relaxed">
              Our seller rating of 4.4 ★ from over 95 verified customers reflects
              our commitment to quality, honest pricing, and responsive service.
              We stand behind everything we sell.
            </p>
          </div>
        </div>
      </section>

      {/* ── Three values ── */}
      <section className="bg-[#f5f4f1] dark:bg-[#1a1a1a] border-t border-gray-200 dark:border-[#2a2a2a] transition-colors">
        <div className="grid grid-cols-3 divide-x divide-gray-200 dark:divide-[#2a2a2a]">
          {[
            { num: "01", title: "Top-Rated Seller",  body: "4.4 ★ from over 95 verified customer reviews with an 86% positive rating — we earn trust one order at a time." },
            { num: "02", title: "Fast Dispatch",    body: "Orders are processed and dispatched quickly from Colchester. We take pride in reliable, no-fuss fulfilment." },
            { num: "03", title: "Honest Pricing",   body: "No gimmicks, no hidden fees. We price our products fairly so every customer gets genuine value every time." },
          ].map(({ num, title, body }) => (
            <div key={num} className="px-10 py-12">
              <p className="text-[11px] tracking-widest text-neutral-400 uppercase mb-6">{num}</p>
              <h3 className="text-lg font-light text-neutral-900 dark:text-neutral-100 mb-3">{title}</h3>
              <p className="text-[13px] text-gray-500 dark:text-gray-400 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <SocialBar />
      <Footer />
    </>
  );
}
