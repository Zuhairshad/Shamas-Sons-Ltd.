import { notFound } from "next/navigation";
import ShopClient from "@/components/ShopClient";
import { type CollectionSlug } from "@/data/products";

const VALID: CollectionSlug[] = ["liquid", "wadding", "bundle"];

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return VALID.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const labelMap: Record<string, string> = {
    liquid: "Liquid Polish",
    wadding: "Wadding & Wipes",
    bundle: "Bundles & Packs",
  };
  const label = labelMap[slug] ?? slug;
  return { title: `${label} — Shamas Sons Ltd.` };
}

export default async function CollectionPage({ params }: Props) {
  const { slug } = await params;

  if (!VALID.includes(slug as CollectionSlug)) {
    notFound();
  }

  return <ShopClient defaultCollection={slug as CollectionSlug} />;
}
