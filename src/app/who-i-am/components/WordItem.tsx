"use client";

import React from "react";
import { useFloatingMovement } from "./useFloatingMovement";
import type { TWhoIAmCard } from "../store/who-i-am.store";
import { observer } from "mobx-react-lite";
import { useWhoIAmStore } from "../store/who-i-am.store";

type Props = {
  card: TWhoIAmCard;
};

/**
 * Отдельное слово: парит по экрану, кликабельно, без 3D-вращения.
 */
export const WordItem = observer(function WordItem({ card }: Props) {
  const store = useWhoIAmStore();
  const move = useFloatingMovement<HTMLDivElement>({ speedRange: [18, 40] });
  const isSelected = store.isSelected(card.id);

  return (
    <div
      ref={move.ref}
      className="absolute select-none"
      style={{
        // Дадим небольшой внутренний отступ, чтобы обводка красиво смотрелась
        padding: "4px 8px",
      }}
    >
      <button
        onClick={() => store.pickCard(card)}
        className={
          "cursor-pointer rounded-md text-sm md:text-base text-white/90 " +
          (isSelected
            ? " ring-2 ring-sky-500/80 ring-offset-0 ring-offset-transparent"
            : " ring-0")
        }
        style={{
          background: isSelected ? "rgba(14,165,233,0.08)" : "rgba(255,255,255,0.02)",
          border: isSelected ? "1px solid rgba(14,165,233,0.6)" : "1px solid rgba(255,255,255,0.08)",
          color: "rgba(255,255,255,0.95)",
          padding: "6px 10px",
          backdropFilter: "blur(1px)",
        }}
      >
        {card.text}
      </button>
    </div>
  );
});
