import type { WorkspaceState } from "@/lib/data";
import { CHAIRS, DESKS } from "@/lib/data";

type Props = {
  state: WorkspaceState;
  onSelectDesk: (id: string) => void;
  onSelectChair: (id: string) => void;
};

function OptionCard({
  selected,
  name,
  meta,
  price,
  onClick,
  testId,
}: {
  selected: boolean;
  name: string;
  meta: string;
  price: number;
  onClick: () => void;
  testId: string;
}) {
  return (
    <button
      data-testid={testId}
      onClick={onClick}
      aria-pressed={selected}
      className={`flex w-full cursor-pointer items-center gap-2.5 rounded-xl border-[1.5px] bg-surface px-3 py-2.5 text-left transition active:scale-[0.98] ${
        selected
          ? "border-accent bg-soft shadow-[inset_0_0_0_1px_var(--wb-accent)]"
          : "border-line"
      }`}
    >
      <span
        aria-hidden="true"
        className={`h-4 w-4 shrink-0 rounded-full border-2 ${
          selected
            ? "border-accent bg-accent shadow-[inset_0_0_0_3px_white]"
            : "border-muted"
        }`}
      />
      <span className="flex flex-1 flex-col">
        <strong className="text-sm">{name}</strong>
        <small className="text-xs text-muted">{meta}</small>
      </span>
      <span className="text-[13px] font-extrabold">€{price}</span>
    </button>
  );
}

function Section({
  title,
  hint,
  children,
}: {
  title: string;
  hint: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="m-0 text-base font-bold">{title}</h2>
      <p className="mb-2.5 mt-0.5 text-[13px] text-muted">{hint}</p>
      <div className="flex flex-col gap-2">{children}</div>
    </section>
  );
}

export default function ProductPanel({
  state,
  onSelectDesk,
  onSelectChair,
}: Props) {
  return (
    <aside
      aria-label="Product selection"
      className="flex flex-col gap-[18px] rounded-2xl border border-line bg-surface p-4"
    >
      <Section title="Desks" hint="Pick 1 desk">
        {DESKS.map((d) => (
          <OptionCard
            key={d.id}
            testId={`desk-${d.id}`}
            selected={state.desk === d.id}
            name={d.name}
            meta={`${d.tag} · ${d.desc}`}
            price={d.price}
            onClick={() => onSelectDesk(d.id)}
          />
        ))}
      </Section>

      <Section title="Chairs" hint="Pick 1 chair">
        {CHAIRS.map((c) => (
          <OptionCard
            key={c.id}
            testId={`chair-${c.id}`}
            selected={state.chair === c.id}
            name={c.name}
            meta={`${c.tag} · ${c.desc}`}
            price={c.price}
            onClick={() => onSelectChair(c.id)}
          />
        ))}
      </Section>

      <p className="rounded-xl border border-dashed border-line px-3 py-2.5 text-[13px] text-muted">
        Monitors, lamp & extras live in <strong className="text-ink">Add accessories</strong> on
        the right →
      </p>
    </aside>
  );
}
