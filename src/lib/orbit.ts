import type { AreaId } from "@/lib/car-selector-data";

/**
 * Séquence « orbite » : la vidéo de plateau tournant découpée en images
 * (public/media/orbit). 122 images desktop (1600 px), 61 images mobile (960 px).
 * Le numéro d'image « logique » va toujours de 0 à FRAME_COUNT - 1.
 */
export const FRAME_COUNT = 122;

const base = () => (import.meta.env.BASE_URL || "/").replace(/\/$/, "");
export const mediaUrl = (p: string) => `${base()}/media/${p}`;

export const frameUrl = (i: number, mobile: boolean) =>
  mobile
    ? mediaUrl(`orbit/m/${String(Math.floor(i / 2)).padStart(3, "0")}.webp`)
    : mediaUrl(`orbit/d/${String(i).padStart(3, "0")}.webp`);

export type ViewId = "front" | "profile" | "rear";

/** Images clés : face avant, profil (avant à droite), arrière. */
export const VIEWS: Record<ViewId, { frame: number; label: string; key: string }> = {
  front: { frame: 0, label: "Avant", key: mediaUrl("orbit/key-000.webp") },
  profile: { frame: 42, label: "Profil", key: mediaUrl("orbit/key-042.webp") },
  rear: { frame: 90, label: "Arrière", key: mediaUrl("orbit/key-090.webp") },
};

type Pt = { x: number; y: number };

/** Chaque zone est montrée sous l'angle où elle se voit le mieux (coordonnées en % de l'image). */
export const ORBIT_AREAS: Record<AreaId, { view: ViewId; hotspot: Pt; focus: Pt & { scale: number } }> = {
  engine: { view: "front", hotspot: { x: 50, y: 46.5 }, focus: { x: 50, y: 50, scale: 1.9 } },
  battery: { view: "front", hotspot: { x: 41, y: 51 }, focus: { x: 45, y: 52, scale: 2.1 } },
  ac: { view: "front", hotspot: { x: 50, y: 39 }, focus: { x: 50, y: 45, scale: 1.8 } },
  "front-wheel": { view: "profile", hotspot: { x: 76, y: 61 }, focus: { x: 76, y: 59, scale: 2.3 } },
  "rear-wheel": { view: "profile", hotspot: { x: 25, y: 60 }, focus: { x: 25, y: 58, scale: 2.3 } },
  braking: { view: "profile", hotspot: { x: 73, y: 64 }, focus: { x: 75, y: 61, scale: 2.4 } },
  suspension: { view: "profile", hotspot: { x: 75.5, y: 50 }, focus: { x: 75, y: 56, scale: 2.1 } },
  transmission: { view: "profile", hotspot: { x: 55, y: 64 }, focus: { x: 60, y: 61, scale: 1.8 } },
  general: { view: "profile", hotspot: { x: 52, y: 50 }, focus: { x: 50, y: 52, scale: 1 } },
  exhaust: { view: "rear", hotspot: { x: 43, y: 62 }, focus: { x: 54, y: 60, scale: 2 } },
};

export const ORBIT_COMPONENTS: Record<string, Pt & { side: "l" | "r" }> = {
  // Moteur (avant)
  "engine-block": { x: 50, y: 47, side: "r" },
  oil: { x: 45.5, y: 49, side: "l" },
  timing: { x: 55, y: 49.5, side: "r" },
  cooling: { x: 50, y: 63, side: "r" },
  "battery-engine": { x: 41, y: 50, side: "l" },
  // Batterie (avant)
  "battery-unit": { x: 41, y: 50, side: "l" },
  alternator: { x: 56, y: 52, side: "r" },
  starter: { x: 46, y: 57, side: "l" },
  // Climatisation (avant)
  "ac-unit": { x: 50, y: 40, side: "r" },
  "cabin-filter": { x: 43.5, y: 42.5, side: "l" },
  compressor: { x: 50, y: 62, side: "r" },
  // Roue avant (profil)
  tyre: { x: 79.5, y: 55, side: "r" },
  rim: { x: 76, y: 62, side: "r" },
  "brake-pads": { x: 74, y: 58.5, side: "l" },
  "brake-disc": { x: 77.5, y: 65, side: "r" },
  caliper: { x: 73, y: 64.5, side: "l" },
  "shock-front": { x: 75.5, y: 50, side: "l" },
  // Roue arrière (profil)
  "rear-tyre": { x: 28.5, y: 55, side: "r" },
  "rear-rim": { x: 25, y: 61, side: "r" },
  "rear-disc": { x: 26.5, y: 64.5, side: "r" },
  handbrake: { x: 22, y: 65, side: "l" },
  "shock-rear": { x: 23.5, y: 50, side: "l" },
  // Freinage (profil)
  disc: { x: 77.5, y: 65, side: "r" },
  pads: { x: 74, y: 58.5, side: "l" },
  "caliper-b": { x: 73, y: 64.5, side: "l" },
  "brake-fluid": { x: 69, y: 47, side: "l" },
  // Suspension (profil)
  shock: { x: 75.5, y: 50, side: "l" },
  spring: { x: 77.5, y: 54, side: "r" },
  arm: { x: 72, y: 67, side: "l" },
  "air-susp": { x: 24, y: 50, side: "r" },
  // Transmission (profil)
  gearbox: { x: 63, y: 63, side: "r" },
  clutch: { x: 56, y: 64, side: "l" },
  driveshaft: { x: 70, y: 66, side: "r" },
  // Échappement (arrière)
  muffler: { x: 43, y: 62, side: "l" },
  dpf: { x: 54.5, y: 65, side: "r" },
  "exhaust-line": { x: 66, y: 62, side: "r" },
};

/** Visuel éditorial de chaque page service (recadrage de la séquence). */
export const serviceImage = (slug: string) => mediaUrl(`services/${slug}.webp`);
