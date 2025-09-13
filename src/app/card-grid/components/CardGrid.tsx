'use client';

import { Card } from './Card';
import { HiddenCard } from './HiddenCard';
import { Letter } from './Letter';
import { CardGridStoreProvider, useCardGridStore } from '../store';
import { LettersStoreProvider, useLettersStore } from '../letters-store';
import { observer } from 'mobx-react-lite';
import React from 'react';

const GridInner = observer(function GridInner() {
  const store = useCardGridStore();
  const letters = useLettersStore();
  const cards = Array.from({ length: store.totalCount });

  return (
    <div className="flex flex-col gap-6">
      <section className="grid gap-2 sm:gap-3 grid-cols-[repeat(auto-fit,minmax(160px,1fr))]">
        {cards.map((_, i) => (
          <div key={i} className="flex items-center justify-center p-3">
            {store.isRemoved(i) ? (
              <HiddenCard className="w-full" />
            ) : (
              <Card className="w-full" isTarget={store.isTarget(i)} />
            )}
          </div>
        ))}
      </section>

      {letters.letters.length > 0 && (
        <section className="flex flex-wrap items-center justify-center">
          {letters.letters.map((ch, idx) => (
            <Letter key={`ch-${idx}-${ch}`} ch={ch} index={idx} />
          ))}
        </section>
      )}
    </div>
  );
});

export function CardGrid({ phrase }: { phrase?: string }) {
  // 14 placeholder items (backs up)
  const total = 14;
  return (
    <CardGridStoreProvider initialTotalCount={total}>
      <LettersStoreProvider phrase={phrase ?? 'я твой голос внутри'}>
        <GridInner />
      </LettersStoreProvider>
    </CardGridStoreProvider>
  );
}
