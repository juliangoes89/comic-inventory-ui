import type { Comic } from "@/lib/api";

type ComicCardProps = {
  comic: Comic;
  editorial: string;
};

type DetailItem = {
  label: string;
  value: string | number;
};

function Detail({ label, value }: Readonly<{ label: string; value: string | number }>) {
  return (
    <div className="min-w-0">
      <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-stone-500">
        {label}
      </dt>
      <dd className="mt-1 truncate text-sm font-medium text-stone-800">{value}</dd>
    </div>
  );
}

export function ComicCard({ comic, editorial }: Readonly<ComicCardProps>) {
  const detailItems: DetailItem[] = [
    ...(comic.numero ? [{ label: "Número", value: comic.numero }] : []),
    ...(comic.volumen ? [{ label: "Volumen", value: comic.volumen }] : []),
    ...(comic.anno_publicacion ? [{ label: "Año", value: comic.anno_publicacion }] : []),
    ...(comic.calificacion !== null
      ? [{ label: "Calificación", value: `${comic.calificacion}/10` }]
      : []),
  ];

  return (
    <article className="group grid overflow-hidden border border-stone-200 bg-white shadow-[0_10px_25px_rgba(74,56,36,0.06)] transition-transform duration-300 hover:-translate-y-1 sm:grid-cols-[9.5rem_1fr]">
      <div className="relative flex min-h-52 items-center justify-center overflow-hidden bg-[linear-gradient(135deg,#24352b_0%,#4d6245_50%,#d7b260_50%,#ebd994_100%)] p-5 sm:min-h-full">
        {comic.url_portada ? (
          // The API accepts arbitrary cover URLs, which cannot be safely preconfigured for next/image.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={comic.url_portada}
            alt={`Portada de ${comic.titulo}`}
            className="h-48 w-auto max-w-full object-contain shadow-xl transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex aspect-2/3 w-28 flex-col justify-between border border-white/45 bg-stone-950/80 p-3 text-stone-100 shadow-xl">
            <span className="text-[0.62rem] font-bold uppercase tracking-[0.18em] text-amber-200">
              Inventario
            </span>
            <span className="line-clamp-4 font-serif text-lg leading-tight">{comic.titulo}</span>
            <span className="text-[0.6rem] uppercase tracking-[0.12em] text-stone-300">
              Sin portada
            </span>
          </div>
        )}
      </div>

      <div className="flex min-w-0 flex-col p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-emerald-800">
              {editorial}
            </p>
            <h2 className="mt-2 font-serif text-2xl leading-tight text-stone-950">{comic.titulo}</h2>
          </div>
          <span
            className={`shrink-0 border px-2 py-1 text-xs font-bold uppercase tracking-widest ${
              comic.leido
                ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                : "border-amber-200 bg-amber-50 text-amber-900"
            }`}
          >
            {comic.leido ? "Leído" : "Pendiente"}
          </span>
        </div>

        {detailItems.length > 0 && (
          <dl className="mt-7 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-stone-100 pt-5 sm:grid-cols-4">
            {detailItems.map((item) => (
              <Detail key={item.label} {...item} />
            ))}
          </dl>
        )}
      </div>
    </article>
  );
}