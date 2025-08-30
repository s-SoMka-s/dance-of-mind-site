'use client';

import { observer } from 'mobx-react-lite';
import { useState } from 'react';

type Props = {
  store: {
    isSolved: boolean;
    checkAnswer: (v: string) => void;
  };
  onStart?: () => void;
};

const AnswerInputImpl = ({ store, onStart }: Props) => {
  const [val, setVal] = useState('');

  return (
    <div className="w-full pt-6 pb-10">
      <div className="mx-auto w-full max-w-md">
        <input
          className="w-full rounded-md border border-white/30 bg-black/40 text-white placeholder:text-white/50 px-4 py-3 outline-none focus:ring-2 focus:ring-white/50"
          placeholder={'Введите слово для текущего трека'}
          value={val}
          onChange={(e) => setVal(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') store.checkAnswer(val);
          }}
          onFocus={() => onStart?.()}
          aria-label="Ответ"
        />
      </div>
    </div>
  );
};

export const AnswerInput = observer(AnswerInputImpl);
