'use client';

import Image from 'next/image';
import { CometCard } from '@/components/ui/comet-card';
import { cn } from '@/lib/utils';

type Props = {
  className?: string;
};

export function Card({ className }: Props) {
  return (
    <CometCard
      rotateDepth={12}
      translateDepth={12}
      className={cn('w-full cursor-pointer select-none', className)}
    >
      <div className="relative w-full" style={{ aspectRatio: '250 / 350' }}>
        <Image
          src="/images/cards/placeholder.svg"
          alt="Playing card back"
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          priority={false}
        />
      </div>
    </CometCard>
  );
}
