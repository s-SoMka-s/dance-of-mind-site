'use client';

import { Card } from './Card';
import { Letter } from './Letter';
import { CardGridStoreProvider, useCardGridStore } from '../store';
import { LettersStoreProvider, useLettersStore } from '../letters-store';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { motion } from 'motion/react';

const GridInner = observer(function GridInner() {
  const store = useCardGridStore();
  const letters = useLettersStore();
  const cards = Array.from({ length: store.totalCount });

  return (
    <div className="flex flex-col gap-6">
      <section className="grid gap-2 sm:gap-3 grid-cols-[repeat(auto-fit,minmax(160px,1fr))]">
        {cards.map((_, i) => (
          <div key={i} className="flex items-center justify-center p-3">
            <Card index={i} className="w-full" isTarget={store.isTarget(i)} />
          </div>
        ))}
      </section>

      {letters.letters.length > 0 && (
        <motion.section
          layout
          className="flex flex-wrap items-center justify-center"
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
  // 14 placeholder items (backs up)
  const total = 14;
  return (
    <CardGridStoreProvider initialTotalCount={total}>
      <LettersStoreProvider phrase={phrase ?? 'я твой голос внутри'} expected={'твой'}>
        <GridInner />
      </LettersStoreProvider>
    </CardGridStoreProvider>
  );
}
