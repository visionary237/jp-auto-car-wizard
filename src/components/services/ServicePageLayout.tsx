import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Check, ChevronRight, Info, MousePointerClick } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { ServiceCarView } from "@/components/services/ServiceCarView";
import { RequestDialog, WhatsappIcon } from "@/components/RequestDialog";
import { buildWhatsappUrl, openWhatsapp } from "@/lib/whatsapp";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { AREAS } from "@/lib/car-selector-data";
import {
  DISCLAIMER,
  SERVICE_PAGES,
  SERVICE_ROUTES,
  SIGNATURE,
  type ServicePage,
  type ServiceSlug,
} from "@/lib/service-pages-data";

export function ServicePageLayout({ page }: { page: ServicePage }) {
  const isMobile = useIsMobile();

  // États du parcours, alignés sur le sélecteur de la page d'accueil
  const [selectedArea] = useState(page.area);
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [selectedSymptom, setSelectedSymptom] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<string>(page.service);
  const [hovered, setHovered] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const component = page.components.find((c) => c.slug === selectedComponent) ?? null;
  const symptom = page.symptoms.find((s) => s.id === selectedSymptom) ?? null;

  const prefill = useMemo(
    () => ({
      selectedService,
      selectedComponent: component?.name ?? "",
      selectedSymptom: symptom?.label ?? "",
      selectedArea: AREAS[selectedArea]?.title ?? page.shortName,
    }),
    [selectedService, component, symptom, selectedArea, page.shortName],
  );

  const selectComponent = (slug: string) => {
    setSelectedComponent(slug);
    const c = page.components.find((x) => x.slug === slug);
    if (c) setSelectedService(c.relatedService);
    if (typeof document !== "undefined") {
      document.getElementById(`fiche-${slug}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const jsonLd = useMemo(() => buildJsonLd(page), [page]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main>
        {/* ---------- HERO ---------- */}
        <section className="relative overflow-hidden border-b border-border/60">
          <div className="hero-glow pointer-events-none absolute inset-0" aria-hidden="true" />
          <div className="relative mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:items-center lg:gap-14 lg:py-16">
            {/* Vue technique — au-dessus du texte en mobile */}
            <div className="surface-panel order-1 overflow-hidden rounded-2xl px-2 py-4 sm:px-5 sm:py-6 lg:order-none">
              <span className="eyebrow">Vue technique — {page.shortName}</span>
              <ServiceCarView
                components={page.components}
                area={page.area}
                focus={page.focus}
                selected={selectedComponent}
                hovered={hovered}
                onHover={setHovered}
                onSelect={selectComponent}
                compact={isMobile}
              />
              {page.components.length > 0 && (
                <p className="flex items-center justify-center gap-2 pb-1 text-xs text-muted-foreground">
                  <MousePointerClick className="size-3.5" />
                  Survolez ou touchez un élément pour voir sa fiche
                </p>
              )}
            </div>

            <div className="order-2 lg:order-none">
              <Breadcrumb current={page.shortName} />
              <h1 className="mt-4 font-display text-3xl font-extrabold leading-[1.08] sm:text-4xl xl:text-5xl">
                {page.h1}
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">{page.intro}</p>
              <p className="mt-5 font-display text-lg font-bold text-accent">{SIGNATURE}</p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Button size="lg" asChild>
                  <a href="#symptomes" className="gap-2">
                    Identifier mon problème <ArrowRight className="size-4" />
                  </a>
                </Button>
                <Button size="lg" variant="outline" onClick={() => setDialogOpen(true)}>
                  Demander un rendez-vous
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- FICHES COMPOSANTS ---------- */}
        {page.components.length > 0 && (
          <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-16">
            <span className="eyebrow">Les pièces concernées</span>
            <h2 className="mt-3 font-display text-2xl font-bold sm:text-3xl">
              Qu'est-ce que cette partie de ma voiture fait&nbsp;?
            </h2>
            <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {page.components.map((c) => {
                const active = selectedComponent === c.slug;
                return (
                  <article
                    key={c.slug}
                    id={`fiche-${c.slug}`}
                    onMouseEnter={() => setHovered(c.slug)}
                    onMouseLeave={() => setHovered(null)}
                    className={cn(
                      "surface-panel rounded-2xl p-5 transition-all duration-300 sm:p-6",
                      active ? "border-accent/70 ring-1 ring-accent/40" : "hover:border-accent/40",
                      selectedComponent && !active && "opacity-70",
                    )}
                  >
                    <h3 className="font-display text-lg font-bold">{c.name}</h3>

                    <FicheBlock title="À quoi sert cette pièce ?" text={c.role} />
                    <FicheBlock title="Pourquoi est-elle importante ?" text={c.importance} />
                    <FicheList title="Signes possibles d'usure" items={c.commonSymptoms} accent />
                    <FicheList title="Causes fréquentes" items={c.commonCauses} />
                    <FicheList title="Autres causes possibles" items={c.otherPossibleCauses} />

                    <Button
                      variant={active ? "default" : "secondary"}
                      className="mt-5 w-full gap-2"
                      onClick={() => selectComponent(c.slug)}
                    >
                      {active ? <Check className="size-4" /> : null}
                      C'est ce que je constate
                    </Button>

                    {active && (
                      <Button variant="outline" className="mt-2 w-full gap-2" onClick={() => setDialogOpen(true)}>
                        Continuer ma demande <ArrowRight className="size-4" />
                      </Button>
                    )}
                  </article>
                );
              })}
            </div>
            <p className="mt-6 flex items-start gap-2 text-xs text-muted-foreground">
              <Info className="mt-0.5 size-3.5 shrink-0" />
              {DISCLAIMER}
            </p>
          </section>
        )}

        {/* ---------- TRI DES PROSPECTS ---------- */}
        <section id="symptomes" className="border-y border-border/60 bg-card/30">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-16">
            <span className="eyebrow">Qualification</span>
            <h2 className="mt-3 font-display text-2xl font-bold sm:text-3xl">
              Qu'est-ce que vous constatez&nbsp;?
            </h2>

            <div className="mt-7 flex flex-wrap gap-2.5">
              {page.symptoms.map((s) => {
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
                      "inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm transition-all duration-300",
                      on
                        ? "border-accent bg-accent text-accent-foreground"
                        : "border-border bg-card text-muted-foreground hover:border-accent hover:text-foreground",
                    )}
                  >
                    {on && <Check className="size-4" />}
                    {s.label}
                  </button>
                );
              })}
            </div>

            {symptom && (
              <div className="car-callout surface-panel mt-7 rounded-2xl p-5 sm:p-7">
                <p className="font-display text-lg font-bold">Ce symptôme peut avoir plusieurs origines.</p>
                <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                  {symptom.causeFamilies.slice(0, 4).map((f) => (
                    <div key={f.title} className="rounded-xl border border-border bg-background/60 p-4">
                      <h3 className="text-sm font-semibold text-accent">{f.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{f.text}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-5 text-sm text-muted-foreground">
                  Pour aller plus loin, transmettez ces informations à l'atelier.
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Button size="lg" className="gap-2" onClick={() => setDialogOpen(true)}>
                    Préparer ma demande <ArrowRight className="size-4" />
                  </Button>
                  <Button size="lg" variant="outline" className="gap-2" asChild>
                    <a
                      href={buildWhatsappUrl(prefill)}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => {
                        e.preventDefault();
                        openWhatsapp(prefill);
                      }}
                    >
                      <WhatsappIcon className="size-4" /> Envoyer ma demande sur WhatsApp
                    </a>
                  </Button>
                </div>
                <p className="mt-4 text-xs text-muted-foreground">{DISCLAIMER}</p>
              </div>
            )}
          </div>
        </section>

        {/* ---------- CONTENU ÉDITORIAL ---------- */}
        {page.sections.length > 0 && (
          <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-16">
            <div className="grid gap-8 lg:grid-cols-2">
              {page.sections.map((s) => (
                <div key={s.h2} className="surface-panel rounded-2xl p-6 sm:p-8">
                  <h2 className="font-display text-xl font-bold sm:text-2xl">{s.h2}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">{s.body}</p>
                  {s.bullets && (
                    <ul className="mt-4 grid gap-2">
                      {s.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <ChevronRight className="mt-0.5 size-4 shrink-0 text-accent" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ---------- FAQ ---------- */}
        <section className="border-t border-border/60">
          <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:py-16">
            <span className="eyebrow">Questions fréquentes</span>
            <h2 className="mt-3 font-display text-2xl font-bold sm:text-3xl">
              Quels signes doivent m'alerter&nbsp;?
            </h2>
            <div className="mt-7 grid gap-3">
              {page.faq.map((f) => (
                <details key={f.q} className="surface-panel group rounded-xl p-5">
                  <summary className="cursor-pointer list-none font-semibold text-foreground">
                    <span className="text-accent">—</span> {f.q}
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- LIENS INTERNES ---------- */}
        <section className="border-t border-border/60 bg-card/30">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
            <span className="eyebrow">À voir aussi</span>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {page.related.map((r) => (
                <Link
                  key={r.slug}
                  to={SERVICE_ROUTES[r.slug as ServiceSlug]}
                  className="surface-panel group rounded-2xl p-5 transition-colors hover:border-accent/60"
                >
                  <span className="font-display text-base font-bold group-hover:text-accent">{r.label}</span>
                  <p className="mt-1.5 text-sm text-muted-foreground">{r.note}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- CTA FINAL ---------- */}
        <section className="relative overflow-hidden border-t border-border/60">
          <div className="hero-glow pointer-events-none absolute inset-0" aria-hidden="true" />
          <div className="relative mx-auto max-w-4xl px-4 py-14 text-center sm:px-6 lg:py-20">
            <h2 className="font-display text-2xl font-extrabold sm:text-4xl">{SIGNATURE}</h2>
            <p className="mt-4 text-base text-muted-foreground">
              Décrivez votre problème et transmettez-le directement à l'atelier.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button size="lg" asChild>
                <a href="#symptomes" className="gap-2">
                  Identifier mon problème <ArrowRight className="size-4" />
                </a>
              </Button>
              <Button size="lg" variant="outline" onClick={() => setDialogOpen(true)}>
                Demander un rendez-vous
              </Button>
            </div>
            <p className="mt-8 text-xs text-muted-foreground">
              Auto Express 76 — Le Havre, Seine-Maritime. Adresse et horaires : à compléter (placeholder).
            </p>
          </div>
        </section>

        <ServiceFooter currentSlug={page.slug} />
      </main>

      <RequestDialog open={dialogOpen} onOpenChange={setDialogOpen} prefill={prefill} />
    </div>
  );
}

function FicheBlock({ title, text }: { title: string; text: string }) {
  return (
    <div className="mt-4">
      <h4 className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground">{title}</h4>
      <p className="mt-1 text-sm leading-relaxed text-foreground/85">{text}</p>
    </div>
  );
}

function FicheList({ title, items, accent }: { title: string; items: string[]; accent?: boolean }) {
  return (
    <div className="mt-4">
      <h4 className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground">{title}</h4>
      <ul className="mt-1.5 grid gap-1">
        {items.map((i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
            <span
              className={cn("mt-1.5 size-1.5 shrink-0 rounded-full", accent ? "bg-accent" : "bg-steel")}
              aria-hidden="true"
            />
            {i}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Breadcrumb({ current }: { current: string }) {
  return (
    <nav aria-label="Fil d'Ariane" className="text-xs text-muted-foreground">
      <ol className="flex flex-wrap items-center gap-1.5">
        <li>
          <Link to="/" className="hover:text-foreground">
            Accueil
          </Link>
        </li>
        <li aria-hidden="true">›</li>
        <li>
          <Link to="/garage-le-havre" className="hover:text-foreground">
            Services
          </Link>
        </li>
        <li aria-hidden="true">›</li>
        <li aria-current="page" className="text-foreground">
          {current}
        </li>
      </ol>
    </nav>
  );
}

export function ServiceFooter({ currentSlug }: { currentSlug?: string }) {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <span className="eyebrow">Auto Express 76 — Le Havre</span>
        <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
          {Object.values(SERVICE_PAGES).map((p) => (
            <li key={p.slug}>
              {p.slug === currentSlug ? (
                <span className="text-foreground">{p.shortName}</span>
              ) : (
                <Link to={SERVICE_ROUTES[p.slug as ServiceSlug]} className="text-muted-foreground hover:text-accent">
                  {p.shortName}
                </Link>
              )}
            </li>
          ))}
        </ul>
        <p className="mt-6 text-xs text-muted-foreground">{DISCLAIMER}</p>
      </div>
    </footer>
  );
}

function buildJsonLd(page: ServicePage) {
  const base = "https://autoexpress76.fr";
  const business = {
    "@type": "AutoRepair",
    name: "Auto Express 76",
    areaServed: { "@type": "City", name: "Le Havre" },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Le Havre",
      addressRegion: "Normandie",
      addressCountry: "FR",
      streetAddress: "Adresse à compléter (placeholder)",
    },
  };

  const graph: Record<string, unknown>[] = [
    {
      "@type": "Service",
      name: page.shortName,
      serviceType: page.service,
      description: page.description,
      provider: business,
      areaServed: { "@type": "City", name: "Le Havre" },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: `${base}/` },
        { "@type": "ListItem", position: 2, name: "Services", item: `${base}/garage-le-havre` },
        { "@type": "ListItem", position: 3, name: page.shortName, item: `${base}/${page.slug}` },
      ],
    },
  ];

  if (page.faq.length > 0) {
    graph.push({
      "@type": "FAQPage",
      mainEntity: page.faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
}
