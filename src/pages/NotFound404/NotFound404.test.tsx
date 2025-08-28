import { render, screen, fireEvent } from "@testing-library/react";
import NotFound404 from "./NotFound404";

jest.mock("./styles", () => ({
  Actions: ({ children }: any) => <div data-testid="actions">{children}</div>,
  Content: ({ children }: any) => <div data-testid="content">{children}</div>,
  Description: ({ children }: any) => <p>{children}</p>,
  Illustration: (props: any) => (
    <div data-testid="illustration" aria-hidden="true" data-src={props.$src} />
  ),
  Title: ({ children }: any) => <h1>{children}</h1>,
  Wrapper: (props: any) => (
    <section
      data-testid={props["data-testid"] ?? "wrapper"}
      className={props.className}
    >
      {props.children}
    </section>
  ),
}));

jest.mock("../../components/Button/Button", () => ({
  Button: ({ onClick, children }: any) => (
    <button onClick={onClick}>{children}</button>
  ),
}));

jest.mock("../../../routes/routes", () => ({
  PUBLIC_ROUTES: { HOME: "/" },
}));

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

describe("<NotFound404 />", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  test("Render default values: title, description, button, and illustration", () => {
    render(<NotFound404 />);

    expect(
      screen.getByRole("heading", { name: /404 PAGE NOT FOUND/i })
    ).toBeInTheDocument();

    expect(
      screen.getByText(/Check that you typed the address correctly/i)
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /GO HOME/i })
    ).toBeInTheDocument();

    expect(screen.getByTestId("illustration")).toBeInTheDocument();

    expect(screen.getByTestId("wrapper")).toBeInTheDocument();
  });

  test("Go to HOME by clicking on the button.", () => {
    render(<NotFound404 />);
    fireEvent.click(screen.getByRole("button", { name: /GO HOME/i }));
    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  test("allows you to overwrite properties (title, description, button text, image URL)", () => {
    render(
      <NotFound404
        title="Ups… no encontramos la página"
        description="Algo salió mal"
        buttonText="Volver al inicio"
        imageUrl="custom-image.png"
      />
    );

    expect(
      screen.getByRole("heading", { name: /Ups… no encontramos la página/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/Algo salió mal/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Volver al inicio/i })
    ).toBeInTheDocument();
    expect(screen.getByTestId("illustration")).toHaveAttribute(
      "data-src",
      "custom-image.png"
    );
  });

  test("Apply custom className to the Wrapper", () => {
    render(<NotFound404 className="my-404" />);
    expect(screen.getByTestId("wrapper")).toHaveClass("my-404");
  });
});
