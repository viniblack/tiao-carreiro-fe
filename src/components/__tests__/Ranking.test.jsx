import { render, screen } from "@testing-library/react";
import Ranking from "../Ranking";
import { describe, it, expect } from "vitest";

const mockRankingData = {
  musics: [
    {
      id: "1",
      title: "Chico Mineiro",
      views: 1200000,
      youtube_id: "abc123",
      thumb: "https://via.placeholder.com/120x68",
    },
    {
      id: "2",
      title: "Pagode em Brasília",
      views: 600000,
      youtube_id: "def456",
      thumb: "https://via.placeholder.com/120x68",
    },
  ],
};

describe("Ranking", () => {
  it("renderiza o título do ranking", () => {
    render(<Ranking rankingData={mockRankingData} />);
    expect(screen.getByText("Ranking Atual")).toBeInTheDocument();
  });

  it("renderiza a lista de músicas quando houver dados", () => {
    render(<Ranking rankingData={mockRankingData} />);
    expect(screen.getByText("Chico Mineiro")).toBeInTheDocument();
    expect(screen.getByText("Pagode em Brasília")).toBeInTheDocument();
    expect(screen.getByText("1,2M visualizações")).toBeInTheDocument();
    expect(screen.getByText("600,0K visualizações")).toBeInTheDocument();
  });

  it("renderiza mensagem de vazio quando não houver músicas", () => {
    render(<Ranking rankingData={{ musics: [] }} />);
    expect(
      screen.getByText("Nenhuma música cadastrada ainda")
    ).toBeInTheDocument();
  });

  it("renderiza o número de posição corretamente", () => {
    render(<Ranking rankingData={mockRankingData} currentPage={1} />);
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("cria link correto para YouTube", () => {
    render(<Ranking rankingData={mockRankingData} />);
    const link = screen.getByText("Chico Mineiro").closest("a");
    expect(link).toHaveAttribute(
      "href",
      "https://www.youtube.com/watch?v=abc123"
    );
  });
});
