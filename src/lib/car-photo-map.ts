import type { AreaId } from "@/lib/car-selector-data";

/**
 * Repères posés sur la dernière image de la vidéo du hero
 * (public/media/hero-end.webp, 1920×1080, vue trois-quarts avant, face avant à droite).
 * Toutes les coordonnées sont en % de l'image.
 *
 * ⚠️ Si la vidéo change, recaler ces points sur sa nouvelle dernière image.
 */

type Pt = { x: number; y: number };
type Side = "l" | "r";

export const PHOTO_AREAS: Record<AreaId, { hotspot: Pt; focus: Pt & { scale: number } }> = {
  engine: { hotspot: { x: 73, y: 49 }, focus: { x: 72, y: 52, scale: 2.1 } },
  "front-wheel": { hotspot: { x: 60, y: 66 }, focus: { x: 60, y: 64, scale: 2.4 } },
  "rear-wheel": { hotspot: { x: 19, y: 63 }, focus: { x: 20, y: 61, scale: 2.5 } },
  braking: { hotspot: { x: 57.5, y: 69.5 }, focus: { x: 60, y: 65, scale: 2 } },
  suspension: { hotspot: { x: 55, y: 55 }, focus: { x: 57, y: 60, scale: 2.1 } },
  transmission: { hotspot: { x: 44, y: 65 }, focus: { x: 46, y: 63, scale: 2 } },
  exhaust: { hotspot: { x: 13.5, y: 61 }, focus: { x: 18, y: 61, scale: 2.4 } },
  battery: { hotspot: { x: 64, y: 47 }, focus: { x: 67, y: 51, scale: 2.4 } },
  ac: { hotspot: { x: 49, y: 40 }, focus: { x: 52, y: 44, scale: 1.9 } },
  general: { hotspot: { x: 36, y: 55 }, focus: { x: 52, y: 55, scale: 1 } },
};

export const PHOTO_COMPONENTS: Record<string, Pt & { side: Side }> = {
  // Moteur
  "engine-block": { x: 72, y: 48, side: "r" },
  oil: { x: 68, y: 51, side: "l" },
  timing: { x: 79, y: 52, side: "r" },
  cooling: { x: 85, y: 61, side: "r" },
  "battery-engine": { x: 64, y: 47, side: "l" },
  // Roue avant
  tyre: { x: 64.5, y: 58.5, side: "r" },
  rim: { x: 58.5, y: 62, side: "l" },
  "brake-pads": { x: 61.5, y: 62, side: "r" },
  "brake-disc": { x: 60, y: 66.5, side: "r" },
  caliper: { x: 57.5, y: 69.5, side: "l" },
  "shock-front": { x: 57, y: 54, side: "l" },
  // Roue arrière
  "rear-tyre": { x: 21.5, y: 56, side: "r" },
  "rear-rim": { x: 17.5, y: 61, side: "l" },
  "rear-disc": { x: 19.5, y: 64.5, side: "r" },
  handbrake: { x: 22, y: 69, side: "r" },
  "shock-rear": { x: 16.5, y: 53, side: "l" },
  // Freinage
  disc: { x: 60, y: 66.5, side: "r" },
  pads: { x: 61.5, y: 62, side: "r" },
  "caliper-b": { x: 57.5, y: 69.5, side: "l" },
  "brake-fluid": { x: 67, y: 48, side: "r" },
  // Suspension
  shock: { x: 57, y: 54, side: "l" },
  spring: { x: 58.5, y: 57.5, side: "r" },
  arm: { x: 62, y: 72, side: "r" },
  "air-susp": { x: 53.5, y: 60, side: "l" },
  // Transmission
  gearbox: { x: 52, y: 63, side: "r" },
  clutch: { x: 47, y: 64, side: "l" },
  driveshaft: { x: 55, y: 68, side: "r" },
  // Échappement
  muffler: { x: 13, y: 62, side: "l" },
  dpf: { x: 27, y: 68, side: "r" },
  "exhaust-line": { x: 36, y: 69, side: "r" },
  // Batterie
  "battery-unit": { x: 64, y: 47, side: "l" },
  alternator: { x: 73, y: 53, side: "r" },
  starter: { x: 69, y: 56, side: "l" },
  // Climatisation
  "ac-unit": { x: 48, y: 41, side: "l" },
  "cabin-filter": { x: 55, y: 45, side: "r" },
  compressor: { x: 78, y: 55, side: "r" },
};
