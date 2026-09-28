import type { WorkspaceState } from "@/lib/data";
import { getProduct } from "@/lib/data";

export default function WorkspacePreview({ state }: { state: WorkspaceState }) {
  const hasMonitor = state.accessories.includes("monitor");
  const hasLamp = state.accessories.includes("lamp");
  const hasPlant = state.accessories.includes("plant");
  const isOak = state.desk === "desk-oak";
  const isErgo = state.chair === "chair-ergo";

  const deskTop = isOak ? "#c89b6a" : "#f1f2f4";
  const deskEdge = isOak ? "#a97a4b" : "#c9ced6";
  const deskLeg = isOak ? "#3a3a3a" : "#e2e5ea";

  const chips = [
    { label: `Desk: ${isOak ? "Oak" : "Standing"}`, on: true },
    { label: `Chair: ${isErgo ? "Ergo" : "Lounge"}`, on: true },
    { label: `Monitor ${hasMonitor ? "✓" : "·"}`, on: hasMonitor },
    { label: `Lamp ${hasLamp ? "✓" : "·"}`, on: hasLamp },
    { label: `Plant ${hasPlant ? "✓" : "·"}`, on: hasPlant },
  ];

  return (
    <section
      aria-label="Workspace preview"
      data-testid="workspace-preview"
      className="flex min-h-[560px] flex-col rounded-2xl border border-line bg-white p-4"
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
          Live preview
        </span>
      </div>

      <div
        role="img"
        aria-label="Visual workspace preview"
        className="mt-3 aspect-[640/420] overflow-hidden rounded-xl border border-line bg-[#f5efe6]"
      >
        <svg viewBox="0 0 640 420" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
          {/* wall + floor */}
          <rect x="0" y="0" width="640" height="290" fill="#f5efe6" />
          <rect x="0" y="290" width="640" height="130" fill="#e7d9c6" />
          <rect x="0" y="286" width="640" height="6" fill="#d5c3ab" />
          {/* window */}
          <rect x="52" y="46" width="120" height="130" rx="10" fill="#dceeff" stroke="#ffffff" strokeWidth="10" />
          <line x1="112" y1="46" x2="112" y2="176" stroke="#ffffff" strokeWidth="6" />
          {/* shelf */}
          <rect x="440" y="80" width="150" height="10" rx="4" fill="#b99a76" />
          <rect x="452" y="52" width="26" height="28" rx="3" fill="#7fb3d5" />
          <rect x="484" y="46" width="26" height="34" rx="3" fill="#e5989b" />
          {/* rug */}
          <ellipse cx="320" cy="372" rx="210" ry="34" fill="#efe3d2" stroke="#d9c6ac" strokeWidth="2" />

          {/* plant (left of desk) */}
          {hasPlant && (
            <g data-testid="scene-plant">
              <rect x="118" y="252" width="56" height="62" rx="8" fill="#c96f4a" />
              <rect x="118" y="252" width="56" height="14" rx="7" fill="#b25c3a" />
              <ellipse cx="146" cy="218" rx="34" ry="40" fill="#4e9b5e" />
              <ellipse cx="128" cy="205" rx="20" ry="26" fill="#63b374" />
              <ellipse cx="164" cy="205" rx="20" ry="26" fill="#3c7d4b" />
            </g>
          )}

          {/* chair behind desk */}
          {isErgo ? (
            <g data-testid="scene-chair-ergo">
              <rect x="300" y="196" width="86" height="92" rx="22" fill="#2b2f36" />
              <rect x="312" y="210" width="62" height="46" rx="12" fill="#3d434d" />
              <rect x="296" y="286" width="94" height="20" rx="10" fill="#2b2f36" />
              <rect x="338" y="304" width="10" height="52" fill="#555b66" />
              <ellipse cx="343" cy="364" rx="34" ry="8" fill="#555b66" />
            </g>
          ) : (
            <g data-testid="scene-chair-lounge">
              <rect x="298" y="216" width="92" height="76" rx="30" fill="#e8dcc8" stroke="#c9b896" strokeWidth="3" />
              <rect x="310" y="228" width="68" height="34" rx="14" fill="#f4ecdd" />
              <rect x="292" y="288" width="104" height="22" rx="11" fill="#c9b896" />
              <line x1="310" y1="310" x2="302" y2="356" stroke="#8a7a5f" strokeWidth="8" strokeLinecap="round" />
              <line x1="378" y1="310" x2="386" y2="356" stroke="#8a7a5f" strokeWidth="8" strokeLinecap="round" />
            </g>
          )}

          {/* desk */}
          <g data-testid={`scene-desk-${isOak ? "oak" : "white"}`}>
            <rect x="180" y="256" width="290" height="18" rx="6" fill={deskTop} stroke={deskEdge} strokeWidth="2" />
            <rect x="196" y="274" width="14" height="86" fill={deskLeg} stroke={deskEdge} strokeWidth="2" />
            <rect x="440" y="274" width="14" height="86" fill={deskLeg} stroke={deskEdge} strokeWidth="2" />
            {!isOak && <rect x="210" y="292" width="60" height="40" rx="4" fill="#ffffff" stroke="#c9ced6" strokeWidth="2" />}
          </g>

          {/* monitor on desk */}
          {hasMonitor && (
            <g data-testid="scene-monitor">
              <rect x="272" y="176" width="110" height="70" rx="8" fill="#1f2430" />
              <rect x="279" y="183" width="96" height="50" rx="4" fill="#8fd0ff" />
              <rect x="279" y="183" width="96" height="14" rx="4" fill="#cdeaff" />
              <rect x="318" y="246" width="18" height="12" fill="#3a4150" />
              <rect x="300" y="256" width="54" height="6" rx="3" fill="#3a4150" />
            </g>
          )}

          {/* lamp on desk */}
          {hasLamp && (
            <g data-testid="scene-lamp">
              <polygon points="398,256 452,190 470,190 410,256" fill="#ffe9a8" opacity="0.55" />
              <rect x="404" y="228" width="10" height="30" fill="#3a3a3a" />
              <rect x="390" y="252" width="38" height="8" rx="4" fill="#3a3a3a" />
              <line x1="409" y1="230" x2="452" y2="184" stroke="#3a3a3a" strokeWidth="8" strokeLinecap="round" />
              <polygon points="438,176 466,176 459,198 445,198" fill="#f4b942" />
            </g>
          )}

          {/* keyboard hint */}
          <rect x="286" y="259" width="80" height="8" rx="4" fill="#00000022" />
        </svg>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {chips.map((c) => (
          <span
            key={c.label}
            className={`rounded-full border px-2.5 py-1.5 text-[13px] ${
              c.on ? "border-ink bg-ink text-white" : "border-line bg-[#fbf9f5] text-muted"
            }`}
          >
            {c.label}
          </span>
        ))}
      </div>
    </section>
  );
}
