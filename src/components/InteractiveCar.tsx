import type { AreaId } from "@/lib/car-selector-data";
import { AREAS } from "@/lib/car-selector-data";

type Props = {
  selected: AreaId | null;
  hovered: AreaId | null;
  onHover: (id: AreaId | null) => void;
  onSelect: (id: AreaId) => void;
};

type ZoneMeta = { id: AreaId; label: string; lx: number; ly: number; anchor: "start" | "middle" | "end" };

const ZONES: ZoneMeta[] = [
  { id: "engine", label: "Moteur & entretien", lx: 152, ly: 176, anchor: "middle" },
  { id: "wheels_front", label: "Freinage & pneus", lx: 240, ly: 412, anchor: "middle" },
  { id: "wheels_rear", label: "Freinage & pneus", lx: 724, ly: 412, anchor: "middle" },
  { id: "suspension", label: "Suspension", lx: 596, ly: 392, anchor: "middle" },
  { id: "transmission", label: "Boîte & transmission", lx: 418, ly: 392, anchor: "middle" },
  { id: "exhaust", label: "Échappement & FAP", lx: 862, ly: 392, anchor: "middle" },
  { id: "general", label: "Entretien général", lx: 500, ly: 74, anchor: "middle" },
];

export function InteractiveCar({ selected, hovered, onHover, onSelect }: Props) {
  const isOn = (id: AreaId) => hovered === id || selected === id;

  const zoneProps = (id: AreaId) => ({
    className: "car-zone",
    role: "button" as const,
    tabIndex: 0,
    "aria-label": AREAS[id].shortLabel,
    "aria-pressed": selected === id,
    fill: "transparent",
    onMouseEnter: () => onHover(id),
    onMouseLeave: () => onHover(null),
    onFocus: () => onHover(id),
    onBlur: () => onHover(null),
    onClick: () => onSelect(id),
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onSelect(id);
      }
    },
  });

  return (
    <svg
      viewBox="0 0 980 430"
      className="w-full h-auto select-none"
      aria-label="Sélecteur de zone du véhicule"
    >
      <defs>
        <linearGradient id="bodyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.36 0.006 250)" />
          <stop offset="100%" stopColor="oklch(0.24 0.006 250)" />
        </linearGradient>
        <linearGradient id="glassGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="oklch(0.5 0.012 250)" />
          <stop offset="100%" stopColor="oklch(0.34 0.008 250)" />
        </linearGradient>
      </defs>

      {/* grille blueprint discrète */}
      <g stroke="var(--color-border)" strokeWidth="1" opacity="0.35">
        <line x1="0" y1="345" x2="980" y2="345" />
        <line x1="60" y1="60" x2="60" y2="380" strokeDasharray="4 10" />
        <line x1="920" y1="60" x2="920" y2="380" strokeDasharray="4 10" />
      </g>

      {/* ombre au sol */}
      <ellipse cx="490" cy="352" rx="380" ry="14" fill="oklch(0 0 0 / 0.35)" />

      {/* carrosserie */}
      <g>
        <path
          d="M74 306 v-54 c0-16 10-27 26-30 l152-26 76-70 c16-15 36-22 58-22 h168 c24 0 44 8 60 24 l68 68 148 26 c18 3 28 14 28 32 v52 z"
          fill="url(#bodyGrad)"
          stroke="var(--color-steel)"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        {/* vitrages */}
        <path
          d="M306 194 l62-58 c11-10 24-15 40-15 h56 v73 z"
          fill="url(#glassGrad)"
          stroke="var(--color-steel)"
          strokeWidth="2"
        />
        <path
          d="M486 121 h108 c16 0 30 6 41 17 l56 56 h-205 z"
          fill="url(#glassGrad)"
          stroke="var(--color-steel)"
          strokeWidth="2"
        />
        {/* lignes techniques */}
        <path d="M96 258 h150" stroke="var(--color-steel)" strokeWidth="2" opacity="0.6" />
        <path d="M300 246 h560" stroke="var(--color-steel)" strokeWidth="1.5" opacity="0.35" />
        <path d="M470 196 v110" stroke="var(--color-steel)" strokeWidth="1.5" opacity="0.3" />
        {/* poignées + phares */}
        <rect x="392" y="222" width="34" height="7" rx="3.5" fill="var(--color-steel)" opacity="0.8" />
        <rect x="596" y="222" width="34" height="7" rx="3.5" fill="var(--color-steel)" opacity="0.8" />
        <path d="M76 238 h34 a10 10 0 0 1 0 20 H76 z" fill="var(--color-ivory)" opacity="0.75" />
        <path d="M896 240 h-30 a9 9 0 0 0 0 18 h30 z" fill="var(--color-ivory)" opacity="0.35" />
        {/* barres de toit */}
        <path d="M420 100 h180" stroke="var(--color-steel)" strokeWidth="4" strokeLinecap="round" opacity="0.7" />
      </g>

      {/* passages de roue */}
      <g fill="var(--color-background)">
        <circle cx="240" cy="306" r="80" />
        <circle cx="724" cy="306" r="80" />
      </g>

      {/* roues */}
      {[240, 724].map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy="306" r="70" fill="oklch(0.19 0.004 250)" stroke="var(--color-steel)" strokeWidth="2.5" />
          <circle cx={cx} cy="306" r="42" fill="oklch(0.27 0.005 250)" stroke="var(--color-steel)" strokeWidth="2" />
          <circle cx={cx} cy="306" r="10" fill="var(--color-steel)" opacity="0.8" />
          {[0, 60, 120, 180, 240, 300].map((a) => (
            <line
              key={a}
              x1={cx}
              y1="306"
              x2={cx + 38 * Math.cos((a * Math.PI) / 180)}
              y2={306 + 38 * Math.sin((a * Math.PI) / 180)}
              stroke="var(--color-steel)"
              strokeWidth="3"
              opacity="0.55"
            />
          ))}
        </g>
      ))}

      {/* ---- révélations mécaniques (accent) ---- */}
      <g stroke="var(--color-accent)" fill="none" strokeWidth="3" strokeLinecap="round">
        <g className="car-reveal" data-active={isOn("engine")}>
          <rect x="112" y="222" width="118" height="62" rx="8" />
          <path d="M132 222 v-14 h34 v14" />
          <path d="M132 252 h78 M132 268 h78" strokeWidth="2" opacity="0.7" />
        </g>

        <g className="car-reveal" data-active={isOn("wheels_front")}>
          <circle cx="240" cy="306" r="46" />
          <path d="M272 274 a46 46 0 0 1 0 64" strokeWidth="9" opacity="0.9" />
        </g>

        <g className="car-reveal" data-active={isOn("wheels_rear")}>
          <circle cx="724" cy="306" r="46" />
          <path d="M756 274 a46 46 0 0 1 0 64" strokeWidth="9" opacity="0.9" />
        </g>

        <g className="car-reveal" data-active={isOn("suspension")}>
          <path d="M600 250 v-10 M600 240 h34 M600 250 l34 12 l-34 12 l34 12 l-34 12 l34 12 l-34 12 h34" />
          <circle cx="617" cy="316" r="6" fill="var(--color-accent)" stroke="none" />
        </g>

        <g className="car-reveal" data-active={isOn("transmission")}>
          <path d="M348 268 h96 l26 22 v20 h-122 z" />
          <path d="M470 300 h84" strokeWidth="6" />
          <circle cx="380" cy="292" r="9" />
        </g>

        <g className="car-reveal" data-active={isOn("exhaust")}>
          <path d="M770 318 h58 l14 -10 h44" strokeWidth="6" />
          <rect x="792" y="298" width="46" height="22" rx="11" strokeWidth="3" />
          <path d="M886 300 c14 -6 22 -2 26 6" strokeWidth="2" opacity="0.7" />
        </g>

        <g className="car-reveal" data-active={isOn("general")}>
          <path
            d="M74 306 v-54 c0-16 10-27 26-30 l152-26 76-70 c16-15 36-22 58-22 h168 c24 0 44 8 60 24 l68 68 148 26 c18 3 28 14 28 32 v52 z"
            strokeWidth="2.5"
            strokeDasharray="10 8"
          />
        </g>
      </g>

      {/* ---- zones cliquables ---- */}
      <g>
        <rect x="66" y="196" width="184" height="112" rx="14" {...zoneProps("engine")} />
        <circle cx="240" cy="306" r="82" {...zoneProps("wheels_front")} />
        <circle cx="724" cy="306" r="82" {...zoneProps("wheels_rear")} />
        <rect x="336" y="252" width="176" height="70" rx="14" {...zoneProps("transmission")} />
        <rect x="540" y="236" width="128" height="86" rx="14" {...zoneProps("suspension")} />
        <rect x="806" y="270" width="140" height="60" rx="14" {...zoneProps("exhaust")} />
        <rect x="340" y="96" width="330" height="96" rx="14" {...zoneProps("general")} />
      </g>

      {/* contours des zones actives */}
      <g fill="none" stroke="var(--color-accent)" strokeWidth="1.5" strokeDasharray="6 6" pointerEvents="none">
        {isOn("engine") && <rect x="66" y="196" width="184" height="112" rx="14" className="zone-pulse" />}
        {isOn("transmission") && <rect x="336" y="252" width="176" height="70" rx="14" className="zone-pulse" />}
        {isOn("suspension") && <rect x="540" y="236" width="128" height="86" rx="14" className="zone-pulse" />}
        {isOn("exhaust") && <rect x="806" y="270" width="140" height="60" rx="14" className="zone-pulse" />}
        {isOn("general") && <rect x="340" y="96" width="330" height="96" rx="14" className="zone-pulse" />}
        {isOn("wheels_front") && <circle cx="240" cy="306" r="82" className="zone-pulse" />}
        {isOn("wheels_rear") && <circle cx="724" cy="306" r="82" className="zone-pulse" />}
      </g>

      {/* labels flottants */}
      <g pointerEvents="none">
        {ZONES.map((z) => {
          const active = isOn(z.id);
          const w = z.label.length * 8.2 + 28;
          return (
            <g key={z.id} className="car-reveal" data-active={active}>
              <rect
                x={z.lx - w / 2}
                y={z.ly - 20}
                width={w}
                height="30"
                rx="15"
                fill="var(--color-card)"
                stroke="var(--color-accent)"
                strokeWidth="1"
              />
              <text
                x={z.lx}
                y={z.ly}
                textAnchor="middle"
                fill="var(--color-ivory)"
                fontSize="14"
                fontFamily="var(--font-sans)"
                letterSpacing="0.02em"
              >
                {z.label}
              </text>
            </g>
          );
        })}
      </g>
    </svg>
  );
}
