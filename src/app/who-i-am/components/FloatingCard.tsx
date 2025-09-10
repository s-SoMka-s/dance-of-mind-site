"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import "./floating-card.css";
import { clamp, randBetween } from "./utils";
import type { ViewportSize } from "@hooks/useViewportSize";

/**
 * Полупрозрачная карточка с закруглёнными углами.
 * Движение реализовано через Motion (x/y c ping-pong),
 * поворот — через CSS keyframes. Без множества useRef.
 */
type Props = { viewport: ViewportSize };

export function FloatingCard({ viewport }: Props) {
  // Размер карточки (фиксируем после монтирования для случайности)
  const [size, setSize] = useState<{ w: number; h: number }>({ w: 160, h: 100 });

  // Инициализация случайных параметров один раз
  const random = useMemo(() => {
    return {
      // Стартовые позиции в процентах экрана — позже конвертируем в px
      startXPct: Math.random(),
      startYPct: Math.random(),
      // В какую сторону идём сначала по каждой оси
      dirX: Math.random() < 0.5 ? -1 : 1,
      dirY: Math.random() < 0.5 ? -1 : 1,
      // Продолжительность анимации по осям (сек)
      durX: randBetween(14, 28),
      durY: randBetween(18, 34),
      // Небольшая случайная задержка, чтобы не синхронизировались
      delay: randBetween(0, 4),
    } as const;
  }, []);

  // Генерируем случайный размер
  useEffect(() => {
    setSize({
      w: Math.round(randBetween(120, 220)),
      h: Math.round(randBetween(60, 140)),
    });
  }, []);

  // Когда знаем размеры окна — считаем диапазоны и старт
  const { initialX, initialY, targetX, targetY } = useMemo(() => {
    const xMax = Math.max(0, viewport.w - size.w);
    const yMax = Math.max(0, viewport.h - size.h);
    const startX = clamp(Math.round(random.startXPct * xMax), 0, xMax);
    const startY = clamp(Math.round(random.startYPct * yMax), 0, yMax);
    const tx = random.dirX < 0 ? 0 : xMax;
    const ty = random.dirY < 0 ? 0 : yMax;
    return { initialX: startX, initialY: startY, targetX: tx, targetY: ty };
  }, [viewport, size, random]);

  // Пока не знаем размеры окна — ничего не анимируем (избегаем прыжков)
  const ready = viewport.w > 0 && viewport.h > 0;

  return (
    <motion.div
      className="absolute"
      style={{ width: size.w, height: size.h }}
      initial={ready ? { x: initialX, y: initialY } : false}
      animate={
        ready
          ? {
              x: [initialX, targetX],
              y: [initialY, targetY],
            }
          : undefined
      }
      transition={
        ready
          ? {
              delay: random.delay,
              x: { duration: random.durX, repeat: Infinity, repeatType: "mirror", ease: "linear" },
              y: { duration: random.durY, repeat: Infinity, repeatType: "mirror", ease: "linear" },
            }
          : undefined
      }
    >
      <div
        className="w-full h-full rounded-xl fc-rotate-3d"
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
          backdropFilter: "blur(2px)",
        }}
      />
    </motion.div>
  );
}
