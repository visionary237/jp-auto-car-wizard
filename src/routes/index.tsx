import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { CarSelector } from "@/components/CarSelector";
import { ServiceFooter } from "@/components/services/ServicePageLayout";
import { SERVICE_PAGES, SERVICE_ROUTES, type ServiceSlug } from "@/lib/service-pages-data";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AUTO EXPRESS 76 — Garage automobile au Havre" },
      {
        name: "description",
        content:
          "Montrez-nous où est le problème : sélectionnez une zone de votre véhicule et obtenez la bonne prise en charge au garage AUTO EXPRESS 76, au Havre.",
      },
      { property: "og:title", content: "AUTO EXPRESS 76 — Garage automobile au Havre" },
      {
        property: "og:description",
        content:
          "Un bruit, un voyant, une pièce à contrôler ? Préqualifiez votre besoin en ligne avec notre sélecteur véhicule interactif.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main id="accueil">
        <section className="relative overflow-hidden">
          <div className="hero-glow pointer-events-none absolute inset-0" aria-hidden="true" />
          <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-16">
            <CarSelector
              intro={
                <div>
                  <p className="eyebrow" data-reveal>Garage automobile • Le Havre</p>
                  <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.05] sm:text-5xl xl:text-6xl">
                    <span className="block" data-reveal>Un problème avec votre voiture ?</span>
                    <span className="mt-2 block text-accent" data-reveal>Montrez-nous où.</span>
                  </h1>
                  <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg" data-reveal>
                    Un bruit, un voyant ou une pièce à contrôler ? Sélectionnez une zone de votre véhicule
                    et laissez-nous vous guider vers la bonne prise en charge.
                  </p>
                  <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground" data-reveal>
                    <span className="inline-flex items-center gap-2">
                      <span className="size-2 rounded-full bg-accent" />
                      Réponse rapide, sans appel téléphonique
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <span className="size-2 rounded-full bg-accent/60" />
                      Devis et rendez-vous en quelques clics
                    </span>
                  </div>
                </div>
              }
            />
          </div>
        </section>

        <section id="services" className="border-t border-border/60 bg-card/30">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
            <span className="eyebrow">Nos prestations • Le Havre</span>
            <h2 className="mt-3 font-display text-2xl font-bold sm:text-3xl">
              Explorez votre véhicule, service par service
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
              Chaque page détaille les pièces concernées, les signes qui doivent alerter et vous permet de
              transmettre votre demande directement à l'atelier.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Object.values(SERVICE_PAGES).map((p) => (
                <Link
                  key={p.slug}
                  to={SERVICE_ROUTES[p.slug as ServiceSlug]}
                  className="surface-panel group rounded-2xl p-5 transition-colors hover:border-accent/60"
                >
                  <span className="font-display text-base font-bold group-hover:text-accent">{p.shortName}</span>
                  <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">{p.intro}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <ServiceFooter />
      </main>
    </div>
  );
}

