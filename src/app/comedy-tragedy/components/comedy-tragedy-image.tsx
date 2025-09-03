'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { IMAGE_ANIMATION_DURATION } from '@/app/comedy-tragedy/constants';

import comedyImg from 'images/comedy.webp';
import tragedyImg from 'images/tragedy.webp';
import { useAudioPlayer } from 'react-use-audio-player';

type Props = {
  store: {
    isError: boolean;
    isSolved: boolean;
  };
};

const ComedyTragedyImageImpl = ({ store }: Props) => {
  const router = useRouter();

  const { load, pause } = useAudioPlayer();

  const onError = () => {
    load('audio/error.wav', {
      initialVolume: 1,
      autoplay: true,
    });
  };

  useEffect(() => {
    if (!store.isSolved) return;
    const id = window.setTimeout(() => {
      router.push('/who-i-am');
    }, IMAGE_ANIMATION_DURATION); // match the fly-through duration
    return () => clearTimeout(id);
  }, [store.isSolved, router]);

  useEffect(() => {
    console.log('isError changed:', store.isError);

    if (store.isError) {
      onError();
    } else {
      pause();
    }
  }, [store.isError]);

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
      {!store.isError ? (
        <Image src={comedyImg} alt={'Comedy'} width={320} height={570} priority />
      ) : (
        <motion.div animate={{ x: [0, -10, 10, -8, 8, -5, 5, 0] }} transition={{ duration: 0.6 }}>
          <Image src={tragedyImg} alt={'Tragedy'} width={320} height={570} priority />
        </motion.div>
      )}
    </motion.div>
  );
};

export const ComedyTragedyImage = observer(ComedyTragedyImageImpl);
