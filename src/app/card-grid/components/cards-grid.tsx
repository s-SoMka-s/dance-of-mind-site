'use client';

import { useRef } from 'react';

import { CARDS_TOTAL_COUNT } from '@card-grid/config';
import { useCardsStore } from '@card-grid/store';
import { useAutoScroll } from '@hooks';

import { Card } from './Card';

export const CardsGrid = () => {
  const store = useCardsStore();

  const cards = Array.from({ length: CARDS_TOTAL_COUNT });
  const scrollRef = useRef<HTMLDivElement | null>(null);

  //useAutoScroll(scrollRef, `card-${store.currentTargetIdx}`);

  return (
    <div className="flex flex-col gap-6 h-full min-h-[100svh]">
      <section
        ref={scrollRef}
        className="min-h-0 flex-1 overflow-y-auto grid gap-2 sm:gap-3 grid-cols-[repeat(13,minmax(0,1fr))]"
      >
        {cards.map((_, i) => (
          <div key={i} id={`card-${i}`} className="flex items-center justify-center p-2">
            <Card index={i} className="w-full" store={store} />
          </div>
        ))}
      </section>
    </div>
  );
};
