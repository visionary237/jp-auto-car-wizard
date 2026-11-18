import { useCallback, useEffect, useRef, useState } from "react";
import { MoveHorizontal } from "lucide-react";
import gsap from "gsap";
import { AREAS, QUICK_AREAS, type AreaId } from "@/lib/car-selector-data";
import { FRAME_COUNT, ORBIT_AREAS, ORBIT_COMPONENTS, VIEWS, type ViewId } from "@/lib/orbit";
import { useCanvasDraw, useFrameSequence } from "@/hooks/use-frame-sequence";
import { cn } from "@/lib/utils";

type Props = {
  selected: AreaId | null;
  hovered: AreaId | null;
  selectedComponent: string | null;
  zoomed: boolean;
  showComponents?: boolean;
  onHover: (id: AreaId | null) => void;
  onSelectArea: (id: AreaId) => void;
  onSelectComponent: (componentId: string, service: string) => void;
};

const VIEW_IDS = Object.keys(VIEWS) as ViewId[];
const snappedView = (f: number): ViewId | null => VIEW_IDS.find((v) => Math.abs(VIEWS[v].frame - f) < 0.6) ?? null;

/**
 * Véhicule à 360° : séquence photoréaliste que l'on fait tourner au doigt ou à la souris.
 * Les zones apparaissent sous l'angle où elles se voient ; au clic, la voiture se tourne
 * vers la bonne vue puis la « caméra » zoome sur la zone.
 */
