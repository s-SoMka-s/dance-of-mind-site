import Image from 'next/image';
import { CardGrid } from './components/CardGrid';

import wallImg from 'images/wall.webp';

export default function Page() {
  const phrase = 'я твой голос внутри';

  return (
    <div className="h-screen w-screen overflow-y-hidden overflow-x-auto bg-cover bg-center bg-no-repeat">
      <Image src={wallImg} alt="Cover Image" className="object-cover" fill></Image>
      <main className="w-full h-full min-w-[1280px] px-2 sm:px-4 py-2 sm:py-4">
        <CardGrid phrase={phrase} />
      </main>
    </div>
  );
}
