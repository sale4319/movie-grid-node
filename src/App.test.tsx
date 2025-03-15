import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

import App from "./App";

describe("App", () => {
  it("renders the App component", () => {
    render(<App />);
    const mainGrid = screen.getByTestId("main-grid");

    expect(mainGrid).toBeInTheDocument();
  });

  it("renders all gridItems", async () => {
    render(<App />);
    const mainGrid = screen.getByTestId("main-grid");
    expect(mainGrid).toBeInTheDocument();

    const gridItems = screen.getAllByTestId("grid-item");
    expect(gridItems).toHaveLength(18);
  });

  it("renders all gridItems", async () => {
    render(<App />);
    const mainGrid = screen.getByTestId("main-grid");
    expect(mainGrid).toBeInTheDocument();

    const gridItems = screen.getAllByTestId("grid-item");
    expect(gridItems).toHaveLength(18);
  });

  it("favourite icon changes when clicked", async () => {
    render(<App />);
    const mainGrid = screen.getByTestId("main-grid");
    expect(mainGrid).toBeInTheDocument();

    const gridItems = screen.getAllByTestId("grid-item");
    expect(gridItems).toHaveLength(18);

    const firstFavoriteIcon = screen.getAllByTestId(
      "favourite-icon-outlined"
    )[0];
    expect(firstFavoriteIcon).toBeInTheDocument();

    await userEvent.click(firstFavoriteIcon);

    const favoriteButtonClicked = screen.getAllByTestId(
      "favourite-icon-filled"
    )[0];
    expect(favoriteButtonClicked).toBeInTheDocument();
  });

  it("renders the correct number of favourite icons", async () => {
    render(<App />);
    const mainGrid = screen.getByTestId("main-grid");
    expect(mainGrid).toBeInTheDocument();

    const favoriteIconsOutlined = screen.getAllByTestId(
      "favourite-icon-outlined"
    );
    expect(favoriteIconsOutlined).toHaveLength(18);

    await userEvent.click(favoriteIconsOutlined[0]);

    const favoriteIconsFilled = screen.getAllByTestId("favourite-icon-filled");
    expect(favoriteIconsFilled).toHaveLength(1);
  });
});
