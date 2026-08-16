"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

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
    <footer className="bg-neutral-100 dark:bg-[#111] text-neutral-900 dark:text-white transition-colors">

      {/* ── Main grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-neutral-200 dark:divide-white/10 max-w-[1400px] mx-auto">

        {/* ── Left: brand ── */}
        <div className="flex flex-col justify-between px-6 sm:px-10 md:px-12 py-10 md:py-12">
          <div>
            {/* Logo — dark:invert so black SVG reads white on dark background */}
            <Link href="/" className="inline-block mb-5">
              <Image
                src="/logo.svg"
                alt="Shamas & Sons"
                width={100}
                height={143}
                className="h-16 w-auto dark:invert opacity-90 hover:opacity-100 transition-opacity"
              />
            </Link>
            <p className="text-[13px] text-neutral-500 dark:text-gray-400 leading-relaxed max-w-[280px]">
              UK-based, VAT-registered retailer supplying genuine Brasso metal
              polish. 4.4 ★ top-rated seller with 95+ verified reviews — based
              in Colchester, Essex.
            </p>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-10 mt-10">
            {Object.entries(links).map(([heading, items]) => (
              <div key={heading}>
                <p className="text-[11px] text-neutral-400 dark:text-gray-500 uppercase tracking-widest mb-4">
                  {heading}
                </p>
                <ul className="space-y-2.5">
                  {items.map(({ label, href }) => (
                    <li key={label}>
                      <Link
                        href={href}
                        className="text-[13px] text-neutral-500 dark:text-gray-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="text-xs text-neutral-400 dark:text-gray-600 mt-10">
            © {new Date().getFullYear()} Shamas &amp; Sons Ltd. All rights reserved.
            &nbsp;VAT No: GB458915253 · Co No: 13659351
          </p>
        </div>

        {/* ── Right: newsletter ── */}
        <div className="px-6 sm:px-10 md:px-12 py-10 md:py-12 flex flex-col justify-between">
          <p className="text-[22px] font-light leading-[1.35] text-neutral-900 dark:text-white max-w-[320px]">
            Stay in the loop — get exclusive deals and new product updates
          </p>

          <div className="mt-8">
            {subscribed ? (
              <div className="border border-neutral-300 dark:border-white/20 rounded-sm px-4 py-4">
                <p className="text-[13px] text-neutral-900 dark:text-white">You&apos;re on the list ✦</p>
                <p className="text-[12px] text-neutral-500 dark:text-gray-400 mt-1">
                  Thanks! We&apos;ll be in touch at {email}
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
                  className="w-full bg-transparent border border-neutral-300 dark:border-white/20 rounded-sm px-4 py-3 text-[13px] text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-gray-600 focus:outline-none focus:border-neutral-500 dark:focus:border-white/50 transition-colors mb-3"
                />
                <button
                  type="submit"
                  className="w-full bg-neutral-900 dark:bg-white text-white dark:text-black text-[13px] font-medium py-3 rounded-sm hover:bg-neutral-700 dark:hover:bg-gray-100 transition-colors tracking-wide"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
