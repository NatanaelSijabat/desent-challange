"use client";

import { useEffect, useState } from "react";
import { EXTRAS } from "@/lib/data";

type CatItem = { name: string; price: number };
type Cat = {
  id: string;
  emoji: string;
  name: string;
  desc: string;
  items: CatItem[];
};

const CATS: Cat[] = [
  {
    id: "coffee",
    emoji: "☕",
    name: "Coffee Station",
    desc: "Espresso machines & brewers from €9/mo",
    items: [
      { name: "Espresso Machine", price: 19 },
      { name: "Pour-Over Brew Set", price: 9 },
      { name: "Coffee Grinder", price: 11 },
    ],
  },
  {
    id: "outdoor",
    emoji: "⛺",
    name: "Outdoor Gear",
    desc: "Bikes, tents & e-scooters from €14/mo",
    items: [
      { name: "E-Scooter", price: 29 },
      { name: "4-Person Tent", price: 18 },
      { name: "Camping Set", price: 14 },
    ],
  },
  {
    id: "relax",
    emoji: "🛋️",
    name: "Relax Zone",
    desc: "Sofas, loungers & sound from €18/mo",
    items: [
      { name: "2-Seat Sofa", price: 34 },
      { name: "Soundbar", price: 22 },
      { name: "Hammock", price: 18 },
    ],
  },
  {
    id: "garage",
    emoji: "🔧",
    name: "Garage Space",
    desc: "Tools, storage & workbenches from €7/mo",
    items: [
      { name: "Workbench", price: 16 },
      { name: "Storage Rack", price: 11 },
      { name: "Drill Set", price: 7 },
    ],
  },
];

export default function BottomCategories({
  extras,
  onToggleExtra,
}: {
  extras: string[];
  onToggleExtra: (id: string) => void;
}) {
  const [active, setActive] = useState<Cat | null>(null);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  const addon = active ? EXTRAS.find((e) => e.cat === active.id) : undefined;

  return (
    <>
      <section
        aria-label="More rental categories"
        className="mt-[18px] rounded-2xl border border-line bg-surface p-[18px]"
      >
        <h2 className="m-0 mb-3 text-lg font-bold">Complete your space</h2>
        <div className="grid grid-cols-4 gap-3 max-lg:grid-cols-2 max-sm:grid-cols-1">
          {CATS.map((c) => (
            <article
              key={c.id}
              role="button"
              tabIndex={0}
              aria-label={`View ${c.name} rentals`}
              data-testid={`cat-${c.id}`}
              onClick={() => setActive(c)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setActive(c);
                }
              }}
              className="cursor-pointer gap-2.5 rounded-xl border border-line bg-soft p-3.5 transition hover:-translate-y-0.5 hover:border-accent hover:shadow-lg focus-visible:outline-2 focus-visible:outline-accent"
            >
              <div className="flex gap-2.5">
                <span aria-hidden="true" className="text-[28px]">
                  {c.emoji}
                </span>
                <div>
                  <strong className="text-sm">{c.name}</strong>
                  <p className="my-1 text-[13px] text-muted">{c.desc}</p>
                  <span className="text-[13px] font-bold text-accent-dark">
                    Browse rentals →
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {active && (
        <div
          data-testid="cat-modal"
          onClick={() => setActive(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(20,15,10,0.5)] p-5"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={`${active.name} rentals`}
            className="w-full max-w-[420px] rounded-[18px] bg-surface p-6 shadow-[0_24px_60px_rgba(0,0,0,0.25)]"
          >
            <div className="flex items-center gap-3">
              <span aria-hidden="true" className="text-4xl">
                {active.emoji}
              </span>
              <div>
                <h2 className="m-0 text-xl font-bold">{active.name}</h2>
                <p className="mt-0.5 text-sm text-muted">{active.desc}</p>
              </div>
            </div>
            <ul className="my-4 flex list-none flex-col gap-2.5 p-0">
              {active.items.map((item) => (
                <li
                  key={item.name}
                  className="flex items-center justify-between gap-3 rounded-xl border border-line px-3 py-2.5 text-sm"
                >
                  <strong>{item.name}</strong>
                  <span>€{item.price}/mo</span>
                </li>
              ))}
            </ul>
            <p className="mb-4 text-[13px] text-muted">
              Full catalog available on monis.rent — workspace add-ons like
              these pair with your setup above.
            </p>
            {addon && (
              <div className="mb-4 flex items-center gap-2.5 rounded-xl border border-accent bg-soft p-2.5">
                <span aria-hidden="true" className="text-[22px]">
                  {active.emoji}
                </span>
                <span className="flex flex-1 flex-col">
                  <strong className="text-[13px]">
                    {addon.name} — add to your workspace
                  </strong>
                  <small className="text-xs text-muted">
                    €{addon.price}/mo · {addon.desc}
                  </small>
                </span>
                <button
                  data-testid={`extra-${addon.id}`}
                  onClick={() => onToggleExtra(addon.id)}
                  className="cursor-pointer rounded-full border border-line bg-surface px-3.5 py-2 text-sm font-semibold transition active:scale-95"
                >
                  {extras.includes(addon.id) ? "Added ✓" : "Add +"}
                </button>
              </div>
            )}
            <div className="flex justify-end">
              <button
                data-testid="cat-close"
                onClick={() => setActive(null)}
                className="cursor-pointer rounded-full border border-accent bg-accent px-5 py-2 text-sm font-semibold text-white transition hover:bg-accent-dark active:scale-95"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
