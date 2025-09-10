"use client";

import { useFloatingMovement } from "./useFloatingMovement";
import { useSlow3DRotation } from "./useSlow3DRotation";
import React, { useEffect, useState } from "react";

/**
 * Полупрозрачная карточка с закруглёнными углами, летит по экрану
 * и мягко вращается в 3D. Визуальная, без текста.
 */
export function FloatingCard() {
  // Стабильный SSR размер; на клиенте зададим случайный
  const [size, setSize] = useState<{ w: number; h: number }>({ w: 160, h: 100 });
  useEffect(() => {
    setSize({
      w: Math.round(randBetween(120, 220)),
      h: Math.round(randBetween(60, 140)),
    });
  }, []);

  // Движение (внешний контейнер)
  const move = useFloatingMovement<HTMLDivElement>({ speedRange: [25, 55] });
  // Медленное 3D-вращение (внутренний контейнер)
  const rot = useSlow3DRotation<HTMLDivElement>();

  return (
    <div ref={move.ref} className="absolute" style={{ width: size.w, height: size.h }}>
      <div
        ref={rot.ref}
        className="w-full h-full rounded-xl"
        style={{
          // Едва заметная карточка над 1-м слоем
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
          backdropFilter: "blur(2px)",
        }}
      />
    </div>
  );
}

function randBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}
