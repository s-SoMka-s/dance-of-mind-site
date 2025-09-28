import { CARDS_TOTAL_COUNT } from '@card-grid/config';
import { useLocalObservable } from 'mobx-react-lite';

const createLocalStore = () => ({
  targetIndex: 0,
  revealed: new Set<number>(),

  isTarget(itemId: string) {
    return false;
  },

  isRevealed(index: number) {
    return this.revealed.has(index | 0);
  },

  // Отдельно открываем текущую target-карту, не меняя targetIndex
  revealTarget() {
    this.revealed.add(this.targetIndex);
  },

  nextTarget() {
    // Если все открыты — нового таргета нет
    if (this.revealed.size >= CARDS_TOTAL_COUNT) {
      this.targetIndex = -1;
      return;
    }

    // Выбираем следующий таргет случайно из не открытых
    const available: number[] = [];
    for (let i = 0; i < CARDS_TOTAL_COUNT; i++) {
      if (!this.revealed.has(i)) available.push(i);
    }
    if (available.length > 0) {
      const rnd = Math.floor(Math.random() * available.length);
      this.targetIndex = available[rnd];
    }
  },
});

export type TCardsStore = ReturnType<typeof createLocalStore>;

export const useCardsStore = () => {
  return useLocalObservable(() => createLocalStore());
};
