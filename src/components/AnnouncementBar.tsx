const MESSAGE = "Genuine Brasso products · Fast UK dispatch · VAT-registered seller · Top-rated on Amazon";
const REPEAT = 10;

export default function AnnouncementBar() {
  return (
    <div className="bg-black text-white text-xs tracking-wide py-3 overflow-hidden select-none">
      <div
        className="flex whitespace-nowrap"
        style={{ animation: "marquee 28s linear infinite" }}
      >
        {Array.from({ length: REPEAT * 2 }).map((_, i) => (
          <span key={i} className="inline-flex items-center gap-5 px-5 flex-shrink-0">
            {MESSAGE}
            <span className="opacity-40 text-[10px]">–</span>
          </span>
        ))}
      </div>
    </div>
  );
}
