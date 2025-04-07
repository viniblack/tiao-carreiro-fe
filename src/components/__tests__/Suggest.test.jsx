/* eslint-disable no-undef */
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi, describe, it, expect } from "vitest";
import Suggest from "../Suggest";
import { useAuth } from "../../context/AuthContext";
import musicAPI from "../../services/musicAPI";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Mock do contexto de autenticação
vi.mock("../../context/AuthContext", () => ({
  useAuth: vi.fn(),
}));

// Mock da API
vi.mock("../../services/musicAPI", () => ({
  default: {
    createMusic: vi.fn(),
  },
}));

function renderWithClient(ui) {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
}

describe("Suggest Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("deve exibir mensagem para login quando o usuário não estiver autenticado", () => {
    useAuth.mockReturnValue({ token: null });
    renderWithClient(<Suggest />);

    expect(
      screen.getByText(/faça login para sugerir uma música/i)
    ).toBeInTheDocument();
  });

  it("deve renderizar o formulário quando o usuário estiver autenticado", () => {
    useAuth.mockReturnValue({ token: "fake-token" });
    renderWithClient(<Suggest />);

    expect(
      screen.getByLabelText(/cole aqui o link do youtube/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /enviar link/i })
    ).toBeInTheDocument();
  });

  it("deve alertar se o campo de link estiver vazio", async () => {
    useAuth.mockReturnValue({ token: "fake-token" });
    global.alert = vi.fn();
    renderWithClient(<Suggest />);

    fireEvent.click(screen.getByRole("button", { name: /enviar link/i }));

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith(
        "Por favor, cole um link do YouTube."
      );
    });
  });

  it("deve enviar o link e mostrar mensagem de sucesso", async () => {
    useAuth.mockReturnValue({ token: "fake-token" });
    global.alert = vi.fn();
    vi.spyOn(musicAPI, "createMusic").mockResolvedValueOnce({ status: 200 });

    renderWithClient(<Suggest />);
    const input = screen.getByLabelText(/cole aqui o link do youtube/i);
    const button = screen.getByRole("button", { name: /enviar link/i });

    await userEvent.type(input, "https://youtube.com/test");
    fireEvent.click(button);

    await waitFor(() => {
      expect(musicAPI.createMusic).toHaveBeenCalledWith({
        youtube_url: "https://youtube.com/test",
      });
      expect(global.alert).toHaveBeenCalledWith("Música enviada com sucesso!");
    });

    expect(input).toHaveValue(""); // campo limpo após sucesso
  });

  it("deve mostrar alerta de erro se a API falhar", async () => {
    useAuth.mockReturnValue({ token: "fake-token" });
    global.alert = vi.fn();
    vi.spyOn(musicAPI, "createMusic").mockRejectedValueOnce(new Error("API error"));

    renderWithClient(<Suggest />);
    const input = screen.getByLabelText(/cole aqui o link do youtube/i);
    const button = screen.getByRole("button", { name: /enviar link/i });

    await userEvent.type(input, "https://youtube.com/test");
    fireEvent.click(button);

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith("Erro ao enviar música.");
    });
  });
});
