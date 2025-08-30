import { ONE_MINUTE, TRACKS } from '@/app/comedy-tragedy/constants';
import { usePageVisibilityPause } from '@hooks/usePageVisibilityPause';
import { useEffect, useState } from 'react';
import { useAudioPlayer } from 'react-use-audio-player';
import { useInterval } from 'usehooks-ts';

type Props = {
  onTrackSet: (index: number) => void;
};

export const AudioPlayer = (props: Props) => {
  const [isRunning, setIsRunning] = useState(false);

  const { onTrackSet } = props;

  const pickRandomTrackIndex = () => {
    return Math.floor(Math.random() * TRACKS.length);
  };

  const [currentTrackIndex, setCurrentTrackIndex] = useState(pickRandomTrackIndex());

  const { load, pause } = useAudioPlayer();

  const onInterval = () => {
    const index = pickRandomTrackIndex();
    setCurrentTrackIndex(index);
  };

  useInterval(onInterval, isRunning ? ONE_MINUTE : null);

  const onHide = () => {
    setIsRunning(false);
  };

  const onShow = () => {
    setIsRunning(true);
  };

  usePageVisibilityPause(onHide, onShow);

  useEffect(() => {
    onTrackSet(currentTrackIndex);
    const { src } = TRACKS[currentTrackIndex];
    load(src, {
      initialVolume: 0.75,
      autoplay: true,
    });
  }, [currentTrackIndex]);

  useEffect(() => {
    if (!isRunning) {
      pause();
    }
  }, [isRunning]);

  useEffect(() => {
    setIsRunning(true);
  }, []);

  return <></>;
};
