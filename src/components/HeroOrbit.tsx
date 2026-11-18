import { useEffect, useRef, useState } from "react";
import { ArrowDown } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FRAME_COUNT, VIEWS } from "@/lib/orbit";
import { useCanvasDraw, useFrameSequence } from "@/hooks/use-frame-sequence";
import { cn } from "@/lib/utils";

const CHAPTERS = [
  { k: "intro", title: "Votre voiture,\nentre de bonnes mains.", line: "Mécanique, diagnostic et entretien au Havre." },
  { k: "bruit", title: "Un bruit.", line: "Au freinage, en virage, au démarrage." },
  { k: "voyant", title: "Un voyant.", line: "Orange ou rouge, il signale toujours quelque chose." },
  { k: "vibration", title: "Une vibration.", line: "Dans le volant, la pédale ou le siège." },
  { k: "ou", title: "Montrez-nous où.", line: "On s'occupe du reste." },
];

/** Bornes de progression (0 → 1) de chaque chapitre. */
const BOUNDS = [0, 0.18, 0.4, 0.6, 0.8, 1.01];

const viewLabel = (f: number) => (f < 21 ? VIEWS.front.label : f < 66 ? VIEWS.profile.label : f < 106 ? VIEWS.rear.label : "Trois-quarts");

export function HeroOrbit() {
  const section = useRef<HTMLElement>(null);
  const loaded = useFrameSequence();
  const { canvas, draw } = useCanvasDraw();
  const frame = useRef(0);
  const [chapter, setChapter] = useState(0);
  const [view, setView] = useState(VIEWS.front.label);
  const [progress, setProgress] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches), []);

  // Redessine dès qu'une nouvelle image arrive, et au redimensionnement.
  useEffect(() => draw(frame.current, true), [loaded, draw]);
  useEffect(() => {
    const on = () => draw(frame.current, true);
    window.addEventListener("resize", on);
    return () => window.removeEventListener("resize", on);
  }, [draw]);

  useEffect(() => {
    if (reduced || !section.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const st = ScrollTrigger.create({
        trigger: section.current,
        start: "top top",
        end: () => `+=${window.innerHeight * 3.2}`,
        pin: "[data-hero-pin]",
        scrub: 0.5,
        onUpdate: (self) => {
          const p = self.progress;
          frame.current = p * (FRAME_COUNT - 1);
          draw(frame.current);
          setProgress(p);
          setChapter(BOUNDS.findIndex((b, i) => p >= b && p < BOUNDS[i + 1]));
          setView(viewLabel(frame.current));
        },
      });
      // Entrée : le logo-titre monte, la voiture sort de l'ombre.
      gsap.from("[data-wordmark] span", { yPercent: 110, duration: 1.4, ease: "power4.out", stagger: 0.06, delay: 0.2 });
      gsap.from("[data-hero-canvas]", { opacity: 0, scale: 1.06, duration: 2, ease: "power2.out" });
      gsap.from("[data-hero-fade]", { opacity: 0, y: 18, duration: 1, ease: "power3.out", stagger: 0.1, delay: 0.7 });
      return () => st.kill();
    }, section);
    return () => ctx.revert();
  }, [reduced, draw]);

  return (
    <section ref={section} id="accueil" aria-label="Présentation" className="relative bg-[oklch(0.1_0.004_250)]">
      <div data-hero-pin className="relative h-[100svh] min-h-[560px] w-full overflow-hidden">
        {/* Véhicule */}
        <div className="absolute inset-x-0 top-24 md:inset-0">
          <canvas
            ref={canvas}
            data-hero-canvas
            role="img"
            aria-label="Berline graphite sur un plateau tournant, en studio"
            className="block aspect-square w-full md:absolute md:inset-0 md:aspect-auto md:h-full"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[oklch(0.1_0.004_250)] to-transparent md:hidden" />
        </div>
        {/* Fondu à gauche pour la lisibilité des titres */}
        <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-[60%] bg-gradient-to-r from-[oklch(0.1_0.004_250/0.85)] via-[oklch(0.1_0.004_250/0.35)] to-transparent md:block" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_50%_45%,transparent_40%,oklch(0.1_0.004_250/0.85)_100%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[oklch(0.1_0.004_250)] via-[oklch(0.1_0.004_250/0.55)] to-transparent" />

        {/* Haut : repères */}
        <div className="absolute inset-x-0 top-[84px] z-10 mx-auto flex max-w-7xl items-start justify-between px-4 sm:px-6" data-hero-fade>
          <p className="eyebrow text-ivory/70">Garage automobile — Le Havre</p>
          <div className="hidden text-right font-mono text-[11px] uppercase tracking-[0.2em] text-ivory/50 sm:block">
            <p>
              Vue <span className="text-ivory">{view}</span>
            </p>
            <p className="mt-1">
              {String(Math.max(chapter, 0) + 1).padStart(2, "0")} / {String(CHAPTERS.length).padStart(2, "0")}
            </p>
          </div>
        </div>

        {/* Chapitres */}
        <div className="absolute inset-x-0 bottom-[14%] z-10 mx-auto max-w-7xl px-4 sm:bottom-[26%] sm:px-6">
          <div className="relative h-[9.5rem] sm:h-[12rem]">
            {CHAPTERS.map((c, i) => {
              const on = reduced ? i === 0 : chapter === i;
              return (
                <div
                  key={c.k}
                  aria-hidden={!on}
                  className={cn(
                    "absolute inset-x-0 bottom-0 max-w-3xl transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    on ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0",
                  )}
                >
                  {i === 0 ? (
                    <h1 className="editorial-title whitespace-pre-line text-ivory">{c.title}</h1>
                  ) : (
                    <p className={cn("editorial-title whitespace-pre-line text-ivory", i === 4 && "text-accent")}>{c.title}</p>
                  )}
                  <p className="mt-4 max-w-md text-base text-ivory/70 sm:text-lg">{c.line}</p>
                  {i === 4 && (
                    <a
                      href="#explorer"
                      className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground transition hover:brightness-110"
                    >
                      Explorer le véhicule <ArrowDown className="size-4" />
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Logo-titre géant */}
        <p
          data-wordmark
          aria-hidden="true"
          className={cn(
            "wordmark pointer-events-none absolute inset-x-0 bottom-[-0.12em] z-0 flex justify-center overflow-hidden text-ivory/[0.08] transition-opacity duration-700",
            chapter > 0 && !reduced ? "opacity-40" : "opacity-100",
          )}
        >
          {"AUTO EXPRESS 76".split(" ").map((w) => (
            <span key={w} className="inline-block pr-[0.18em]">
              {w}
            </span>
          ))}
        </p>

        {/* Bas : progression */}
        <div className="absolute inset-x-0 bottom-6 z-10 mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 sm:px-6" data-hero-fade>
          <div className="h-px flex-1 bg-ivory/15">
            <div className="h-px origin-left bg-accent" style={{ transform: `scaleX(${reduced ? 1 : progress})` }} />
          </div>
          {!reduced && (
            <span className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-ivory/50">
              Faites défiler <ArrowDown className="size-3.5 animate-bounce" />
            </span>
          )}
        </div>
      </div>
    </section>
  );
}
