'use client';

import { createContext, useContext } from 'react';
import { observer, useLocalObservable } from 'mobx-react-lite';

// Template local store for the card-grid page.
// Intentionally minimal per request.
export type CardGridStore = {
  // add fields/actions later
};

export const createCardGridStore = (): CardGridStore => ({
  // placeholder
});

const Ctx = createContext<CardGridStore | null>(null);

export const CardGridStoreProvider = observer(({ children }: { children: React.ReactNode }) => {
  const store = useLocalObservable(createCardGridStore);
  return <Ctx.Provider value={store}>{children}</Ctx.Provider>;
});

export const useCardGridStore = () => {
  const store = useContext(Ctx);
  if (!store) throw new Error('Use CardGridStore within provider!');
  return store;
};

