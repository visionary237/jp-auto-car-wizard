import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { buildWhatsappMessage, buildWhatsappUrl, emptyRequest, type RequestData } from "@/lib/whatsapp";
import { DISCLAIMER } from "@/lib/service-pages-data";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Données pré-remplies issues du parcours de sélection */
  prefill?: Partial<RequestData>;
};

export function RequestDialog({ open, onOpenChange, prefill }: Props) {
  const [data, setData] = useState<RequestData>({ ...emptyRequest, ...prefill });

  useEffect(() => {
    if (open) setData((prev) => ({ ...prev, ...prefill }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, prefill?.service, prefill?.component, prefill?.symptom]);

  const set = (key: keyof RequestData) => (e: { target: { value: string } }) =>
    setData((prev) => ({ ...prev, [key]: e.target.value }));

  const fields: { key: keyof RequestData; label: string; placeholder: string }[] = [
    { key: "vehicle", label: "Véhicule (marque et modèle)", placeholder: "Ex. Peugeot 308" },
    { key: "plate", label: "Immatriculation", placeholder: "AB-123-CD" },
    { key: "mileage", label: "Kilométrage", placeholder: "Ex. 128 000 km" },
    { key: "slot", label: "Créneau souhaité", placeholder: "Ex. jeudi matin" },
    { key: "name", label: "Nom", placeholder: "Votre nom" },
    { key: "phone", label: "Téléphone", placeholder: "06 00 00 00 00" },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">Préparer ma demande</DialogTitle>
          <DialogDescription>
            Ces informations composent le message envoyé à l'atelier. Rien n'est publié sur le site.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 sm:grid-cols-3">
          <ReadOnlyChip label="Service" value={data.service} />
          <ReadOnlyChip label="Élément concerné" value={data.component} />
          <ReadOnlyChip label="Symptôme" value={data.symptom} />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {fields.map((f) => (
            <div key={f.key} className="grid gap-1.5">
              <Label htmlFor={`req-${f.key}`}>{f.label}</Label>
              <Input
                id={`req-${f.key}`}
                value={data[f.key]}
                onChange={set(f.key)}
                placeholder={f.placeholder}
                autoComplete="off"
              />
            </div>
          ))}
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor="req-details">Précisions</Label>
          <Textarea
            id="req-details"
            rows={3}
            value={data.details}
            onChange={set("details")}
            placeholder="Depuis quand, dans quelles conditions, à quelle vitesse…"
          />
        </div>

        <details className="rounded-xl border border-border bg-card/60 p-4">
          <summary className="cursor-pointer text-sm text-muted-foreground">
            Aperçu du message envoyé
          </summary>
          <pre className="mt-3 whitespace-pre-wrap break-words text-xs text-muted-foreground">
            {buildWhatsappMessage(data)}
          </pre>
        </details>

        <p className="text-xs text-muted-foreground">{DISCLAIMER}</p>

        <Button asChild size="lg" className="w-full gap-2">
          <a href={buildWhatsappUrl(data)} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="size-4" />
            Continuer sur WhatsApp
          </a>
        </Button>
      </DialogContent>
    </Dialog>
  );
}

function ReadOnlyChip({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-secondary/40 px-3 py-2">
      <span className="block text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground">{label}</span>
      <span className="mt-0.5 block truncate text-sm text-foreground">{value || "Non précisé"}</span>
    </div>
  );
}
