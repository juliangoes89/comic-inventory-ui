"use client";

import { useEffect, useState } from "react";
import { ComicList } from "@/components/comic-list";
import { getComics, getEditoriales, type Comic, type Editorial } from "@/lib/api";

type LoadState = "loading" | "ready" | "error";

export default function Home() {
  const [comics, setComics] = useState<Comic[]>([]);
  const [editoriales, setEditoriales] = useState<Map<number, string>>(new Map());
  const [state, setState] = useState<LoadState>("loading");

  async function requestInventory() {
    const [comicData, editorialData] = await Promise.all([getComics(), getEditoriales()]);
    return { comicData, editorialData };
  }

  function setInventory(comicData: Comic[], editorialData: Editorial[]) {
    setComics(comicData);
    setEditoriales(new Map(editorialData.map((editorial) => [editorial.id, editorial.nombre])));
  }

  async function loadInventory() {
    setState("loading");

    try {
      const { comicData, editorialData } = await requestInventory();
      setInventory(comicData, editorialData);
      setState("ready");
    } catch {
      setState("error");
    }
  }

  useEffect(() => {
    let isCurrent = true;

    void requestInventory()
      .then(({ comicData, editorialData }) => {
        if (isCurrent) {
          setInventory(comicData, editorialData);
          setState("ready");
        }
      })
      .catch(() => {
        if (isCurrent) {
          setState("error");
        }
      });

    return () => {
      isCurrent = false;
    };
  }, []);

  return (
    <main className="min-h-screen bg-[linear-gradient(118deg,#f5f1e8_0%,#f5f1e8_62%,#e4d7bb_100%)] px-4 py-8 text-stone-900 sm:px-8 sm:py-12">
      <div className="mx-auto max-w-6xl">
        <header className="border-b-2 border-stone-900 pb-7 sm:flex sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-800">Archivo personal</p>
            <h1 className="mt-2 font-serif text-4xl text-stone-950 sm:text-5xl">Comic Inventory</h1>
          </div>
          <p className="mt-5 text-sm font-medium text-stone-600 sm:mt-0">
            {state === "ready" ? `${comics.length} ejemplares catalogados` : "Catálogo de lectura"}
          </p>
        </header>

        <div className="mt-8">
          {state === "loading" && <LoadingCards />}
          {state === "ready" && <ComicList comics={comics} editoriales={editoriales} />}
          {state === "error" && <ErrorState onRetry={loadInventory} />}
        </div>
      </div>
    </main>
  );
}

function LoadingCards() {
  return (
    <div className="grid gap-5 lg:grid-cols-2" aria-label="Cargando inventario">
      {Array.from({ length: 4 }, (_, index) => (
        <div key={index} className="grid min-h-64 animate-pulse grid-cols-[9.5rem_1fr] border border-stone-200 bg-white">
          <div className="bg-stone-200" />
          <div className="space-y-5 p-5">
            <div className="h-3 w-24 bg-stone-200" />
            <div className="h-8 w-4/5 bg-stone-200" />
            <div className="mt-10 grid grid-cols-2 gap-4 border-t border-stone-100 pt-5">
              <div className="h-8 bg-stone-100" />
              <div className="h-8 bg-stone-100" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <section className="border-l-4 border-amber-700 bg-white p-8 shadow-[0_10px_25px_rgba(74,56,36,0.06)]">
      <p className="text-xs font-bold uppercase tracking-[0.15em] text-amber-800">Inventario no disponible</p>
      <h2 className="mt-2 font-serif text-3xl text-stone-950">No se pudo conectar con la colección.</h2>
      <p className="mt-3 max-w-xl text-sm leading-6 text-stone-600">
        Comprueba que la API local esté ejecutándose en http://127.0.0.1:8000 y vuelve a intentarlo.
      </p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-6 border border-stone-900 bg-stone-900 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-emerald-900 focus:outline-2 focus:outline-offset-2 focus:outline-stone-900"
      >
        Reintentar
      </button>
    </section>
  );
}
