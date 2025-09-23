import { observer } from 'mobx-react-lite';
import { useLettersStore } from '../letters-store';
import { useCardGridStore } from '../store';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';

type Props = {
  ch: string;
  index: number;
};

export const Letter = observer(function Letter({ ch, index }: Props) {
  const letters = useLettersStore();
  const grid = useCardGridStore();
  const selected = letters.selectedIdx.has(index);
  // Разрешаем выбор буквы только если текущая target-карта открыта лицом вверх
  const canPick = grid.isRevealed(grid.targetIndex);

  return (
    <motion.button
      layout
      transition={{ type: 'spring', stiffness: 500, damping: 40, mass: 0.6 }}
      onClick={() => {
        if (!canPick) return;
        letters.toggle(index);
      }}
      disabled={!canPick}
      className={cn(
        'rounded-md text-[1.05rem] sm:text-[1.2rem] md:text-[1.35rem] text-white/90 mx-0.5 my-0.5 sm:mx-1 sm:my-1',
        selected ? 'ring-2 ring-sky-500/80 ring-offset-0 ring-offset-transparent' : 'ring-0',
        canPick ? 'cursor-pointer opacity-100' : 'opacity-50'
      )}
      style={{
        background: selected ? 'rgba(14,165,233,0.08)' : 'rgba(255,255,255,0.04)',
        border: selected ? '1px solid rgba(14,165,233,0.6)' : '1px solid rgba(255,255,255,0.08)',
        color: 'rgba(255,255,255,0.95)',
        padding: '4px 6px',
        backdropFilter: 'blur(1px)',
      }}
    >
      {ch}
    </motion.button>
  );
});
