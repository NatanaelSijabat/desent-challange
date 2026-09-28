import { RoundedBox } from "@react-three/drei";
import { DESK_STYLES } from "../WorkspacePreview";
import { RGB } from "./theme";

export const DESK_SURFACE_Y = 1.0;
export const DESK_DEPTH = 1.05;

function RgbStrip({ width, y }: { width: number; y: number }) {
  const seg = (width - 0.3) / 3;
  const cx = [-seg, 0, seg];
  const colors = [RGB.purple, RGB.blue, RGB.pink];
  return (
    <group>
      {cx.map((x, i) => (
        <mesh key={i} position={[x, y, 0.44]}>
          <boxGeometry args={[seg - 0.03, 0.03, 0.03]} />
          <meshStandardMaterial color={colors[i]} emissive={colors[i]} emissiveIntensity={2.0} />
        </mesh>
      ))}
      <pointLight position={[-seg, y - 0.35, 0.9]} color={RGB.purple} intensity={4} distance={5.5} decay={2} />
      <pointLight position={[0, y - 0.35, 0.9]} color={RGB.blue} intensity={4} distance={5.5} decay={2} />
      <pointLight position={[seg, y - 0.35, 0.9]} color={RGB.pink} intensity={4} distance={5.5} decay={2} />
    </group>
  );
}

/** Procedural desk. Surface top always at y=1.0 so props sit consistently. */
export default function Desk({ deskKey, dark }: { deskKey: string; dark: boolean }) {
  const s = DESK_STYLES[deskKey] ?? DESK_STYLES["desk-oak"];
  const w = s.w / 100;
  const t = s.thick / 150;
  const topY = DESK_SURFACE_Y - t / 2;
  const h = DESK_SURFACE_Y - t; // leg height
  const finish = dark ? s.dTop : s.top;
  const edge = dark ? s.dEdge : s.edge;
  const legMat = dark ? s.dLeg : s.leg;

  return (
    <group>
      <RoundedBox args={[w, t, DESK_DEPTH]} radius={0.02} smoothness={4} position={[0, topY, 0]}>
        <meshStandardMaterial color={finish} roughness={dark ? 0.45 : 0.65} />
      </RoundedBox>

      {s.legs === "straight" ? (
        <>
          {[-1, 1].map((sx) =>
            [-1, 1].map((sz) => (
              <mesh
                key={`${sx}${sz}`}
                position={[(sx * (w / 2 - 0.12)), h / 2, sz * 0.42]}
              >
                <boxGeometry args={[0.09, h, 0.09]} />
                <meshStandardMaterial color={legMat} roughness={0.5} metalness={0.4} />
              </mesh>
            )),
          )}
        </>
      ) : (
        <>
          {[-1, 1].map((sx) => (
            <group key={sx} position={[sx * (w / 2 - 0.15), 0, 0]}>
              {[0.42, -0.42].map((rz, i) => (
                <mesh
                  key={i}
                  position={[0, h / 2, 0]}
                  rotation-x={rz}
                >
                  <boxGeometry args={[0.07, h * 1.12, 0.07]} />
                  <meshStandardMaterial color={legMat} roughness={0.6} />
                </mesh>
              ))}
            </group>
          ))}
        </>
      )}

      {s.cabinet && (
        <RoundedBox
          args={[0.6, 0.44, 0.8]}
          radius={0.02}
          smoothness={4}
          position={[w / 2 - 0.48, DESK_SURFACE_Y - t - 0.06 - 0.22, -0.05]}
        >
          <meshStandardMaterial color={dark ? "#1a1c22" : "#ffffff"} roughness={0.6} />
        </RoundedBox>
      )}
      {/* edge trim under top for definition */}
      <mesh position={[0, DESK_SURFACE_Y - t + 0.005, 0]}>
        <boxGeometry args={[w - 0.04, 0.015, DESK_DEPTH - 0.04]} />
        <meshStandardMaterial color={edge} roughness={0.7} />
      </mesh>

      {dark && <RgbStrip width={w} y={DESK_SURFACE_Y - t - 0.015} />}
    </group>
  );
}
