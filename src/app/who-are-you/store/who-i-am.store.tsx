'use client';

import { createContext, useContext } from 'react';
import { useLocalObservable } from 'mobx-react-lite';
import { observable } from 'mobx';

export type TWhoIAmCard = {
  id: string;
  text: string;
};

type TWhoIAmStoreProps = null;

export const REQUIRED_WORDS = ['Я', 'Твой', 'Голос', 'Внутри'];

export const OTHER_WORDS = [
  'Ночной',
  'Дух',
  'Театра',
  'HUMANITY',
  'Топливо',
  'Для',
  'Идей',
  'Художник',
  'Собиратель',
  'Душ',
  'Пассивно',
  'Дохнущий',
  'Полупсих',
  'Зверь',
  'Не',
  'Враг',
  'Гострайтер',
  'Памяти',
  'Дворец',
  'Расплавленный',
  'Космос',
  'Выключатель',
  'Солнца',
];

function generateCards(): TWhoIAmCard[] {
  const required: TWhoIAmCard[] = REQUIRED_WORDS.map((w, idx) => ({
    id: `required-${idx + 1}`,
    text: w,
  }));

  const fillers: TWhoIAmCard[] = OTHER_WORDS.map((w, i) => ({
    id: `card-${i + 1}`,
    text: w,
  }));

  return [...required, ...fillers];
}

const createLocalStore = (_props: TWhoIAmStoreProps) => {
  return {
    // Инициализация без случайностей на сервере для избежания hydration mismatch
    cards: REQUIRED_WORDS.map((w, idx) => ({ id: `required-${idx + 1}`, text: w })),
    selectedIds: observable.set<string>(),
    // Прогресс совпадения фразы по порядку: 0..REQUIRED_WORDS.length
    sequenceProgress: 0,

    init: function () {
      // Генерация случайных карточек только на клиенте после маунта
      if (typeof window !== 'undefined') {
        this.cards = generateCards();
      }
    },

    pickCard: function (card: TWhoIAmCard) {
      const wasSelected = this.selectedIds.has(card.id);

      if (wasSelected) {
        this.selectedIds.delete(card.id);
        // На снятие выбора прогресс не двигаем
        return;
      }

      // На выбор карточки добавляем в Set и проверяем прогресс фразы
      this.selectedIds.add(card.id);

      const word = card.text.trim().toLowerCase();
      const expected = REQUIRED_WORDS[this.sequenceProgress];

      if (word === expected) {
        this.sequenceProgress += 1;
      } else {
        // Если ошиблись — начинать заново, но если клик совпадает с первым словом,
        // то прогресс становится 1, иначе 0
        this.sequenceProgress = word === REQUIRED_WORDS[0] ? 1 : 0;
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
