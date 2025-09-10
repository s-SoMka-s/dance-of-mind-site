'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'motion/react';
import type { TWhoIAmCard } from '../store/who-i-am.store';
import { REQUIRED_WORDS } from '../store/who-i-am.store';
import { observer } from 'mobx-react-lite';
import { useWhoIAmStore } from '../store/who-i-am.store';
import { clamp, randBetween } from './utils';
import type { ViewportSize } from '@hooks/useViewportSize';

type Props = {
  card: TWhoIAmCard;
  viewport: ViewportSize;
};

/**
 * Отдельное слово: парит по экрану, кликабельно, без 3D-вращения.
 */
export const WordItem = observer(function WordItem({ card, viewport }: Props) {
  const store = useWhoIAmStore();
  const isTarget = REQUIRED_WORDS.includes(card.text.trim().toLowerCase());
  const isSelected = store.selectedIds.has(card.id);

  // Viewport now comes from parent via props

  // 2) Element size (one ref is ok; no "куча useRef")
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [elemSize, setElemSize] = useState<{ w: number; h: number }>({ w: 0, h: 0 });
  useEffect(() => {
    const measure = () => {
      const el = rootRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      setElemSize({ w: Math.round(r.width), h: Math.round(r.height) });
    };
    measure();
    // Re-measure on resize for responsive text size
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  // 3) Randomized movement params, persisted per-card in localStorage
  type MoveSeed = {
    startXPct: number;
    startYPct: number;
    dirX: -1 | 1;
    dirY: -1 | 1;
    durX: number;
    durY: number;
    delay: number;
  };
  const [seed, setSeed] = useState<MoveSeed | null>(null);
  useEffect(() => {
    const key = `whoiam-word-seed:${card.id}`;
    try {
      const raw = localStorage.getItem(key);
      if (raw) {
        const parsed = JSON.parse(raw) as MoveSeed;
        if (
          typeof parsed?.startXPct === 'number' &&
          typeof parsed?.startYPct === 'number' &&
          (parsed?.dirX === -1 || parsed?.dirX === 1) &&
          (parsed?.dirY === -1 || parsed?.dirY === 1)
        ) {
          setSeed(parsed);
          return;
        }
      }
    } catch {}
    const next: MoveSeed = {
      startXPct: Math.random(),
      startYPct: Math.random(),
      dirX: Math.random() < 0.5 ? -1 : 1,
      dirY: Math.random() < 0.5 ? -1 : 1,
      durX: randBetween(16, 32),
      durY: randBetween(18, 36),
      delay: randBetween(0, 3.5),
    };
    setSeed(next);
    try {
      localStorage.setItem(key, JSON.stringify(next));
    } catch {}
  }, [card.id]);

  // 4) Compute limits and targets when ready
  const ready = viewport.w > 0 && viewport.h > 0 && seed !== null && elemSize.w > 0;
  const { initialX, initialY, targetX, targetY } = useMemo(() => {
    if (!seed) return { initialX: 0, initialY: 0, targetX: 0, targetY: 0 };
    const xMax = Math.max(0, viewport.w - elemSize.w);
    const yMax = Math.max(0, viewport.h - elemSize.h);
    const startX = clamp(Math.round(seed.startXPct * xMax), 0, xMax);
    const startY = clamp(Math.round(seed.startYPct * yMax), 0, yMax);
    const tx = seed.dirX < 0 ? 0 : xMax;
    const ty = seed.dirY < 0 ? 0 : yMax;
    return { initialX: startX, initialY: startY, targetX: tx, targetY: ty };
  }, [viewport, elemSize, seed]);

  return (
    <motion.div
      ref={rootRef}
      className="absolute select-none"
      style={{
        padding: '4px 8px',
        zIndex: isTarget ? 100 : 10,
        pointerEvents: 'auto',
      }}
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
        ready && seed
          ? {
              delay: seed.delay,
              x: { duration: seed.durX, repeat: Infinity, repeatType: 'mirror', ease: 'linear' },
              y: { duration: seed.durY, repeat: Infinity, repeatType: 'mirror', ease: 'linear' },
            }
          : undefined
      }
    >
      <button
        onClick={() => store.pickCard(card)}
        className={
          'cursor-pointer rounded-md text-sm md:text-base text-white/90 ' +
          (isSelected ? ' ring-2 ring-sky-500/80 ring-offset-0 ring-offset-transparent' : ' ring-0')
        }
        style={{
          background: isSelected ? 'rgba(14,165,233,0.08)' : 'rgba(255,255,255,0.02)',
          border: isSelected
            ? '1px solid rgba(14,165,233,0.6)'
            : '1px solid rgba(255,255,255,0.08)',
          color: 'rgba(255,255,255,0.95)',
          padding: '6px 10px',
          backdropFilter: 'blur(1px)',
          pointerEvents: 'auto',
        }}
      >
        {card.text}
      </button>
    </motion.div>
  );
});
