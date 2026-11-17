import { QueryClient } from "@tanstack/react-query";
import { createMemoryHistory, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    // Prévisualisation hébergée (iframe) : navigation interne en mémoire, sans toucher à l'URL.
    ...(typeof window !== "undefined" && (window as { __AE_PREVIEW__?: boolean }).__AE_PREVIEW__
      ? { history: createMemoryHistory({ initialEntries: ["/"] }) }
      : {}),
  });

  return router;
};
