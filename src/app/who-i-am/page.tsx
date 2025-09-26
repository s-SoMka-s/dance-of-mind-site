'use client';

import { SparklesCore } from '@/components/ui/sparkles';
import { FloatingCard } from './components/FloatingCard';
import { WordItem } from './components/WordItem';
import { observer } from 'mobx-react-lite';
import { useWhoIAmLocalStore, WhoIAmStoreContext } from './store/who-i-am.store';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { reaction } from 'mobx';
import { REQUIRED_WORDS } from './store/who-i-am.store';
import { TextGenerateEffect } from '@/components/ui/text-generate-effect';
import { useViewportSize } from '@hooks/useViewportSize';
import { PARTICLES } from '@comedy-tragedy/config';

const WhoIAmPage = observer(function WhoIAmPageInner() {
  const store = useWhoIAmLocalStore();
  const router = useRouter();
  const viewport = useViewportSize();
  useEffect(() => {
    store.init();
  }, [store]);

  // Следим за прогрессом составления фразы и делаем переход
  useEffect(() => {
    const dispose = reaction(
      () => store.sequenceProgress,
      (progress) => {
        if (progress >= REQUIRED_WORDS.length) {
          router.push(`/card-grid`);
        }
      }
    );
    return () => dispose();
  }, [store, router]);

  // Количество визуальных карточек во 2 слое (без текста)
  const cardsCount = 54;

  return (
    <div className="relative min-h-screen w-full bg-black flex flex-col items-center justify-center overflow-hidden">
      {/* 1 слой — частицы */}
      <div className="w-full absolute inset-0 z-0 pointer-events-none">
        <SparklesCore
          id="tsparticles-who-i-am"
          background="transparent"
          minSize={PARTICLES.minSize}
          maxSize={PARTICLES.maxSize}
          speed={PARTICLES.defaultSpeed}
          particleDensity={PARTICLES.defaultDensity}
          className="w-full h-full"
          particleColor={PARTICLES.color}
        />
      </div>
      {/* 2 слой — летающие карточки с мягким 3D-вращением */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {Array.from({ length: cardsCount }).map((_, i) => (
          <FloatingCard key={`fc-${i}`} viewport={viewport} />
        ))}
      </div>
      {/* Центральный текстовый вопрос */}
      <div className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none">
        <TextGenerateEffect words="Кто ты?" className="text-center" />
      </div>

      {/* 3 слой — парящие слова из стора (кликабельные). Делаем выше прочего. */}
      <WhoIAmStoreContext.Provider value={store}>
        <div className="absolute inset-0 z-40 pointer-events-auto">
          {store.cards.map((card) => (
            <WordItem key={card.id} card={card} viewport={viewport} />
          ))}
        </div>
      </WhoIAmStoreContext.Provider>

      {/* Контентный контейнер (если понадобится) */}
      <div className="relative z-30 flex flex-col items-center w-full max-w-5xl px-4" />
    </div>
  );
});

export default WhoIAmPage;
