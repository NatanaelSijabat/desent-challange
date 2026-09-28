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
];

export const ACCESSORIES: Product[] = [
  { id: "monitor", name: 'Monitor 27" 4K', price: 12, desc: "On desk, with stand" },
  { id: "lamp", name: "Desk Lamp", price: 5, desc: "Warm LED arm lamp" },
  { id: "plant", name: "Fig Plant", price: 4, desc: "60cm potted fig" },
];

export function getProduct(id: string): Product | undefined {
  return [...DESKS, ...CHAIRS, ...ACCESSORIES].find((p) => p.id === id);
}

export function monthlyTotal(state: WorkspaceState): number {
  const ids = [state.desk, state.chair, ...state.accessories];
  return ids.reduce((sum, id) => sum + (getProduct(id)?.price ?? 0), 0);
}
