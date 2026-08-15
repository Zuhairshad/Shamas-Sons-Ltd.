"use client";

import { useState } from "react";
import Link from "next/link";

const links: Record<string, { label: string; href: string }[]> = {
  Shop: [
    { label: "All Products",    href: "/shop"                },
    { label: "Liquid Polish",   href: "/collections/liquid"  },
    { label: "Wadding & Wipes", href: "/collections/wadding" },
    { label: "Bundles & Packs", href: "/collections/bundle"  },
  ],
  Company: [
    { label: "About",   href: "/about"   },
    { label: "Contact", href: "/contact" },
    { label: "FAQ",     href: "/faq"     },
  ],
};

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (email) setSubscribed(true);
  }

  return (
    <footer className="bg-[#111] text-white">
      <div className="grid grid-cols-2 divide-x divide-white/10 max-w-[1400px] mx-auto">

        {/* ── Left panel: brand ── */}
        <div className="flex flex-col justify-between px-12 py-12">
          <div>
            {/* Logo */}
            <div className="flex items-center gap-2.5 mb-5">
              <span className="w-3.5 h-3.5 rounded-full bg-white inline-block" />
              <span className="text-[15px] font-semibold tracking-tight">Shamas Sons</span>
            </div>
            <p className="text-[13px] text-gray-400 leading-relaxed max-w-[260px]">
              UK-based, VAT-registered retailer. Top-rated seller with 4.4 ★ from
              over 95 verified customers. Based in Colchester, Essex.
            </p>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-10 mt-10">
            {Object.entries(links).map(([heading, items]) => (
              <div key={heading}>
                <p className="text-[11px] text-gray-500 uppercase tracking-widest mb-4">
                  {heading}
                </p>
                <ul className="space-y-2.5">
                  {items.map(({ label, href }) => (
                    <li key={label}>
                      <Link
                        href={href}
                        className="text-[13px] text-gray-400 hover:text-white transition-colors"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="text-xs text-gray-600 mt-10">
            © {new Date().getFullYear()} Shamas Sons Ltd. All rights reserved.
          </p>
        </div>

        {/* ── Right panel: newsletter ── */}
        <div className="px-12 py-12 flex flex-col justify-between">
          <p className="text-[22px] font-light leading-[1.35] text-white max-w-[320px]">
            Join our newsletter and get 20% off your first purchase
          </p>

          <div className="mt-8">
            {subscribed ? (
              <div className="border border-white/20 rounded-sm px-4 py-4">
                <p className="text-[13px] text-white">You&apos;re on the list ✦</p>
                <p className="text-[12px] text-gray-400 mt-1">
                  Your 20% discount is on its way to {email}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe}>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@email.com"
                  className="w-full bg-transparent border border-white/20 rounded-sm px-4 py-3 text-[13px] text-white placeholder-gray-600 focus:outline-none focus:border-white/50 transition-colors mb-3"
                />
                <button
                  type="submit"
                  className="w-full bg-white text-black text-[13px] font-medium py-3 rounded-sm hover:bg-gray-100 transition-colors tracking-wide"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>

          {/* Social links */}
          <div className="mt-auto pt-12">
            <p className="text-[11px] text-gray-500 uppercase tracking-widest mb-4">Follow Us</p>
            <div className="flex gap-5 text-[13px] text-gray-400">
              {["Instagram", "Pinterest", "Twitter"].map((s) => (
                <a key={s} href="#" className="hover:text-white transition-colors">{s}</a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
