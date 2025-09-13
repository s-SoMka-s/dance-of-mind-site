import { CardGridStoreProvider } from './store';
import { CardGrid } from './components/CardGrid';

export default function Page() {
  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/wall.webp')" }}
    >
      <main className="mx-auto max-w-6xl px-4 py-10">
        <CardGridStoreProvider>
          <CardGrid />
        </CardGridStoreProvider>
      </main>
    </div>
  );
}
