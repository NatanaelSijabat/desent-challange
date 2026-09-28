export const RGB = {
  purple: "#a855f7",
  blue: "#3b82f6",
  pink: "#ec4899",
  cyan: "#22d3ee",
} as const;

export type RoomPalette = ReturnType<typeof roomPalette>;

export function roomPalette(dark: boolean) {
  return dark
    ? {
        wall: "#14131a",
        floor: "#1d1d22",
        base: "#0c0b10",
        glass: "#0b1026",
        frame: "#2b2836",
        shelf: "#4a3423",
        boxA: "#2c4a66",
        boxB: "#6e3f46",
        rug: "#262033",
        rugEdge: "#4a3f5e",
        pot: "#3a2a24",
        leaf1: "#1f4a30",
        leaf2: "#2a5f3f",
        leaf3: "#173a25",
        mat: "#2a2433",
        metal: "#3a3d47",
        screen: "#0e2a4a",
        screenTop: "#1d4e89",
        screenGlow: 1.15,
        frame3d: "#1f2430",
        stand: "#3a4150",
      }
    : {
        wall: "#f5efe6",
        floor: "#e7d9c6",
        base: "#d5c3ab",
        glass: "#dceeff",
        frame: "#ffffff",
        shelf: "#b99a76",
        boxA: "#7fb3d5",
        boxB: "#e5989b",
        rug: "#efe3d2",
        rugEdge: "#d9c6ac",
        pot: "#c96f4a",
        leaf1: "#4e9b5e",
        leaf2: "#63b374",
        leaf3: "#3c7d4b",
        mat: "#7d8b74",
        metal: "#3a3a3a",
        screen: "#8fd0ff",
        screenTop: "#cdeaff",
        screenGlow: 0.35,
        frame3d: "#1f2430",
        stand: "#3a4150",
      };
}

export function loungePalette(dark: boolean) {
  return dark
    ? { back: "#4a3f33", edge: "#6b5a44", cush: "#5a4c3d", seat: "#6b5a44", leg: "#2c2620" }
    : { back: "#e8dcc8", edge: "#c9b896", cush: "#f4ecdd", seat: "#c9b896", leg: "#8a7a5f" };
}

export function woodPalette(dark: boolean) {
  return dark
    ? { post: "#5a3a20", slat: "#8f6238", seat: "#6e4a28" }
    : { post: "#8a5a33", slat: "#c89b6a", seat: "#a97a4b" };
}

export function lampPalette(dark: boolean) {
  return dark
    ? { body: "#23252c", shade: "#67e8f9", cone: "#a5e3ff", coneOp: 0.22, light: "#a5e3ff", intensity: 3 }
    : { body: "#3a3a3a", shade: "#f4b942", cone: "#ffe9a8", coneOp: 0.35, light: "#ffd9a0", intensity: 2.5 };
}
