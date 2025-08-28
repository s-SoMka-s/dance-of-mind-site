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
    expectedWord: '' as string,
    isSolved: false as boolean,
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
    checkAnswer: function (val: string) {
      const norm = (s: string) => s.trim().toLowerCase();

      if (norm(val) && norm(val) === norm(this.expectedWord)) {
        this.isSolved = true;
        this.particleSpeed = defaults.successSpeed;
        this.particleDensity = defaults.successDensity;
      } else {
        // wrong answer pulse: switch to tragedy briefly and shake
        this.wrongActive = true;
        this.wrongToken += 1;
        // reset back after short delay
        setTimeout(() => {
          this.wrongActive = false;
        }, 700);
      }
    },
  };
};

export const useLocalStore = (props: TComedyTragedyStoreProps) => {
  return useLocalObservable(() => createLocalStore(props));
};
