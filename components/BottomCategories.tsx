const CATS = [
  { id: "coffee", emoji: "☕", name: "Coffee Station", desc: "Espresso machines & brewers from €9/mo" },
  { id: "outdoor", emoji: "⛺", name: "Outdoor Gear", desc: "Bikes, tents & e-scooters from €14/mo" },
  { id: "relax", emoji: "🛋️", name: "Relax Zone", desc: "Sofas, loungers & sound from €18/mo" },
  { id: "garage", emoji: "🔧", name: "Garage Space", desc: "Tools, storage & workbenches from €7/mo" },
];

export default function BottomCategories() {
  return (
    <section
      aria-label="More rental categories"
      className="mt-[18px] rounded-2xl border border-line bg-white p-[18px]"
    >
      <h2 className="m-0 mb-3 text-lg font-bold">Complete your space</h2>
      <div className="grid grid-cols-4 gap-3 max-lg:grid-cols-2 max-sm:grid-cols-1">
        {CATS.map((c) => (
          <article
            key={c.id}
            className="flex gap-2.5 rounded-xl border border-line bg-[#fbf9f5] p-3.5"
          >
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
          </article>
        ))}
      </div>
    </section>
  );
}
