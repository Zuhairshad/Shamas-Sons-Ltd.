export type CollectionSlug = "dark" | "modern" | "wood";
export type FilterId = "all" | CollectionSlug;

export interface Product {
  id: number;
  name: string;
  price: string;
  sale: string | null;
  collection: CollectionSlug;
  src: string;
}

export const COLLECTION_META: Record<FilterId, { title: string; desc: string }> = {
  all: {
    title: "Shop",
    desc: "Browse our full collection of handcrafted Scandinavian furniture.",
  },
  dark: {
    title: "Dark",
    desc: "Explore our Dark Collection, where deep hues and refined finishes bring an air of sophistication and drama to any room.",
  },
  modern: {
    title: "Modern",
    desc: "The Modern Collection brings together graceful lines and luxurious finishes for the contemporary home.",
  },
  wood: {
    title: "Wood",
    desc: "Our Wood Collection celebrates the natural beauty of wood and the warmth it brings to every space.",
  },
};

export const COLLECTION_THUMBNAILS: Record<CollectionSlug, string> = {
  dark:   "https://images.unsplash.com/photo-1549497538-303791108f95?auto=format&fit=crop&w=120&h=120&q=80",
  modern: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=120&h=120&q=80",
  wood:   "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=120&h=120&q=80",
};

export const PRODUCTS: Product[] = [
  { id: 1,  name: "Sage",  price: "380,00 €", sale: "50% OFF", collection: "wood",   src: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=600&h=700&q=80" },
  { id: 2,  name: "Venn",  price: "420,00 €", sale: null,       collection: "dark",   src: "https://images.unsplash.com/photo-1549497538-303791108f95?auto=format&fit=crop&w=600&h=700&q=80" },
  { id: 3,  name: "Holt",  price: "280,00 €", sale: null,       collection: "wood",   src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&h=700&q=80" },
  { id: 4,  name: "Noor",  price: "350,00 €", sale: null,       collection: "modern", src: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&h=700&q=80" },
  { id: 5,  name: "Haven", price: "290,00 €", sale: "50% OFF",  collection: "dark",   src: "https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=600&h=700&q=80" },
  { id: 6,  name: "Elm",   price: "460,00 €", sale: null,       collection: "modern", src: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=600&h=700&q=80" },
  { id: 7,  name: "Kapp",  price: "320,00 €", sale: null,       collection: "modern", src: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&h=700&q=80" },
  { id: 8,  name: "Sol",   price: "410,00 €", sale: null,       collection: "dark",   src: "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=600&h=700&q=80" },
  { id: 9,  name: "Runa",  price: "280,00 €", sale: null,       collection: "wood",   src: "https://images.unsplash.com/photo-1571722288786-61a5d6f05b58?auto=format&fit=crop&w=600&h=700&q=80" },
  { id: 10, name: "Nest",  price: "390,00 €", sale: null,       collection: "modern", src: "https://images.unsplash.com/photo-1581783342308-f792dbdd1696?auto=format&fit=crop&w=600&h=700&q=80" },
  { id: 11, name: "Fynn",  price: "310,00 €", sale: null,       collection: "dark",   src: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?auto=format&fit=crop&w=600&h=700&q=80" },
  { id: 12, name: "Lykke", price: "440,00 €", sale: "54% OFF",  collection: "wood",   src: "https://images.unsplash.com/photo-1593702288056-c12ccc571174?auto=format&fit=crop&w=600&h=700&q=80" },
];
