export type AreaId =
  | "engine"
  | "front-wheel"
  | "rear-wheel"
  | "braking"
  | "suspension"
  | "transmission"
  | "exhaust"
  | "battery"
  | "ac"
  | "general";

export type CarComponent = {
  id: string;
  label: string;
  /** point d'ancrage sur le véhicule (coordonnées du viewBox) */
  x: number;
  y: number;
  /** décalage du label par rapport à l'ancrage */
  dx: number;
  dy: number;
  service: string;
};

export type Symptom = {
  id: string;
  label: string;
  service: string;
};

export type Area = {
  id: AreaId;
  shortLabel: string;
  hoverLabel: string;
  title: string;
  question: string;
  /** point focal et échelle du zoom cinématique */
  focus: { x: number; y: number; scale: number };
  /** ancrage du label de survol */
  label: { x: number; y: number };
  service: string;
  components: CarComponent[];
  symptoms: Symptom[];
};

export const AREAS: Record<AreaId, Area> = {
  engine: {
    id: "engine",
    shortLabel: "Moteur",
    hoverLabel: "Moteur & entretien",
    title: "Moteur",
    question: "Que constatez-vous ?",
    focus: { x: 176, y: 252, scale: 2 },
    label: { x: 160, y: 172 },
    service: "diagnostic",
    components: [
      { id: "engine-block", label: "Moteur", x: 168, y: 250, dx: -6, dy: -46, service: "diagnostic" },
      { id: "oil", label: "Huile", x: 132, y: 276, dx: -54, dy: 34, service: "vidange" },
      { id: "timing", label: "Distribution", x: 214, y: 244, dx: 58, dy: -28, service: "distribution" },
      { id: "cooling", label: "Refroidissement", x: 96, y: 246, dx: -30, dy: -44, service: "refroidissement" },
      { id: "battery-engine", label: "Batterie", x: 214, y: 282, dx: 62, dy: 32, service: "batterie" },
    ],
    symptoms: [
      { id: "engine-warning", label: "Voyant moteur", service: "diagnostic" },
      { id: "power-loss", label: "Perte de puissance", service: "diagnostic" },
      { id: "engine-noise", label: "Bruit inhabituel", service: "diagnostic" },
      { id: "overheat", label: "Surchauffe", service: "refroidissement" },
      { id: "start-issue", label: "Problème de démarrage", service: "batterie" },
      { id: "engine-service", label: "Entretien / vidange", service: "vidange" },
      { id: "engine-unknown", label: "Je ne sais pas", service: "diagnostic" },
    ],
  },
  "front-wheel": {
    id: "front-wheel",
    shortLabel: "Roue avant",
    hoverLabel: "Roues avant & freinage",
    title: "Roue avant",
    question: "Que souhaitez-vous vérifier ?",
    focus: { x: 240, y: 306, scale: 2.1 },
    label: { x: 240, y: 398 },
    service: "freinage",
    components: [
      { id: "tyre", label: "Pneumatique", x: 254, y: 240, dx: 62, dy: -40, service: "pneumatiques" },
      { id: "rim", label: "Jante", x: 196, y: 268, dx: -66, dy: -26, service: "pneumatiques" },
      { id: "brake-pads", label: "Plaquettes", x: 272, y: 282, dx: 74, dy: -22, service: "freinage" },
      { id: "brake-disc", label: "Disque", x: 240, y: 306, dx: 0, dy: 84, service: "freinage" },
      { id: "caliper", label: "Étrier", x: 282, y: 330, dx: 76, dy: 34, service: "freinage" },
      { id: "shock-front", label: "Amortisseur", x: 216, y: 244, dx: -70, dy: 44, service: "suspension" },
    ],
    symptoms: [
      { id: "brake-noise", label: "Mes freins font du bruit", service: "freinage" },
      { id: "brake-vibration", label: "La voiture vibre au freinage", service: "freinage" },
      { id: "tyre-worn", label: "Mes pneus sont usés", service: "pneumatiques" },
      { id: "pulling", label: "La voiture tire d'un côté", service: "géométrie" },
      { id: "bump-noise", label: "J'entends un bruit sur les bosses", service: "suspension" },
      { id: "front-unknown", label: "Je ne sais pas", service: "freinage" },
    ],
  },
  "rear-wheel": {
    id: "rear-wheel",
    shortLabel: "Roue arrière",
    hoverLabel: "Roues arrière & freinage",
    title: "Roue arrière",
    question: "Que souhaitez-vous vérifier ?",
    focus: { x: 724, y: 306, scale: 2.1 },
    label: { x: 724, y: 398 },
    service: "freinage",
    components: [
      { id: "rear-tyre", label: "Pneumatique", x: 724, y: 240, dx: 0, dy: -46, service: "pneumatiques" },
      { id: "rear-rim", label: "Jante", x: 680, y: 268, dx: -66, dy: -26, service: "pneumatiques" },
      { id: "rear-disc", label: "Disque", x: 724, y: 306, dx: 0, dy: 84, service: "freinage" },
      { id: "handbrake", label: "Frein de parking", x: 764, y: 330, dx: 82, dy: 32, service: "freinage" },
      { id: "shock-rear", label: "Amortisseur", x: 700, y: 244, dx: -74, dy: 44, service: "suspension" },
    ],
    symptoms: [
      { id: "rear-brake-noise", label: "Mes freins font du bruit", service: "freinage" },
      { id: "rear-tyre-worn", label: "Mes pneus sont usés", service: "pneumatiques" },
      { id: "handbrake-issue", label: "Frein de stationnement capricieux", service: "freinage" },
      { id: "rear-bump-noise", label: "Bruit à l'arrière sur les bosses", service: "suspension" },
      { id: "rear-unknown", label: "Je ne sais pas", service: "freinage" },
    ],
  },
  braking: {
    id: "braking",
    shortLabel: "Freinage",
    hoverLabel: "Freinage & pneumatiques",
    title: "Freinage",
    question: "Que constatez-vous ?",
    focus: { x: 300, y: 306, scale: 1.7 },
    label: { x: 330, y: 372 },
    service: "freinage",
    components: [
      { id: "disc", label: "Disques", x: 240, y: 306, dx: -6, dy: -70, service: "freinage" },
      { id: "pads", label: "Plaquettes", x: 274, y: 284, dx: 78, dy: -34, service: "freinage" },
      { id: "caliper-b", label: "Étriers", x: 282, y: 332, dx: 82, dy: 36, service: "freinage" },
      { id: "brake-fluid", label: "Liquide de frein", x: 200, y: 262, dx: -70, dy: -40, service: "freinage" },
    ],
    symptoms: [
      { id: "b-noise", label: "Bruit au freinage", service: "freinage" },
      { id: "b-vibration", label: "Vibrations dans la pédale", service: "freinage" },
      { id: "b-distance", label: "Distance de freinage allongée", service: "freinage" },
      { id: "b-warning", label: "Voyant de freinage", service: "freinage" },
      { id: "b-unknown", label: "Je ne sais pas", service: "freinage" },
    ],
  },
  suspension: {
    id: "suspension",
    shortLabel: "Suspension",
    hoverLabel: "Suspension & tenue de route",
    title: "Suspension",
    question: "Que constatez-vous ?",
    focus: { x: 600, y: 288, scale: 2 },
    label: { x: 600, y: 380 },
    service: "suspension",
    components: [
      { id: "shock", label: "Amortisseur", x: 600, y: 268, dx: -4, dy: -52, service: "suspension" },
      { id: "spring", label: "Ressort", x: 620, y: 296, dx: 74, dy: -18, service: "suspension" },
      { id: "arm", label: "Triangle", x: 578, y: 316, dx: -76, dy: 36, service: "suspension" },
      { id: "air-susp", label: "Suspension pneumatique", x: 640, y: 268, dx: 78, dy: 44, service: "suspension" },
    ],
    symptoms: [
      { id: "s-noise", label: "Bruits sur les bosses", service: "suspension" },
      { id: "s-height", label: "La voiture s'affaisse", service: "suspension" },
      { id: "s-road", label: "Mauvaise tenue de route", service: "suspension" },
      { id: "s-air", label: "Suspension pneumatique en défaut", service: "suspension" },
      { id: "s-unknown", label: "Je ne sais pas", service: "suspension" },
    ],
  },
  transmission: {
    id: "transmission",
    shortLabel: "Transmission",
    hoverLabel: "Boîte & transmission",
    title: "Transmission",
    question: "Que constatez-vous ?",
    focus: { x: 424, y: 290, scale: 2 },
    label: { x: 424, y: 380 },
    service: "boîte de vitesses",
    components: [
      { id: "gearbox", label: "Boîte de vitesses", x: 396, y: 286, dx: -12, dy: -50, service: "boîte de vitesses" },
      { id: "clutch", label: "Embrayage", x: 350, y: 292, dx: -74, dy: 38, service: "embrayage" },
      { id: "driveshaft", label: "Transmission", x: 500, y: 300, dx: 76, dy: 34, service: "transmission" },
    ],
    symptoms: [
      { id: "t-hard", label: "Vitesses difficiles à passer", service: "boîte de vitesses" },
      { id: "t-jerk", label: "À-coups", service: "boîte automatique" },
      { id: "t-noise", label: "Bruit", service: "transmission" },
      { id: "t-slip", label: "Patinage", service: "embrayage" },
      { id: "t-auto", label: "Problème de boîte automatique", service: "boîte automatique" },
      { id: "t-unknown", label: "Je ne sais pas", service: "boîte de vitesses" },
    ],
  },
  exhaust: {
    id: "exhaust",
    shortLabel: "Échappement",
    hoverLabel: "Échappement & FAP",
    title: "Échappement & FAP",
    question: "Que constatez-vous ?",
    focus: { x: 856, y: 300, scale: 2.1 },
    label: { x: 856, y: 380 },
    service: "nettoyage FAP",
    components: [
      { id: "muffler", label: "Échappement", x: 818, y: 310, dx: -34, dy: -46, service: "échappement" },
      { id: "dpf", label: "FAP", x: 862, y: 302, dx: 40, dy: -44, service: "nettoyage FAP" },
      { id: "exhaust-line", label: "Ligne d'échappement", x: 780, y: 318, dx: -30, dy: 48, service: "échappement" },
    ],
    symptoms: [
      { id: "e-smoke", label: "Fumée", service: "nettoyage FAP" },
      { id: "e-warning", label: "Voyant FAP", service: "nettoyage FAP" },
      { id: "e-power", label: "Perte de puissance", service: "nettoyage FAP" },
      { id: "e-noise", label: "Bruit d'échappement", service: "échappement" },
      { id: "e-clean", label: "Nettoyage FAP", service: "nettoyage FAP" },
    ],
  },
  battery: {
    id: "battery",
    shortLabel: "Batterie",
    hoverLabel: "Batterie & démarrage",
    title: "Batterie & démarrage",
    question: "Que constatez-vous ?",
    focus: { x: 214, y: 268, scale: 2.4 },
    label: { x: 232, y: 190 },
    service: "batterie",
    components: [
      { id: "battery-unit", label: "Batterie", x: 214, y: 276, dx: 4, dy: -44, service: "batterie" },
      { id: "alternator", label: "Alternateur", x: 176, y: 292, dx: -66, dy: 34, service: "batterie" },
      { id: "starter", label: "Démarreur", x: 246, y: 292, dx: 70, dy: 34, service: "batterie" },
    ],
    symptoms: [
      { id: "bat-dead", label: "La voiture ne démarre plus", service: "batterie" },
      { id: "bat-slow", label: "Démarrage difficile", service: "batterie" },
      { id: "bat-warning", label: "Voyant batterie", service: "batterie" },
      { id: "bat-elec", label: "Problèmes électriques", service: "diagnostic" },
      { id: "bat-unknown", label: "Je ne sais pas", service: "batterie" },
    ],
  },
  ac: {
    id: "ac",
    shortLabel: "Climatisation",
    hoverLabel: "Climatisation & habitacle",
    title: "Climatisation",
    question: "Que constatez-vous ?",
    focus: { x: 430, y: 180, scale: 1.9 },
    label: { x: 430, y: 88 },
    service: "climatisation",
    components: [
      { id: "ac-unit", label: "Climatisation", x: 400, y: 190, dx: -10, dy: -50, service: "climatisation" },
      { id: "cabin-filter", label: "Filtre habitacle", x: 452, y: 186, dx: 72, dy: -18, service: "climatisation" },
      { id: "compressor", label: "Compresseur", x: 366, y: 214, dx: -70, dy: 40, service: "climatisation" },
    ],
    symptoms: [
      { id: "ac-warm", label: "La clim ne refroidit plus", service: "climatisation" },
      { id: "ac-smell", label: "Mauvaise odeur", service: "climatisation" },
      { id: "ac-noise", label: "Bruit de compresseur", service: "climatisation" },
      { id: "ac-recharge", label: "Recharge de climatisation", service: "climatisation" },
      { id: "ac-unknown", label: "Je ne sais pas", service: "climatisation" },
    ],
  },
  general: {
    id: "general",
    shortLabel: "Entretien",
    hoverLabel: "Entretien général",
    title: "Entretien général",
    question: "Que souhaitez-vous ?",
    focus: { x: 490, y: 215, scale: 1 },
    label: { x: 540, y: 74 },
    service: "révision et entretien général",
    components: [],
    symptoms: [
      { id: "g-revision", label: "Une révision complète", service: "révision et entretien général" },
      { id: "g-ct", label: "Préparation contrôle technique", service: "révision et entretien général" },
      { id: "g-oil", label: "Vidange", service: "vidange" },
      { id: "g-check", label: "Bilan avant long trajet", service: "révision et entretien général" },
      { id: "g-quote", label: "Un devis d'entretien", service: "révision et entretien général" },
      { id: "g-unknown", label: "Je ne sais pas", service: "révision et entretien général" },
    ],
  },
};

