import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ArrowLeft, ArrowRight, Check, HelpCircle, X } from "lucide-react";
import { OrbitExplorer } from "@/components/OrbitExplorer";
import { RequestDialog } from "@/components/RequestDialog";
import { AREAS, GLOBAL_SYMPTOMS, QUICK_AREAS, type AreaId } from "@/lib/car-selector-data";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";


export function CarSelector() {

  const [selectedArea, setSelectedArea] = useState<AreaId | null>(null);
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [selectedSymptom, setSelectedSymptom] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [hovered, setHovered] = useState<AreaId | null>(null);
  const [unknownMode, setUnknownMode] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const area = selectedArea ? AREAS[selectedArea] : null;
  const zoomed = !unknownMode && !!area;

  const symptomLabel = useMemo(() => {
    if (!selectedSymptom) return "";
    const local = area?.symptoms.find((s) => s.id === selectedSymptom);
    if (local) return local.label;
    return GLOBAL_SYMPTOMS.find((s) => s.id === selectedSymptom)?.label ?? "";
  }, [selectedSymptom, area]);

  const prefill = useMemo(
    () => ({
      selectedArea: area?.title ?? "",
      selectedComponent: selectedComponent
        ? (area?.components.find((c) => c.id === selectedComponent)?.label ?? "")
        : "",
      selectedSymptom: symptomLabel,
      selectedService: selectedService ?? "",
    }),
    [area, selectedComponent, symptomLabel, selectedService],
  );

  // Les composants techniques n'apparaissent qu'une fois la caméra arrivée
  const [showComponents, setShowComponents] = useState(false);
  useEffect(() => {
    if (!zoomed) {
      setShowComponents(false);
      return;
    }
    setShowComponents(false);
    const t = setTimeout(() => setShowComponents(true), 50);
    return () => clearTimeout(t);
  }, [zoomed, selectedArea]);

  const selectArea = (id: AreaId) => {
    setUnknownMode(false);
    setSelectedArea(id);
    setSelectedComponent(null);
    setSelectedSymptom(null);
    setSelectedService(AREAS[id].service);
  };

  const resetZoom = () => {
    setSelectedArea(null);
    setSelectedComponent(null);
    setHovered(null);
  };

  const openUnknown = () => {
    setUnknownMode(true);
    setSelectedArea(null);
    setSelectedComponent(null);
    setHovered(null);
  };

  // Bascule animée du contenu de la colonne gauche (accroche ↔ fiche de zone)
  const leftRef = useRef<HTMLDivElement>(null);
  const leftKey = zoomed ? `area-${selectedArea}` : unknownMode ? "unknown" : "idle";
  useEffect(() => {
    const el = leftRef.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const tween = gsap.fromTo(
      el.querySelectorAll("[data-reveal]"),
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.05, ease: "power3.out" },
    );
    return () => void tween.kill();
  }, [leftKey]);

  const panelOpen = zoomed || unknownMode;

  const areaPanel = area && (
    <div className="surface-panel rounded-2xl p-5 sm:p-7">
      <div className="flex items-start justify-between gap-4" data-reveal>
        <div>
          <span className="eyebrow">Zone sélectionnée</span>
          <h2 className="mt-2 text-2xl font-bold sm:text-3xl">{area.title}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{area.question}</p>
        </div>
        <button
          type="button"
          onClick={resetZoom}
          aria-label="Fermer le panneau"
          className="rounded-full border border-border p-2 text-muted-foreground transition-colors hover:text-foreground"
        >
          <X className="size-4" />
        </button>
      </div>

      <div className="mt-5 grid gap-2 sm:grid-cols-2">
        {area.symptoms.map((s) => {
          const on = selectedSymptom === s.id;
          return (
            <button
              key={s.id}
              type="button"
              data-reveal
              onClick={() => {
                setSelectedSymptom(s.id);
                setSelectedService(s.service);
              }}
              className={cn(
                "flex items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-all duration-300",
                on
                  ? "border-accent bg-accent/10 text-foreground"
                  : "border-border bg-card/60 text-muted-foreground hover:border-accent/60 hover:text-foreground",
              )}
            >
              {s.label}
              {on && <Check className="size-4 shrink-0 text-accent" />}
            </button>
          );
        })}
      </div>

      <div data-reveal>
        <Recap
          area={area.title}
          component={
            selectedComponent ? (area.components.find((c) => c.id === selectedComponent)?.label ?? null) : null
          }
          service={selectedService}
          onContinue={() => setDialogOpen(true)}
        />
      </div>
    </div>
  );

  const unknownPanel = (
    <div className="surface-panel rounded-2xl p-5 sm:p-7">
      <div className="flex items-start justify-between gap-4" data-reveal>
        <div>
          <span className="eyebrow">Orientation guidée</span>
          <h2 className="mt-2 text-2xl font-bold sm:text-3xl">Pas de problème. Qu'est-ce que vous constatez ?</h2>
        </div>
        <button
          type="button"
          onClick={() => setUnknownMode(false)}
          aria-label="Revenir au véhicule"
          className="rounded-full border border-border p-2 text-muted-foreground transition-colors hover:text-foreground"
        >
          <X className="size-4" />
        </button>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {GLOBAL_SYMPTOMS.map((s) => {
          const on = selectedSymptom === s.id;
          return (
            <button
              key={s.id}
              type="button"
              data-reveal
              onClick={() => {
                setSelectedSymptom(s.id);
                setSelectedService(s.service);
                setSelectedArea(null);
                setHovered(s.area);
              }}
              className={cn(
                "group rounded-xl border p-4 text-left text-sm font-medium transition-all duration-300",
                on
                  ? "border-accent bg-accent/10 text-foreground"
                  : "border-border bg-card/60 text-muted-foreground hover:-translate-y-0.5 hover:border-accent/60 hover:text-foreground",
              )}
            >
              {s.label}
              <span
                className={cn(
                  "mt-3 block h-px w-8 transition-all duration-300",
                  on ? "w-14 bg-accent" : "bg-border group-hover:w-14 group-hover:bg-accent/60",
                )}
              />
            </button>
          );
        })}
      </div>

      <div data-reveal>
        <Recap area={null} component={null} service={selectedService} onContinue={() => setDialogOpen(true)} />
      </div>
    </div>
  );

  // Fiche vide : le parcours en trois étapes, comme une fiche d'atelier.
  const idlePanel = (
    <div className="surface-panel rounded-2xl p-5 sm:p-7">
      <div data-reveal>
        <span className="eyebrow">Fiche d'intervention</span>
        <h3 className="mt-2 font-display text-2xl font-bold sm:text-3xl">Votre demande, en trois touches.</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Touchez une zone sur la voiture : la fiche se remplit, l'atelier reçoit une demande claire.
        </p>
      </div>
      <ol className="mt-6 divide-y divide-border/70 border-y border-border/70">
        {[
          ["Zone du véhicule", hovered ? AREAS[hovered].shortLabel : "À choisir sur la voiture"],
          ["Ce que vous constatez", "Bruit, voyant, vibration…"],
          ["Pièce concernée", "Facultatif"],
        ].map(([k, v], i) => (
          <li key={k} className="flex items-center justify-between gap-4 py-4" data-reveal>
            <span className="flex items-center gap-4">
              <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
              <span className="text-sm font-semibold">{k}</span>
            </span>
            <span className={cn("text-right text-sm", i === 0 && hovered ? "text-foreground" : "text-muted-foreground")}>{v}</span>
          </li>
        ))}
      </ol>
      <div className="mt-6 flex flex-col gap-3" data-reveal>
        <Button size="lg" disabled className="w-full justify-between">
          Envoyer ma fiche <ArrowRight className="size-4" />
        </Button>
        <button
          type="button"
          onClick={openUnknown}
          className="inline-flex items-center gap-2 self-start text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-accent hover:underline"
        >
          <HelpCircle className="size-4" />
          Je ne sais pas d'où vient le problème
        </button>
      </div>
    </div>
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:items-start lg:gap-10">
      {/* Le véhicule */}
      <div className="min-w-0">
        <div className="orbit-frame relative -mx-4 overflow-hidden sm:mx-0 sm:rounded-2xl">
          <OrbitExplorer
            selected={selectedArea}
            hovered={hovered}
            selectedComponent={selectedComponent}
            zoomed={zoomed}
            showComponents={showComponents}
            onHover={setHovered}
            onSelectArea={selectArea}
            onSelectComponent={(id, service) => {
              setSelectedComponent(id);
              setSelectedService(service);
            }}
          />
          <span className="eyebrow pointer-events-none absolute left-4 top-4 text-ivory/70 sm:left-6 sm:top-5">
            {area ? area.title : "Véhicule à 360°"}
          </span>
          {zoomed && (
            <button
              type="button"
              onClick={resetZoom}
              className="absolute right-4 top-3 z-10 inline-flex items-center gap-1.5 rounded-full border border-border bg-card/80 px-3 py-1.5 text-xs text-muted-foreground backdrop-blur transition-colors hover:border-accent hover:text-foreground sm:right-6"
            >
              <ArrowLeft className="size-3.5" /> Vue d'ensemble
            </button>
          )}
        </div>

        {/* Raccourcis accessibles */}
        <div className="mt-5 flex flex-wrap gap-2" aria-label="Zones du véhicule">
          {QUICK_AREAS.map((id) => (
            <button
              key={id}
              type="button"
              aria-pressed={selectedArea === id}
              onClick={() => selectArea(id)}
              onMouseEnter={() => setHovered(id)}
              onMouseLeave={() => setHovered(null)}
              className={cn(
                "rounded-full border px-3.5 py-2 text-sm transition-all duration-300",
                selectedArea === id
                  ? "border-accent bg-accent text-accent-foreground"
                  : hovered === id
                    ? "border-accent text-foreground"
                    : "border-border bg-card text-muted-foreground hover:border-accent hover:text-foreground",
              )}
            >
              {AREAS[id].shortLabel}
            </button>
          ))}
        </div>
      </div>

      {/* La fiche */}
      <div ref={leftRef} key={leftKey} className="min-w-0 lg:sticky lg:top-24">
        {zoomed ? areaPanel : unknownMode ? unknownPanel : idlePanel}
      </div>

      <RequestDialog open={dialogOpen} onOpenChange={setDialogOpen} prefill={prefill} />
    </div>
  );
}

function Recap({
  area,
  component,
  service,
  onContinue,
}: {
  area: string | null;
  component: string | null;
  service: string | null;
  onContinue: () => void;
}) {
  return (
    <div className="mt-6 flex flex-col gap-3 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-muted-foreground">
        {service ? (
          <>
            {area && <span className="text-foreground">{area}</span>}
            {component && <span className="text-foreground"> · {component}</span>}
            {(area || component) && " — "}
            prise en charge suggérée :{" "}
            <span className="font-semibold text-foreground">{service}</span>
          </>
        ) : (
          "Nous vous orientons vers le bon service, sans diagnostic à distance."
        )}
      </p>
      <Button size="lg" className="gap-2 whitespace-nowrap" onClick={onContinue}>
        Continuer ma demande <ArrowRight className="size-4" />
      </Button>
    </div>
  );
}
