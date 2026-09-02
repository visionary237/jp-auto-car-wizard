import { createFileRoute } from "@tanstack/react-router";
import { ServicePageLayout } from "@/components/services/ServicePageLayout";
import { SERVICE_PAGES } from "@/lib/service-pages-data";
import { serviceHead } from "@/lib/service-head";

const page = SERVICE_PAGES["garage-le-havre"]!;

export const Route = createFileRoute("/garage-le-havre")({
  head: () => serviceHead(page),
  component: () => <ServicePageLayout page={page} />,
});
