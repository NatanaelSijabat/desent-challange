import type { WorkspaceState } from "@/lib/data";
import { getProduct } from "@/lib/data";

type DeskStyle = {
  top: string;
  edge: string;
  leg: string;
  x: number;
  w: number;
  thick: number;
  legs: "straight" | "xframe";
  cabinet: boolean;
};

const DESK_STYLES: Record<string, DeskStyle> = {
  "desk-oak": { top: "#c89b6a", edge: "#a97a4b", leg: "#3a3a3a", x: 180, w: 290, thick: 18, legs: "straight", cabinet: false },
  "desk-white": { top: "#f1f2f4", edge: "#c9ced6", leg: "#e2e5ea", x: 180, w: 290, thick: 18, legs: "straight", cabinet: true },
  "desk-walnut": { top: "#6f4e37", edge: "#4e3423", leg: "#1e1b16", x: 170, w: 310, thick: 22, legs: "straight", cabinet: true },
  "desk-compact": { top: "#ecd9b0", edge: "#c9ab7c", leg: "#8a7a5f", x: 180, w: 290, thick: 12, legs: "xframe", cabinet: false },
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

export default function WorkspacePreview({ state }: { state: WorkspaceState }) {
  const has = (id: string) => state.accessories.includes(id);
  const d = DESK_STYLES[state.desk] ?? DESK_STYLES["desk-oak"];
  const legY = 256 + d.thick;
  const legH = 360 - legY;

  const chips = [
    { label: `Desk: ${SHORT[state.desk] ?? state.desk}`, on: true },
    { label: `Chair: ${SHORT[state.chair] ?? state.chair}`, on: true },
    { label: `Monitor ${has("monitor") ? "✓" : "·"}`, on: has("monitor") },
    { label: `Laptop ${has("laptop") ? "✓" : "·"}`, on: has("laptop") },
    { label: `Lamp ${has("lamp") ? "✓" : "·"}`, on: has("lamp") },
    { label: `Plant ${has("plant") ? "✓" : "·"}`, on: has("plant") },
    { label: `Headphones ${has("headphones") ? "✓" : "·"}`, on: has("headphones") },
    { label: `Speaker ${has("speaker") ? "✓" : "·"}`, on: has("speaker") },
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
          {/* speaker on shelf */}
          {has("speaker") && (
            <g data-testid="scene-speaker">
              <rect x="522" y="46" width="38" height="34" rx="6" fill="#262b35" />
              <circle cx="541" cy="57" r="6" fill="#454c5c" />
              <circle cx="541" cy="71" r="8" fill="#454c5c" />
            </g>
          )}
          {/* rug */}
          <ellipse cx="320" cy="372" rx="210" ry="34" fill="#efe3d2" stroke="#d9c6ac" strokeWidth="2" />

          {/* plant (left of desk) */}
          {has("plant") && (
            <g data-testid="scene-plant">
              <rect x="118" y="252" width="56" height="62" rx="8" fill="#c96f4a" />
              <rect x="118" y="252" width="56" height="14" rx="7" fill="#b25c3a" />
              <ellipse cx="146" cy="218" rx="34" ry="40" fill="#4e9b5e" />
              <ellipse cx="128" cy="205" rx="20" ry="26" fill="#63b374" />
              <ellipse cx="164" cy="205" rx="20" ry="26" fill="#3c7d4b" />
            </g>
          )}

          {/* chair behind desk */}
          {state.chair === "chair-ergo" && (
            <g data-testid="scene-chair-ergo">
              <rect x="300" y="196" width="86" height="92" rx="22" fill="#2b2f36" />
              <rect x="312" y="210" width="62" height="46" rx="12" fill="#3d434d" />
              <rect x="296" y="286" width="94" height="20" rx="10" fill="#2b2f36" />
              <rect x="338" y="304" width="10" height="52" fill="#555b66" />
              <ellipse cx="343" cy="364" rx="34" ry="8" fill="#555b66" />
            </g>
          )}
          {state.chair === "chair-lounge" && (
            <g data-testid="scene-chair-lounge">
              <rect x="298" y="216" width="92" height="76" rx="30" fill="#e8dcc8" stroke="#c9b896" strokeWidth="3" />
              <rect x="310" y="228" width="68" height="34" rx="14" fill="#f4ecdd" />
              <rect x="292" y="288" width="104" height="22" rx="11" fill="#c9b896" />
              <line x1="310" y1="310" x2="302" y2="356" stroke="#8a7a5f" strokeWidth="8" strokeLinecap="round" />
              <line x1="378" y1="310" x2="386" y2="356" stroke="#8a7a5f" strokeWidth="8" strokeLinecap="round" />
            </g>
          )}
          {state.chair === "chair-wood" && (
            <g data-testid="scene-chair-wood">
              <line x1="308" y1="190" x2="308" y2="270" stroke="#8a5a33" strokeWidth="9" strokeLinecap="round" />
              <line x1="376" y1="190" x2="376" y2="270" stroke="#8a5a33" strokeWidth="9" strokeLinecap="round" />
              <rect x="304" y="200" width="76" height="11" rx="5" fill="#c89b6a" />
              <rect x="304" y="222" width="76" height="11" rx="5" fill="#c89b6a" />
              <rect x="304" y="244" width="76" height="11" rx="5" fill="#c89b6a" />
              <rect x="294" y="268" width="96" height="17" rx="7" fill="#a97a4b" />
              <line x1="304" y1="285" x2="298" y2="358" stroke="#8a5a33" strokeWidth="8" strokeLinecap="round" />
              <line x1="380" y1="285" x2="386" y2="358" stroke="#8a5a33" strokeWidth="8" strokeLinecap="round" />
            </g>
          )}
          {state.chair === "chair-gaming" && (
            <g data-testid="scene-chair-gaming">
              <rect x="304" y="160" width="76" height="122" rx="24" fill="#1f2430" />
              <rect x="304" y="170" width="14" height="100" rx="7" fill="#e4572e" />
              <rect x="370" y="170" width="14" height="100" rx="7" fill="#e4572e" />
              <rect x="322" y="176" width="40" height="22" rx="9" fill="#e4572e" />
              <rect x="298" y="280" width="88" height="22" rx="11" fill="#1f2430" />
              <rect x="298" y="280" width="88" height="6" rx="3" fill="#e4572e" />
              <rect x="338" y="302" width="10" height="54" fill="#555b66" />
              <ellipse cx="343" cy="364" rx="36" ry="8" fill="#555b66" />
            </g>
          )}

          {/* desk */}
          <g data-testid={`scene-desk-${state.desk}`}>
            <rect x={d.x} y="256" width={d.w} height={d.thick} rx="6" fill={d.top} stroke={d.edge} strokeWidth="2" />
            {d.legs === "straight" ? (
              <>
                <rect x={d.x + 16} y={legY} width="14" height={legH} fill={d.leg} stroke={d.edge} strokeWidth="2" />
                <rect x={d.x + d.w - 30} y={legY} width="14" height={legH} fill={d.leg} stroke={d.edge} strokeWidth="2" />
              </>
            ) : (
              <>
                <line x1={d.x + 16} y1={legY} x2={d.x + 34} y2="360" stroke={d.leg} strokeWidth="7" strokeLinecap="round" />
                <line x1={d.x + 34} y1={legY} x2={d.x + 16} y2="360" stroke={d.leg} strokeWidth="7" strokeLinecap="round" />
                <line x1={d.x + d.w - 34} y1={legY} x2={d.x + d.w - 16} y2="360" stroke={d.leg} strokeWidth="7" strokeLinecap="round" />
                <line x1={d.x + d.w - 16} y1={legY} x2={d.x + d.w - 34} y2="360" stroke={d.leg} strokeWidth="7" strokeLinecap="round" />
              </>
            )}
            {d.cabinet && (
              <>
                <rect x={d.x + d.w - 78} y={legY + 16} width="60" height="44" rx="4" fill="#ffffff" stroke={d.edge} strokeWidth="2" />
                <line x1={d.x + d.w - 66} y1={legY + 38} x2={d.x + d.w - 30} y2={legY + 38} stroke={d.edge} strokeWidth="2" />
              </>
            )}
          </g>

          {/* desk mat */}
          <rect x="238" y="256" width="168" height="12" rx="6" fill="#7d8b74" opacity="0.9" />

          {/* laptop on desk left */}
          {has("laptop") && (
            <g data-testid="scene-laptop">
              <rect x="194" y="202" width="68" height="50" rx="6" fill="#1f2430" />
              <rect x="200" y="208" width="56" height="34" rx="3" fill="#9fd2ff" />
              <rect x="200" y="208" width="56" height="9" rx="3" fill="#cdeaff" />
              <rect x="190" y="250" width="76" height="9" rx="3" fill="#8f959f" />
            </g>
          )}

          {/* monitor on desk */}
          {has("monitor") && (
            <g data-testid="scene-monitor">
              <rect x="272" y="176" width="110" height="70" rx="8" fill="#1f2430" />
              <rect x="279" y="183" width="96" height="50" rx="4" fill="#8fd0ff" />
              <rect x="279" y="183" width="96" height="14" rx="4" fill="#cdeaff" />
              <rect x="318" y="246" width="18" height="12" fill="#3a4150" />
              <rect x="300" y="256" width="54" height="6" rx="3" fill="#3a4150" />
            </g>
          )}

          {/* headphones on stand, desk right */}
          {has("headphones") && (
            <g data-testid="scene-headphones">
              <ellipse cx="448" cy="257" rx="15" ry="4" fill="#3a3a3a" />
              <rect x="445" y="214" width="6" height="43" fill="#3a3a3a" />
              <path d="M432 226 Q432 204 448 204 Q464 204 464 226" stroke="#1f2430" strokeWidth="5" fill="none" strokeLinecap="round" />
              <rect x="426" y="222" width="12" height="19" rx="5" fill="#2b2f36" />
              <rect x="458" y="222" width="12" height="19" rx="5" fill="#2b2f36" />
            </g>
          )}

          {/* lamp on desk */}
          {has("lamp") && (
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
