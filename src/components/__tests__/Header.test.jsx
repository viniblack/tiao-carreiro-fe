import { render, screen } from "@testing-library/react";
import { expect, describe, it } from "vitest";
import Header from "../Header";

describe("Header component", () => {
  it("renderiza a imagem com alt correto", () => {
    render(<Header />);
    const image = screen.getByAltText(/tião e pardinho/i);
    expect(image).toBeInTheDocument();
  });

  it("renderiza os textos principais", () => {
    render(<Header />);
    expect(screen.getByText(/top 5 músicas mais tocadas/i)).toBeInTheDocument();
    expect(screen.getByText(/tião carreiro & pardinho/i)).toBeInTheDocument();
  });
});
