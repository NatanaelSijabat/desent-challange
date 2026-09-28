"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import type { WorkspaceState } from "@/lib/data";
import type { Theme } from "../WorkspacePreview";
import Room from "./Room";
import Desk from "./Desk";
import Chair from "./Chair";
import Screens from "./Screens";
import Props from "./Props";

export default function StudioCanvas({ state, theme }: { state: WorkspaceState; theme: Theme }) {
  const dark = theme === "dark";
  const has = (id: string) => state.accessories.includes(id);

  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 2.6, 7.8], fov: 38 }}
      gl={{ antialias: true }}
      data-testid="workspace-3d"
    >
      <color attach="background" args={[dark ? "#0c0b10" : "#faf7f2"]} />
      <ambientLight intensity={dark ? 0.55 : 0.85} />
      <hemisphereLight
        args={[dark ? "#3b3660" : "#ffffff", dark ? "#0c0b10" : "#e7d9c6", dark ? 0.5 : 0.45]}
      />
      <directionalLight position={[4, 6, 5]} intensity={dark ? 0.75 : 1.35} />
      {dark && <pointLight position={[-3, 3, 4]} color="#7c3aed" intensity={2.5} distance={12} decay={2} />}
      {dark && (
        <>
          <pointLight position={[-3.4, 2.4, 2.2]} color="#ffb46b" intensity={1.8} distance={9} decay={2} />
          <pointLight position={[3.6, 2.1, 1.6]} color="#3b82f6" intensity={1.8} distance={9} decay={2} />
        </>
      )}

      <Room dark={dark} />
      <Desk deskKey={state.desk} dark={dark} />
      <Chair chairKey={state.chair} dark={dark} />
      <Screens has={has} dark={dark} />
      <Props has={has} extras={state.extras} dark={dark} />

      <OrbitControls
        makeDefault
        target={[0, 1.05, -0.3]}
        enablePan={false}
        enableZoom
        minDistance={5}
        maxDistance={12}
        minPolarAngle={0.95}
        maxPolarAngle={1.42}
        enableDamping={false}
      />
    </Canvas>
  );
}
