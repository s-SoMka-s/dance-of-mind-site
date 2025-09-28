import { useLocalObservable } from 'mobx-react-lite';
import { shuffle, splitToLetters } from '@utils';
import { TIdName } from '@models';

const getLetters = (source?: string): TIdName<string>[] => {
  if (!source) {
    return [];
  }

  const splitted = splitToLetters(source);
  const shuffled = shuffle(splitted);
  return shuffled.map((name, i) => ({
    id: `ltr-${i}-${name}`,
    name,
  }));
};

const createLocalStore = () => ({
  letters: [] as TIdName<string>[],
  selectedIds: new Set<string>(),
  selectedLetters: new Set<string>(),
  required: new Set<string>(),

  setPhrase(phrase?: string) {
    this.letters = getLetters(phrase);
    this.selectedIds.clear();
    this.selectedLetters.clear();
  },

  setExpected(expected?: string) {
    this.required = new Set(expected ? splitToLetters(expected) : []);
    this.selectedIds.clear();
    this.selectedLetters.clear();
  },

  checkExpected(expected: string) {
    this.required = new Set(splitToLetters(expected));
    this.reshuffleIfComplete();
  },

  isSelected(item: TIdName<string>) {
    return this.selectedIds.has(item.id);
  },

  toggle(item: TIdName<string>) {
    const { id, name } = item;

    if (this.selectedIds.has(id)) {
      this.selectedIds.delete(id);
      this.selectedLetters.delete(name);
    } else {
      this.selectedIds.add(id);
      this.selectedLetters.add(name);
    }

    // After any change, check completion and reshuffle if needed
    this.reshuffleIfComplete();
  },

  reshuffleIfComplete() {
    const isAllRequiredSelected = Object.keys(this.required).every((k) =>
      this.selectedLetters.has(k)
    );

    if (!isAllRequiredSelected) {
      return;
    }

    this.letters = shuffle(this.letters);
    this.selectedIds.clear();
    this.selectedLetters.clear();
    // Сообщаем об окончании набора слова
    //this.onComplete?.();
  },
});

export type TLettersStore = ReturnType<typeof createLocalStore>;

export const useLettersStore = () => {
  return useLocalObservable(() => createLocalStore());
};
