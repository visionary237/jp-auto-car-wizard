import { useEffect, useState, type MouseEvent as ReactMouseEvent } from "react";
import { ArrowRight, FlaskConical } from "lucide-react";
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
import {
  buildWhatsappMessage,
  buildWhatsappUrl,
  demoRequest,
  emptyRequest,
  type RequestData,
} from "@/lib/whatsapp";
import { DISCLAIMER, SIGNATURE } from "@/lib/service-pages-data";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Données pré-remplies issues du parcours de sélection */
  prefill?: Partial<RequestData>;
};

export function WhatsappIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.96L2 22l5.2-1.5A9.9 9.9 0 1 0 12.04 2Zm0 1.8a8.1 8.1 0 1 1-4.13 15.07l-.3-.18-3.08.89.9-3-.2-.31A8.1 8.1 0 0 1 12.05 3.8Zm-3.5 4c-.18 0-.47.07-.72.34-.24.27-.94.92-.94 2.25s.96 2.6 1.1 2.78c.13.18 1.87 2.98 4.63 4.06 2.3.9 2.76.72 3.26.68.5-.05 1.6-.66 1.83-1.29.23-.63.23-1.17.16-1.29-.07-.11-.25-.18-.52-.31-.27-.14-1.6-.79-1.85-.88-.25-.09-.43-.14-.61.14-.18.27-.7.88-.86 1.06-.16.18-.32.2-.59.07-.27-.14-1.14-.42-2.18-1.34-.8-.72-1.35-1.6-1.5-1.87-.16-.27-.02-.42.12-.55.12-.12.27-.32.4-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.13-.6-1.47-.83-2.01-.21-.52-.43-.45-.6-.46h-.5Z" />
    </svg>
  );
}

const IS_DEV = import.meta.env.DEV;

export function RequestDialog({ open, onOpenChange, prefill }: Props) {
  const [data, setData] = useState<RequestData>({ ...emptyRequest, ...prefill });
  const [confirming, setConfirming] = useState(false);

  useEffect(() => {
    if (open) {
      setConfirming(false);
      setData((prev) => ({ ...prev, ...prefill }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, prefill?.selectedService, prefill?.selectedComponent, prefill?.selectedSymptom]);

  const set = (key: keyof RequestData) => (e: { target: { value: string } }) =>
    setData((prev) => ({ ...prev, [key]: e.target.value }));

  const fields: { key: keyof RequestData; label: string; placeholder: string }[] = [
    { key: "vehicleBrand", label: "Marque", placeholder: "Ex. Peugeot" },
    { key: "vehicleModel", label: "Modèle", placeholder: "Ex. 308" },
    { key: "registration", label: "Immatriculation", placeholder: "AB-123-CD" },
    { key: "mileage", label: "Kilométrage", placeholder: "Ex. 125 000 km" },
    { key: "preferredDate", label: "Date souhaitée", placeholder: "Ex. jeudi 10 septembre" },
    { key: "preferredTime", label: "Moment de la journée", placeholder: "Ex. matin" },
    { key: "customerName", label: "Nom", placeholder: "Votre nom" },
    { key: "customerPhone", label: "Téléphone", placeholder: "06 00 00 00 00" },
    { key: "customerEmail", label: "Email", placeholder: "exemple@email.fr" },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        {confirming ? (
          <>
            <DialogHeader>
              <DialogTitle className="font-display text-2xl">{SIGNATURE}</DialogTitle>
              <DialogDescription>
                Votre demande est prête. Envoyez-la à Auto Express 76 sur WhatsApp pour que l'atelier
                puisse vous répondre.
              </DialogDescription>
            </DialogHeader>

            <pre className="max-h-64 overflow-y-auto whitespace-pre-wrap break-words rounded-xl border border-border bg-card/60 p-4 text-xs text-muted-foreground">
              {buildWhatsappMessage(data)}
            </pre>

            <WhatsappCta data={data} />

            <Button variant="ghost" onClick={() => setConfirming(false)}>
              Modifier ma demande
            </Button>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="font-display text-xl">Préparer ma demande</DialogTitle>
              <DialogDescription>
                Ces informations composent le message envoyé à l'atelier. Rien n'est publié sur le site.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 sm:grid-cols-3">
              <ReadOnlyChip label="Service" value={data.selectedService} />
              <ReadOnlyChip label="Élément concerné" value={data.selectedComponent} />
              <ReadOnlyChip label="Symptôme" value={data.selectedSymptom} />
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
              <Label htmlFor="req-message">Précisions</Label>
              <Textarea
                id="req-message"
                rows={3}
                value={data.customerMessage}
                onChange={set("customerMessage")}
                placeholder="Depuis quand, dans quelles conditions, à quelle vitesse…"
              />
            </div>

            <details className="rounded-xl border border-border bg-card/60 p-4">
              <summary className="cursor-pointer text-sm text-muted-foreground">
                Aperçu du message préparé
              </summary>
              <pre className="mt-3 whitespace-pre-wrap break-words text-xs text-muted-foreground">
                {buildWhatsappMessage(data)}
              </pre>
            </details>

            <p className="text-xs text-muted-foreground">{DISCLAIMER}</p>

            <Button size="lg" className="w-full gap-2" onClick={() => setConfirming(true)}>
              Continuer <ArrowRight className="size-4" />
            </Button>

            {IS_DEV && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={() => setData({ ...demoRequest })}
              >
                <FlaskConical className="size-3.5" /> Tester WhatsApp
              </Button>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

export function WhatsappCta({
  data,
  className,
}: {
  data: Partial<RequestData>;
  className?: string;
}) {
  const href = buildWhatsappUrl(data);

  /** Ouvre WhatsApp hors de l'iframe de prévisualisation (destination externe). */
  const openExternal = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const win = window.open(href, "_blank", "noopener,noreferrer");
    if (!win) {
      try {
        window.top!.location.href = href;
      } catch {
        window.location.href = href;
      }
    }
  };

  return (
    <div className={className}>
      <Button asChild size="lg" className="w-full gap-2">
        <a href={href} target="_blank" rel="noopener noreferrer" onClick={openExternal}>
          <WhatsappIcon className="size-4" />
          Envoyer ma demande sur WhatsApp →
        </a>
      </Button>
      <p className="mt-2 text-center text-xs text-muted-foreground">
        Votre message sera préparé dans WhatsApp. Il ne sera envoyé qu'après votre validation.
      </p>
    </div>
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
