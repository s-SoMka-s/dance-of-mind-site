'use client';
import { useEffect } from 'react';
import { SparklesCore } from '@/components/ui/sparkles';
import { observer } from 'mobx-react-lite';
import { PARTICLES } from './constants';
import { useLocalStore } from './comedy-tragedy.store';
import { ComedyTragedyImage, AnswerInput } from './components';

function PageImpl() {
  const store = useLocalStore({
    defaultSpeed: PARTICLES.defaultSpeed,
    defaultDensity: PARTICLES.defaultDensity,
    successSpeed: PARTICLES.successSpeed,
    successDensity: PARTICLES.successDensity,
  });

  // Устанавливаем проверочное слово один раз на маунт
  useEffect(() => {
    store.setExpectedAnswer('111');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log('Rendering ComedyTragedy Page');

  return (
    <div className="relative min-h-screen w-full bg-black flex flex-col items-center justify-center overflow-x-hidden">
      <div className="w-full absolute inset-0">
        <SparklesCore
          id="tsparticles-comedy-tragedy"
          background="transparent"
          minSize={PARTICLES.minSize}
          maxSize={PARTICLES.maxSize}
          speed={store.particleSpeed}
          particleDensity={store.particleDensity}
          className="w-full h-full"
          particleColor={PARTICLES.color}
        />
      </div>

      <div className="relative z-10 flex flex-col gap-6 items-center w-full max-w-5xl px-4">
        <div className="w-full flex flex-col items-center justify-center gap-6 pt-10">
          <ComedyTragedyImage store={store} />
        </div>

        <AnswerInput store={store} />
      </div>
    </div>
  );
}

export default observer(PageImpl);
