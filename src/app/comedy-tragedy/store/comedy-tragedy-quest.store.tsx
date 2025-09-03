import { ERROR_DURATION } from '@/app/comedy-tragedy/constants';
import { norm } from '@lib/string.utils';
import { useLocalObservable } from 'mobx-react-lite';

type TComedyTragedyQuestStoreProps = null;

const createLocalStore = (props: TComedyTragedyQuestStoreProps) => {
  return {
    expectedAnswer: '',
    isSolved: false,
    isError: false,

    setExpectedAnswer: function (val: string) {
      this.expectedAnswer = val;
    },
    checkAnswer: function (val: string) {
      if (norm(val) && norm(val) === norm(this.expectedAnswer)) {
        this.isSolved = true;
        this.isError = false;
      } else {
        this.isError = true;
        setTimeout(() => {
          this.isError = false;
        }, ERROR_DURATION);
      }
    },
  };
};

export const useQuestLocalStore = (props: TComedyTragedyQuestStoreProps) => {
  return useLocalObservable(() => createLocalStore(props));
};
