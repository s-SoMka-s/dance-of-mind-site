'use client';

import { motion } from 'motion/react';

import { useLettersStore } from '@card-grid/store';
import { Letter } from './letter/letter';
import { useEffect } from 'react';

type Props = {
  canPick: boolean;
  phrase: string;
  expected: string;
};

export const LettersSection = ({ canPick, phrase, expected }: Props) => {
  const store = useLettersStore();

  useEffect(() => {
    store.setPhrase(phrase);
  }, [phrase, store]);

  useEffect(() => {
    store.setExpected(expected);
  }, [expected, store]);

  return (
    <motion.section
      layout
      className="fixed bottom-0 left-0 right-0 z-40 flex flex-wrap items-center justify-center gap-1 px-3 py-2 bg-black/55 backdrop-blur-sm border-t border-white/10"
      transition={{ type: 'spring', stiffness: 500, damping: 40, mass: 0.6 }}
    >
      {store.letters.map((item) => (
        <Letter key={item.id} item={item} store={store} canPick={canPick} />
      ))}
    </motion.section>
  );
};
