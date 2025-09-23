import { createContext, useContext } from 'react';
import { observer, useLocalObservable } from 'mobx-react-lite';
import { splitToLetters } from '@lib/string.utils';
import { shuffle } from '@lib/array.utils';
import { useCardGridStore } from './store';

export type LettersStore = {
  letters: { id: string; ch: string }[];
  selectedIdx: Set<number>;
  selectedLetters: Set<string>;
  required: Set<string>;
  onComplete?: () => void;
  toggle: (index: number) => void;
  setPhrase: (phrase?: string) => void;
  setExpected: (expected?: string) => void;
  checkExpected: (expected: string) => void;
  // Service helpers
  isAllRequiredSelected: () => boolean;
  reshuffleIfComplete: () => void;
};

export const createLettersStore = ({
  phrase,
  expected,
  onComplete,
}: {
  phrase?: string;
  expected?: string;
  onComplete?: () => void;
}): LettersStore => ({
  letters: phrase
    ? shuffle(
        splitToLetters(phrase).map((ch, i) => ({ id: `ltr-${i}-${ch}-${Math.random().toString(36).slice(2)}`, ch }))
      )
    : [],
  selectedIdx: new Set<number>(),
  selectedLetters: new Set<string>(),
  required: new Set(expected ? splitToLetters(expected) : []),
  onComplete,

  toggle(index: number) {
    const i = index | 0;
    const item = this.letters[i];
    if (this.selectedIdx.has(i)) {
      this.selectedIdx.delete(i);
      this.selectedLetters.delete(item?.ch);
    } else {
      this.selectedIdx.add(i);
      if (item) this.selectedLetters.add(item.ch);
    }

    // After any change, check completion and reshuffle if needed
    this.reshuffleIfComplete();
  },
  setPhrase(phrase?: string) {
    this.letters = phrase
      ? shuffle(
          splitToLetters(phrase).map((ch, i) => ({ id: `ltr-${i}-${ch}-${Math.random().toString(36).slice(2)}`, ch }))
        )
      : [];
    this.selectedIdx.clear();
    this.selectedLetters.clear();
  },

  setExpected(expected?: string) {
    this.required = new Set(expected ? splitToLetters(expected) : []);
    this.selectedIdx.clear();
    this.selectedLetters.clear();
  },

  checkExpected(expected: string) {
    this.required = new Set(splitToLetters(expected));
    this.reshuffleIfComplete();
  },

  // Consider "required" letters as the set of unique letters in current phrase.
  // When the selected unique letters cover all required unique letters (order ignored),
  // we shuffle the visible letters and clear the selection.
  isAllRequiredSelected() {
    if (this.required.size === 0) return false;
    for (const ch of this.required) {
      if (!this.selectedLetters.has(ch)) return false;
    }
    return true;
  },

  reshuffleIfComplete() {
    if (!this.isAllRequiredSelected()) return;
    this.letters = shuffle(this.letters);
    this.selectedIdx.clear();
    this.selectedLetters.clear();
    // Сообщаем об окончании набора слова
    this.onComplete?.();
  },
});

const LettersCtx = createContext<LettersStore | null>(null);

export const LettersStoreProvider = observer(function LettersStoreProvider({
  children,
  phrase,
  expected,
}: {
  children: React.ReactNode;
  phrase?: string;
  expected?: string;
}) {
  const grid = useCardGridStore();
  const store = useLocalObservable(() =>
    createLettersStore({ phrase, expected, onComplete: () => grid.nextTarget() })
  );
  return <LettersCtx.Provider value={store}>{children}</LettersCtx.Provider>;
});

export const useLettersStore = () => {
  const store = useContext(LettersCtx);
  if (!store) throw new Error('Use LettersStore within provider!');
  return store;
};
