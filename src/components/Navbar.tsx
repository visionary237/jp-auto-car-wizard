import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Montrez-nous où", hash: "explorer" },
  { label: "Prestations", hash: "services" },
  { label: "L'atelier", hash: "atelier" },
  { label: "Contact", hash: "contact" },
];

export function Navbar({ overlay = false }: { overlay?: boolean }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(!overlay);
  useEffect(() => {
    if (!overlay) return;
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, [overlay]);
  const solid = scrolled || open;

  return (
    <header
      className={cn(
        "top-0 z-50 w-full border-b transition-colors duration-500",
        overlay ? "fixed" : "sticky",
        solid ? "border-border/70 bg-background/85 backdrop-blur-xl" : "border-transparent bg-transparent",
      )}
    >
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
            <Link
              key={item.hash}
              to="/"
              hash={item.hash}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <Button asChild className="hidden gap-2 sm:inline-flex">
            <Link to="/" hash="explorer">
              <Phone className="size-4" />
              Prendre rendez-vous
            </Link>
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
              <li key={item.hash}>
                <Link
                  to="/"
                  hash={item.hash}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-3 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Button asChild className="mt-3 w-full gap-2">
            <Link to="/" hash="explorer" onClick={() => setOpen(false)}>
              <Phone className="size-4" /> Prendre rendez-vous
            </Link>
          </Button>
        </nav>
      )}
    </header>
  );
}
