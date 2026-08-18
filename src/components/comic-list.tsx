import type { Comic } from "@/lib/api";
import { ComicCard } from "./comic-card";

type ComicListProps = {
  comics: Comic[];
  editoriales: Map<number, string>;
};

export function ComicList({ comics, editoriales }: Readonly<ComicListProps>) {
  if (comics.length === 0) {
    return (
      <section className="border border-dashed border-stone-300 bg-white px-6 py-20 text-center">
        <p className="font-serif text-2xl text-stone-900">La colección todavía está vacía.</p>
        <p className="mt-3 text-sm text-stone-600">Cuando agregues comics al inventario, aparecerán aquí.</p>
      </section>
    );
  }

  return (
    <section className="grid gap-5 lg:grid-cols-2">
      {comics.map((comic) => (
        <ComicCard
          key={comic.id}
          comic={comic}
          editorial={editoriales.get(comic.id_editorial) ?? "Editorial no disponible"}
        />
      ))}
    </section>
  );
}