import { observer } from 'mobx-react-lite';
import { useLettersStore } from '../letters-store';
import { cn } from '@/lib/utils';

type Props = {
  ch: string;
  index: number;
};

export const Letter = observer(function Letter({ ch, index }: Props) {
  const letters = useLettersStore();
  const selected = letters.selectedIdx.has(index);

  return (
    <button
      onClick={() => letters.toggle(index)}
      className={cn(
        'cursor-pointer rounded-md text-sm sm:text-base md:text-lg text-white/90 mx-0.5 my-0.5 sm:mx-1 sm:my-1',
        selected ? 'ring-2 ring-sky-500/80 ring-offset-0 ring-offset-transparent' : 'ring-0'
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
    </button>
  );
});
