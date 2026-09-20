import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ComicCard } from "./comic-card";
import type { Comic } from "@/lib/api";

describe("ComicCard", () => {
  const comic: Comic = {
    id: 1,
    titulo: "Watchmen",
    numero: "1",
    volumen: "Vol. 1",
    id_editorial: 7,
    url: "https://example.com/watchmen",
    url_portada: "https://example.com/watchmen-cover.jpg",
    calificacion: 9,
    leido: true,
    anno_publicacion: 1986,
  };

  it("renderiza la información principal del cómic", () => {
    render(<ComicCard comic={comic} editorial="DC" />);

    expect(screen.getByText("DC")).toBeInTheDocument();
    expect(screen.getByText("Watchmen")).toBeInTheDocument();
    expect(screen.getByText("Leído")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("1986")).toBeInTheDocument();
    expect(screen.getByText("9/10")).toBeInTheDocument();
  });

  it("muestra el fallback cuando no hay imagen de portada", () => {
    render(
      <ComicCard
        comic={{ ...comic, url_portada: null }}
        editorial="Editorial sin portada"
      />,
    );

    expect(screen.getByText("Inventario")).toBeInTheDocument();
    expect(screen.getByText("Sin portada")).toBeInTheDocument();
    expect(screen.getByText("Editorial sin portada")).toBeInTheDocument();
  });
});
