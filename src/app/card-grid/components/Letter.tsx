import { motion } from 'motion/react';

import { cn } from '@utils';
import { observable } from 'mobx';
import { TIdName } from '@models';
import { TLettersStore } from '@card-grid/store';

type Props = {
  item: TIdName<string>;
  canPick: boolean;
  store: TLettersStore;
};

export const Letter = observable(({ item, store, canPick }: Props) => {
  const isSelected = store.isSelected(item);

  const onPick = () => {
    if (!canPick) return;
    store.toggle(item);
  };

  return (
    <motion.button
      layout
      transition={{ type: 'spring', stiffness: 500, damping: 40, mass: 0.6 }}
      onClick={onPick}
      disabled={!canPick}
      className={cn(
        'rounded-md text-[1.05rem] sm:text-[1.2rem] md:text-[1.35rem] text-white/90 mx-0.5 my-0.5 sm:mx-1 sm:my-1',
        isSelected ? 'ring-2 ring-sky-500/80 ring-offset-0 ring-offset-transparent' : 'ring-0',
        canPick ? 'cursor-pointer opacity-100' : 'opacity-50'
      )}
      style={{
        background: isSelected ? 'rgba(14,165,233,0.08)' : 'rgba(255,255,255,0.04)',
        border: isSelected ? '1px solid rgba(14,165,233,0.6)' : '1px solid rgba(255,255,255,0.08)',
        color: 'rgba(255,255,255,0.95)',
        padding: '4px 6px',
        backdropFilter: 'blur(1px)',
      }}
    >
      {item.name}
    </motion.button>
  );
});
