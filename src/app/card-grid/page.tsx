import { CardGridStoreProvider } from './store';
import { CardGrid } from './components/CardGrid';

export default function Page() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <CardGridStoreProvider>
        <CardGrid />
      </CardGridStoreProvider>
    </main>
  );
}

