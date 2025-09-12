'use client';

import { Card } from './Card';

export function CardGrid() {
  // 14 placeholder items (backs up)
  const cards = Array.from({ length: 14 });

  return (
    <section className="grid gap-2 sm:gap-3 grid-cols-[repeat(auto-fit,minmax(160px,1fr))]">
      {cards.map((_, i) => (
        <div key={i} className="flex items-center justify-center p-3">
          <Card className="w-full" />
        </div>
      ))}
    </section>
  );
}
