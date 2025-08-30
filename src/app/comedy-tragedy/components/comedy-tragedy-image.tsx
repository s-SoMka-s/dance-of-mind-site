'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { IMAGE_ANIMATION_DURATION } from '@/app/comedy-tragedy/constants';

type Props = {
  store: {
    isSolved: boolean;
    wrongActive: boolean;
    wrongToken: number;
  };
  isError: boolean;
};

const ComedyTragedyImageImpl = ({ store, isError }: Props) => {
  const src = store.isSolved || !store.wrongActive ? '/images/comedy.png' : '/images/tragedy.png';
  const alt = store.isSolved || !store.wrongActive ? 'Комедия' : 'Трагедия';
  const isTragedy = !store.isSolved && store.wrongActive;

  const router = useRouter();

  // Navigate to who-i-am after fly-through completes
  useEffect(() => {
    if (!store.isSolved) return;
    const id = window.setTimeout(() => {
      router.push('/who-i-am');
    }, IMAGE_ANIMATION_DURATION); // match the fly-through duration
    return () => clearTimeout(id);
  }, [store.isSolved, router]);

  return (
    <motion.div
      className="relative will-change-transform"
      style={{ transformOrigin: 'center center' }}
      initial={{ scale: 1 }}
      animate={store.isSolved ? { scale: [1, 120] } : { scale: 1 }}
      transition={
        store.isSolved
          ? { type: 'tween', duration: IMAGE_ANIMATION_DURATION / 1000, ease: 'linear' }
          : { type: 'tween', duration: 0.2, ease: 'easeOut' }
      }
    >
      <motion.div
        key={store.wrongToken}
        animate={store.wrongActive ? { x: [0, -10, 10, -8, 8, -5, 5, 0] } : { x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Image src={src} alt={alt} width={320} height={570} color="red" priority />
      </motion.div>
    </motion.div>
  );
};

export const ComedyTragedyImage = observer(ComedyTragedyImageImpl);
