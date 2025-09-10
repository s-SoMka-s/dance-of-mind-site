"use client";

import { useEffect, useRef } from "react";
import { usePageVisibilityPause } from "@/app/hooks/usePageVisibilityPause";

type Options = {
  speedRange?: [number, number]; // px/s
  initialDirectionDeg?: number; // optional fixed direction
};

/**
 * Императивно анимирует элемент по экрану с отскоком от границ вьюпорта.
 * Обновляет style.transform напрямую для высокой производительности.
 * Ожидается, что элемент имеет position: absolute.
 */
export function useFloatingMovement<T extends HTMLElement>({
  speedRange = [20, 60],
  initialDirectionDeg,
}: Options = {}) {
  const elRef = useRef<T | null>(null);
  const rafRef = useRef<number | null>(null);
  const lastTsRef = useRef<number | null>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const velRef = useRef({ vx: 0, vy: 0 });
  const sizeRef = useRef({ w: 0, h: 0 });
  const runningRef = useRef(true);

  const measure = () => {
    const el = elRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    sizeRef.current = { w: rect.width || 0, h: rect.height || 0 };
  };

  const initPositionAndVelocity = () => {
    const el = elRef.current;
    if (!el) return;

    const { innerWidth: W, innerHeight: H } = window;
    const { w, h } = sizeRef.current;

    // Случайная стартовая позиция в пределах экрана
    const x = Math.max(0, Math.min(W - w, Math.random() * (W - w)));
    const y = Math.max(0, Math.min(H - h, Math.random() * (H - h)));
    posRef.current = { x, y };

    // Случайная скорость
    const speed = randBetween(speedRange[0], speedRange[1]);
    const angleDeg =
      typeof initialDirectionDeg === "number"
        ? initialDirectionDeg
        : Math.random() * 360;
    const angle = (angleDeg * Math.PI) / 180;
    velRef.current = { vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed };
  };

  const step = (ts: number) => {
    if (!runningRef.current) return;
    const el = elRef.current;
    if (!el) return;

    if (lastTsRef.current == null) {
      lastTsRef.current = ts;
    }
    let dt = (ts - lastTsRef.current) / 1000; // seconds
    lastTsRef.current = ts;

    // Ограничим dt после возвращения со скрытой вкладки
    dt = Math.min(dt, 0.05);

    const { innerWidth: W, innerHeight: H } = window;
    const { w, h } = sizeRef.current;
    let { x, y } = posRef.current;
    let { vx, vy } = velRef.current;

    x += vx * dt;
    y += vy * dt;

    // Отскок по X
    if (x <= 0) {
      x = 0;
      vx = Math.abs(vx);
    } else if (x + w >= W) {
      x = Math.max(0, W - w);
      vx = -Math.abs(vx);
    }

    // Отскок по Y
    if (y <= 0) {
      y = 0;
      vy = Math.abs(vy);
    } else if (y + h >= H) {
      y = Math.max(0, H - h);
      vy = -Math.abs(vy);
    }

    posRef.current = { x, y };
    velRef.current = { vx, vy };

    el.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;
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
    const el = elRef.current;
    if (!el) return;
    el.style.willChange = "transform";
    measure();
    initPositionAndVelocity();
    start();

    const onResize = () => {
      measure();
      // Клампим позицию в новые границы
      const { innerWidth: W, innerHeight: H } = window;
      const { w, h } = sizeRef.current;
      const { x, y } = posRef.current;
      posRef.current = {
        x: Math.max(0, Math.min(W - w, x)),
        y: Math.max(0, Math.min(H - h, y)),
      };
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  usePageVisibilityPause(
    () => {
      runningRef.current = false;
      stop();
    },
    () => {
      runningRef.current = true;
      lastTsRef.current = null;
      start();
    }
  );

  return { ref: elRef } as const;
}

function randBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

