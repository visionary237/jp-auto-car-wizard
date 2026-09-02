import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const NAV = [
  { label: "Accueil", href: "#accueil" },
  { label: "Services", href: "#services" },
  { label: "Notre garage", href: "#garage" },
  { label: "Avis", href: "#avis" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center gap-6 px-4 py-3.5 sm:px-6">
        <Link to="/" className="flex min-w-0 items-center gap-3" aria-label="AUTO EXPRESS 76 — accueil">
          <span className="grid size-10 shrink-0 place-items-center rounded-lg border border-accent/50 bg-accent/10 font-display text-sm font-bold text-accent">
            76
          </span>
          <span className="min-w-0 leading-tight">
            <span className="block truncate font-display text-base font-extrabold tracking-tight">
              AUTO EXPRESS 76
            </span>
            <span className="block text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
              Le Havre
            </span>
          </span>
        </Link>

        <nav className="ml-auto hidden items-center gap-7 lg:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <Button className="hidden gap-2 sm:inline-flex">
            <Phone className="size-4" />
            Prendre rendez-vous
          </Button>
          <button
            type="button"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            onClick={() => setOpen((v) => !v)}
            className="grid size-11 place-items-center rounded-lg border border-border text-foreground lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="animate-fade-in border-t border-border bg-background px-4 pb-5 pt-3 lg:hidden">
          <ul className="grid gap-1">
            {NAV.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-3 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <Button className="mt-3 w-full gap-2">
            <Phone className="size-4" /> Prendre rendez-vous
          </Button>
        </nav>
      )}
    </header>
  );
}
