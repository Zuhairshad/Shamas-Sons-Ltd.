export type CollectionSlug = "dark" | "modern" | "wood";
export type FilterId = "all" | CollectionSlug;

export interface Product {
  id: number;
  name: string;
  price: string;
  sale: string | null;
  collection: CollectionSlug;
  src: string;
  desc: string;
  material: string;
  dimensions: string;
  weight: string;
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
  {
    id: 1, name: "Sage", price: "380,00 €", sale: "50% OFF", collection: "wood",
    src: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=600&h=700&q=80",
    desc: "The Sage chair brings the quiet beauty of the forest indoors. Crafted from solid European oak with a hand-applied oil finish, it ages gracefully — developing a richer, warmer tone with each passing year.",
    material: "Solid European Oak, Natural Oil Finish",
    dimensions: "W 62 × D 68 × H 80 cm",
    weight: "9 kg",
  },
  {
    id: 2, name: "Venn", price: "420,00 €", sale: null, collection: "dark",
    src: "https://images.unsplash.com/photo-1549497538-303791108f95?auto=format&fit=crop&w=600&h=700&q=80",
    desc: "Venn is where structure meets serenity. Its deep ebonised finish and refined spindle back make a bold statement in any room while remaining effortlessly comfortable for hours of use.",
    material: "Solid Ash, Ebonised Finish, Upholstered Seat",
    dimensions: "W 55 × D 60 × H 85 cm",
    weight: "10 kg",
  },
  {
    id: 3, name: "Holt", price: "280,00 €", sale: null, collection: "wood",
    src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&h=700&q=80",
    desc: "Holt is a study in honest simplicity. Turned oak legs and a gently curved back create a piece that feels both timeless and thoroughly contemporary — at home in a dining room or a reading nook alike.",
    material: "Solid Oak, Beeswax Polish",
    dimensions: "W 50 × D 55 × H 82 cm",
    weight: "8 kg",
  },
  {
    id: 4, name: "Noor", price: "350,00 €", sale: null, collection: "modern",
    src: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&h=700&q=80",
    desc: "Noor radiates a calm, collected elegance. Its powder-coated steel frame and woven seat create a dialogue between industrial precision and natural warmth — modern without being cold.",
    material: "Powder-Coated Steel, Woven Cord Seat",
    dimensions: "W 58 × D 62 × H 78 cm",
    weight: "7 kg",
  },
  {
    id: 5, name: "Haven", price: "290,00 €", sale: "50% OFF", collection: "dark",
    src: "https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=600&h=700&q=80",
    desc: "Haven invites you to sit and stay. A deep charcoal shell, rounded edges, and a generous seat depth make this the ultimate companion for late evenings and slow mornings alike.",
    material: "Moulded Shell, Powder-Coated Frame, Bouclé Cushion",
    dimensions: "W 65 × D 70 × H 75 cm",
    weight: "12 kg",
  },
  {
    id: 6, name: "Elm", price: "460,00 €", sale: null, collection: "modern",
    src: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=600&h=700&q=80",
    desc: "Elm channels the spirit of mid-century modernism through a contemporary lens. Its foam-filled upholstered back and tapered oak legs strike the perfect balance between softness and structure.",
    material: "Walnut Veneer Frame, Foam-Filled Upholstery, Linen Fabric",
    dimensions: "W 72 × D 75 × H 82 cm",
    weight: "14 kg",
  },
  {
    id: 7, name: "Kapp", price: "320,00 €", sale: null, collection: "modern",
    src: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&h=700&q=80",
    desc: "Kapp pairs full-grain leather with a slender chromed steel frame. The result is a chair of quiet authority — one that commands attention without demanding it.",
    material: "Full-Grain Leather, Chromed Steel Frame",
    dimensions: "W 60 × D 65 × H 80 cm",
    weight: "11 kg",
  },
  {
    id: 8, name: "Sol", price: "410,00 €", sale: null, collection: "dark",
    src: "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=600&h=700&q=80",
    desc: "Sol draws warmth from darkness. Its deep espresso-stained oak frame anchors a cream bouclé seat that glows against the depth of the wood — a piece that holds light in a room.",
    material: "Stained Oak, Bouclé Upholstery",
    dimensions: "W 63 × D 67 × H 83 cm",
    weight: "13 kg",
  },
  {
    id: 9, name: "Runa", price: "280,00 €", sale: null, collection: "wood",
    src: "https://images.unsplash.com/photo-1519947486511-46149fa0a254?auto=format&fit=crop&w=600&h=700&q=80",
    desc: "Runa is shaped around the human form. Its gently sculpted seat and flared back reflect hours of ergonomic study — proof that beautiful furniture need not compromise comfort.",
    material: "Beech Wood, Natural Soap Finish",
    dimensions: "W 54 × D 58 × H 84 cm",
    weight: "9 kg",
  },
  {
    id: 10, name: "Nest", price: "390,00 €", sale: null, collection: "modern",
    src: "https://images.unsplash.com/photo-1540574163026-643ea20ade25?auto=format&fit=crop&w=600&h=700&q=80",
    desc: "Nest is built for the way we actually live. Its wide, welcoming seat and cushioned back support every position — from upright focus to relaxed unwinding — with equal grace.",
    material: "Oak Frame, High-Density Foam, Recycled Fabric",
    dimensions: "W 75 × D 80 × H 80 cm",
    weight: "16 kg",
  },
  {
    id: 11, name: "Fynn", price: "310,00 €", sale: null, collection: "dark",
    src: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?auto=format&fit=crop&w=600&h=700&q=80",
    desc: "Fynn wears its influences proudly — the industrial lofts of Copenhagen, the spare elegance of Tokyo. A dark steel frame meets an oiled teak seat in a marriage of contrasts.",
    material: "Matte Black Steel, Oiled Teak Seat",
    dimensions: "W 48 × D 52 × H 78 cm",
    weight: "10 kg",
  },
  {
    id: 12, name: "Lykke", price: "440,00 €", sale: "54% OFF", collection: "wood",
    src: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=600&h=700&q=80",
    desc: "Lykke — the Danish word for happiness — is exactly that. Crafted from sustainably sourced ash with a light whitewash finish, it fills a room with the feeling of Nordic summer light.",
    material: "Sustainable Ash, White Pigment Oil Finish",
    dimensions: "W 58 × D 63 × H 81 cm",
    weight: "10 kg",
  },
];
