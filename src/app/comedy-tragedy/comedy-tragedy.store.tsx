'use client';

import { useLocalObservable } from 'mobx-react-lite';
import { PARTICLES } from './constants';

export type TComedyTragedyStoreProps = {
  defaultSpeed?: number;
  defaultDensity?: number;
  successSpeed?: number;
  successDensity?: number;
};

const createLocalStore = (props: TComedyTragedyStoreProps) => {
  console.log('Creating local store with props:', props);

  const defaults = {
    defaultSpeed: props.defaultSpeed ?? PARTICLES.defaultSpeed,
    defaultDensity: props.defaultDensity ?? PARTICLES.defaultDensity,
    successSpeed: props.successSpeed ?? PARTICLES.successSpeed,
    successDensity: props.successDensity ?? PARTICLES.successDensity,
  };

  return {
    // state
    expectedWord: '',
    isError: false,
    isSolved: false,
    particleSpeed: defaults.defaultSpeed,
    particleDensity: defaults.defaultDensity,
    wrongActive: false as boolean,
    wrongToken: 0 as number,

    // actions
    setExpectedAnswer: function (answer: string) {
      this.expectedWord = answer;

      this.wrongActive = false;
      this.wrongToken = 0;

      this.particleSpeed = defaults.defaultSpeed;
      this.particleDensity = defaults.defaultDensity;

      this.isSolved = false;
    },
  };
};

export const useLocalStore = (props: TComedyTragedyStoreProps) => {
  return useLocalObservable(() => createLocalStore(props));
};
