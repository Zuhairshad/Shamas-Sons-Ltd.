import Image from "next/image";
import Link from "next/link";

export default function CollectionsSection() {
  return (
    <section className="bg-white py-14 px-6">
      {/* ── Section label ── */}
      <div className="text-center mb-10">
        <h2 className="text-[13px] tracking-[0.12em] text-neutral-500 uppercase font-medium">
          Collections
        </h2>
      </div>

      {/* ── Grid ── */}
      <div className="max-w-[1400px] mx-auto grid grid-cols-2 h-[680px] gap-2">

        {/* ── Left: Wood (large) ── */}
        <div className="relative rounded-2xl overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=900&q=85"
            alt="Wood collection — organic wooden chair"
            fill
            className="object-cover"
            sizes="50vw"
          />
          {/* Info card overlay */}
          <div className="absolute bottom-8 left-8 bg-white p-6 rounded-xl max-w-[220px] shadow-sm">
            <h3 className="text-xl font-light text-neutral-900 mb-1.5">Wood</h3>
            <p className="text-[12px] text-gray-500 leading-relaxed mb-4">
              Our Wood Collection celebrates the natural beauty of wood.
            </p>
            <Link
              href="/collections/wood"
              className="text-[12px] underline underline-offset-4 text-neutral-800 hover:text-black"
            >
              View Collection
            </Link>
          </div>
        </div>

        {/* ── Right: 2 × 2 grid ── */}
        <div className="grid grid-cols-2 grid-rows-2 gap-2">

          {/* Row 1, Col 1 — Dark stool image */}
          <div className="relative rounded-2xl overflow-hidden bg-neutral-900">
            <Image
              src="https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=700&q=85"
              alt="Dark stool"
              fill
              className="object-cover opacity-90"
              sizes="25vw"
            />
          </div>

          {/* Row 1, Col 2 — Dark text card */}
          <div className="bg-[#111] rounded-2xl p-8 flex flex-col justify-end">
            <h3 className="text-3xl font-light text-white mb-3">Dark</h3>
            <p className="text-[12px] text-gray-400 leading-relaxed mb-5">
              Refined finishes bring an air of sophistication and drama to any room.
            </p>
            <Link
              href="/collections/dark"
              className="text-[12px] underline underline-offset-4 text-white/80 hover:text-white"
            >
              View Collection
            </Link>
          </div>

          {/* Row 2, Col 1 — Modern text card */}
          <div className="bg-[#111] rounded-2xl p-8 flex flex-col justify-end">
            <h3 className="text-3xl font-light text-white mb-3">Modern</h3>
            <p className="text-[12px] text-gray-400 leading-relaxed mb-5">
              The Modern Collection brings together graceful lines and luxurious finishes.
            </p>
            <Link
              href="/collections/modern"
              className="text-[12px] underline underline-offset-4 text-white/80 hover:text-white"
            >
              View Collection
            </Link>
          </div>

          {/* Row 2, Col 2 — Leather chair image */}
          <div className="relative rounded-2xl overflow-hidden bg-neutral-900">
            <Image
              src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=700&q=85"
              alt="Modern leather chair"
              fill
              className="object-cover"
              sizes="25vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
