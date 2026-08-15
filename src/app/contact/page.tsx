"use client";

import { useState } from "react";
import Image from "next/image";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import SocialBar from "@/components/SocialBar";
import Footer from "@/components/Footer";

const OFFICES = [
  {
    city: "Prague",
    address: "Náměstí Míru 14\n120 00 Prague 2\nCzech Republic",
    phone: "+420 222 510 882",
  },
  {
    city: "Hamburg",
    address: "Eppendorfer Weg 155\n20253 Hamburg\nGermany",
    phone: "+49 40 4600 8800",
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <>
      <AnnouncementBar />
      <Navbar />

      {/* ── Split hero ── */}
      <section className="grid grid-cols-2 h-[80vh] min-h-[560px]">
        {/* Left: interior photo */}
        <div className="relative overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=900&h=900&q=80"
            alt="Contact us"
            fill
            className="object-cover"
            sizes="50vw"
            priority
          />
        </div>

        {/* Right: form */}
        <div className="bg-[#f5f4f1] dark:bg-[#1a1a1a] flex flex-col px-14 py-14 transition-colors">
          <h1 className="text-5xl font-light text-neutral-900 dark:text-neutral-100 mb-2">Let&apos;s Talk</h1>
          <p className="text-[13px] text-gray-500 dark:text-gray-400 mb-10 max-w-[340px]">
            Have a question, a custom enquiry, or just want to say hello?
            We&apos;d love to hear from you.
          </p>

          {sent ? (
            <div className="flex-1 flex items-center">
              <div className="space-y-2">
                <p className="text-lg font-light text-neutral-900 dark:text-neutral-100">Message received ✦</p>
                <p className="text-[13px] text-gray-500 dark:text-gray-400">We&apos;ll be in touch within 1–2 business days.</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col flex-1 gap-5">
              {/* Name + Email row */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] tracking-widest text-neutral-400 uppercase">Name</label>
                  <input
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="bg-white dark:bg-[#111] border border-gray-200 dark:border-[#333] rounded-xl px-4 py-3 text-[13px] text-neutral-800 dark:text-neutral-200 placeholder:text-neutral-400 dark:placeholder:text-neutral-600 focus:outline-none focus:border-neutral-400 dark:focus:border-neutral-500 transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] tracking-widest text-neutral-400 uppercase">Email</label>
                  <input
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="bg-white dark:bg-[#111] border border-gray-200 dark:border-[#333] rounded-xl px-4 py-3 text-[13px] text-neutral-800 dark:text-neutral-200 placeholder:text-neutral-400 dark:placeholder:text-neutral-600 focus:outline-none focus:border-neutral-400 dark:focus:border-neutral-500 transition-colors"
                  />
                </div>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5 flex-1">
                <label className="text-[11px] tracking-widest text-neutral-400 uppercase">Message</label>
                <textarea
                  name="message"
                  required
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us what's on your mind…"
                  className="bg-white dark:bg-[#111] border border-gray-200 dark:border-[#333] rounded-xl px-4 py-3 text-[13px] text-neutral-800 dark:text-neutral-200 placeholder:text-neutral-400 dark:placeholder:text-neutral-600 focus:outline-none focus:border-neutral-400 dark:focus:border-neutral-500 transition-colors resize-none flex-1 min-h-[120px]"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-neutral-900 dark:bg-white text-white dark:text-black text-[13px] rounded-xl py-3.5 hover:bg-neutral-700 dark:hover:bg-gray-200 transition-colors mt-auto"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </section>

      {/* ── Office cards ── */}
      <section className="bg-white dark:bg-[#111] border-t border-gray-100 dark:border-[#222] transition-colors">
        <div className="grid grid-cols-2 divide-x divide-gray-100 dark:divide-[#222] max-w-[900px] mx-auto">
          {OFFICES.map(({ city, address, phone }) => (
            <div key={city} className="px-14 py-12">
              <p className="text-[11px] tracking-widest text-neutral-400 uppercase mb-5">{city}</p>
              <p className="text-[13px] text-neutral-700 dark:text-neutral-300 leading-relaxed whitespace-pre-line mb-2">
                {address}
              </p>
              <p className="text-[13px] text-neutral-500 dark:text-neutral-400">{phone}</p>
              <button className="mt-6 flex items-center gap-2 bg-neutral-900 dark:bg-white text-white dark:text-black text-[12px] rounded-lg px-4 py-2 hover:bg-neutral-700 dark:hover:bg-gray-200 transition-colors">
                Get Direction <span className="text-[10px]">↗</span>
              </button>
            </div>
          ))}
        </div>
      </section>

      <SocialBar />
      <Footer />
    </>
  );
}
