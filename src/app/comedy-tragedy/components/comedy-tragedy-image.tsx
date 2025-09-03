'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import { observer } from 'mobx-react-lite';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { IMAGE_ANIMATION_DURATION } from '@/app/comedy-tragedy/constants';

import comedyImg from 'images/comedy.webp';
import tragedyImg from 'images/tragedy.webp';
import { useAudioPlayer } from 'react-use-audio-player';
import styles from './comedy-tragedy-image.module.css';

type Props = {
  store: {
    isError: boolean;
    isSolved: boolean;
  };
};

const ComedyTragedyImageImpl = ({ store }: Props) => {
  const router = useRouter();

  const { load, pause } = useAudioPlayer();

  // Rage/Recover UI mode and shake trigger
  const [mode, setMode] = useState<null | 'rage' | 'recover'>(null);
  const [shakeOn, setShakeOn] = useState(false);
  const prevIsError = useRef(store.isError);

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
    if (store.isError) {
      onError();
      setMode('rage');
      // retrigger shake animation by toggling the class
      setShakeOn(false);
      requestAnimationFrame(() => setShakeOn(true));
    } else {
      pause();
      if (prevIsError.current) {
        setMode('recover');
        const t = window.setTimeout(() => setMode(null), 900); // match recover duration
        return () => clearTimeout(t);
      } else {
        setMode(null);
      }
    }
    prevIsError.current = store.isError;
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
      {store.isError || mode === 'rage' || mode === 'recover' ? (
        <div className={`${mode ? styles[mode] : ''}`}>
          <div className={styles['mask-wrap']}>
            <Image
              className={`${styles['mask-img']} ${shakeOn ? styles.on : ''}`}
              src={tragedyImg}
              alt={'Tragedy'}
              width={320}
              height={570}
              priority
            />
          </div>
          <div className={styles['hit-overlay']} />
        </div>
      ) : (
        <Image src={comedyImg} alt={'Comedy'} width={320} height={570} priority />
      )}
    </motion.div>
  );
};

export const ComedyTragedyImage = observer(ComedyTragedyImageImpl);
