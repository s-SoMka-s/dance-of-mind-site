"use client";

import { useEffect, useRef } from "react";
import { usePageVisibilityPause } from "@/app/hooks/usePageVisibilityPause";

/**
 * Медленное 3D-вращение через CSS-анимацию (без JS RAF).
 * Ко-локально с карточкой, но не грузит основной поток кадрами.
 */
export function useSlow3DRotation<T extends HTMLElement>() {
  const elRef = useRef<T | null>(null);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    ensureKeyframesInstalled();
    el.style.transformStyle = "preserve-3d";
    el.style.backfaceVisibility = "hidden";
    el.style.animation = `${ANIM_NAME} 16s ease-in-out infinite alternate`;

    return () => {
      el.style.animation = "";
    };
  }, []);

  usePageVisibilityPause(
    () => {
      const el = elRef.current;
      if (el) el.style.animationPlayState = "paused";
    },
    () => {
      const el = elRef.current;
      if (el) el.style.animationPlayState = "running";
    }
  );

  return { ref: elRef } as const;
}

const STYLE_ID = "whoiam-rotation-keyframes";
const ANIM_NAME = "whoiam-slow-3d";

function ensureKeyframesInstalled() {
  if (typeof document === "undefined") return;
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = `
@keyframes ${ANIM_NAME} {
  0% { transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
  33% { transform: rotateX(5deg) rotateY(-8deg) rotateZ(2deg); }
  66% { transform: rotateX(-5deg) rotateY(8deg) rotateZ(-2deg); }
  100% { transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
}
`;
  document.head.appendChild(style);
}
