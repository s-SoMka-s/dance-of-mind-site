'use client';

import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { AppStoreProvider } from '@store/AppStoreProvider';
import { AudioPlayerProvider, useAudioPlayer } from 'react-use-audio-player';
import { useEffect } from 'react';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { load, pause } = useAudioPlayer();

  useEffect(() => {
    load('audio/background.mp3', {
      initialVolume: 1,
      autoplay: true,
      loop: true,
    });
  }, []);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased w-screen min-h-screen`}
      >
        <AudioPlayerProvider>
          <AppStoreProvider>{children}</AppStoreProvider>
        </AudioPlayerProvider>
      </body>
    </html>
  );
}
