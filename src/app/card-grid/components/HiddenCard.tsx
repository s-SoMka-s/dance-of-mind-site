'use client';

import { cn } from '@lib/css.utils';

type Props = {
  className?: string;
};

export function HiddenCard({ className }: Props) {
  return (
    <div className={cn('w-full', className)}>
      <div
        className={cn('relative w-full invisible pointer-events-none')}
        style={{ aspectRatio: '250 / 350' }}
      />
    </div>
  );
}
