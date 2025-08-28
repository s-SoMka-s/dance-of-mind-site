export type TrackItem = { src: string; word: string };

export const ONE_MINUTE = 60 * 1000;

export const TRACKS: TrackItem[] = [
  { src: '/audio/1.mp3', word: 'тест' },
  { src: '/audio/2.mp3', word: 'тест' },
  { src: '/audio/3.mp3', word: 'тест' },
  { src: '/audio/4.mp3', word: 'тест' },
  { src: '/audio/5.mp3', word: 'тест' },
  { src: '/audio/6.mp3', word: 'тест' },
  { src: '/audio/7.mp3', word: 'тест' },
  { src: '/audio/8.mp3', word: 'тест' },
];

export const PARTICLES = {
  minSize: 0.6,
  maxSize: 1.4,
  color: '#FFFFFF',
  defaultSpeed: 4,
  defaultDensity: 120,
  successSpeed: 12,
  successDensity: 200,
};

export const IMAGE_ANIMATION_DURATION = 4000; // ms
