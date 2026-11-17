import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";
import { AREAS, QUICK_AREAS, type AreaId } from "@/lib/car-selector-data";
import { PHOTO_AREAS, PHOTO_COMPONENTS } from "@/lib/car-photo-map";
import { cn } from "@/lib/utils";

type Props = {
  selected: AreaId | null;
  hovered: AreaId | null;
  selectedComponent: string | null;
  zoomed: boolean;
  showComponents?: boolean;
  compact?: boolean;
  onHover: (id: AreaId | null) => void;
  onSelectArea: (id: AreaId) => void;
  onSelectComponent: (componentId: string, service: string) => void;
};

const MEDIA = "/media";

/**
 * Véhicule photoréaliste : la vidéo de révélation se joue une fois puis s'arrête
 * sur sa dernière image, où les zones deviennent cliquables. Au clic, zoom
 * « caméra » sur la zone et apparition des pièces concernées.
 */
export function PhotoCar({
  selected,
  hovered,
  selectedComponent,
  zoomed,
  showComponents = true,
  compact = false,
  onHover,
  onSelectArea,
  onSelectComponent,
}: Props) {
  const video = useRef<HTMLVideoElement>(null);
  const [ended, setEnded] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    // Mouvement réduit ou économie de données : on montre directement la vue finale.
    // @ts-expect-error API non standard
    if (mq.matches || navigator.connection?.saveData) setEnded(true);
  }, []);

  // Une zone choisie via les raccourcis pendant la vidéo : on saute à la fin.
  useEffect(() => {
    if (selected && !ended) finish();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  const finish = () => {
    const v = video.current;
    if (v && Number.isFinite(v.duration)) {
      v.pause();
      v.currentTime = v.duration;
    }
    setEnded(true);
  };

  const replay = () => {
    const v = video.current;
    if (!v) return;
    setEnded(false);
    onHover(null);
    v.currentTime = 0;
    void v.play().catch(() => setEnded(true));
  };

  const area = selected ? AREAS[selected] : null;
  const f = zoomed && selected ? PHOTO_AREAS[selected].focus : { x: 50, y: 50, scale: 1 };
  const s = zoomed && selected ? (compact ? 1 + (f.scale - 1) * 0.75 : f.scale) : 1;
  // Position d'un point de l'image une fois la « caméra » déplacée (en % du cadre).
  const project = (x: number, y: number) => ({
    left: `${50 + (x - f.x) * s}%`,
    top: `${50 + (y - f.y) * s}%`,
  });
  const stageTransform =
    s === 1 ? "translate(0%, 0%) scale(1)" : `translate(${50 - f.x * s}%, ${50 - f.y * s}%) scale(${s})`;

  return (
    <div className="photo-car relative aspect-video w-full select-none overflow-hidden" aria-label="Sélecteur de zone du véhicule">
      {/* Image + vidéo, déplacées ensemble par le zoom */}
      <div className="photo-car-stage absolute inset-0 origin-top-left" style={{ transform: stageTransform }}>
        <picture>
          <source media="(max-width: 767px)" srcSet={`${MEDIA}/hero-end-1280.webp`} />
          <img
            src={`${MEDIA}/hero-end.webp`}
            alt="Berline graphite en studio, vue trois-quarts avant"
            className="absolute inset-0 h-full w-full object-cover"
            draggable={false}
          />
        </picture>
        {!reduced && (
          <video
            ref={video}
            className={cn(
              "absolute inset-0 h-full w-full object-cover transition-opacity duration-500",
              ended && "pointer-events-none opacity-0",
            )}
            autoPlay
            muted
            playsInline
            preload="auto"
            poster={`${MEDIA}/hero-end-1280.webp`}
            onEnded={() => setEnded(true)}
            onError={() => setEnded(true)}
            aria-hidden="true"
          >
            <source media="(max-width: 767px)" src={`${MEDIA}/hero-720.mp4`} type="video/mp4" />
            <source src={`${MEDIA}/hero-1080.webm`} type="video/webm" />
            <source src={`${MEDIA}/hero-1080.mp4`} type="video/mp4" />
          </video>
        )}
      </div>

      {/* Assombrit le décor autour de la zone explorée */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 transition-opacity duration-700",
          zoomed ? "opacity-100" : "opacity-0",
        )}
        style={{ background: "radial-gradient(ellipse 45% 55% at 50% 50%, transparent 40%, oklch(0.12 0.006 250 / 0.75) 100%)" }}
        aria-hidden="true"
      />

      {/* Zones (vue d'ensemble) */}
      <ul className={cn("absolute inset-0 transition-opacity duration-500", ended && !zoomed ? "opacity-100" : "pointer-events-none opacity-0")}>
        {QUICK_AREAS.map((id, i) => {
          const p = PHOTO_AREAS[id].hotspot;
          const on = hovered === id || selected === id;
          return (
            <li key={id} className="absolute" style={{ left: `${p.x}%`, top: `${p.y}%` }}>
              <button
                type="button"
                tabIndex={ended && !zoomed ? 0 : -1}
                aria-label={AREAS[id].hoverLabel}
                onMouseEnter={() => onHover(id)}
                onMouseLeave={() => onHover(null)}
                onFocus={() => onHover(id)}
                onBlur={() => onHover(null)}
                onClick={() => onSelectArea(id)}
                className="hotspot group -translate-x-1/2 -translate-y-1/2"
                data-on={on}
                style={{ animationDelay: `${i * 70}ms` }}
              >
                <span className="hotspot-ring" />
                <span className="hotspot-dot" />
                <span
                  className={cn(
                    "hotspot-label",
                    p.x > 70 ? "right-full mr-2" : "left-full ml-2",
                    on ? "opacity-100" : "opacity-0 group-hover:opacity-100",
                  )}
                >
                  {AREAS[id].shortLabel}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {/* Pièces de la zone explorée */}
      {zoomed && area && showComponents && (
        <ul className="absolute inset-0">
          {area.components.map((c, i) => {
            const p = PHOTO_COMPONENTS[c.id];
            if (!p) return null;
            const pos = project(p.x, p.y);
            const on = selectedComponent === c.id;
            return (
              <li key={c.id} className="car-callout absolute" style={{ ...pos, animationDelay: `${i * 80}ms` }}>
                <button
                  type="button"
                  aria-pressed={on}
                  onClick={() => onSelectComponent(c.id, c.service)}
                  className="hotspot group -translate-x-1/2 -translate-y-1/2"
                  data-on={on}
                >
                  <span className="hotspot-dot" />
                  <span
                    className={cn(
                      "hotspot-label opacity-100",
                      p.side === "l" ? "right-full mr-2" : "left-full ml-2",
                      on && "border-accent bg-accent text-accent-foreground",
                    )}
                  >
                    {c.label}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      )}

      {/* Contrôles vidéo */}
      {!reduced && (
        <div className="absolute bottom-3 right-3 flex gap-2">
          {!ended ? (
            <button type="button" onClick={finish} className="photo-car-ctl">
              Passer
            </button>
          ) : (
            !zoomed && (
              <button type="button" onClick={replay} className="photo-car-ctl" aria-label="Revoir la vidéo">
                <Play className="size-3" /> Revoir
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
}
