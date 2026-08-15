import Link from "next/link";

const links = {
  Pages: ["Home", "About", "Licensing", "404"],
  Help:  ["FAQ", "Contact", "Terms"],
  CMS:   ["Shop", "Shop Product", "Shop Category", "Blog", "Blog Post"],
};

export default function Footer() {
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
              Scandinavian furniture, meticulously handcrafted to bring warmth
              and elegance into your home.
            </p>
          </div>
          <p className="text-xs text-gray-600 mt-10">
            © {new Date().getFullYear()} Shamas Sons Ltd. All rights reserved.
          </p>
        </div>

        {/* ── Right panel: links + newsletter ── */}
        <div className="grid grid-cols-2 divide-x divide-white/10">

          {/* Link columns */}
          <div className="px-12 py-12 grid grid-cols-3 gap-6">
            {Object.entries(links).map(([heading, items]) => (
              <div key={heading}>
                <p className="text-[11px] text-gray-500 uppercase tracking-widest mb-4">
                  {heading}
                </p>
                <ul className="space-y-2.5">
                  {items.map((item) => (
                    <li key={item}>
                      <Link
                        href="#"
                        className="text-[13px] text-gray-400 hover:text-white transition-colors"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter */}
          <div className="px-12 py-12 flex flex-col justify-between">
            <p className="text-[22px] font-light leading-[1.35] text-white">
              Join our newsletter and get 20% off your first purchase
            </p>
            <div className="mt-8">
              <input
                type="email"
                placeholder="name@email.com"
                className="w-full bg-transparent border border-white/20 rounded-sm px-4 py-3 text-[13px] text-white placeholder-gray-600 focus:outline-none focus:border-white/50 transition-colors mb-3"
              />
              <button className="w-full bg-white text-black text-[13px] font-medium py-3 rounded-sm hover:bg-gray-100 transition-colors tracking-wide">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
