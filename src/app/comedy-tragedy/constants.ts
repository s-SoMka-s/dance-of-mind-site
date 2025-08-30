export type TrackItem = { src: string; word: string };

export const ONE_MINUTE = 10 * 1000;

export const IMAGES = {
  comedy: {
    src: '/dance-of-mind-site' + '/images/comedy.png',
    alt: 'Комедия',
  },
  tragedy: {
    src: '/dance-of-mind-site' + '/images/tragedy.png',
    alt: 'Трагедия',
  },
};

export const TRACKS: TrackItem[] = [
  { src: '/dance-of-mind-site' + '/audio/1.mp3', word: 'тест' },
  { src: '/dance-of-mind-site' + '/audio/2.mp3', word: 'тест' },
  { src: '/dance-of-mind-site' + '/audio/3.mp3', word: 'тест' },
  { src: '/dance-of-mind-site' + '/audio/4.mp3', word: 'тест' },
  { src: '/dance-of-mind-site' + '/audio/5.mp3', word: 'тест' },
  { src: '/dance-of-mind-site' + '/audio/6.mp3', word: 'тест' },
  { src: '/dance-of-mind-site' + '/audio/7.mp3', word: 'тест' },
  { src: '/dance-of-mind-site' + '/audio/8.mp3', word: 'тест' },
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
