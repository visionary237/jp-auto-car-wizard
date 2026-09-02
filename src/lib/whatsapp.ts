import { WHATSAPP_NUMBER } from "@/lib/service-pages-data";

export type RequestData = {
  vehicle: string;
  plate: string;
  mileage: string;
  service: string;
  component: string;
  symptom: string;
  details: string;
  slot: string;
  name: string;
  phone: string;
};

export const emptyRequest: RequestData = {
  vehicle: "",
  plate: "",
  mileage: "",
  service: "",
  component: "",
  symptom: "",
  details: "",
  slot: "",
  name: "",
  phone: "",
};

const fallback = (v: string) => (v.trim() ? v.trim() : "Non précisé");

export function buildWhatsappMessage(d: RequestData): string {
  return [
    "Bonjour Auto Express 76,",
    "",
    "Je souhaite faire une demande concernant mon véhicule.",
    "",
    "Véhicule :",
    fallback(d.vehicle),
    "",
    "Immatriculation :",
    fallback(d.plate),
    "",
    "Kilométrage :",
    fallback(d.mileage),
    "",
    "Service :",
    fallback(d.service),
    "",
    "Élément concerné :",
    fallback(d.component),
    "",
    "Symptôme :",
    fallback(d.symptom),
    "",
    "Précisions :",
    fallback(d.details),
    "",
    "Créneau souhaité :",
    fallback(d.slot),
    "",
    "Nom :",
    fallback(d.name),
    "",
    "Téléphone :",
    fallback(d.phone),
    "",
    "Merci.",
  ].join("\n");
}

export function buildWhatsappUrl(d: RequestData): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildWhatsappMessage(d))}`;
}
