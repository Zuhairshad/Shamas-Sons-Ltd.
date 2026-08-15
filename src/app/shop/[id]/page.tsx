import { notFound } from "next/navigation";
import { PRODUCTS } from "@/data/products";
import ProductClient from "@/components/ProductClient";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return PRODUCTS.map((p) => ({ id: String(p.id) }));
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const product = PRODUCTS.find((p) => p.id === parseInt(id));
  if (!product) return { title: "Product Not Found" };
  return { title: `${product.name} — Shamas Sons Ltd.` };
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product = PRODUCTS.find((p) => p.id === parseInt(id));
  if (!product) notFound();
  return <ProductClient product={product} />;
}
