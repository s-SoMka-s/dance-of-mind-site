import { EPage, TSize } from '@models';
import { FloatingWord } from './floating-word';
import { useWhoIAmLocalStore, WhoIAmStoreContext } from '@who-are-you/store/who-i-am.store';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

type TProps = {
  viewport: TSize;
};

export const FloatingWordsLayer = observer(({ viewport }: TProps) => {
  const store = useWhoIAmLocalStore();
  const router = useRouter();

  const isSolved = store.isSolved;

  useEffect(() => {
    if (isSolved) {
      router.push(EPage.CardGrid);
    }
  }, [store.isSolved]);

  useEffect(() => {
    store.init();
  }, []);

  return (
    <WhoIAmStoreContext.Provider value={store}>
      <div className="absolute inset-0 z-40 pointer-events-auto">
        {store.cards.map((card) => (
          <FloatingWord
            key={card.id}
            word={card}
            viewport={viewport}
            isSelected={store.isSelected(card.id)}
            isTarget={store.isTarget(card.text)}
            pickWord={(word) => store.pickWord(word)}
          />
        ))}
      </div>
    </WhoIAmStoreContext.Provider>
  );
});
