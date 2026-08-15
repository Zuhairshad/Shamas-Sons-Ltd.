import Image from "next/image";
import Link from "next/link";

export default function AboutSection() {
  return (
    <section className="bg-white">
      <div className="max-w-[1400px] mx-auto grid grid-cols-[38%_62%] min-h-[520px]">

        {/* ── Left: text ── */}
        <div className="flex flex-col justify-between px-10 py-16">
          <h2 className="text-4xl font-light leading-[1.25] text-neutral-900">
            Designing Spaces,<br />Inspiring Connection
          </h2>
          <div>
            <p className="text-[13px] text-gray-500 leading-relaxed mb-6 max-w-[320px]">
              At Shamas Sons, our mission is to create furniture that brings
              people together, inspired by the simplicity and warmth of
              Scandinavian design.
            </p>
            <Link
              href="/about"
              className="text-[13px] underline underline-offset-4 text-neutral-800 hover:text-black"
            >
              More About Us
            </Link>
          </div>
        </div>

        {/* ── Right: studio image ── */}
        <div className="relative overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=85"
            alt="Shamas Sons design studio"
            fill
            className="object-cover"
            sizes="62vw"
          />
        </div>
      </div>
    </section>
  );
}
