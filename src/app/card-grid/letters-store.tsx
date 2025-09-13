import { createContext, useContext } from 'react';
import { observer, useLocalObservable } from 'mobx-react-lite';
import { splitToLetters } from '@lib/string.utils';
import { shuffle } from '@lib/array.utils';

export type LettersStore = {
  letters: string[];
  selectedIdx: Set<number>;
  toggle: (index: number) => void;
  setPhrase: (phrase?: string) => void;
};

export const createLettersStore = ({ phrase }: { phrase?: string }): LettersStore => ({
  letters: phrase ? shuffle(splitToLetters(phrase)) : [],
  selectedIdx: new Set<number>(),
  toggle(index: number) {
    const i = index | 0;
    if (this.selectedIdx.has(i)) this.selectedIdx.delete(i);
    else this.selectedIdx.add(i);
  },
  setPhrase(phrase?: string) {
    this.letters = phrase ? shuffle(splitToLetters(phrase)) : [];
    this.selectedIdx.clear();
  },
});

const LettersCtx = createContext<LettersStore | null>(null);

export const LettersStoreProvider = observer(function LettersStoreProvider({
  children,
  phrase,
}: {
  children: React.ReactNode;
  phrase?: string;
}) {
  const store = useLocalObservable(() => createLettersStore({ phrase }));
  return <LettersCtx.Provider value={store}>{children}</LettersCtx.Provider>;
});

export const useLettersStore = () => {
  const store = useContext(LettersCtx);
  if (!store) throw new Error('Use LettersStore within provider!');
  return store;
};
