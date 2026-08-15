import { notFound } from "next/navigation";
import ShopClient from "@/components/ShopClient";
import { type CollectionSlug } from "@/data/products";

const VALID: CollectionSlug[] = ["dark", "modern", "wood"];

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return VALID.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const label = slug.charAt(0).toUpperCase() + slug.slice(1);
  return { title: `${label} Collection — Shamas Sons Ltd.` };
}

export default async function CollectionPage({ params }: Props) {
  const { slug } = await params;

  if (!VALID.includes(slug as CollectionSlug)) {
    notFound();
  }

  return <ShopClient defaultCollection={slug as CollectionSlug} />;
}