export function OrbitExplorer({
  selected,
  hovered,
  selectedComponent,
  zoomed,
  showComponents = true,
  onHover,
  onSelectArea,
  onSelectComponent,
}: Props) {
  const loaded = useFrameSequence();
  const { canvas, draw } = useCanvasDraw();
  const frame = useRef<{ v: number }>({ v: VIEWS.profile.frame });
  const [shown, setShown] = useState(VIEWS.profile.frame);
  const [arrived, setArrived] = useState(false);
  const [dragging, setDragging] = useState(false);
  const reduced = useRef(false);
  const stage = useRef<HTMLDivElement>(null);
  const tween = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const render = useCallback(
    (f: number) => {
      frame.current.v = f;
      draw(f);
      setShown(Math.round(f * 10) / 10);
    },
    [draw],
  );

  useEffect(() => draw(frame.current.v, true), [loaded, draw]);
  useEffect(() => {
    const on = () => draw(frame.current.v, true);
    window.addEventListener("resize", on);
    return () => window.removeEventListener("resize", on);
  }, [draw]);

  const rotateTo = useCallback(
    (target: number, onDone?: () => void) => {
      tween.current?.kill();
      const dist = Math.abs(target - frame.current.v);
      if (reduced.current || dist < 0.5) {
        render(target);
        onDone?.();
        return;
      }
      tween.current = gsap.to(frame.current, {
        v: target,
        duration: Math.min(1.6, 0.45 + dist / 70),
        ease: "power2.inOut",
        onUpdate: () => render(frame.current.v),
        onComplete: () => {
          render(target);
          onDone?.();
        },
      });
    },
    [render],
  );

  // Zone choisie : la voiture se tourne vers sa vue, puis on zoome.
  useEffect(() => {
    setArrived(false);
    if (!selected) return;
    rotateTo(VIEWS[ORBIT_AREAS[selected].view].frame, () => setArrived(true));
  }, [selected, rotateTo]);

  // Glisser pour faire tourner
  const drag = useRef<{ x: number; f: number } | null>(null);
  const onPointerDown = (e: React.PointerEvent) => {
    if (zoomed || (e.target as HTMLElement).closest("button")) return;
    tween.current?.kill();
    drag.current = { x: e.clientX, f: frame.current.v };
    setDragging(true);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current || !stage.current) return;
    const perPx = FRAME_COUNT / (stage.current.clientWidth * 1.15);
    const f = Math.max(0, Math.min(FRAME_COUNT - 1, drag.current.f - (e.clientX - drag.current.x) * perPx));
    render(f);
  };
  const onPointerUp = () => {
    if (!drag.current) return;
    drag.current = null;
    setDragging(false);
    // Aimantation vers l'angle le plus proche s'il est à portée.
    const near = VIEW_IDS.map((v) => VIEWS[v].frame).sort((a, b) => Math.abs(a - frame.current.v) - Math.abs(b - frame.current.v))[0];
    if (Math.abs(near - frame.current.v) < 14) rotateTo(near);
  };

  const view = snappedView(shown);
  const isZoomed = zoomed && arrived && !!selected;
  // Les pièces apparaissent une fois le zoom terminé.
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (!isZoomed) return setReady(false);
    const t = setTimeout(() => setReady(true), reduced.current ? 0 : 850);
    return () => clearTimeout(t);
  }, [isZoomed, selected]);
  const focus = isZoomed ? ORBIT_AREAS[selected!].focus : { x: 50, y: 50, scale: 1 };
  const s = isZoomed ? focus.scale : 1;
  const project = (x: number, y: number) => ({ left: `${50 + (x - focus.x) * s}%`, top: `${50 + (y - focus.y) * s}%` });
  const transform = s === 1 ? "translate(0%,0%) scale(1)" : `translate(${50 - focus.x * s}%, ${50 - focus.y * s}%) scale(${s})`;
  const area = selected ? AREAS[selected] : null;

  return (
    <div className="relative">
      <div
        ref={stage}
        className={cn(
          "orbit-stage relative aspect-video w-full touch-pan-y select-none overflow-hidden",
          !zoomed && (dragging ? "cursor-grabbing" : "cursor-grab"),
        )}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        aria-label="Véhicule à 360°, glissez pour le faire tourner"
      >
        <div className="photo-car-stage absolute inset-0 origin-top-left" style={{ transform }}>
          <canvas ref={canvas} className="absolute inset-0 h-full w-full" aria-hidden="true" />
          {/* Image haute définition à l'arrêt sur un angle clé (zoom net) */}
          {VIEW_IDS.map((v) => (
            <img
              key={v}
              src={VIEWS[v].key}
              alt=""
              aria-hidden="true"
              draggable={false}
              loading="lazy"
              className={cn(
                "absolute inset-0 h-full w-full object-cover transition-opacity duration-300",
                view === v ? "opacity-100" : "opacity-0",
              )}
            />
          ))}
        </div>

        <div
          className={cn("pointer-events-none absolute inset-0 transition-opacity duration-700", isZoomed ? "opacity-100" : "opacity-0")}
          style={{ background: "radial-gradient(ellipse 42% 52% at 50% 50%, transparent 35%, oklch(0.1 0.004 250 / 0.8) 100%)" }}
          aria-hidden="true"
        />

        {/* Zones visibles sous cet angle */}
        <ul className={cn("absolute inset-0 transition-opacity duration-300", view && !zoomed && !dragging ? "opacity-100" : "pointer-events-none opacity-0")}>
          {QUICK_AREAS.filter((id) => ORBIT_AREAS[id].view === view).map((id, i) => {
            const p = ORBIT_AREAS[id].hotspot;
            const on = hovered === id || selected === id;
            return (
              <li key={id} className="absolute" style={{ left: `${p.x}%`, top: `${p.y}%` }}>
                <button
                  type="button"
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
                  <span className={cn("hotspot-label", p.x > 60 ? "right-full mr-2" : "left-full ml-2", on ? "opacity-100" : "opacity-0 group-hover:opacity-100")}>
                    {AREAS[id].shortLabel}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        {/* Pièces de la zone */}
        {isZoomed && ready && area && showComponents && (
          <ul className="absolute inset-0">
            {area.components.map((c, i) => {
              const p = ORBIT_COMPONENTS[c.id];
              if (!p) return null;
              const on = selectedComponent === c.id;
              return (
                <li key={c.id} className="car-callout absolute" style={{ ...project(p.x, p.y), animationDelay: `${i * 80}ms` }}>
                  <button
                    type="button"
                    aria-pressed={on}
                    onClick={() => onSelectComponent(c.id, c.service)}
                    className="hotspot group -translate-x-1/2 -translate-y-1/2"
                    data-on={on}
                  >
                    <span className="hotspot-dot" />
                    <span className={cn("hotspot-label opacity-100", p.side === "l" ? "right-full mr-2" : "left-full ml-2", on && "border-accent bg-accent text-accent-foreground")}>
                      {c.label}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}

        {loaded < 8 && (
          <div className="absolute inset-0 grid place-items-center">
            <span className="eyebrow animate-pulse text-ivory/60">Préparation du véhicule…</span>
          </div>
        )}
      </div>

      {/* Commandes de rotation */}
      {!zoomed && (
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex gap-1 rounded-full border border-border bg-card/60 p-1" role="group" aria-label="Angle de vue">
            {VIEW_IDS.map((v) => (
              <button
                key={v}
                type="button"
                aria-pressed={view === v}
                onClick={() => rotateTo(VIEWS[v].frame)}
                className={cn(
                  "rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] transition-colors",
                  view === v ? "bg-ivory text-background" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {VIEWS[v].label}
              </button>
            ))}
          </div>
          <p className="flex items-center gap-2 text-xs text-muted-foreground">
            <MoveHorizontal className="size-4 text-accent" /> Glissez pour faire tourner la voiture
          </p>
        </div>
      )}
    </div>
  );
}
