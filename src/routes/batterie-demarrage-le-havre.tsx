import { createFileRoute } from "@tanstack/react-router";
import { ServicePageLayout } from "@/components/services/ServicePageLayout";
import { SERVICE_PAGES } from "@/lib/service-pages-data";
import { serviceHead } from "@/lib/service-head";

const page = SERVICE_PAGES["batterie-demarrage-le-havre"]!;

export const Route = createFileRoute("/batterie-demarrage-le-havre")({
  head: () => serviceHead(page),
  component: () => <ServicePageLayout page={page} />,
});
