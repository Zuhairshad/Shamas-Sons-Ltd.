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
  "LINFA",
  "VITRA",
  "MUUTO",
  "HAY",
  "NORMANN",
  "MENU",
  "FERM",
  "AUDO",
  "LINFA",
  "VITRA",
  "MUUTO",
  "HAY",
  "NORMANN",
  "MENU",
  "FERM",
  "AUDO",
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
          <div className="absolute bottom-8 left-8 bg-white rounded-full px-5 py-2.5 flex items-center gap-2.5 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-black inline-block" />
            <span className="text-[13px] font-medium tracking-tight">We are Shamas Sons</span>
          </div>
        </div>

        {/* Right: content */}
        <div className="bg-[#f5f4f1] flex flex-col px-14 py-12">
          <h1 className="text-5xl font-light text-neutral-900 leading-tight max-w-[420px]">
            Crafting spaces that feel like home
          </h1>

          <div className="flex-1" />

          <div className="space-y-4 max-w-[400px]">
            <p className="text-[13px] text-gray-500 leading-relaxed">
              Shamas Sons was born from a love of craft and a belief that
              beautiful furniture should last a lifetime. We source only the
              finest European oak, walnut, and natural textiles — working
              directly with skilled artisans to bring each piece to life.
            </p>
            <p className="text-[13px] text-gray-500 leading-relaxed">
              Every collection is designed with restraint and precision, so
              it fits quietly into your life rather than demanding your
              attention. We call it confident minimalism.
            </p>
          </div>

          <div className="mt-10">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 border border-neutral-900 rounded-full px-6 py-2.5 text-[13px] text-neutral-900 hover:bg-neutral-900 hover:text-white transition-all"
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
      <section className="bg-white px-10 py-24">
        <div className="max-w-[1100px] mx-auto grid grid-cols-2 gap-24 items-start">
          <div>
            <p className="text-[11px] tracking-widest text-neutral-400 uppercase mb-6">Our Story</p>
            <h2 className="text-4xl font-light text-neutral-900 leading-snug">
              Three generations of furniture craft
            </h2>
          </div>
          <div className="space-y-5 pt-2">
            <p className="text-[13px] text-gray-500 leading-relaxed">
              Founded in 1972, Shamas Sons started as a small workshop in the
              heart of central Europe. What began as a family trade has grown
              into a respected name in contemporary furniture design, but our
              values remain the same: honesty of materials, precision of
              craft, and respect for the people who make each piece.
            </p>
            <p className="text-[13px] text-gray-500 leading-relaxed">
              Today we design in-house and manufacture in collaboration with
              partner workshops across Scandinavia and Central Europe.
              Every piece passes through our studio before it reaches you.
            </p>
            <p className="text-[13px] text-gray-500 leading-relaxed">
              We believe furniture should grow more beautiful with time —
              that a slight patina is not a flaw but a feature, proof that
              something real was made.
            </p>
          </div>
        </div>
      </section>

      {/* ── Three values ── */}
      <section className="bg-[#f5f4f1] border-t border-gray-200">
        <div className="grid grid-cols-3 divide-x divide-gray-200">
          {[
            { num: "01", title: "Materials First", body: "We start every design with the material — its grain, weight, and warmth — and let that guide form." },
            { num: "02", title: "Made to Last", body: "Every joint is hand-finished. Every surface sanded by someone who cares. No flat-pack, no shortcuts." },
            { num: "03", title: "Honest Pricing", body: "We price fairly so you know exactly what you're paying for: labour, material, and a 10-year guarantee." },
          ].map(({ num, title, body }) => (
            <div key={num} className="px-10 py-12">
              <p className="text-[11px] tracking-widest text-neutral-400 uppercase mb-6">{num}</p>
              <h3 className="text-lg font-light text-neutral-900 mb-3">{title}</h3>
              <p className="text-[13px] text-gray-500 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <SocialBar />
      <Footer />
    </>
  );
}
