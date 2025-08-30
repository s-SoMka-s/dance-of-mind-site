'use client';

import { PARTICLES } from '@/app/comedy-tragedy/constants';
import { SparklesCore } from '@/components/ui/sparkles';
import { TextGenerateEffect } from '@/components/ui/text-generate-effect';

export default function WhoIAmPage() {
  const words = 'Кто я?';

  return (
    <div className="relative min-h-screen w-full bg-black flex flex-col items-center justify-center overflow-x-hidden">
      <div className="w-full absolute inset-0">
        <SparklesCore
          id="tsparticles-comedy-tragedy"
          background="transparent"
          minSize={PARTICLES.minSize}
          maxSize={PARTICLES.maxSize}
          speed={PARTICLES.defaultSpeed}
          particleDensity={PARTICLES.defaultDensity}
          className="w-full h-full"
          particleColor={PARTICLES.color}
        />
      </div>

      <div className="relative z-10 flex flex-col gap-6 items-center w-full max-w-5xl px-4">
        <TextGenerateEffect words={words}></TextGenerateEffect>
      </div>
    </div>
  );
}
