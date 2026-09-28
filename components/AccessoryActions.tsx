import type { WorkspaceState } from "@/lib/data";
import { ACCESSORIES, monthlyTotal } from "@/lib/data";

type Props = {
  state: WorkspaceState;
  onToggleAccessory: (id: string) => void;
  onRent: () => void;
  onClear: () => void;
};

const ICONS: Record<string, string> = {
  monitor: "🖥️",
  "monitor-side": "📺",
  "monitor-top": "🎬",
  laptop: "💻",
  lamp: "💡",
  plant: "🪴",
  headphones: "🎧",
  speaker: "🔊",
};

export default function AccessoryActions({ state, onToggleAccessory, onRent, onClear }: Props) {
  return (
    <aside aria-label="Accessory actions" className="flex flex-col gap-3.5">
      <section className="rounded-2xl border border-line bg-surface p-4">
        <h2 className="m-0 mb-2.5 text-base font-bold">Add accessories</h2>
        {ACCESSORIES.map((a) => {
          const active = state.accessories.includes(a.id);
          return (
            <div
              key={a.id}
              className={`mb-2 flex items-center gap-2.5 rounded-xl border p-2 ${
                active ? "border-accent bg-soft" : "border-line"
              }`}
            >
              <span aria-hidden="true" className="text-[22px]">
                {ICONS[a.id]}
              </span>
              <span className="flex flex-1 flex-col">
                <strong className="text-[13px]">{a.name}</strong>
                <small className="text-xs text-muted">€{a.price}/mo</small>
              </span>
              <button
                data-testid={`action-${a.id}`}
                onClick={() => onToggleAccessory(a.id)}
                className={`cursor-pointer rounded-full border border-line px-3.5 py-2 text-sm font-semibold transition active:scale-95 ${
                  active ? "bg-transparent" : "bg-surface"
                }`}
              >
                {active ? "Remove" : "Add +"}
              </button>
            </div>
          );
        })}
        <button
          onClick={onClear}
          className="mt-2 cursor-pointer border-none bg-none text-[13px] text-muted underline"
        >
          Clear accessories
        </button>
      </section>

      <section className="rounded-2xl border border-ink bg-ink p-4 text-white dark:border-accent dark:bg-[#1a1426]">
        <h2 className="m-0 mb-2.5 text-base font-bold">Ready to Rent?</h2>
        <p className="my-1.5 text-sm">
          {2 + state.accessories.length + state.extras.length} items ·{" "}
          <strong>€{monthlyTotal(state)}/mo</strong>
        </p>
        <p className="my-1.5 text-sm text-[#c9c2b4]">
          Flexible monthly rental. Free delivery &amp; pickup.
        </p>
        <button
          data-testid="rent-cta"
          onClick={onRent}
          className="mt-1 w-full cursor-pointer rounded-xl border border-accent bg-accent p-3.5 text-base font-semibold text-white transition hover:bg-accent-dark active:scale-[0.98]"
        >
          Rent Your Setup!
        </button>
      </section>
    </aside>
  );
}
