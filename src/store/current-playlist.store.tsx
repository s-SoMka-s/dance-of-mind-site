'use client';

import { useLocalObservable } from 'mobx-react-lite';

export type TPlaylistItem = string;

export enum EPlaybackState {
  NotStarted = 'NOT_STARTED',
  Playing = 'PLAYING',
  Paused = 'PAUSED',
  IntervalWaiting = 'INTERVAL_WAITING',
}

export type TCurrentPlaylistStoreProps = {
  playlist: TPlaylistItem[];
};

const createStore = (props: TCurrentPlaylistStoreProps) => {
  return {
    // data
    playlist: props.playlist,
    currentIndex: 0,
    state: EPlaybackState.NotStarted,

    // computed
    get currentTrack(): TPlaylistItem | null {
      if (this.currentIndex == null) return null;
      return this.playlist[this.currentIndex] ?? null;
    },

    // actions

    pickTrack(index: number) {
      if (!Number.isFinite(index)) return;
      if (index < 0 || index >= this.playlist.length) return;

      this.currentIndex = index;
      this.state = EPlaybackState.Playing;
    },

    setState(next: EPlaybackState) {
      this.state = next;
    },
  };
};

export const useCurrentPlaylistStore = (props: TCurrentPlaylistStoreProps) =>
  useLocalObservable(() => createStore(props));
