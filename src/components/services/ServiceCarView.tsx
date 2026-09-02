import type { KeyboardEvent, ReactNode } from "react";
import type { AreaId } from "@/lib/car-selector-data";
import type { ServiceComponent } from "@/lib/service-pages-data";

type Props = {
  components: ServiceComponent[];
  focus: { x: number; y: number; scale: number };
  area: AreaId;
  selected: string | null;
  hovered: string | null;
  onHover: (slug: string | null) => void;
  onSelect: (slug: string) => void;
  compact?: boolean;
};

const VIEW = { w: 980, h: 430, cx: 490, cy: 220 };

/** Groupe mécanique mis en avant (accent orange) selon la zone de la page */
const HIGHLIGHT: Partial<Record<AreaId, ReactNode>> = {
  braking: (
    <>
      <circle cx="240" cy="306" r="46" />
      <path d="M272 274 a46 46 0 0 1 0 64" strokeWidth="9" />
      <circle cx="240" cy="306" r="30" strokeWidth="2" opacity="0.7" />
    </>
  ),
  "front-wheel": (
    <>
      <circle cx="240" cy="306" r="60" />
      <circle cx="240" cy="306" r="42" strokeWidth="2" />
      <path d="M272 274 a46 46 0 0 1 0 64" strokeWidth="7" opacity="0.8" />
    </>
  ),
  suspension: (
    <>
      <path d="M600 246 v-8 M586 238 h30 M600 250 l32 12 l-32 12 l32 12 l-32 12 l32 12 l-32 10" />
      <path d="M568 318 h64" strokeWidth="4" />
      <circle cx="600" cy="322" r="6" fill="var(--color-accent)" stroke="none" />
    </>
  ),
  transmission: (
    <>
      <path d="M348 268 h96 l26 22 v20 h-122 z" />
      <path d="M470 300 h96" strokeWidth="6" />
      <circle cx="378" cy="292" r="9" />
    </>
  ),
  exhaust: (
    <>
      <path d="M770 318 h50 l14 -10 h56" strokeWidth="6" />
      <rect x="790" y="298" width="46" height="22" rx="11" />
      <path d="M894 300 c14 -6 22 -2 26 6" strokeWidth="2" opacity="0.7" />
    </>
  ),
  battery: (
    <>
      <rect x="192" y="262" width="46" height="30" rx="5" />
      <path d="M202 262 v-8 M228 262 v-8" strokeWidth="4" />
      <circle cx="172" cy="294" r="12" strokeWidth="2" />
      <circle cx="250" cy="294" r="12" strokeWidth="2" />
    </>
  ),
  engine: (
    <>
      <rect x="112" y="224" width="118" height="60" rx="8" />
      <path d="M132 224 v-14 h34 v14" />
      <path d="M132 252 h78 M132 266 h78" strokeWidth="2" opacity="0.7" />
    </>
  ),
  general: (
    <path
      d="M74 306 v-52 c0-17 11-28 28-31 l150-26 74-68 c17-15 37-23 60-23 h164 c25 0 46 9 62 26 l66 66 148 26 c19 3 28 15 28 33 v49 z"
      strokeWidth="2.5"
      strokeDasharray="10 9"
    />
  ),
};


/**
 * Vue technique du véhicule pour les pages services :
 * carrosserie très atténuée, groupe mécanique concerné mis en avant,
 * hotspots interactifs pour chaque composant.
 */
