'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'motion/react';
import type { TWhoIAmCard } from '../store/who-i-am.store';
import { REQUIRED_WORDS } from '../store/who-i-am.store';
import { observer } from 'mobx-react-lite';
import { useWhoIAmStore } from '../store/who-i-am.store';
import { randBetween } from '@utils';
import { ViewportSize } from '@models';

type Props = { card: TWhoIAmCard; viewport: ViewportSize };

/**
 * Отдельное слово: парит по экрану, кликабельно, без 3D-вращения.
 */
export const WordItem = observer(function WordItem({ card, viewport }: Props) {
  const store = useWhoIAmStore();
  const isTarget = REQUIRED_WORDS.includes(card.text.trim().toLowerCase());
  const isSelected = store.selectedIds.has(card.id);

  // Размер элемента, чтобы не выходить за края экрана
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [elemSize, setElemSize] = useState<{ w: number; h: number }>({ w: 0, h: 0 });
  useEffect(() => {
    const measure = () => {
      const el = rootRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      setElemSize({ w: Math.round(r.width), h: Math.round(r.height) });
    };
    // первичное измерение и на resize
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  // Случайная стартовая позиция и параметры движения (без измерений DOM)
  const rnd = useMemo(() => {
    return {
      startXPct: Math.random(),
      startYPct: Math.random(),
      dirX: (Math.random() < 0.5 ? -1 : 1) as -1 | 1,
      dirY: (Math.random() < 0.5 ? -1 : 1) as -1 | 1,
      durX: randBetween(16, 32),
      durY: randBetween(18, 36),
      delay: randBetween(0, 3.5),
    };
  }, []);

  // Отступ от краев, чтобы слова не прилипали
  const margin = 16;
  const ready = viewport.w > 0 && viewport.h > 0 && elemSize.w > 0 && elemSize.h > 0;
  const { initialX, initialY, targetX, targetY } = useMemo(() => {
    const xMax = Math.max(0, viewport.w - elemSize.w - margin * 2);
    const yMax = Math.max(0, viewport.h - elemSize.h - margin * 2);
    const startX = Math.round(rnd.startXPct * xMax);
    const startY = Math.round(rnd.startYPct * yMax);
    const tx = rnd.dirX < 0 ? 0 : xMax;
    const ty = rnd.dirY < 0 ? 0 : yMax;
    return {
      initialX: startX + margin,
      initialY: startY + margin,
      targetX: tx + margin,
      targetY: ty + margin,
    };
  }, [viewport, elemSize, rnd]);

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
        ready
          ? {
              delay: rnd.delay,
              x: { duration: rnd.durX, repeat: Infinity, repeatType: 'mirror', ease: 'linear' },
              y: { duration: rnd.durY, repeat: Infinity, repeatType: 'mirror', ease: 'linear' },
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
