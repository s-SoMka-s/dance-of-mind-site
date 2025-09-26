'use client';

import { Card } from './Card';
import { Letter } from './Letter';
import { CardGridStoreProvider, useCardGridStore } from '../store';
import { LettersStoreProvider, useLettersStore } from '../letters-store';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';

const GridInner = observer(function GridInner() {
  const store = useCardGridStore();
  const letters = useLettersStore();
  const cards = Array.from({ length: store.totalCount });
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const idx = store.targetIndex;
    if (idx == null || idx < 0) return;
    const container = scrollRef.current;
    if (!container) return;
    const el = container.querySelector<HTMLDivElement>(`[data-card-index="${idx}"]`);
    if (el) {
      el.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }
  }, [store.targetIndex]);

  return (
    <div className="flex flex-col gap-6 pb-20 h-full min-h-[100svh]">
      <section
        ref={scrollRef}
        className="min-h-0 flex-1 overflow-y-auto grid gap-2 sm:gap-3 grid-cols-[repeat(13,minmax(0,1fr))]"
      >
        {cards.map((_, i) => (
          <div key={i} data-card-index={i} className="flex items-center justify-center p-2">
            <Card index={i} className="w-full" isTarget={store.isTarget(i)} />
          </div>
        ))}
      </section>

      {letters.letters.length > 0 && (
        <motion.section
          layout
          className="fixed bottom-0 left-0 right-0 z-40 flex flex-wrap items-center justify-center gap-1 px-3 py-2 bg-black/55 backdrop-blur-sm border-t border-white/10"
          transition={{ type: 'spring', stiffness: 500, damping: 40, mass: 0.6 }}
        >
          {letters.letters.map((item, idx) => (
            <Letter key={item.id} ch={item.ch} index={idx} />
          ))}
        </motion.section>
      )}
    </div>
  );
});

export function CardGrid({ phrase }: { phrase?: string }) {
  // 4 rows x 13 columns = 52 cards
  const total = 52;
  return (
    <CardGridStoreProvider initialTotalCount={total}>
      <LettersStoreProvider phrase={phrase ?? 'я твой голос внутри'} expected={'твой'}>
        <GridInner />
      </LettersStoreProvider>
    </CardGridStoreProvider>
  );
}
