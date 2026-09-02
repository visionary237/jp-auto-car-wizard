export type AreaId =
  | "engine"
  | "wheels_front"
  | "wheels_rear"
  | "suspension"
  | "transmission"
  | "exhaust"
  | "general";

export type Symptom = {
  id: string;
  label: string;
  service: string;
};

export type Area = {
  id: AreaId;
  shortLabel: string;
  title: string;
  question: string;
  services: string[];
  symptoms: Symptom[];
};

export const AREAS: Record<AreaId, Area> = {
  engine: {
    id: "engine",
    shortLabel: "Moteur & entretien",
    title: "Moteur & entretien",
    question: "Que constatez-vous ?",
    services: ["diagnostic", "entretien", "distribution", "vidange"],
    symptoms: [
      { id: "engine_warning", label: "J'ai un voyant moteur", service: "diagnostic" },
      { id: "engine_start", label: "Le moteur démarre mal", service: "diagnostic" },
      { id: "engine_noise", label: "Un bruit anormal au moteur", service: "diagnostic" },
      { id: "engine_oil", label: "Vidange / entretien à faire", service: "vidange" },
      { id: "engine_belt", label: "Courroie de distribution", service: "distribution" },
      { id: "engine_unknown", label: "Je ne sais pas", service: "diagnostic" },
    ],
  },
  wheels_front: {
    id: "wheels_front",
    shortLabel: "Freinage & pneus (avant)",
    title: "Roues & freinage — avant",
    question: "Que constatez-vous ?",
    services: ["freinage", "pneumatiques"],
    symptoms: [
      { id: "brake_noise", label: "Mes freins font du bruit", service: "freinage" },
      { id: "brake_vibration", label: "La voiture vibre au freinage", service: "freinage" },
      { id: "tyre_worn", label: "Mes pneus sont usés", service: "pneumatiques" },
      { id: "brake_warning", label: "J'ai un voyant", service: "freinage" },
      { id: "brake_other", label: "Autre problème", service: "freinage" },
      { id: "brake_unknown", label: "Je ne sais pas", service: "freinage" },
    ],
  },
  wheels_rear: {
    id: "wheels_rear",
    shortLabel: "Freinage & pneus (arrière)",
    title: "Roues & freinage — arrière",
    question: "Que constatez-vous ?",
    services: ["freinage", "pneumatiques"],
    symptoms: [
      { id: "rear_brake_noise", label: "Mes freins font du bruit", service: "freinage" },
      { id: "rear_handbrake", label: "Frein de stationnement capricieux", service: "freinage" },
      { id: "rear_tyre_worn", label: "Mes pneus sont usés", service: "pneumatiques" },
      { id: "rear_warning", label: "J'ai un voyant", service: "freinage" },
      { id: "rear_other", label: "Autre problème", service: "freinage" },
      { id: "rear_unknown", label: "Je ne sais pas", service: "freinage" },
    ],
  },
  suspension: {
    id: "suspension",
    shortLabel: "Suspension",
    title: "Suspension & liaison au sol",
    question: "Que constatez-vous ?",
    services: ["suspension"],
    symptoms: [
      { id: "susp_noise", label: "Des bruits dans les bosses", service: "suspension" },
      { id: "susp_height", label: "La voiture penche ou s'affaisse", service: "suspension" },
      { id: "susp_road", label: "Mauvaise tenue de route", service: "suspension" },
      { id: "susp_air", label: "Suspension pneumatique en défaut", service: "suspension" },
      { id: "susp_other", label: "Autre problème", service: "suspension" },
      { id: "susp_unknown", label: "Je ne sais pas", service: "suspension" },
    ],
  },
  transmission: {
    id: "transmission",
    shortLabel: "Boîte & transmission",
    title: "Boîte de vitesses & transmission",
    question: "Que constatez-vous ?",
    services: ["embrayage", "boîte automatique", "boîte manuelle"],
    symptoms: [
      { id: "trans_clutch", label: "L'embrayage patine", service: "embrayage" },
      { id: "trans_gear", label: "Les vitesses passent mal", service: "boîte manuelle" },
      { id: "trans_auto", label: "À-coups en boîte automatique", service: "boîte automatique" },
      { id: "trans_noise", label: "Bruit à l'accélération", service: "boîte manuelle" },
      { id: "trans_other", label: "Autre problème", service: "boîte automatique" },
      { id: "trans_unknown", label: "Je ne sais pas", service: "boîte automatique" },
    ],
  },
  exhaust: {
    id: "exhaust",
    shortLabel: "Échappement & FAP",
    title: "Échappement & FAP",
    question: "Que constatez-vous ?",
    services: ["nettoyage FAP"],
    symptoms: [
      { id: "fap_warning", label: "Voyant FAP allumé", service: "nettoyage FAP" },
      { id: "fap_smoke", label: "De la fumée à l'échappement", service: "nettoyage FAP" },
      { id: "fap_power", label: "Perte de puissance / mode dégradé", service: "nettoyage FAP" },
      { id: "fap_noise", label: "Échappement bruyant", service: "nettoyage FAP" },
      { id: "fap_other", label: "Autre problème", service: "nettoyage FAP" },
      { id: "fap_unknown", label: "Je ne sais pas", service: "nettoyage FAP" },
    ],
  },
  general: {
    id: "general",
    shortLabel: "Entretien général",
    title: "Véhicule entier & entretien",
    question: "Que souhaitez-vous ?",
    services: ["révision et entretien général"],
    symptoms: [
      { id: "gen_service", label: "Une révision complète", service: "révision et entretien général" },
      { id: "gen_ct", label: "Préparation contrôle technique", service: "révision et entretien général" },
      { id: "gen_check", label: "Un bilan avant un long trajet", service: "révision et entretien général" },
      { id: "gen_quote", label: "Un devis d'entretien", service: "révision et entretien général" },
      { id: "gen_other", label: "Autre demande", service: "révision et entretien général" },
      { id: "gen_unknown", label: "Je ne sais pas", service: "révision et entretien général" },
    ],
  },
};

export const AREA_ORDER: AreaId[] = [
  "engine",
  "wheels_front",
  "wheels_rear",
  "suspension",
  "transmission",
  "exhaust",
  "general",
];

/** Symptômes du parcours alternatif « je ne sais pas d'où vient le problème ». */
export const GLOBAL_SYMPTOMS: { id: string; label: string; area: AreaId; service: string }[] = [
  { id: "g_noise", label: "Un bruit", area: "suspension", service: "diagnostic" },
  { id: "g_warning", label: "Un voyant", area: "engine", service: "diagnostic" },
  { id: "g_vibration", label: "Des vibrations", area: "wheels_front", service: "freinage" },
  { id: "g_leak", label: "Une fuite", area: "engine", service: "diagnostic" },
  { id: "g_power", label: "Perte de puissance", area: "exhaust", service: "nettoyage FAP" },
  { id: "g_heat", label: "Surchauffe", area: "engine", service: "diagnostic" },
  { id: "g_smoke", label: "Fumée", area: "exhaust", service: "nettoyage FAP" },
  { id: "g_road", label: "Problème de tenue de route", area: "suspension", service: "suspension" },
  { id: "g_service", label: "Entretien / révision", area: "general", service: "révision et entretien général" },
  { id: "g_other", label: "Autre", area: "general", service: "diagnostic" },
];
