import { RoundedBox } from "@react-three/drei";
import { DESK_SURFACE_Y } from "./Desk";
import { RGB, roomPalette } from "./theme";

const Y = DESK_SURFACE_Y;

function ScreenFace({
  w,
  h,
  screen,
  screenTop,
  glow,
}: {
  w: number;
  h: number;
  screen: string;
  screenTop: string;
  glow: number;
}) {
  return (
    <group>
      <mesh position={[0, 0, 0.001]}>
        <planeGeometry args={[w, h]} />
        <meshStandardMaterial color={screen} emissive={screen} emissiveIntensity={glow} roughness={0.25} />
      </mesh>
      <mesh position={[0, h / 2 - 0.05, 0.002]}>
        <planeGeometry args={[w, 0.09]} />
        <meshStandardMaterial color={screenTop} emissive={screenTop} emissiveIntensity={glow + 0.3} roughness={0.25} />
      </mesh>
    </group>
  );
}

function MonitorUnit({
  position,
  size,
  dark,
  haloColor,
}: {
  position: [number, number, number];
  size: number; // screen width in meters
  dark: boolean;
  haloColor: string;
}) {
  const R = roomPalette(dark);
  const h = size * 0.59;
  const standH = position[1] - Y - h / 2;
  return (
    <group position={position}>
      {dark && <pointLight position={[0, 0.1, -0.55]} color={haloColor} intensity={3} distance={4.5} decay={2} />}
      {/* stand */}
      <mesh position={[0, -h / 2 - standH / 2 + 0.02, -0.03]}>
        <boxGeometry args={[0.08, standH, 0.06]} />
        <meshStandardMaterial color={R.stand} roughness={0.5} metalness={0.4} />
      </mesh>
      <mesh position={[0, -h / 2 - standH + 0.015, 0.02]}>
        <boxGeometry args={[size * 0.42, 0.03, 0.24]} />
        <meshStandardMaterial color={R.stand} roughness={0.5} metalness={0.4} />
      </mesh>
      {/* frame + display */}
      <RoundedBox args={[size, h, 0.06]} radius={0.015} smoothness={4}>
        <meshStandardMaterial color={R.frame3d} roughness={0.5} />
      </RoundedBox>
      <group position={[0, 0, 0.032]}>
        <ScreenFace w={size - 0.1} h={h - 0.1} screen={R.screen} screenTop={R.screenTop} glow={R.screenGlow} />
      </group>
    </group>
  );
}

export default function Screens({ has, dark }: { has: (id: string) => boolean; dark: boolean }) {
  return (
    <group>
      {has("monitor-top") && (
        <group>
          <mesh position={[0, 2.12, -0.38]}>
            <boxGeometry args={[0.07, 0.5, 0.07]} />
            <meshStandardMaterial color={roomPalette(dark).stand} roughness={0.5} metalness={0.4} />
          </mesh>
          <MonitorUnit position={[0, 2.44, -0.36]} size={0.9} dark={dark} haloColor={RGB.blue} />
        </group>
      )}
      {has("monitor") && (
        <MonitorUnit position={[0, 1.62, -0.3]} size={1.15} dark={dark} haloColor={RGB.purple} />
      )}
      {has("monitor-side") && (
        <MonitorUnit position={[1.06, 1.5, -0.28]} size={0.72} dark={dark} haloColor={RGB.pink} />
      )}
      {has("laptop") && (
        <group position={[-0.95, 0, 0.02]}>
          {dark && <pointLight position={[0, 1.35, 0.25]} color={RGB.blue} intensity={1.5} distance={2.5} decay={2} />}
          <RoundedBox args={[0.62, 0.03, 0.42]} radius={0.01} smoothness={4} position={[0, Y + 0.015, 0]}>
            <meshStandardMaterial color="#8f959f" roughness={0.4} metalness={0.6} />
          </RoundedBox>
          <group position={[0, Y + 0.22, -0.18]} rotation-x={-0.18}>
            <RoundedBox args={[0.62, 0.42, 0.03]} radius={0.01} smoothness={4}>
              <meshStandardMaterial color={roomPalette(dark).frame3d} roughness={0.5} />
            </RoundedBox>
            <group position={[0, 0, 0.017]}>
              <ScreenFace
                w={0.54}
                h={0.34}
                screen={roomPalette(dark).screen}
                screenTop={roomPalette(dark).screenTop}
                glow={roomPalette(dark).screenGlow}
              />
            </group>
          </group>
        </group>
      )}
    </group>
  );
}
