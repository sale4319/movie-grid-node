import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

import App from "./App";

describe("App", () => {
  it("renders the App component", () => {
    render(<App />);
    screen.debug(); // prints out the jsx in the App component unto the command line
  });

  it("renders the Vite logo with correct alt text", () => {
    render(<App />);
    const viteLogo = screen.getByAltText("Vite logo");
    expect(viteLogo).toBeInTheDocument();
  });

  it("renders the React logo with correct alt text", () => {
    render(<App />);
    const reactLogo = screen.getByAltText("React logo");
    expect(reactLogo).toBeInTheDocument();
  });

  it("renders the initial count as 0", () => {
    render(<App />);
    const button = screen.getByRole("button");
    expect(button).toHaveTextContent("count is 0");
  });

  it("renders  count as 1 when button is clicked", async () => {
    render(<App />);
    const button = screen.getByRole("button");
    expect(button).toHaveTextContent("count is 0");
    await userEvent.click(button);
    expect(button).toHaveTextContent("count is 1");
  });

  it("renders the read the docs text", () => {
    render(<App />);
    const readTheDocsText = screen.getByText(
      /Click on the Vite and React logos to learn more/i
    );
    expect(readTheDocsText).toBeInTheDocument();
  });
});
