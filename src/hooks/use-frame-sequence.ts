import { useCallback, useEffect, useRef, useState } from "react";
import { FRAME_COUNT, frameUrl } from "@/lib/orbit";

/**
 * Charge la séquence d'images une seule fois pour toute la page (cache module)
 * et dessine l'image la plus proche déjà chargée sur un canvas, en « cover ».
 */
const cache: { mobile?: boolean; imgs: (HTMLImageElement | null)[]; started: boolean; listeners: Set<() => void> } = {
  imgs: [],
  started: false,
  listeners: new Set(),
};

function start(mobile: boolean) {
  if (cache.started) return;
  cache.started = true;
  cache.mobile = mobile;
  cache.imgs = new Array(FRAME_COUNT).fill(null);
  const step = mobile ? 2 : 1;
  // Ordre de chargement : clés d'abord, puis passes de plus en plus fines.
  const order: number[] = [];
  const seen = new Set<number>();
  for (const stride of [30, 12, 6, 2, 1]) {
    for (let i = 0; i < FRAME_COUNT; i += stride * step) {
      const k = i - (i % step);
      if (!seen.has(k)) {
        seen.add(k);
        order.push(k);
      }
    }
  }
  let inflight = 0;
  let cursor = 0;
  const pump = () => {
    while (inflight < 6 && cursor < order.length) {
      const idx = order[cursor++];
      inflight++;
      const img = new Image();
      img.decoding = "async";
      img.onload = () => {
        cache.imgs[idx] = img;
        if (step === 2 && idx + 1 < FRAME_COUNT) cache.imgs[idx + 1] = img;
        inflight--;
        cache.listeners.forEach((l) => l());
        pump();
      };
      img.onerror = () => {
        inflight--;
        pump();
      };
      img.src = frameUrl(idx, mobile);
    }
  };
  pump();
}

export function useFrameSequence() {
  const [loaded, setLoaded] = useState(0);
  useEffect(() => {
    start(window.matchMedia("(max-width: 767px)").matches);
    const l = () => setLoaded(cache.imgs.filter(Boolean).length);
    cache.listeners.add(l);
    l();
    return () => void cache.listeners.delete(l);
  }, []);
  return loaded;
}

export function nearestFrame(i: number) {
  const n = cache.imgs.length;
  if (!n) return null;
  const c = Math.max(0, Math.min(n - 1, Math.round(i)));
  for (let d = 0; d < n; d++) {
    if (cache.imgs[c - d]) return cache.imgs[c - d];
    if (cache.imgs[c + d]) return cache.imgs[c + d];
  }
  return null;
}

/** Retourne un ref de canvas et une fonction draw(frame) optimisée. */
export function useCanvasDraw() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const last = useRef<{ img: HTMLImageElement | null; w: number; h: number }>({ img: null, w: 0, h: 0 });

  const draw = useCallback((frame: number, force = false) => {
    const c = canvas.current;
    if (!c) return;
    const img = nearestFrame(frame);
    if (!img) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.round(c.clientWidth * dpr);
    const h = Math.round(c.clientHeight * dpr);
    if (!force && last.current.img === img && last.current.w === w && last.current.h === h) return;
    if (c.width !== w || c.height !== h) {
      c.width = w;
      c.height = h;
    }
    const ctx = c.getContext("2d");
    if (!ctx) return;
    const s = Math.max(w / img.naturalWidth, h / img.naturalHeight);
    const dw = img.naturalWidth * s;
    const dh = img.naturalHeight * s;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh);
    last.current = { img, w, h };
  }, []);

  return { canvas, draw };
}
