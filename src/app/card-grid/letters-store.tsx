import { createContext, useContext } from 'react';
import { observer, useLocalObservable } from 'mobx-react-lite';
import { splitToLetters } from '@lib/string.utils';
import { shuffle } from '@lib/array.utils';

export type LettersStore = {
  letters: string[];
  selectedIdx: Set<number>;
  selectedLetters: Set<string>;
  toggle: (index: number) => void;
  setPhrase: (phrase?: string) => void;
  checkExpected: (expected: string) => void;
};

export const createLettersStore = ({ phrase }: { phrase?: string }): LettersStore => ({
  letters: phrase ? shuffle(splitToLetters(phrase)) : [],
  selectedIdx: new Set<number>(),
  selectedLetters: new Set<string>(),

  toggle(index: number) {
    const i = index | 0;
    const letter = this.letters[i];
    if (this.selectedIdx.has(i)) {
      this.selectedIdx.delete(i);
      this.selectedLetters.delete(letter);
    } else {
      this.selectedIdx.add(i);
      this.selectedLetters.add(letter);
    }
  },
  setPhrase(phrase?: string) {
    this.letters = phrase ? shuffle(splitToLetters(phrase)) : [];
    this.selectedIdx.clear();
  },

  checkExpected(expected: string) {},
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
