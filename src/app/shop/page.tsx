import ShopClient from "@/components/ShopClient";

export const metadata = {
  title: "Shop — Shamas Sons Ltd.",
};

export default function ShopPage() {
  return <ShopClient defaultCollection="all" />;
}
