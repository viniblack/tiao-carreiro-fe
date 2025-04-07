import { render, screen, fireEvent } from "@testing-library/react";
import { expect, describe, it, vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Nav from "../Nav";

// Mock do contexto de autenticação
vi.mock("../../context/AuthContext", () => ({
  useAuth: vi.fn(),
}));

// Mock do useNavigate
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

function renderNav() {
  return render(
    <BrowserRouter>
      <Nav />
    </BrowserRouter>
  );
}

describe("Nav component", () => {
  // eslint-disable-next-line no-undef
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('mostra apenas "Home" e "Login" quando o usuário não está logado', () => {
    useAuth.mockReturnValue({
      token: null,
      userInfo: null,
      logout: vi.fn(),
    });

    renderNav();

    expect(screen.getByText(/home/i)).toBeInTheDocument();
    expect(screen.getByText(/login/i)).toBeInTheDocument();
    expect(screen.queryByText(/logout/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/admin/i)).not.toBeInTheDocument();
  });

  it('mostra "Logout" quando o usuário está logado', () => {
    useAuth.mockReturnValue({
      token: "fake-token",
      userInfo: { user: { role: "user" } },
      logout: vi.fn(),
    });

    renderNav();

    expect(screen.getByText(/logout/i)).toBeInTheDocument();
    expect(screen.queryByText(/login/i)).not.toBeInTheDocument();
  });

  it('mostra o botão "Admin" se o usuário for admin', () => {
    useAuth.mockReturnValue({
      token: "fake-token",
      userInfo: { user: { role: "admin" } },
      logout: vi.fn(),
    });

    renderNav();

    expect(screen.getByText(/admin/i)).toBeInTheDocument();
  });

  it('chama logout ao clicar em "Logout"', async () => {
    const logoutMock = vi.fn().mockResolvedValue();
    useAuth.mockReturnValue({
      token: "fake-token",
      userInfo: { user: { role: "user" } },
      logout: logoutMock,
    });

    renderNav();

    const logoutBtn = screen.getByText(/logout/i);
    fireEvent.click(logoutBtn);

    expect(logoutMock).toHaveBeenCalled();
  });
});