export function ServiceCarView({
  components,
  focus,
  selected,
  hovered,
  onHover,
  onSelect,
  compact = false,
}: Props) {
  const scale = compact ? 1 + (focus.scale - 1) * 0.55 : focus.scale;
  const transform = `translate(${VIEW.cx - scale * focus.x} ${VIEW.cy - scale * focus.y}) scale(${scale})`;
  // Les hotspots sont dessinés hors du groupe zoomé pour garder textes et traits nets.
  const px = (x: number) => VIEW.cx + scale * (x - focus.x);
  const py = (y: number) => VIEW.cy + scale * (y - focus.y);

  return (
    <svg
      viewBox={`0 0 ${VIEW.w} ${VIEW.h}`}
      className="h-auto w-full select-none"
      role="group"
      aria-label="Vue technique du véhicule"
    >
      <g transform={transform}>
        {/* repères blueprint */}
        <g stroke="var(--color-border)" strokeWidth="1" opacity="0.35">
          <line x1="20" y1="352" x2="960" y2="352" strokeDasharray="2 10" />
          <line x1="60" y1="70" x2="60" y2="386" strokeDasharray="4 10" />
        </g>

        {/* reste du véhicule : gris très faible */}
        <g opacity="0.16" fill="none" stroke="var(--color-steel)" strokeWidth="2.5" strokeLinejoin="round">
          <path d="M74 306 v-52 c0-17 11-28 28-31 l150-26 74-68 c17-15 37-23 60-23 h164 c25 0 46 9 62 26 l66 66 148 26 c19 3 28 15 28 33 v49 z" />
          <path d="M308 194 l60-56 c11-11 25-16 41-16 h54 v72 z" strokeWidth="2" />
          <path d="M486 122 h106 c17 0 31 6 43 18 l54 54 h-203 z" strokeWidth="2" />
          <circle cx="240" cy="306" r="70" />
          <circle cx="724" cy="306" r="70" />
        </g>

        {/* éléments secondaires : gris sombre */}
        <g opacity="0.5" fill="none" stroke="var(--color-steel)" strokeWidth="2">
          <rect x="112" y="224" width="118" height="60" rx="8" />
          <path d="M348 268 h96 l26 22 v20 h-122 z" />
          <path d="M470 300 h96" strokeWidth="4" />
          <path d="M770 318 h58 l14 -10 h56" strokeWidth="4" />
          <path d="M600 250 l30 12 l-30 12 l30 12 l-30 12 l30 12" />
          <circle cx="240" cy="306" r="42" />
          <circle cx="724" cy="306" r="42" />
        </g>
      </g>

      {/* hotspots */}
      <g>
        {components.map((comp) => {
          const on = selected === comp.slug || hovered === comp.slug;
          const dim = selected !== null && selected !== comp.slug && hovered !== comp.slug;
          const x = px(comp.x);
          const y = py(comp.y);
          const lx = x + comp.dx;
          const ly = y + comp.dy;
          const anchor = comp.dx > 20 ? "start" : comp.dx < -20 ? "end" : "middle";
          const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onSelect(comp.slug);
            }
          };

          return (
            <g
              key={comp.slug}
              className="car-zone"
              style={{ opacity: dim ? 0.4 : 1, cursor: "pointer" }}
              tabIndex={0}
              role="button"
              aria-pressed={selected === comp.slug}
              aria-label={comp.name}
              onMouseEnter={() => onHover(comp.slug)}
              onMouseLeave={() => onHover(null)}
              onFocus={() => onHover(comp.slug)}
              onBlur={() => onHover(null)}
              onClick={() => onSelect(comp.slug)}
              onKeyDown={handleKey}
            >
              <line
                x1={x}
                y1={y}
                x2={lx}
                y2={ly}
                stroke={on ? "var(--color-accent)" : "var(--color-steel)"}
                strokeWidth="1.2"
                opacity={on ? 0.9 : 0.45}
              />
              <circle
                cx={x}
                cy={y}
                r={on ? 11 : 8}
                fill={on ? "color-mix(in oklab, var(--color-accent) 22%, transparent)" : "transparent"}
                stroke={on ? "var(--color-accent)" : "var(--color-steel)"}
                strokeWidth="2"
                className={on ? "zone-pulse" : undefined}
                style={{ transition: "r 200ms ease-out" }}
              />
              <circle cx={x} cy={y} r="3" fill={on ? "var(--color-accent)" : "var(--color-steel)"} />
              {/* cible tactile élargie */}
              <circle cx={x} cy={y} r="22" fill="transparent" />
              <text
                x={lx}
                y={ly}
                textAnchor={anchor}
                dominantBaseline="middle"
                fontSize="15"
                fontWeight={on ? 700 : 500}
                fill={on ? "var(--color-accent)" : "var(--color-muted-foreground)"}
                style={{ transition: "fill 200ms ease-out" }}
              >
                {comp.name}
              </text>
            </g>
          );
        })}
      </g>
    </svg>
  );
}
