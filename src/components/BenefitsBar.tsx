import { Truck, Star, ShieldCheck, Package } from "lucide-react";

const benefits = [
  { Icon: Truck,       label: "Fast UK Dispatch"          },
  { Icon: Star,        label: "4.4 ★ Top-Rated Seller"    },
  { Icon: ShieldCheck, label: "Genuine Brasso Products"   },
  { Icon: Package,     label: "Secure Packaging"          },
];

export default function BenefitsBar() {
  return (
    <div className="bg-black text-white">
      <div className="grid grid-cols-4 divide-x divide-white/10">
        {benefits.map(({ Icon, label }) => (
          <div
            key={label}
            className="flex items-center justify-center gap-3 py-5 px-4"
          >
            <Icon size={16} strokeWidth={1.5} className="flex-shrink-0 opacity-80" />
            <span className="text-[13px] font-light tracking-wide">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
