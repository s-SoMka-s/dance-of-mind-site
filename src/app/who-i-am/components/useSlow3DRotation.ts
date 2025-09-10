"use client";

import { useEffect, useRef } from "react";
import { usePageVisibilityPause } from "@/app/hooks/usePageVisibilityPause";

/**
 * Медленное 3D-вращение для вложенного элемента (контента карточки).
 * Обновляет style.transform напрямую, не мешая внешнему translate3d.
 */
export function useSlow3DRotation<T extends HTMLElement>() {
  const elRef = useRef<T | null>(null);
  const rafRef = useRef<number | null>(null);
  const startTsRef = useRef<number | null>(null);
  const runningRef = useRef(true);

  const step = (ts: number) => {
    if (!runningRef.current) return;
    const el = elRef.current;
    if (!el) return;

    if (startTsRef.current == null) startTsRef.current = ts;
    const t = (ts - startTsRef.current) / 1000; // seconds

    // Медленные гармонические вращения
    const rx = 5 * Math.sin(t * 0.2); // ±5deg
    const ry = 8 * Math.cos(t * 0.15); // ±8deg
    const rz = 2 * Math.sin(t * 0.1); // лёгкий дрейф по Z

    el.style.transform = `rotateX(${rx.toFixed(3)}deg) rotateY(${ry.toFixed(3)}deg) rotateZ(${rz.toFixed(3)}deg)`;
    el.style.transformStyle = "preserve-3d";

    if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(step);
  };

  const start = () => {
    if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(step);
  };

  const stop = () => {
    if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
  };

  useEffect(() => {
    start();
    return () => stop();
  }, []);

  usePageVisibilityPause(
    () => {
      runningRef.current = false;
      stop();
    },
    () => {
      runningRef.current = true;
      startTsRef.current = null;
      start();
    }
  );

  return { ref: elRef } as const;
}

