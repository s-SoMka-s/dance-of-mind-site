'use client';

import { SparklesCore } from '@/components/ui/sparkles';
import { observer } from 'mobx-react-lite';
import { PARTICLES } from './constants';
import { useLocalStore } from './comedy-tragedy.store';
import { ComedyTragedyImage, AnswerInput, AudioPlayer } from './components';
import { useQuestLocalStore } from '@/app/comedy-tragedy/store';
import { TRACKS } from '@/app/comedy-tragedy/config/audio.config';
import { useEffect, useState } from 'react';

function PageImpl() {
  const [particlesSpeed, setParticlesSpeed] = useState(PARTICLES.defaultSpeed);

  const store = useLocalStore({
    defaultSpeed: PARTICLES.defaultSpeed,
    defaultDensity: PARTICLES.defaultDensity,
    successSpeed: PARTICLES.successSpeed,
    successDensity: PARTICLES.successDensity,
  });

  const questStore = useQuestLocalStore(null);

  const onTrackSet = (index: number) => {
    const answer = TRACKS[index].word;
    questStore.setExpectedAnswer(answer);
  };

  console.log('Rendering ComedyTragedy Page');

  useEffect(() => {
    if (questStore.isError) {
      setParticlesSpeed(PARTICLES.errorSpeed);
    } else if (questStore.isSolved) {
      setParticlesSpeed(PARTICLES.successSpeed);
    } else {
      setParticlesSpeed(PARTICLES.defaultSpeed);
    }
  }, [questStore.isError, questStore.isSolved]);

  return (
    <div className="relative min-h-screen w-full bg-black flex flex-col items-center justify-center overflow-x-hidden">
      <AudioPlayer onTrackSet={onTrackSet} />

      <div className="w-full absolute inset-0">
        <SparklesCore
          id="tsparticles-comedy-tragedy"
          background="transparent"
          minSize={PARTICLES.minSize}
          maxSize={PARTICLES.maxSize}
          speed={particlesSpeed}
          particleDensity={store.particleDensity}
          className="w-full h-full"
          particleColor={PARTICLES.color}
        />
      </div>

      <div className="relative z-10 flex flex-col gap-6 items-center w-full max-w-5xl px-4">
        <div className="w-full flex flex-col items-center justify-center gap-6 pt-10">
          <ComedyTragedyImage store={questStore} />
        </div>

        <AnswerInput store={questStore} />
      </div>
    </div>
  );
}

export default observer(PageImpl);
