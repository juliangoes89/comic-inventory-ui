import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ComicList } from "./comic-list";
import type { Comic } from "@/lib/api";

describe("ComicList", () => {
  const comics: Comic[] = [
    {
      id: 1,
      titulo: "The Sandman",
      numero: "1",
      volumen: null,
      id_editorial: 2,
      url: "https://example.com/sandman",
      url_portada: null,
      calificacion: 8,
      leido: false,
      anno_publicacion: 1989,
    },
    {
      id: 2,
      titulo: "Batman: Año Uno",
      numero: null,
      volumen: "Vol. 1",
      id_editorial: 3,
      url: "https://example.com/batman",
      url_portada: "https://example.com/batman-cover.jpg",
      calificacion: 10,
      leido: true,
      anno_publicacion: 1987,
    },
  ];

  it("muestra el estado vacío cuando la colección está sin cómics", () => {
    render(<ComicList comics={[]} editoriales={new Map()} />);

    expect(screen.getByText("La colección todavía está vacía.")).toBeInTheDocument();
    expect(screen.getByText("Cuando agregues comics al inventario, aparecerán aquí.")).toBeInTheDocument();
  });

  it("renderiza cada cómic con su editorial", () => {
    render(
      <ComicList
        comics={comics}
        editoriales={new Map([
          [2, "Vertigo"],
          [3, "DC"],
        ])}
      />,
    );

    expect(screen.getByRole("heading", { name: "The Sandman" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Batman: Año Uno" })).toBeInTheDocument();
    expect(screen.getAllByText("Pendiente").length).toBeGreaterThan(0);
    expect(screen.getByText("DC")).toBeInTheDocument();
  });
});
