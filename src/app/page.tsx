"use client";

import { SparklesCore } from "@/components/ui/sparkles";

import Image from "next/image";
import { useState } from "react";


export default function Home() {
const [showComedy, setShowComedy] = useState(true);

const ACTIVE_IMAGE = showComedy
  ? {
      src: "/images/comedy.png",
      alt: "Символ ТС — комедия",
      width: 768,
      height: 1365,
    }
  : {
      src: "/images/tragedy.png",
      alt: "Символ ТС — трагедия",
      width: 768,
      height: 1365,
    };

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
          onClick={() => setShowComedy((prev) => !prev)}
          priority
        />
      </div>
    </div>
  );
}
