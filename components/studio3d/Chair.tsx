import { RoundedBox } from "@react-three/drei";
import { loungePalette, woodPalette } from "./theme";

const ERGO = { shell: "#2b2f36", cushion: "#3d434d", metal: "#555b66" };
const RACING = { shell: "#1f2430", trim: "#e4572e", metal: "#555b66" };

/** Procedural chair, placed at z=+1.35 facing the desk (-z). */
export default function Chair({ chairKey, dark }: { chairKey: string; dark: boolean }) {
  return (
    <group position={[0, 0, 1.35]}>
      {chairKey === "chair-ergo" && (
        <group>
          <RoundedBox args={[0.62, 0.09, 0.6]} radius={0.04} smoothness={4} position={[0, 0.55, 0]}>
            <meshStandardMaterial color={ERGO.shell} roughness={0.7} />
          </RoundedBox>
          <RoundedBox args={[0.6, 0.72, 0.1]} radius={0.05} smoothness={4} position={[0, 1.02, 0.3]} rotation-x={0.1}>
            <meshStandardMaterial color={ERGO.shell} roughness={0.7} />
          </RoundedBox>
          <RoundedBox args={[0.44, 0.34, 0.04]} radius={0.03} smoothness={4} position={[0, 1.0, 0.24]}>
            <meshStandardMaterial color={ERGO.cushion} roughness={0.8} />
          </RoundedBox>
          <mesh position={[0, 0.3, 0]}>
            <cylinderGeometry args={[0.045, 0.045, 0.5, 12]} />
            <meshStandardMaterial color={ERGO.metal} roughness={0.4} metalness={0.6} />
          </mesh>
          <mesh position={[0, 0.05, 0]}>
            <cylinderGeometry args={[0.3, 0.32, 0.06, 20]} />
            <meshStandardMaterial color={ERGO.metal} roughness={0.4} metalness={0.6} />
          </mesh>
        </group>
      )}

      {chairKey === "chair-lounge" && (
        <group>
          {(() => {
            const L = loungePalette(dark);
            return (
              <>
                <RoundedBox args={[0.7, 0.12, 0.65]} radius={0.05} smoothness={4} position={[0, 0.42, 0]}>
                  <meshStandardMaterial color={L.seat} roughness={0.85} />
                </RoundedBox>
                <RoundedBox args={[0.68, 0.58, 0.12]} radius={0.06} smoothness={4} position={[0, 0.82, 0.36]} rotation-x={0.28}>
                  <meshStandardMaterial color={L.back} roughness={0.85} />
                </RoundedBox>
                <RoundedBox args={[0.52, 0.3, 0.05]} radius={0.03} smoothness={4} position={[0, 0.78, 0.28]} rotation-x={0.28}>
                  <meshStandardMaterial color={L.cush} roughness={0.9} />
                </RoundedBox>
                {[-0.28, 0.28].map((x) =>
                  [-0.24, 0.24].map((z) => (
                    <mesh key={`${x}${z}`} position={[x, 0.18, z]}>
                      <boxGeometry args={[0.07, 0.36, 0.07]} />
                      <meshStandardMaterial color={L.leg} roughness={0.7} />
                    </mesh>
                  )),
                )}
              </>
            );
          })()}
        </group>
      )}

      {chairKey === "chair-wood" && (
        <group>
          {(() => {
            const W = woodPalette(dark);
            return (
              <>
                <mesh position={[0, 0.5, 0]}>
                  <boxGeometry args={[0.55, 0.07, 0.55]} />
                  <meshStandardMaterial color={W.seat} roughness={0.7} />
                </mesh>
                {[-0.22, 0.22].map((x) => (
                  <mesh key={x} position={[x, 0.85, 0.26]}>
                    <boxGeometry args={[0.06, 0.72, 0.06]} />
                    <meshStandardMaterial color={W.post} roughness={0.7} />
                  </mesh>
                ))}
                {[0.68, 0.9, 1.12].map((y) => (
                  <mesh key={y} position={[0, y, 0.26]}>
                    <boxGeometry args={[0.5, 0.1, 0.04]} />
                    <meshStandardMaterial color={W.slat} roughness={0.7} />
                  </mesh>
                ))}
                {[-0.22, 0.22].map((x) =>
                  [-0.22, 0.22].map((z) => (
                    <mesh key={`${x}${z}`} position={[x, 0.24, z]}>
                      <boxGeometry args={[0.06, 0.48, 0.06]} />
                      <meshStandardMaterial color={W.post} roughness={0.7} />
                    </mesh>
                  )),
                )}
              </>
            );
          })()}
        </group>
      )}

      {chairKey === "chair-gaming" && (
        <group>
          <RoundedBox args={[0.62, 0.12, 0.6]} radius={0.05} smoothness={4} position={[0, 0.55, 0]}>
            <meshStandardMaterial color={RACING.shell} roughness={0.6} />
          </RoundedBox>
          <mesh position={[0, 0.56, 0.28]}>
            <boxGeometry args={[0.6, 0.03, 0.06]} />
            <meshStandardMaterial color={RACING.trim} roughness={0.5} />
          </mesh>
          <RoundedBox args={[0.62, 1.0, 0.12]} radius={0.06} smoothness={4} position={[0, 1.15, 0.28]} rotation-x={0.08}>
            <meshStandardMaterial color={RACING.shell} roughness={0.6} />
          </RoundedBox>
          {[-0.24, 0.24].map((x) => (
            <RoundedBox key={x} args={[0.12, 0.85, 0.1]} radius={0.05} smoothness={4} position={[x, 1.12, 0.2]} rotation-x={0.08}>
              <meshStandardMaterial color={RACING.trim} roughness={0.55} />
            </RoundedBox>
          ))}
          <RoundedBox args={[0.34, 0.18, 0.1]} radius={0.05} smoothness={4} position={[0, 1.52, 0.22]}>
            <meshStandardMaterial color={RACING.trim} roughness={0.55} />
          </RoundedBox>
          <mesh position={[0, 0.3, 0]}>
            <cylinderGeometry args={[0.045, 0.045, 0.5, 12]} />
            <meshStandardMaterial color={RACING.metal} roughness={0.4} metalness={0.6} />
          </mesh>
          <mesh position={[0, 0.05, 0]}>
            <cylinderGeometry args={[0.32, 0.34, 0.06, 20]} />
            <meshStandardMaterial color={RACING.metal} roughness={0.4} metalness={0.6} />
          </mesh>
        </group>
      )}
    </group>
  );
}
