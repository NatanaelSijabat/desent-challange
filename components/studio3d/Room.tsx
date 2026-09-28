import { ContactShadows } from "@react-three/drei";
import { RGB, roomPalette } from "./theme";

export const WALL_Z = -2.6;

/** Static room: floor, rug, back wall, night/day window, shelf + deco boxes. */
export default function Room({ dark }: { dark: boolean }) {
  const R = roomPalette(dark);
  return (
    <group>
      {/* floor + baseboard */}
      <mesh rotation-x={-Math.PI / 2} position={[0, 0, 1]}>
        <planeGeometry args={[16, 12]} />
        <meshStandardMaterial color={R.floor} roughness={0.95} />
      </mesh>
      <mesh position={[0, 0.09, WALL_Z + 0.03]}>
        <boxGeometry args={[16, 0.18, 0.06]} />
        <meshStandardMaterial color={R.base} roughness={0.9} />
      </mesh>
      {/* back wall */}
      <mesh position={[0, 2.5, WALL_Z]}>
        <planeGeometry args={[16, 5]} />
        <meshStandardMaterial color={R.wall} roughness={1} />
      </mesh>

      {/* rug */}
      <mesh rotation-x={-Math.PI / 2} position={[0, 0.012, 1.2]}>
        <circleGeometry args={[2.15, 48]} />
        <meshStandardMaterial color={R.rug} roughness={1} />
      </mesh>
      <mesh rotation-x={-Math.PI / 2} position={[0, 0.014, 1.2]}>
        <ringGeometry args={[2.0, 2.15, 48]} />
        <meshStandardMaterial color={R.rugEdge} roughness={1} />
      </mesh>

      {/* window */}
      <group position={[-2.55, 2.1, WALL_Z + 0.03]}>
        <mesh>
          <boxGeometry args={[1.9, 1.7, 0.1]} />
          <meshStandardMaterial color={R.frame} roughness={0.6} />
        </mesh>
        <mesh position={[0, 0, 0.06]}>
          <planeGeometry args={[1.6, 1.4]} />
          <meshStandardMaterial
            color={R.glass}
            emissive={dark ? "#16224d" : "#bfe0ff"}
            emissiveIntensity={dark ? 0.7 : 0.25}
            roughness={0.2}
          />
        </mesh>
        <mesh position={[0, 0, 0.07]}>
          <boxGeometry args={[0.06, 1.4, 0.02]} />
          <meshStandardMaterial color={R.frame} roughness={0.6} />
        </mesh>
        {dark && (
          <group>
            {[
              [-0.55, 0.35, "#ffd97a"],
              [-0.3, 0.1, "#7ab8ff"],
              [0.15, 0.42, "#ffd97a"],
              [0.5, 0.05, "#7ab8ff"],
              [-0.45, -0.3, "#ffd97a"],
              [0.35, -0.35, "#7ab8ff"],
            ].map(([x, y, c], i) => (
              <mesh key={i} position={[x as number, y as number, 0.09]}>
                <sphereGeometry args={[0.028, 8, 8]} />
                <meshStandardMaterial color={c as string} emissive={c as string} emissiveIntensity={1.5} />
              </mesh>
            ))}
          </group>
        )}
      </group>

      {/* shelf + deco boxes (speaker itself lives in Props, toggled) */}
      <group position={[2.35, 2.55, WALL_Z + 0.12]}>
        <mesh>
          <boxGeometry args={[1.9, 0.08, 0.32]} />
          <meshStandardMaterial color={R.shelf} roughness={0.8} />
        </mesh>
        <mesh position={[-0.55, 0.2, 0]}>
          <boxGeometry args={[0.26, 0.32, 0.24]} />
          <meshStandardMaterial color={R.boxA} roughness={0.7} />
        </mesh>
        <mesh position={[-0.15, 0.22, 0]}>
          <boxGeometry args={[0.26, 0.36, 0.24]} />
          <meshStandardMaterial color={R.boxB} roughness={0.7} />
        </mesh>
      </group>

      <ContactShadows
        position={[0, 0.02, 0.9]}
        scale={13}
        blur={2.2}
        opacity={dark ? 0.82 : 0.42}
        far={4.5}
        resolution={512}
        color="#000000"
        frames={Infinity}
      />
      {dark && <fog attach="fog" args={["#0c0b10", 11, 24]} />}
    </group>
  );
}

export { RGB };
