import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import Home from "./page";
import { getComics, getEditoriales } from "@/lib/api";

vi.mock("@/lib/api", () => ({
  getComics: vi.fn(),
  getEditoriales: vi.fn(),
}));

describe("Home", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("carga el inventario y muestra los cómics", async () => {
    vi.mocked(getComics).mockResolvedValue([
      {
        id: 1,
        titulo: "La vuelta al mundo",
        numero: "5",
        volumen: null,
        id_editorial: 10,
        url: "https://example.com/comic",
        url_portada: "https://example.com/cover.jpg",
        calificacion: 8,
        leido: false,
        anno_publicacion: 2024,
      },
    ]);
    vi.mocked(getEditoriales).mockResolvedValue([{ id: 10, nombre: "Panini" }]);

    render(<Home />);

    expect(screen.getByLabelText(/cargando inventario/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("La vuelta al mundo")).toBeInTheDocument();
    });

    expect(screen.getByText("Panini")).toBeInTheDocument();
    expect(screen.getByText(/ejemplares catalogados/i)).toBeInTheDocument();
  });

  it("muestra el estado de error cuando falla la carga", async () => {
    vi.mocked(getComics).mockRejectedValue(new Error("API unavailable"));
    vi.mocked(getEditoriales).mockRejectedValue(new Error("API unavailable"));

    render(<Home />);

    await waitFor(() => {
      expect(screen.getByText("Inventario no disponible")).toBeInTheDocument();
    });

    expect(screen.getByText(/No se pudo conectar con la colección/i)).toBeInTheDocument();

    const retryButton = screen.getByRole("button", { name: /reintentar/i });
    expect(retryButton).toBeInTheDocument();

    vi.mocked(getComics).mockResolvedValue([]);
    vi.mocked(getEditoriales).mockResolvedValue([]);
    await userEvent.click(retryButton);

    await waitFor(() => {
      expect(screen.getByText("La colección todavía está vacía.")).toBeInTheDocument();
    });
  });
});
