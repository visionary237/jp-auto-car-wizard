import type { KeyboardEvent } from "react";
import { AREAS, CAR_ZONES, type AreaId } from "@/lib/car-selector-data";

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

const VIEW = { w: 980, h: 430, cx: 490, cy: 220 };

export function InteractiveCar({
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
  const active = selected ? AREAS[selected] : null;
  const isOn = (id: AreaId) => hovered === id || selected === id;

  const scale = zoomed && active ? (compact ? 1 + (active.focus.scale - 1) * 0.6 : active.focus.scale) : 1;
  const fx = active ? active.focus.x : VIEW.cx;
  const fy = active ? active.focus.y : VIEW.cy;
  const transform =
    zoomed && active
      ? `translate(${VIEW.cx - scale * fx} ${VIEW.cy - scale * fy}) scale(${scale})`
      : "translate(0 0) scale(1)";

  const zoneProps = (id: AreaId) => ({
    className: "car-zone",
    tabIndex: 0,
    role: "button" as const,
    "aria-label": AREAS[id].hoverLabel,
    "aria-pressed": selected === id,
    fill: "transparent",
    onMouseEnter: () => onHover(id),
    onMouseLeave: () => onHover(null),
    onFocus: () => onHover(id),
    onBlur: () => onHover(null),
    onClick: () => onSelectArea(id),
    onKeyDown: (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onSelectArea(id);
      }
    },
  });

  return (
    <svg viewBox="0 0 980 430" className="h-auto w-full select-none" aria-label="Sélecteur de zone du véhicule">
      <defs>
        <linearGradient id="aeBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.38 0.006 250)" />
          <stop offset="100%" stopColor="oklch(0.23 0.006 250)" />
        </linearGradient>
        <linearGradient id="aeGlass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="oklch(0.5 0.012 250)" />
          <stop offset="100%" stopColor="oklch(0.32 0.008 250)" />
        </linearGradient>
      </defs>

      <g className="car-stage" transform={transform}>
        {/* repères blueprint */}
        <g stroke="var(--color-border)" strokeWidth="1" opacity="0.4">
          <line x1="20" y1="352" x2="960" y2="352" strokeDasharray="2 10" />
          <line x1="60" y1="70" x2="60" y2="386" strokeDasharray="4 10" />
          <line x1="920" y1="70" x2="920" y2="386" strokeDasharray="4 10" />
        </g>

        <ellipse cx="490" cy="356" rx="382" ry="13" fill="oklch(0 0 0 / 0.4)" />

        {/* mécanique sous carrosserie (toujours visible, discrète) */}
        <g stroke="var(--color-steel)" fill="none" strokeWidth="2" opacity="0.35">
          <rect x="112" y="224" width="118" height="60" rx="8" />
          <path d="M348 268 h96 l26 22 v20 h-122 z" />
          <path d="M470 300 h96" strokeWidth="5" />
          <path d="M770 318 h58 l14 -10 h56" strokeWidth="5" />
          <path d="M600 250 l30 12 l-30 12 l30 12 l-30 12 l30 12" />
        </g>

        {/* carrosserie */}
        <g className="car-body" data-dim={zoomed} data-soft={!zoomed && hovered !== null}>
          <path
            d="M74 306 v-52 c0-17 11-28 28-31 l150-26 74-68 c17-15 37-23 60-23 h164 c25 0 46 9 62 26 l66 66 148 26 c19 3 28 15 28 33 v49 z"
            fill="url(#aeBody)"
            stroke="var(--color-steel)"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <path
            d="M308 194 l60-56 c11-11 25-16 41-16 h54 v72 z"
            fill="url(#aeGlass)"
            stroke="var(--color-steel)"
            strokeWidth="2"
          />
          <path
            d="M486 122 h106 c17 0 31 6 43 18 l54 54 h-203 z"
            fill="url(#aeGlass)"
            stroke="var(--color-steel)"
            strokeWidth="2"
          />
          <path d="M96 258 h150" stroke="var(--color-steel)" strokeWidth="2" opacity="0.55" />
          <path d="M300 248 h556" stroke="var(--color-steel)" strokeWidth="1.5" opacity="0.3" />
          <path d="M470 196 v110" stroke="var(--color-steel)" strokeWidth="1.5" opacity="0.25" />
          <rect x="392" y="222" width="34" height="7" rx="3.5" fill="var(--color-steel)" opacity="0.8" />
          <rect x="596" y="222" width="34" height="7" rx="3.5" fill="var(--color-steel)" opacity="0.8" />
          <path d="M76 238 h34 a10 10 0 0 1 0 20 H76 z" fill="var(--color-ivory)" opacity="0.7" />
          <path d="M896 240 h-30 a9 9 0 0 0 0 18 h30 z" fill="var(--color-ivory)" opacity="0.3" />
        </g>

        {/* passages de roue */}
        <g fill="var(--color-background)">
          <circle cx="240" cy="306" r="80" />
          <circle cx="724" cy="306" r="80" />
        </g>

        {/* roues */}
        <g className="car-body" data-dim={zoomed} data-soft={!zoomed && hovered !== null}>
          {[240, 724].map((cx) => (
            <g key={cx}>
              <circle cx={cx} cy="306" r="70" fill="oklch(0.18 0.004 250)" stroke="var(--color-steel)" strokeWidth="2.5" />
              <circle cx={cx} cy="306" r="42" fill="oklch(0.27 0.005 250)" stroke="var(--color-steel)" strokeWidth="2" />
              <circle cx={cx} cy="306" r="10" fill="var(--color-steel)" opacity="0.85" />
              {[0, 60, 120, 180, 240, 300].map((a) => (
                <line
                  key={a}
                  x1={cx}
                  y1="306"
                  x2={cx + 38 * Math.cos((a * Math.PI) / 180)}
                  y2={306 + 38 * Math.sin((a * Math.PI) / 180)}
                  stroke="var(--color-steel)"
                  strokeWidth="3"
                  opacity="0.5"
                />
              ))}
            </g>
          ))}
        </g>

        {/* révélations accent par zone */}
        <g stroke="var(--color-accent)" fill="none" strokeWidth="3" strokeLinecap="round">
          <g className="car-reveal" data-active={isOn("engine")}>
            <rect x="112" y="224" width="118" height="60" rx="8" />
            <path d="M132 224 v-14 h34 v14" />
            <path d="M132 252 h78 M132 266 h78" strokeWidth="2" opacity="0.7" />
          </g>
          <g className="car-reveal" data-active={isOn("battery")}>
            <rect x="192" y="262" width="46" height="30" rx="5" />
            <path d="M202 262 v-8 M228 262 v-8" strokeWidth="4" />
          </g>
          <g className="car-reveal" data-active={isOn("ac")}>
            <path d="M366 208 h72 l16 16 v14 h-88 z" />
            <path d="M382 238 v14 M406 238 v18 M430 238 v14" strokeWidth="2" />
          </g>
          <g className="car-reveal" data-active={isOn("front-wheel") || isOn("braking")}>
            <circle cx="240" cy="306" r="46" />
            <path d="M272 274 a46 46 0 0 1 0 64" strokeWidth="9" />
          </g>
          <g className="car-reveal" data-active={isOn("rear-wheel")}>
            <circle cx="724" cy="306" r="46" />
            <path d="M756 274 a46 46 0 0 1 0 64" strokeWidth="9" />
          </g>
          <g className="car-reveal" data-active={isOn("suspension")}>
            <path d="M600 246 v-8 M586 238 h30 M600 250 l32 12 l-32 12 l32 12 l-32 12 l32 12 l-32 10" />
            <circle cx="600" cy="322" r="6" fill="var(--color-accent)" stroke="none" />
          </g>
          <g className="car-reveal" data-active={isOn("transmission")}>
            <path d="M348 268 h96 l26 22 v20 h-122 z" />
            <path d="M470 300 h96" strokeWidth="6" />
            <circle cx="378" cy="292" r="9" />
          </g>
          <g className="car-reveal" data-active={isOn("exhaust")}>
            <path d="M770 318 h50 l14 -10 h56" strokeWidth="6" />
            <rect x="790" y="298" width="46" height="22" rx="11" />
            <path d="M894 300 c14 -6 22 -2 26 6" strokeWidth="2" opacity="0.7" />
          </g>
          <g className="car-reveal" data-active={isOn("general")}>
            <path
              d="M74 306 v-52 c0-17 11-28 28-31 l150-26 74-68 c17-15 37-23 60-23 h164 c25 0 46 9 62 26 l66 66 148 26 c19 3 28 15 28 33 v49 z"
              strokeWidth="2.5"
              strokeDasharray="10 9"
            />
          </g>
        </g>

        {/* zones cliquables */}
        {!zoomed && (
          <g>
            <rect x="66" y="200" width="120" height="108" rx="14" {...zoneProps("engine")} />
            <rect x="186" y="246" width="62" height="62" rx="12" {...zoneProps("battery")} />
            <rect x="340" y="126" width="150" height="112" rx="14" {...zoneProps("ac")} />
            <circle cx="240" cy="306" r="80" {...zoneProps("front-wheel")} />
            <circle cx="724" cy="306" r="80" {...zoneProps("rear-wheel")} />
            <rect x="336" y="252" width="150" height="72" rx="14" {...zoneProps("transmission")} />
            <rect x="540" y="234" width="126" height="90" rx="14" {...zoneProps("suspension")} />
            <rect x="800" y="268" width="150" height="64" rx="14" {...zoneProps("exhaust")} />
            <rect x="500" y="100" width="200" height="80" rx="14" {...zoneProps("general")} />
          </g>
        )}

        {/* contour subtil de la zone active */}
        <g fill="none" stroke="var(--color-accent)" strokeWidth="1.5" strokeDasharray="6 7" pointerEvents="none" opacity="0.9">
          {isOn("engine") && <rect x="66" y="200" width="120" height="108" rx="14" className="zone-pulse" />}
          {isOn("battery") && <rect x="186" y="246" width="62" height="62" rx="12" className="zone-pulse" />}
          {isOn("ac") && <rect x="340" y="126" width="150" height="112" rx="14" className="zone-pulse" />}
          {(isOn("front-wheel") || isOn("braking")) && <circle cx="240" cy="306" r="80" className="zone-pulse" />}
          {isOn("rear-wheel") && <circle cx="724" cy="306" r="80" className="zone-pulse" />}
          {isOn("transmission") && <rect x="336" y="252" width="150" height="72" rx="14" className="zone-pulse" />}
          {isOn("suspension") && <rect x="540" y="234" width="126" height="90" rx="14" className="zone-pulse" />}
          {isOn("exhaust") && <rect x="800" y="268" width="150" height="64" rx="14" className="zone-pulse" />}
          {isOn("general") && <rect x="500" y="100" width="200" height="80" rx="14" className="zone-pulse" />}
        </g>

        {/* labels de survol */}
        {!zoomed && (
          <g pointerEvents="none">
            {CAR_ZONES.map((id) => {
              const a = AREAS[id];
              const w = a.hoverLabel.length * 8.1 + 26;
              return (
                <g key={id} className="car-reveal" data-active={isOn(id)}>
                  <rect
                    x={a.label.x - w / 2}
                    y={a.label.y - 21}
                    width={w}
                    height="30"
                    rx="15"
                    fill="var(--color-card)"
                    stroke="var(--color-accent)"
                    strokeWidth="1"
                  />
                  <text x={a.label.x} y={a.label.y} textAnchor="middle" fill="var(--color-ivory)" fontSize="14">
                    {a.hoverLabel}
                  </text>
                </g>
              );
            })}
          </g>
        )}

        {/* vue éclatée : composants mécaniques de la zone zoomée */}
        {zoomed && active && showComponents && (
          <g>
            {active.components.map((c, i) => {
              const on = selectedComponent === c.id;
              const lw = c.label.length * 7.4 / scale + 20 / scale;
              const inv = 1 / scale;
              return (
                <g key={c.id} className="car-callout" style={{ animationDelay: `${120 + i * 70}ms` }}>
                  <line
                    x1={c.x}
                    y1={c.y}
                    x2={c.x + c.dx}
                    y2={c.y + c.dy}
                    stroke="var(--color-accent)"
                    strokeWidth={1.2 / scale}
                    opacity="0.8"
                  />
                  <circle cx={c.x} cy={c.y} r={5 / scale} fill="var(--color-accent)" />
                  <g
                    className="car-zone"
                    tabIndex={0}
                    role="button"
                    aria-label={c.label}
                    aria-pressed={on}
                    onClick={() => onSelectComponent(c.id, c.service)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        onSelectComponent(c.id, c.service);
                      }
                    }}
                    transform={`translate(${c.x + c.dx} ${c.y + c.dy})`}
                  >
                    <rect
                      x={-lw / 2}
                      y={-13 / scale}
                      width={lw}
                      height={26 / scale}
                      rx={13 / scale}
                      fill={on ? "var(--color-accent)" : "var(--color-card)"}
                      stroke="var(--color-accent)"
                      strokeWidth={1 / scale}
                    />
                    <text
                      textAnchor="middle"
                      y={4.5 / scale}
                      fontSize={13 * inv}
                      fill={on ? "var(--color-accent-foreground)" : "var(--color-ivory)"}
                    >
                      {c.label}
                    </text>
                  </g>
                </g>
              );
            })}
          </g>
        )}
      </g>
    </svg>
  );
}
