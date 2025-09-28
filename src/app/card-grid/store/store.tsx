import { createContext, useContext } from 'react';
import { observer, useLocalObservable } from 'mobx-react-lite';

export type CardGridStore = {
  totalCount: number;
  targetIndex: number;
  revealed: Set<number>;
  setTotalCount: (n: number) => void;
  isTarget: (index: number) => boolean;
  isRevealed: (index: number) => boolean;
  activeCount: () => number;
  revealTarget: () => void;
  nextTarget: () => void;
};

export const createCardGridStore = (initialTotalCount = 0): CardGridStore => ({
  totalCount: initialTotalCount,
  targetIndex: 0,
  revealed: new Set<number>(),
  setTotalCount(n: number) {
    // Меняем общее количество карт. Следим, чтобы targetIndex оставался валидным.
    this.totalCount = Math.max(0, n | 0);
    if (this.totalCount === 0) this.targetIndex = 0;
    else this.targetIndex = this.targetIndex % this.totalCount;
    // Чистим открытые индексы, выходящие за пределы
    for (const i of Array.from(this.revealed)) {
      if (i >= this.totalCount) this.revealed.delete(i);
    }
  },
  isTarget(index: number) {
    const i = index | 0;
    return this.totalCount > 0 && this.targetIndex >= 0 && i === this.targetIndex;
  },
  isRevealed(index: number) {
    return this.revealed.has(index | 0);
  },
  activeCount() {
    return Math.max(0, this.totalCount - this.revealed.size);
  },
  // Отдельно открываем текущую target-карту, не меняя targetIndex
  revealTarget() {
    if (this.totalCount === 0) return;
    this.revealed.add(this.targetIndex);
  },
  nextTarget() {
    if (this.totalCount === 0) return;
    // Если все открыты — нового таргета нет
    if (this.revealed.size >= this.totalCount) {
      this.targetIndex = -1;
      return;
    }

    // Выбираем следующий таргет случайно из не открытых
    const available: number[] = [];
    for (let i = 0; i < this.totalCount; i++) {
      if (!this.revealed.has(i)) available.push(i);
    }
    if (available.length > 0) {
      const rnd = Math.floor(Math.random() * available.length);
      this.targetIndex = available[rnd];
    }
  },
});

const Ctx = createContext<CardGridStore | null>(null);

export const CardGridStoreProvider = observer(
  ({
    children,
    initialTotalCount = 0,
  }: {
    children: React.ReactNode;
    initialTotalCount?: number;
  }) => {
    const store = useLocalObservable(() => createCardGridStore(initialTotalCount));
    return <Ctx.Provider value={store}>{children}</Ctx.Provider>;
  }
);

export const useCardGridStore = () => {
  const store = useContext(Ctx);
  if (!store) throw new Error('Use CardGridStore within provider!');
  return store;
};
