export type WorkspaceState = {
  desk: string;
  chair: string;
  accessories: string[];
};

export type Product = {
  id: string;
  name: string;
  price: number; // € / month
  tag?: string;
  desc: string;
};

export const DESKS: Product[] = [
  {
    id: "desk-oak",
    name: "Nordic Oak Desk",
    price: 19,
    tag: "140 × 70 cm",
    desc: "Solid oak top, steel legs",
  },
  {
    id: "desk-white",
    name: "Studio Standing Desk",
    price: 29,
    tag: "160 × 80 cm",
    desc: "Height-adjustable, white",
  },
  {
    id: "desk-walnut",
    name: "Walnut Executive Desk",
    price: 24,
    tag: "180 × 80 cm",
    desc: "Dark walnut top, wide",
  },
  {
    id: "desk-compact",
    name: "Compact Folding Desk",
    price: 12,
    tag: "120 × 60 cm",
    desc: "Pale birch, X-legs",
  },
];

export const CHAIRS: Product[] = [
  {
    id: "chair-ergo",
    name: "Ergo Task Chair",
    price: 15,
    tag: "Mesh back",
    desc: "Adjustable lumbar support",
  },
  {
    id: "chair-lounge",
    name: "Soft Lounge Chair",
    price: 12,
    tag: "Bouclé beige",
    desc: "Low lounge work chair",
  },
  {
    id: "chair-wood",
    name: "Wooden Craft Chair",
    price: 9,
    tag: "Solid beech",
    desc: "Slatted back, studio look",
  },
  {
    id: "chair-gaming",
    name: "Racer Gaming Chair",
    price: 18,
    tag: "High-back",
    desc: "Red trim, headrest pillow",
  },
];

export const ACCESSORIES: Product[] = [
  { id: "monitor", name: 'Monitor 27" 4K', price: 12, desc: "On desk, with stand" },
  { id: "laptop", name: 'Laptop 14"', price: 14, desc: "On desk, left side" },
  { id: "lamp", name: "Desk Lamp", price: 5, desc: "Warm LED arm lamp" },
  { id: "plant", name: "Fig Plant", price: 4, desc: "60cm potted fig" },
  { id: "headphones", name: "Headphones + Stand", price: 6, desc: "Stand on desk right" },
  { id: "speaker", name: "Bluetooth Speaker", price: 8, desc: "On the wall shelf" },
];

export function getProduct(id: string): Product | undefined {
  return [...DESKS, ...CHAIRS, ...ACCESSORIES].find((p) => p.id === id);
}

export function monthlyTotal(state: WorkspaceState): number {
  const ids = [state.desk, state.chair, ...state.accessories];
  return ids.reduce((sum, id) => sum + (getProduct(id)?.price ?? 0), 0);
}
