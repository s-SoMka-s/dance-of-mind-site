import { CardGrid } from './components/CardGrid';

export default function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const phraseParam = searchParams?.phrase;
  const phrase = Array.isArray(phraseParam) ? phraseParam[0] : phraseParam;
  return (
    <div
      className="h-screen w-screen overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/wall.webp')" }}
    >
      <main className="w-full h-full px-2 sm:px-4 py-2 sm:py-4">
        <CardGrid phrase={phrase} />
      </main>
    </div>
  );
}
