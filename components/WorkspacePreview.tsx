import dynamic from "next/dynamic";
import type { WorkspaceState } from "@/lib/data";
import { getProduct } from "@/lib/data";

export type Theme = "light" | "dark";

export type DeskStyle = {
  top: string;
  edge: string;
  leg: string;
  dTop: string;
  dEdge: string;
  dLeg: string;
  x: number;
  w: number;
  thick: number;
  legs: "straight" | "xframe";
  cabinet: boolean;
};

export const DESK_STYLES: Record<string, DeskStyle> = {
  "desk-oak": { top: "#c89b6a", edge: "#a97a4b", leg: "#3a3a3a", dTop: "#4a3226", dEdge: "#2e1d12", dLeg: "#101014", x: 180, w: 290, thick: 18, legs: "straight", cabinet: false },
  "desk-white": { top: "#f1f2f4", edge: "#c9ced6", leg: "#e2e5ea", dTop: "#23252c", dEdge: "#101216", dLeg: "#3a3d47", x: 180, w: 290, thick: 18, legs: "straight", cabinet: true },
  "desk-walnut": { top: "#6f4e37", edge: "#4e3423", leg: "#1e1b16", dTop: "#2e1f14", dEdge: "#1a100a", dLeg: "#0c0c10", x: 170, w: 310, thick: 22, legs: "straight", cabinet: true },
  "desk-compact": { top: "#ecd9b0", edge: "#c9ab7c", leg: "#8a7a5f", dTop: "#3a352f", dEdge: "#211e1a", dLeg: "#6b6259", x: 180, w: 290, thick: 12, legs: "xframe", cabinet: false },
};

const SHORT: Record<string, string> = {
  "desk-oak": "Oak",
  "desk-white": "Standing",
  "desk-walnut": "Walnut",
  "desk-compact": "Compact",
  "chair-ergo": "Ergo",
  "chair-lounge": "Lounge",
  "chair-wood": "Wood",
  "chair-gaming": "Racer",
};

const StudioCanvas = dynamic(() => import("./studio3d/StudioCanvas"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full animate-pulse items-center justify-center text-sm text-muted">
      Loading 3D studio…
    </div>
  ),
});

export default function WorkspacePreview({ state, theme }: { state: WorkspaceState; theme: Theme }) {
  const dark = theme === "dark";
  const has = (id: string) => state.accessories.includes(id);

  const chips = [
    { label: `Desk: ${SHORT[state.desk] ?? state.desk}`, on: true },
    { label: `Chair: ${SHORT[state.chair] ?? state.chair}`, on: true },
    { label: `Monitor ${has("monitor") ? "✓" : "·"}`, on: has("monitor") },
    { label: `Side Mon ${has("monitor-side") ? "✓" : "·"}`, on: has("monitor-side") },
    { label: `Top Mon ${has("monitor-top") ? "✓" : "·"}`, on: has("monitor-top") },
    { label: `Laptop ${has("laptop") ? "✓" : "·"}`, on: has("laptop") },
    { label: `Lamp ${has("lamp") ? "✓" : "·"}`, on: has("lamp") },
    { label: `Plant ${has("plant") ? "✓" : "·"}`, on: has("plant") },
    { label: `Headphones ${has("headphones") ? "✓" : "·"}`, on: has("headphones") },
    { label: `Speaker ${has("speaker") ? "✓" : "·"}`, on: has("speaker") },
    { label: `Mug ${has("extra-mug") ? "✓" : "·"}`, on: has("extra-mug") },
    { label: `Crate ${has("extra-crate") ? "✓" : "·"}`, on: has("extra-crate") },
    { label: `Pouf ${has("extra-pouf") ? "✓" : "·"}`, on: has("extra-pouf") },
    { label: `Toolbox ${has("extra-toolbox") ? "✓" : "·"}`, on: has("extra-toolbox") },
  ];

  return (
    <section
      aria-label="Workspace preview"
      data-testid="workspace-preview"
      className="flex min-h-[560px] flex-col rounded-2xl border border-line bg-surface p-4"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="m-0 text-xl font-bold">Your workspace</h2>
          <p data-testid="preview-label" className="mt-1 text-sm text-muted">
            {getProduct(state.desk)?.name} + {getProduct(state.chair)?.name}
            {state.accessories.length > 0
              ? ` + ${state.accessories.map((a) => getProduct(a)?.name).join(", ")}`
              : " · no accessories yet"}
          </p>
        </div>
        <span className="rounded-full border border-[#bfe6c8] bg-[#e8f7ec] px-2.5 py-1.5 text-xs font-bold whitespace-nowrap text-[#1f7a34]">
          Live 3D preview · drag for 360° · scroll to zoom
        </span>
      </div>

      <div
        role="img"
        aria-label="Visual workspace preview"
        className={`mt-3 h-[480px] overflow-hidden rounded-xl border border-line lg:h-[540px] ${dark ? "bg-[#08070c]" : "bg-[#f5efe6]"}`}
      >
        <StudioCanvas state={state} theme={theme} />
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {chips.map((c) => (
          <span
            key={c.label}
            className={`rounded-full border px-2.5 py-1.5 text-[13px] ${
              c.on
                ? "border-ink bg-ink text-white dark:border-accent dark:bg-accent"
                : "border-line bg-soft text-muted"
            }`}
          >
            {c.label}
          </span>
        ))}
      </div>
    </section>
  );
}
