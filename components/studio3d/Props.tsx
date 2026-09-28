import { RoundedBox } from "@react-three/drei";
import { DESK_SURFACE_Y } from "./Desk";
import { WALL_Z } from "./Room";
import { RGB, lampPalette, roomPalette } from "./theme";

const Y = DESK_SURFACE_Y;
const KEYS = ["#f87171", "#fb923c", "#facc15", "#4ade80", "#22d3ee", "#818cf8", "#e879f9"];

function Keyboard({ dark }: { dark: boolean }) {
  return (
    <group position={[0, 0, 0.3]} data-testid="scene-keyboard-rgb">
      <RoundedBox args={[0.55, 0.035, 0.2]} radius={0.01} smoothness={4} position={[0, Y + 0.03, 0]}>
        <meshStandardMaterial color={dark ? "#0c0c12" : "#2b2f36"} roughness={0.6} />
      </RoundedBox>
      {KEYS.map((c, i) => (
        <mesh key={c} position={[-0.21 + i * 0.07, Y + 0.052, 0]}>
          <boxGeometry args={[0.055, 0.018, 0.12]} />
          <meshStandardMaterial
            color={dark ? c : "#9aa0aa"}
            emissive={dark ? c : "#000000"}
            emissiveIntensity={dark ? 1.6 : 0}
            roughness={0.5}
          />
        </mesh>
      ))}
      {/* desk mat */}
      <mesh position={[0, Y + 0.006, 0]}>
        <boxGeometry args={[1.05, 0.012, 0.42]} />
        <meshStandardMaterial color={roomPalette(dark).mat} roughness={1} />
      </mesh>
    </group>
  );
}

function Lamp({ dark }: { dark: boolean }) {
  const L = lampPalette(dark);
  return (
    <group position={[0.5, 0, 0.1]}>
      <mesh position={[0, Y + 0.02, 0]}>
        <cylinderGeometry args={[0.1, 0.11, 0.04, 20]} />
        <meshStandardMaterial color={L.body} roughness={0.5} metalness={0.4} />
      </mesh>
      <mesh position={[0, Y + 0.36, -0.08]}>
        <cylinderGeometry args={[0.028, 0.028, 0.72, 12]} />
        <meshStandardMaterial color={L.body} roughness={0.5} metalness={0.4} />
      </mesh>
      <mesh position={[0.17, Y + 0.78, -0.2]} rotation-z={-0.62} rotation-x={0.25}>
        <cylinderGeometry args={[0.024, 0.024, 0.5, 12]} />
        <meshStandardMaterial color={L.body} roughness={0.5} metalness={0.4} />
      </mesh>
      <mesh position={[0.38, Y + 0.94, -0.27]} rotation-z={-0.5}>
        <cylinderGeometry args={[0.055, 0.11, 0.15, 20, 1, true]} />
        <meshStandardMaterial color={L.shade} emissive={L.shade} emissiveIntensity={dark ? 1.0 : 0.25} side={2} roughness={0.4} />
      </mesh>
      <pointLight position={[0.38, Y + 0.82, -0.2]} color={L.light} intensity={L.intensity} distance={3.5} decay={2} />
      <mesh position={[0.28, Y + 0.45, -0.1]}>
        <coneGeometry args={[0.34, 0.85, 24, 1, true]} />
        <meshBasicMaterial color={L.cone} transparent opacity={L.coneOp} depthWrite={false} side={2} />
      </mesh>
    </group>
  );
}

function Plant({ dark }: { dark: boolean }) {
  const R = roomPalette(dark);
  return (
    <group position={[-1.85, 0, 0.7]}>
      <mesh position={[0, 0.19, 0]}>
        <cylinderGeometry args={[0.2, 0.24, 0.38, 20]} />
        <meshStandardMaterial color={R.pot} roughness={0.8} />
      </mesh>
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.03, 0.045, 0.32, 10]} />
        <meshStandardMaterial color={dark ? "#3a2a1c" : "#8a5a33"} roughness={0.9} />
      </mesh>
      <mesh position={[-0.13, 0.82, 0]}>
        <icosahedronGeometry args={[0.32, 1]} />
        <meshStandardMaterial color={R.leaf1} roughness={0.9} flatShading />
      </mesh>
      <mesh position={[0.18, 0.68, 0.1]}>
        <icosahedronGeometry args={[0.26, 1]} />
        <meshStandardMaterial color={R.leaf2} roughness={0.9} flatShading />
      </mesh>
      <mesh position={[0.02, 1.04, -0.1]}>
        <icosahedronGeometry args={[0.24, 1]} />
        <meshStandardMaterial color={R.leaf3} roughness={0.9} flatShading />
      </mesh>
      <mesh position={[0.12, 0.88, 0.16]}>
        <icosahedronGeometry args={[0.17, 1]} />
        <meshStandardMaterial color={R.leaf2} roughness={0.9} flatShading />
      </mesh>
    </group>
  );
}

function Headphones({ dark }: { dark: boolean }) {
  const band = dark ? "#7c3aed" : "#2b2f36";
  const cup = dark ? "#1c1c24" : "#2b2f36";
  return (
    <group position={[2.15, 1.82, WALL_Z + 0.1]}>
      <mesh position={[0, 0.12, -0.03]}>
        <boxGeometry args={[0.14, 0.2, 0.05]} />
        <meshStandardMaterial color={roomPalette(dark).metal} roughness={0.5} metalness={0.4} />
      </mesh>
      <mesh position={[0, 0, 0.04]}>
        <torusGeometry args={[0.11, 0.022, 10, 20, Math.PI]} />
        <meshStandardMaterial color={band} emissive={dark ? band : "#000000"} emissiveIntensity={dark ? 0.5 : 0} roughness={0.5} />
      </mesh>
      {[-0.11, 0.11].map((x) => (
        <RoundedBox key={x} args={[0.07, 0.15, 0.09]} radius={0.03} smoothness={4} position={[x, -0.05, 0.04]}>
          <meshStandardMaterial color={cup} roughness={0.6} />
        </RoundedBox>
      ))}
    </group>
  );
}

