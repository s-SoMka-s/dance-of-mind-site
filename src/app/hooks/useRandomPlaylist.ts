'use client';

import { useRef, useState, useCallback } from 'react';
import { usePageVisibilityPause } from './usePageVisibilityPause';
import { useInterval } from '@/app/hooks/useInterval';
import { useAudioPlayer } from 'react-use-audio-player';

export function useRandomPlaylist(playlist: string[], intervalMs: number) {
  const { load, pause } = useAudioPlayer();

  console.log('useRandomPlaylist initialized with playlist:', playlist);

  const intervalRef = useRef<number | null>(null);
  const resumeOnShowRef = useRef(false);

  const [isRunning, setIsRunning] = useState(false);

  useInterval(
    () => {
      if (playlist.length === 0) return;
      const index = Math.floor(Math.random() * playlist.length);
      console.log(`Playing track: ${playlist[index]}`);

      load(playlist[index], {
        initialVolume: 0.75,
        autoplay: true,
      });
    },
    isRunning ? intervalMs : null
  );

  const handleUserStart = () => {
    console.log('User started the playlist');
    setIsRunning(true);
  };

  // Подключаем универсальный хук видимости
  usePageVisibilityPause(
    () => {
      console.log('Page hidden, pausing playlist');
      resumeOnShowRef.current = !!intervalRef.current;
      setIsRunning(false);
      pause();
    },
    () => {
      if (resumeOnShowRef.current) {
        console.log('Page visible, resuming playlist');
        resumeOnShowRef.current = false;
        setIsRunning(true);
      }
    }
  );

  return { handleUserStart };
}
