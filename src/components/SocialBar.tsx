import Link from "next/link";

/* Minimal SVG icons — thin-line style matching the Fjord aesthetic */
const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" className="opacity-60">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.5" className="opacity-60">
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const PinterestIcon = () => (
  <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" className="opacity-60">
    <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146A12.07 12.07 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
  </svg>
);

const BehanceIcon = () => (
  <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" className="opacity-60">
    <path d="M6.938 4.503c.702 0 1.34.06 1.92.188.577.13 1.07.33 1.485.61.41.28.733.65.96 1.12.225.47.34 1.05.34 1.73 0 .74-.17 1.36-.507 1.86-.338.5-.837.9-1.502 1.22.906.26 1.576.72 2.022 1.37.448.65.673 1.44.673 2.36 0 .75-.13 1.39-.4 1.93-.27.54-.64.98-1.114 1.32-.47.34-1.015.58-1.64.74-.624.16-1.29.24-1.99.24H0V4.503h6.938zm-.48 5.65c.58 0 1.06-.14 1.44-.42.38-.28.57-.72.57-1.32 0-.34-.06-.62-.19-.84-.13-.22-.3-.4-.52-.53-.22-.13-.47-.22-.75-.27-.28-.05-.57-.07-.87-.07H3.19v3.45h3.27zm.23 5.9c.33 0 .64-.03.93-.1.29-.07.54-.18.75-.34.21-.16.38-.37.5-.63.12-.26.18-.57.18-.94 0-.75-.21-1.29-.64-1.63-.43-.34-.99-.51-1.69-.51H3.19v4.15h3.5zm11.11-1.65c.29.42.73.63 1.32.63.41 0 .76-.1 1.05-.31.29-.21.47-.43.54-.66h2.47c-.4 1.22-1 2.1-1.82 2.64-.82.54-1.8.81-2.96.81-.8 0-1.52-.13-2.17-.38-.65-.25-1.2-.6-1.66-1.07-.45-.46-.8-1.02-1.05-1.67-.25-.65-.37-1.37-.37-2.17 0-.78.13-1.49.38-2.15.25-.65.61-1.21 1.06-1.67.46-.46 1.01-.82 1.65-1.08.64-.26 1.35-.39 2.13-.39.88 0 1.65.17 2.31.51.66.34 1.2.8 1.63 1.38.43.58.74 1.24.93 2 .19.76.26 1.55.2 2.37h-7.36c0 .66.22 1.28.51 1.7zm2.29-4.93c-.23-.38-.65-.57-1.24-.57-.37 0-.67.06-.91.19-.24.13-.43.29-.57.48-.14.19-.24.39-.3.6-.05.21-.08.41-.09.58h3.84c-.07-.58-.22-1.02-.73-1.28zM15.34 5.03h5.45v1.4h-5.45V5.03z" />
  </svg>
);

const socials = [
  { name: "Twitter",   href: "#", Icon: TwitterIcon   },
  { name: "Instagram", href: "#", Icon: InstagramIcon },
  { name: "Pinterest", href: "#", Icon: PinterestIcon },
  { name: "Behance",   href: "#", Icon: BehanceIcon   },
];

export default function SocialBar() {
  return (
    <div className="border-y border-gray-200 max-w-full">
      <div className="grid grid-cols-4 divide-x divide-gray-200 max-w-[1400px] mx-auto">
        {socials.map(({ name, href, Icon }) => (
          <Link
            key={name}
            href={href}
            className="flex items-center justify-between px-8 py-6 hover:bg-gray-50 transition-colors group"
          >
            <span className="text-sm text-neutral-700 group-hover:text-black transition-colors">
              {name}
            </span>
            <span className="text-neutral-500 group-hover:text-black transition-colors">
              <Icon />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