function Speaker({ dark }: { dark: boolean }) {
  return (
    <group position={[2.85, 2.74, WALL_Z + 0.12]}>
      <RoundedBox args={[0.34, 0.3, 0.24]} radius={0.03} smoothness={4}>
        <meshStandardMaterial color="#262b35" roughness={0.6} />
      </RoundedBox>
      {[0.07, -0.07].map((y) => (
        <mesh key={y} position={[0, y, 0.125]} rotation-x={Math.PI / 2}>
          <cylinderGeometry args={[0.055, 0.055, 0.02, 20]} />
          <meshStandardMaterial color="#454c5c" roughness={0.5} />
        </mesh>
      ))}
      {dark && (
        <mesh position={[0.1, 0.11, 0.125]}>
          <sphereGeometry args={[0.014, 8, 8]} />
          <meshStandardMaterial color={RGB.cyan} emissive={RGB.cyan} emissiveIntensity={2} />
        </mesh>
      )}
    </group>
  );
}

function Mug({ dark }: { dark: boolean }) {
  const glaze = dark ? "#7c3aed" : "#c96f4a";
  return (
    <group position={[-0.55, 0, 0.3]} data-testid="scene-extra-mug">
      <mesh position={[0, Y + 0.05, 0]}>
        <cylinderGeometry args={[0.045, 0.04, 0.1, 16]} />
        <meshStandardMaterial color={glaze} roughness={0.4} />
      </mesh>
      <mesh position={[0, Y + 0.098, 0]}>
        <cylinderGeometry args={[0.038, 0.038, 0.008, 16]} />
        <meshStandardMaterial color={dark ? "#2a1a12" : "#4a2c17"} roughness={0.6} />
      </mesh>
      <mesh position={[0.055, Y + 0.05, 0]} rotation-z={-Math.PI / 2}>
        <torusGeometry args={[0.028, 0.01, 8, 16, Math.PI]} />
        <meshStandardMaterial color={glaze} roughness={0.4} />
      </mesh>
    </group>
  );
}

function Crate({ dark }: { dark: boolean }) {
  const wood = dark ? "#4a3a28" : "#a97a4b";
  return (
    <group position={[2.05, 0, 1.4]} data-testid="scene-extra-crate">
      <mesh position={[0, 0.225, 0]}>
        <boxGeometry args={[0.45, 0.45, 0.45]} />
        <meshStandardMaterial color={wood} roughness={0.85} />
      </mesh>
      <mesh position={[0, 0.47, 0]}>
        <boxGeometry args={[0.47, 0.06, 0.47]} />
        <meshStandardMaterial color={dark ? "#3a2c1e" : "#8a5f36"} roughness={0.85} />
      </mesh>
    </group>
  );
}

function Pouf({ dark }: { dark: boolean }) {
  const fabric = dark ? "#3b3350" : "#e8dcc8";
  return (
    <group position={[-1.15, 0, 1.75]} data-testid="scene-extra-pouf">
      <mesh position={[0, 0.15, 0]}>
        <cylinderGeometry args={[0.3, 0.34, 0.3, 20]} />
        <meshStandardMaterial color={fabric} roughness={0.95} />
      </mesh>
      <mesh position={[0, 0.32, 0]}>
        <cylinderGeometry args={[0.24, 0.29, 0.08, 20]} />
        <meshStandardMaterial color={dark ? "#463d63" : "#f4ecdd"} roughness={0.95} />
      </mesh>
    </group>
  );
}

function Toolbox({ dark }: { dark: boolean }) {
  const red = dark ? "#7b241c" : "#c0392b";
  return (
    <group position={[1.55, 0, 2.3]} data-testid="scene-extra-toolbox">
      <RoundedBox args={[0.5, 0.24, 0.24]} radius={0.02} smoothness={4} position={[0, 0.12, 0]}>
        <meshStandardMaterial color={red} roughness={0.5} metalness={0.3} />
      </RoundedBox>
      <mesh position={[0, 0.26, 0]}>
        <boxGeometry args={[0.52, 0.05, 0.26]} />
        <meshStandardMaterial color={dark ? "#5e1c15" : "#a93226"} roughness={0.5} metalness={0.3} />
      </mesh>
      <mesh position={[0, 0.32, 0]}>
        <torusGeometry args={[0.08, 0.016, 8, 16, Math.PI]} />
        <meshStandardMaterial color="#555b66" roughness={0.4} metalness={0.7} />
      </mesh>
    </group>
  );
}

export default function Props({
  has,
  extras,
  dark,
}: {
  has: (id: string) => boolean;
  extras: string[];
  dark: boolean;
}) {
  return (
    <group>
      <Keyboard dark={dark} />
      {has("lamp") && <Lamp dark={dark} />}
      {has("plant") && <Plant dark={dark} />}
      {has("headphones") && <Headphones dark={dark} />}
      {has("speaker") && <Speaker dark={dark} />}
      {extras.includes("extra-mug") && <Mug dark={dark} />}
      {extras.includes("extra-crate") && <Crate dark={dark} />}
      {extras.includes("extra-pouf") && <Pouf dark={dark} />}
      {extras.includes("extra-toolbox") && <Toolbox dark={dark} />}
    </group>
  );
}
