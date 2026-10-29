import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { LoginForm } from "./index";
afterEach(() => vi.unstubAllGlobals());
describe("LoginForm", () => {
  it("exibe a mensagem retornada por credenciais inválidas", async () => {
    vi.stubGlobal(
      "fetch",
      vi
        .fn()
        .mockResolvedValue({
          ok: false,
          json: async () => ({ message: "Credenciais inválidas" }),
        }),
    );
    render(<LoginForm />);
    const user = userEvent.setup();
    await user.type(screen.getByLabelText("E-mail"), "teste@exemplo.com");
    await user.type(screen.getByLabelText("Senha"), "senha-errada");
    await user.click(screen.getByRole("button", { name: /login/i }));
    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Credenciais inválidas",
    );
  });
});
