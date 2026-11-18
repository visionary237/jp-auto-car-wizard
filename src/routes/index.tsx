import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { ArrowRight, MessageCircle } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Navbar } from "@/components/Navbar";
import { HeroOrbit } from "@/components/HeroOrbit";
import { CarSelector } from "@/components/CarSelector";
import { ServicesGallery } from "@/components/ServicesGallery";
import { ServiceFooter } from "@/components/services/ServicePageLayout";
import { SIGNATURE, WHATSAPP_NUMBER } from "@/lib/service-pages-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AUTO EXPRESS 76 — Garage automobile au Havre" },
      {
        name: "description",
        content:
          "Montrez-nous où est le problème : faites tourner votre véhicule, touchez la zone concernée et obtenez la bonne prise en charge au garage AUTO EXPRESS 76, au Havre.",
      },
      { property: "og:title", content: "AUTO EXPRESS 76 — Garage automobile au Havre" },
      {
        property: "og:description",
        content: "Mécanique, diagnostic et entretien au Havre. Montrez-nous où, on s'occupe du reste.",
      },
    ],
  }),
  component: Index,
});

const METHOD = [
  { n: "01", t: "Vous montrez.", d: "Une zone sur la voiture, un symptôme, quelques mots. Pas besoin de connaître le nom de la pièce." },
  { n: "02", t: "On vérifie.", d: "L'atelier étudie votre demande puis contrôle le véhicule avant de proposer quoi que ce soit." },
  { n: "03", t: "On explique.", d: "Vous savez ce qui est fait, pourquoi, et ce qui peut attendre. Vous validez avant les travaux." },
];

function Index() {
  // Révélations au défilement pour les sections éditoriales.
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.utils.toArray<HTMLElement>("[data-scroll-reveal]").forEach((el) =>
        gsap.from(el, { opacity: 0, y: 40, duration: 1.1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 85%", once: true } }),
      );
      gsap.utils.toArray<HTMLElement>("[data-line]").forEach((el) =>
        gsap.fromTo(el, { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: { trigger: el, start: "top 90%", end: "top 50%", scrub: true } }),
      );
    });
    const t = setTimeout(() => ScrollTrigger.refresh(), 400);
    return () => {
      clearTimeout(t);
      mm.revert();
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar overlay />
      <main>
        <HeroOrbit />

        {/* Montrez-nous où */}
        <section id="explorer" aria-labelledby="explorer-title" className="relative scroll-mt-16 border-t border-border/60 py-20 sm:py-28">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="mb-10 grid gap-6 lg:mb-14 lg:grid-cols-[1.5fr_1fr] lg:items-end lg:gap-10" data-scroll-reveal>
              <div>
                <span className="eyebrow">Diagnostic guidé</span>
                <h2 id="explorer-title" className="editorial-title mt-4 text-ivory">
                  Montrez-nous <span className="text-accent">où.</span>
                </h2>
              </div>
              <p className="text-sm text-muted-foreground sm:text-base">
                Faites tourner la voiture, touchez la zone qui vous inquiète. La fiche se remplit toute seule et
                l'atelier reçoit une demande claire, sans appel téléphonique.
              </p>
            </div>
            <CarSelector />
          </div>
        </section>

        <ServicesGallery />

        {/* L'atelier */}
        <section id="atelier" aria-labelledby="atelier-title" className="relative scroll-mt-16 border-t border-border/60 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
              <div data-scroll-reveal>
                <span className="eyebrow">L'atelier</span>
                <h2 id="atelier-title" className="editorial-title mt-4 text-ivory">
                  {SIGNATURE.split(". ").map((s, i, a) => (
                    <span key={s} className={i === 1 ? "block text-accent" : "block"}>
                      {s}
                      {i < a.length - 1 ? "." : ""}
                    </span>
                  ))}
                </h2>
              </div>
              <ol className="grid gap-px self-end overflow-hidden rounded-2xl border border-border/70 bg-border/70 sm:grid-cols-3">
                {METHOD.map((m) => (
                  <li key={m.n} className="bg-background p-6 sm:p-7" data-scroll-reveal>
                    <span className="font-mono text-xs text-accent">{m.n}</span>
                    <p className="mt-10 font-display text-2xl font-bold tracking-tight">{m.t}</p>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{m.d}</p>
                  </li>
                ))}
              </ol>
            </div>
            <div data-line className="mt-20 h-px origin-left bg-gradient-to-r from-accent via-ivory/30 to-transparent" />
          </div>
        </section>

        {/* Contact */}
        <section id="contact" aria-labelledby="contact-title" className="relative scroll-mt-16 overflow-hidden pb-10 pt-20 sm:pt-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end" data-scroll-reveal>
              <h2 id="contact-title" className="editorial-title text-ivory">
                Une question ?
                <br />
                <span className="text-muted-foreground">Écrivez-nous.</span>
              </h2>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-between gap-3 rounded-full bg-accent px-6 py-4 font-semibold text-accent-foreground transition hover:brightness-110"
                >
                  <span className="inline-flex items-center gap-2">
                    <MessageCircle className="size-5" /> Écrire sur WhatsApp
                  </span>
                  <ArrowRight className="size-4" />
                </a>
                <a
                  href="#explorer"
                  className="inline-flex items-center justify-between gap-3 rounded-full border border-border px-6 py-4 font-semibold text-foreground transition hover:border-accent"
                >
                  Décrire mon problème <ArrowRight className="size-4" />
                </a>
              </div>
            </div>
          </div>
          {/* Logo-titre de clôture */}
          <p aria-hidden="true" className="wordmark mt-20 select-none text-center text-ivory/[0.07]">
            AUTO EXPRESS 76
          </p>
        </section>

        <ServiceFooter />
      </main>
    </div>
  );
}
