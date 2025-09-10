"use client";

import { createContext, useContext } from 'react';
import { useLocalObservable } from 'mobx-react-lite';
import { observable } from 'mobx';

export type TWhoIAmCard = {
  id: string;
  text: string;
};

type TWhoIAmStoreProps = null;

const REQUIRED_WORDS = ['я', 'твой', 'голос', 'внутри'];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function generateCards(): TWhoIAmCard[] {
  const required: TWhoIAmCard[] = REQUIRED_WORDS.map((w, idx) => ({
    id: `required-${idx + 1}`,
    text: w,
  }));

  const fillerCount = 54 - required.length; // 50
  const fillers: TWhoIAmCard[] = Array.from({ length: fillerCount }, (_, i) => ({
    id: `card-${i + 1}`,
    text: `карта-${i + 1}`,
  }));

  return shuffle([...required, ...fillers]);
}

const createLocalStore = (_props: TWhoIAmStoreProps) => {
  return {
    // Инициализация без случайностей на сервере для избежания hydration mismatch
    cards: REQUIRED_WORDS.map((w, idx) => ({ id: `required-${idx + 1}`, text: w })),
    selectedIds: observable.set<string>(),

    init: function () {
      // Генерация случайных карточек только на клиенте после маунта
      if (typeof window !== 'undefined') {
        this.cards = generateCards();
      }
    },

    pickCard: function (card: TWhoIAmCard) {
      if (this.selectedIds.has(card.id)) {
        this.selectedIds.delete(card.id);
      } else {
        this.selectedIds.add(card.id);
      }
    },

    isSelected: function (cardId: string) {
      return this.selectedIds.has(cardId);
    },
  };
};

export const useWhoIAmLocalStore = (props: TWhoIAmStoreProps = null) => {
  return useLocalObservable(() => createLocalStore(props));
};

export type TWhoIAmStore = ReturnType<typeof createLocalStore>;
export const WhoIAmStoreContext = createContext<TWhoIAmStore | null>(null);
export const useWhoIAmStore = () => {
  const store = useContext(WhoIAmStoreContext);
  if (!store) throw new Error('WhoIAmStoreContext not found');
  return store;
};
