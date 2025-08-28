"use client";

import { useEffect } from 'react';
import { useRandomPlaylist } from '@/app/hooks';

type Props = {
  playlist: string[];
  intervalMs: number;
  onPick: (index: number) => void;
};

export const PlaylistRunner = ({ playlist, intervalMs, onPick }: Props) => {
  const { handleUserStart } = useRandomPlaylist(playlist, intervalMs, onPick);

  useEffect(() => {
    // start exactly once on mount
    handleUserStart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

