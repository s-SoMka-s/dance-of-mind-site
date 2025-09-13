'use client';

import Image from 'next/image';
import { CometCard } from '@/components/ui/comet-card';
import { cn } from '@/lib/utils';
import { motion, useAnimationControls } from 'motion/react';
import { useState } from 'react';
import './card-animated-border.scss';

type Props = {
  className?: string;
  isTarget?: boolean;
};

export function Card({ className, isTarget = true }: Props) {
  const controls = useAnimationControls();
  const [spinning, setSpinning] = useState(false);

  const handleClick = async () => {
    if (spinning) return;
    setSpinning(true);
    try {
      // Равномерное вращение по оси Y и подъём по оси Z во время вращения.
      await controls.start({
        rotateY: 720,
        z: [0, 60, 0],
        transition: {
          rotateY: { duration: 1.4, ease: 'linear' },
          z: { duration: 1.4, times: [0, 0.5, 1], ease: 'easeInOut' },
        },
      });
      controls.set({ rotateY: 0, z: 0 });
    } finally {
      setSpinning(false);
    }
  };

  return (
    <div className={cn('w-full perspective-distant transform-3d', className)}>
      <motion.div
        onClick={handleClick}
        animate={controls}
        whileTap={{ scale: 1.02 }}
        style={{ rotateY: 0, z: 0 }}
        className={cn('w-full')}
      >
        <CometCard
          rotateDepth={12}
          translateDepth={12}
          className={cn('w-full cursor-pointer select-none')}
        >
          <div className="relative w-full" style={{ aspectRatio: '250 / 350' }}>
            <Image
              src="/images/cards/placeholder.svg"
              alt="Playing card back"
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
              priority={false}
            />
            {isTarget && (
              <span
                aria-hidden
                className={cn(
                  'pointer-events-none absolute inset-0 rounded-[16px] shadow-none',
                  'card-animated-border'
                )}
              />
            )}
          </div>
        </CometCard>
      </motion.div>
    </div>
  );
}
