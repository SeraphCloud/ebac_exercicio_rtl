import { fireEvent, render, screen } from "@testing-library/react";
import Post from ".";

describe("Teste para o componente PostComment", () => {
  it("Deve renderizar o componente corretamente", () => {
    render(<Post />);
    expect(screen.getByText("Comentar")).toBeInTheDocument();
  });

  it("Deve inserir dois comentários e verificar com data-testid", () => {
    render(<Post />);

    // Verifica que não há comentários inicialmente
    expect(screen.queryByTestId("comment-0")).not.toBeInTheDocument();
    expect(screen.queryByTestId("comment-1")).not.toBeInTheDocument();

    // Encontra o textarea e o botão
    const textarea = screen.getByRole("textbox");
    const button = screen.getByText("Comentar");

    // Adiciona o primeiro comentário
    fireEvent.change(textarea, {
      target: { value: "Primeiro comentário de teste" },
    });
    fireEvent.click(button);

    // Verifica que o primeiro comentário foi adicionado
    expect(screen.getByTestId("comment-0")).toBeInTheDocument();
    expect(
      screen.getByText("Primeiro comentário de teste")
    ).toBeInTheDocument();

    // Adiciona o segundo comentário
    fireEvent.change(textarea, {
      target: { value: "Segundo comentário de teste" },
    });
    fireEvent.click(button);

    // Verifica que ambos os comentários foram adicionados
    expect(screen.getByTestId("comment-0")).toBeInTheDocument();
    expect(screen.getByTestId("comment-1")).toBeInTheDocument();
    expect(
      screen.getByText("Primeiro comentário de teste")
    ).toBeInTheDocument();
    expect(screen.getByText("Segundo comentário de teste")).toBeInTheDocument();
  });
});
