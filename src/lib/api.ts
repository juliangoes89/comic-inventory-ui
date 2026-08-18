export type Comic = {
  id: number;
  titulo: string;
  numero: string | null;
  volumen: string | null;
  id_editorial: number;
  url: string | null;
  url_portada: string | null;
  calificacion: number | null;
  leido: boolean;
  anno_publicacion: number | null;
};

export type Editorial = {
  id: number;
  nombre: string;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000";

async function getJson<T>(path: string): Promise<T> {
  const response = await fetch(`${API_URL}${path}`);

  if (!response.ok) {
    throw new Error(`No se pudo cargar ${path}.`);
  }

  return response.json() as Promise<T>;
}

export function getComics() {
  return getJson<Comic[]>("/comics");
}

export function getEditoriales() {
  return getJson<Editorial[]>("/editoriales");
}