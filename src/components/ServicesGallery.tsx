import { useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SERVICE_NAV, SERVICE_PAGES, SERVICE_ROUTES, type ServiceSlug } from "@/lib/service-pages-data";
import { serviceImage } from "@/lib/orbit";

/** Prestations en galerie horizontale : défilement épinglé sur grand écran, glissement natif sur mobile. */
export function ServicesGallery() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLUListElement>(null);
  const items = SERVICE_NAV.map((n) => SERVICE_PAGES[n.slug]).filter(Boolean);

  useEffect(() => {
    if (!section.current || !track.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const el = track.current!;
      const distance = () => Math.max(0, el.scrollWidth - window.innerWidth + 48);
      const tween = gsap.to(el, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: section.current,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });
      return () => tween.scrollTrigger?.kill();
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={section} id="services" aria-labelledby="services-title" className="relative overflow-hidden border-t border-border/60 bg-background lg:h-[100svh]">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 px-4 pt-20 sm:px-6 lg:flex-row lg:items-end lg:pt-24">
        <div>
          <span className="eyebrow">Prestations • Le Havre</span>
          <h2 id="services-title" className="editorial-title mt-4 text-ivory">
            Dix savoir-faire.
            <br />
            <span className="text-muted-foreground">Une seule exigence.</span>
          </h2>
        </div>
        <p className="max-w-sm text-sm text-muted-foreground sm:text-base">
          Chaque page détaille les pièces concernées, les signes qui doivent alerter, et transmet votre demande
          directement à l'atelier.
        </p>
      </div>

      <ul
        ref={track}
        className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-10 [scrollbar-width:none] sm:px-6 lg:mt-12 lg:snap-none lg:overflow-visible lg:pl-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))]"
      >
        {items.map((p, i) => (
          <li key={p.slug} className="w-[78vw] shrink-0 snap-start sm:w-[44vw] lg:w-[min(30vw,400px)]">
            <Link to={SERVICE_ROUTES[p.slug as ServiceSlug]} className="group block">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-card">
                <img
                  src={serviceImage(p.slug)}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.1_0.004_250/0.92)] via-transparent to-transparent" />
                <span className="absolute left-5 top-5 font-mono text-xs text-ivory/60">{String(i + 1).padStart(2, "0")}</span>
                <span className="absolute right-4 top-4 grid size-10 place-items-center rounded-full border border-ivory/20 bg-background/40 text-ivory backdrop-blur transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-accent-foreground">
                  <ArrowUpRight className="size-4" />
                </span>
                <div className="absolute inset-x-5 bottom-5">
                  <p className="font-display text-2xl font-bold tracking-tight text-ivory">{p.shortName}</p>
                  <p className="mt-2 line-clamp-2 text-sm text-ivory/65">{p.intro}</p>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
