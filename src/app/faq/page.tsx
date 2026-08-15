"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Minus } from "lucide-react";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import SocialBar from "@/components/SocialBar";
import Footer from "@/components/Footer";

interface FaqItem {
  q: string;
  a: string;
}

interface FaqSection {
  title: string;
  items: FaqItem[];
}

const FAQ_SECTIONS: FaqSection[] = [
  {
    title: "Shipping & Delivery",
    items: [
      {
        q: "How long does shipping take?",
        a: "Standard delivery takes 5–10 business days within Europe. White-glove delivery (assembly included) is available in major cities and takes 7–14 days. We'll send you a tracking link as soon as your order leaves our warehouse.",
      },
      {
        q: "Do you ship internationally?",
        a: "Yes — we ship to most countries in Europe, the UK, and select destinations worldwide. Shipping costs and lead times are calculated at checkout. For large custom orders outside Europe, please contact us directly.",
      },
      {
        q: "How can I track my order?",
        a: "Once your order has been dispatched you will receive a confirmation email with a tracking number. You can use this to follow your shipment on the carrier's website. If you have any concerns, our team is happy to help.",
      },
      {
        q: "Are there any shipping fees?",
        a: "We offer free standard shipping on all orders over €300 within the EU. Orders below that threshold incur a flat fee of €25. White-glove delivery is priced separately based on your location.",
      },
    ],
  },
  {
    title: "Returns & Exchanges",
    items: [
      {
        q: "What is your return policy?",
        a: "We accept returns within 30 days of delivery, provided the item is in its original condition and packaging. Custom and made-to-order pieces cannot be returned unless there is a manufacturing defect.",
      },
      {
        q: "How do I initiate a return or exchange?",
        a: "Send us an email at returns@shamassons.com with your order number and reason for return. We'll respond within 48 hours with a prepaid shipping label and instructions. Refunds are processed within 5–7 business days of receiving the item.",
      },
      {
        q: "What should I do if my order arrives damaged?",
        a: "Please photograph the damage and email us at support@shamassons.com within 48 hours of delivery. We'll arrange a replacement or full refund at no cost to you. Do not discard the packaging as it may be required for the carrier claim.",
      },
    ],
  },
];

function AccordionItem({ item, isOpen, onToggle }: { item: FaqItem; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-6 py-5 text-left group"
      >
        <span className="text-[14px] text-neutral-800 group-hover:text-neutral-900 transition-colors pr-8">
          {item.q}
        </span>
        <span className="flex-shrink-0 text-neutral-400 group-hover:text-neutral-600 transition-colors">
          {isOpen ? <Minus size={14} strokeWidth={1.5} /> : <Plus size={14} strokeWidth={1.5} />}
        </span>
      </button>
      {isOpen && (
        <div className="px-6 pb-5">
          <p className="text-[13px] text-gray-500 leading-relaxed">{item.a}</p>
        </div>
      )}
    </div>
  );
}

export default function FaqPage() {
  const [openKey, setOpenKey] = useState<string | null>(null);

  function toggle(key: string) {
    setOpenKey((prev) => (prev === key ? null : key));
  }

  return (
    <>
      <AnnouncementBar />
      <Navbar />

      {/* ── Split layout ── */}
      <section className="grid grid-cols-2 min-h-[calc(100svh-100px)]">
        {/* Left: photo */}
        <div className="relative overflow-hidden sticky top-16 self-start h-[calc(100svh-64px)]">
          <Image
            src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=900&h=1200&q=80"
            alt="FAQ"
            fill
            className="object-cover"
            sizes="50vw"
            priority
          />
        </div>

        {/* Right: FAQ content */}
        <div className="bg-[#f5f4f1] px-14 py-14">
          <h1 className="text-5xl font-light text-neutral-900 mb-4">FAQ</h1>
          <p className="text-[13px] text-gray-500 leading-relaxed max-w-[380px] mb-12">
            Can&apos;t find what you&apos;re looking for? Reach out to us via our{" "}
            <a href="/contact" className="underline underline-offset-4 hover:text-neutral-800 transition-colors">
              contact page
            </a>{" "}
            and we&apos;ll be happy to help.
          </p>

          <div className="space-y-4">
            {FAQ_SECTIONS.map((section) => (
              <div key={section.title}>
                {/* Section header */}
                <div className="bg-gray-200/60 rounded-xl px-6 py-3.5 mb-1">
                  <span className="text-[11px] tracking-widest text-neutral-500 uppercase font-medium">
                    {section.title}
                  </span>
                </div>

                {/* Questions */}
                <div className="bg-white rounded-xl overflow-hidden">
                  {section.items.map((item, idx) => {
                    const key = `${section.title}-${idx}`;
                    return (
                      <AccordionItem
                        key={key}
                        item={item}
                        isOpen={openKey === key}
                        onToggle={() => toggle(key)}
                      />
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SocialBar />
      <Footer />
    </>
  );
}
