import type { ServicePage } from "@/lib/service-pages-data";

const SITE = "https://autoexpress76.fr";

export function serviceHead(page: ServicePage) {
  const url = `${SITE}/${page.slug}`;
  return {
    meta: [
      { title: page.title },
      { name: "description", content: page.description },
      { property: "og:title", content: page.title },
      { property: "og:description", content: page.description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: url },
      { property: "og:locale", content: "fr_FR" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}
