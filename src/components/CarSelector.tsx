import { useState } from "react";
import { ArrowLeft, ArrowRight, Check, HelpCircle, MousePointerClick, X } from "lucide-react";
import { InteractiveCar } from "@/components/InteractiveCar";
import { AREAS, GLOBAL_SYMPTOMS, QUICK_AREAS, type AreaId } from "@/lib/car-selector-data";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

export function CarSelector() {
  const isMobile = useIsMobile();

  const [selectedArea, setSelectedArea] = useState<AreaId | null>(null);
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [selectedSymptom, setSelectedSymptom] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [hovered, setHovered] = useState<AreaId | null>(null);
  const [unknownMode, setUnknownMode] = useState(false);

  const area = selectedArea ? AREAS[selectedArea] : null;
  const zoomed = !unknownMode && !!area;

  const selectArea = (id: AreaId) => {
    setUnknownMode(false);
    setSelectedArea(id);
    setSelectedComponent(null);
    setSelectedSymptom(null);
    setSelectedService(AREAS[id].service);
  };

  const resetZoom = () => {
    setSelectedArea(null);
    setHovered(null);
  };

  const openUnknown = () => {
    setUnknownMode(true);
    setSelectedArea(null);
    setSelectedComponent(null);
    setHovered(null);
  };

  return (
    <div className="w-full">
      <div className="relative surface-panel overflow-hidden rounded-2xl px-2 py-5 sm:px-6 sm:py-8">
        <span className="eyebrow absolute left-4 top-4 sm:left-6">
          {area ? area.title : "Sélecteur véhicule"}
        </span>

        {zoomed && (
          <button
            type="button"
            onClick={resetZoom}
            className="absolute right-4 top-3 z-10 inline-flex items-center gap-1.5 rounded-full border border-border bg-card/80 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-accent hover:text-foreground sm:right-6"
          >
            <ArrowLeft className="size-3.5" /> Revenir au véhicule
          </button>
        )}

        <div className="pt-6">
          <InteractiveCar
            selected={selectedArea}
            hovered={hovered}
            selectedComponent={selectedComponent}
            zoomed={zoomed}
            compact={isMobile}
            onHover={setHovered}
            onSelectArea={selectArea}
            onSelectComponent={(id, service) => {
              setSelectedComponent(id);
              setSelectedService(service);
            }}
          />
        </div>

        {!zoomed && (
          <p className="mt-2 flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <MousePointerClick className="size-3.5" />
            Cliquez sur une zone du véhicule
          </p>
        )}
      </div>

      {/* Raccourcis accessibles / mobile */}
      <div className="mt-4 flex flex-wrap gap-2">
        {QUICK_AREAS.map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => selectArea(id)}
            onMouseEnter={() => setHovered(id)}
            onMouseLeave={() => setHovered(null)}
            className={cn(
              "rounded-full border px-3.5 py-2 text-sm transition-all duration-300",
              selectedArea === id
                ? "border-accent bg-accent text-accent-foreground"
                : "border-border bg-card text-muted-foreground hover:border-accent hover:text-foreground",
            )}
          >
            {AREAS[id].shortLabel}
          </button>
        ))}
      </div>

      {/* Panneau symptômes de zone */}
      {zoomed && area && (
        <div className="mt-4 surface-panel animate-fade-in rounded-2xl p-5 sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="eyebrow">Zone sélectionnée</span>
              <h2 className="mt-2 text-xl font-semibold sm:text-2xl">{area.title}</h2>
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
                  {on && <Check className="size-4 text-accent" />}
                </button>
              );
            })}
          </div>

          <Recap
            area={area.title}
            component={
              selectedComponent
                ? (area.components.find((c) => c.id === selectedComponent)?.label ?? null)
                : null
            }
            service={selectedService}
          />
        </div>
      )}

      {/* Parcours alternatif */}
      {unknownMode && (
        <div className="mt-4 surface-panel animate-fade-in rounded-2xl p-5 sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="eyebrow">Orientation guidée</span>
              <h2 className="mt-2 text-xl font-semibold sm:text-2xl">
                Pas de problème. Qu'est-ce que vous constatez ?
              </h2>
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

          <Recap area={null} component={null} service={selectedService} />
        </div>
      )}

      {!unknownMode && (
        <button
          type="button"
          onClick={openUnknown}
          className="mt-4 inline-flex items-center gap-2 text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-accent hover:underline"
        >
          <HelpCircle className="size-4" />
          Je ne sais pas d'où vient le problème
        </button>
      )}
    </div>
  );
}

function Recap({
  area,
  component,
  service,
}: {
  area: string | null;
  component: string | null;
  service: string | null;
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
      <Button size="lg" className="gap-2">
        Continuer ma demande <ArrowRight className="size-4" />
      </Button>
    </div>
  );
}
