'use client';

import { useRandomPlaylist } from '@/app/hooks';
import { SparklesCore } from '@/components/ui/sparkles';

import Image from 'next/image';
import { useEffect, useState } from 'react';

const ONE_MINUTE = 60 * 1000; // 1 minute in milliseconds

export default function Home() {
  const [showComedy, setShowComedy] = useState(true);

  const playlist = [
    '/audio/1.mp3',
    '/audio/2.mp3',
    '/audio/3.mp3',
    '/audio/4.mp3',
    '/audio/5.mp3',
    '/audio/6.mp3',
    '/audio/7.mp3',
    '/audio/8.mp3',
  ];

  const { handleUserStart } = useRandomPlaylist(playlist, ONE_MINUTE);

  const ACTIVE_IMAGE = showComedy
    ? {
        src: '/images/comedy.png',
        alt: 'Символ ТС — комедия',
        width: 768,
        height: 1365,
      }
    : {
        src: '/images/tragedy.png',
        alt: 'Символ ТС — трагедия',
        width: 768,
        height: 1365,
      };

  useEffect(() => {
    console.log('Home component mounted');
    handleUserStart();
  });

  return (
    <div className="h-full w-full bg-black flex flex-col items-center justify-center overflow-hidden">
      <div className="w-full absolute inset-0 h-screen">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>
      <div className="relative z-10 flex flex-col items-center gap-6 py-12">
        <Image
          src={ACTIVE_IMAGE.src}
          alt={ACTIVE_IMAGE.alt}
          width={ACTIVE_IMAGE.width}
          height={ACTIVE_IMAGE.height}
          priority
        />
      </div>
    </div>
  );
}