/** Zones dessinées et cliquables sur le véhicule */
export const CAR_ZONES: AreaId[] = [
  "engine",
  "battery",
  "ac",
  "front-wheel",
  "transmission",
  "suspension",
  "rear-wheel",
  "exhaust",
  "general",
];

/** Raccourcis affichés sous le véhicule (mobile & accessibilité) */
export const QUICK_AREAS: AreaId[] = [
  "engine",
  "braking",
  "front-wheel",
  "suspension",
  "transmission",
  "exhaust",
  "battery",
  "ac",
  "general",
];

export const GLOBAL_SYMPTOMS: { id: string; label: string; area: AreaId; service: string }[] = [
  { id: "gs-noise", label: "Un bruit", area: "suspension", service: "diagnostic" },
  { id: "gs-warning", label: "Un voyant", area: "engine", service: "diagnostic" },
  { id: "gs-vibration", label: "Des vibrations", area: "front-wheel", service: "freinage" },
  { id: "gs-leak", label: "Une fuite", area: "engine", service: "diagnostic" },
  { id: "gs-smell", label: "Une odeur", area: "ac", service: "climatisation" },
  { id: "gs-power", label: "Une perte de puissance", area: "exhaust", service: "nettoyage FAP" },
  { id: "gs-heat", label: "Une surchauffe", area: "engine", service: "refroidissement" },
  { id: "gs-smoke", label: "De la fumée", area: "exhaust", service: "nettoyage FAP" },
  { id: "gs-start", label: "Un problème de démarrage", area: "battery", service: "batterie" },
  { id: "gs-road", label: "Un problème de tenue de route", area: "suspension", service: "suspension" },
  { id: "gs-service", label: "Un entretien à effectuer", area: "general", service: "révision et entretien général" },
  { id: "gs-other", label: "Autre", area: "general", service: "diagnostic" },
];
