/**
 * Numéro WhatsApp du garage — point de configuration UNIQUE.
 * Remplacer cette valeur suffit pour basculer sur le numéro définitif.
 * Format international, sans "+" ni espaces.
 */
export const WHATSAPP_NUMBER = "33616628486";

export type RequestData = {
  /** Contexte du parcours */
  selectedArea: string;
  selectedComponent: string;
  selectedSymptom: string;
  selectedService: string;
  /** Véhicule */
  vehicleBrand: string;
  vehicleModel: string;
  registration: string;
  mileage: string;
  /** Client */
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  /** Disponibilité */
  preferredDate: string;
  preferredTime: string;
  /** Précisions libres */
  customerMessage: string;
};

export const emptyRequest: RequestData = {
  selectedArea: "",
  selectedComponent: "",
  selectedSymptom: "",
  selectedService: "",
  vehicleBrand: "",
  vehicleModel: "",
  registration: "",
  mileage: "",
  customerName: "",
  customerPhone: "",
  customerEmail: "",
  preferredDate: "",
  preferredTime: "",
  customerMessage: "",
};

/** Exemple complet utilisé par le bouton de test (développement uniquement). */
export const demoRequest: RequestData = {
  selectedArea: "Roue avant droite",
  selectedComponent: "Plaquettes de frein",
  selectedSymptom: "Bruit métallique au freinage",
  selectedService: "Freinage",
  vehicleBrand: "Peugeot",
  vehicleModel: "308",
  registration: "AB-123-CD",
  mileage: "125 000 km",
  customerName: "Jean Dupont",
  customerPhone: "06 12 34 56 78",
  customerEmail: "jean.dupont@email.fr",
  preferredDate: "Jeudi 10 septembre",
  preferredTime: "Matin",
  customerMessage: "Le bruit apparaît principalement lorsque je freine à faible vitesse.",
};

const clean = (v?: string | null): string =>
  typeof v === "string" && v.trim() && !/^(undefined|null)$/i.test(v.trim()) ? v.trim() : "";

const line = (label: string, value?: string | null): string | null => {
  const v = clean(value);
  return v ? `${label} : ${v}` : null;
};

const section = (title: string, lines: (string | null)[]): string | null => {
  const kept = lines.filter((l): l is string => !!l);
  return kept.length ? [title, ...kept].join("\n") : null;
};

export function buildWhatsappMessage(d: Partial<RequestData>): string {
  const vehicle = clean([clean(d.vehicleBrand), clean(d.vehicleModel)].filter(Boolean).join(" "));

  const blocks: (string | null)[] = [
    "Bonjour Auto Express 76 👋",
    "Je souhaite faire une demande concernant mon véhicule.",
    section("🚗 VÉHICULE", [
      vehicle || null,
      line("Immatriculation", d.registration),
      line("Kilométrage", d.mileage),
    ]),
    section("🔧 MA DEMANDE", [
      line("Service", d.selectedService),
      line("Zone", d.selectedArea),
      line("Élément concerné", d.selectedComponent),
      line("Symptôme", d.selectedSymptom),
    ]),
    section("💬 PRÉCISION", [clean(d.customerMessage) || null]),
    section("📅 DISPONIBILITÉ SOUHAITÉE", [
      clean(d.preferredDate) || null,
      clean(d.preferredTime) || null,
    ]),
    section("👤 MES COORDONNÉES", [
      clean(d.customerName) || null,
      line("Téléphone", d.customerPhone),
      line("Email", d.customerEmail),
    ]),
    "Merci de me confirmer si vous pouvez prendre en charge mon véhicule.",
  ];

  return blocks.filter((b): b is string => !!b).join("\n\n");
}

export function buildWhatsappUrl(d: Partial<RequestData>): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildWhatsappMessage(d))}`;
}

/**
 * Ouvre WhatsApp comme une destination EXTERNE (jamais dans l'iframe de preview).
 * Retombe sur la fenêtre parente si les popups sont bloquées.
 */
export function openWhatsapp(d: Partial<RequestData>): void {
  const url = buildWhatsappUrl(d);
  const win = window.open(url, "_blank", "noopener,noreferrer");
  if (!win) {
    try {
      window.top!.location.href = url;
    } catch {
      window.location.href = url;
    }
  }
}
