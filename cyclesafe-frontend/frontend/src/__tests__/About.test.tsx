import React from "react";
import { render, screen } from "@testing-library/react";
import { ThemeContext } from "../context/ThemeContext";
import About from "../components/About/About";

// ✅ Mock react-slick (avoid DOM complexity)
jest.mock("react-slick", () => {
  return ({ children }: { children: React.ReactNode }) => (
    <div data-testid="mock-slider">{children}</div>
  );
});

describe("💡 About Component", () => {
  const renderWithTheme = (theme: "light" | "dark" = "light") =>
    render(
      <ThemeContext.Provider value={{ theme, toggleTheme: jest.fn() }}>
        <About />
      </ThemeContext.Provider>
    );

  test("renders About Us heading and intro text", () => {
    renderWithTheme();

    expect(screen.getByText(/About Us/i)).toBeInTheDocument();

    // ✅ Updated text selector (fix for nested <span>)
    expect(screen.getByText(/heart of our work/i)).toBeInTheDocument();

    expect(
      screen.getByText(/empowering refugee women and girls/i)
    ).toBeInTheDocument();
  });

  test("renders all sections: Mission, Vision, Values, and Our Story", () => {
    renderWithTheme();
    expect(screen.getByText("Mission")).toBeInTheDocument();
    expect(screen.getByText("Vision")).toBeInTheDocument();
    expect(screen.getByText("Values")).toBeInTheDocument();
    expect(screen.getByText("Our Story")).toBeInTheDocument();
  });

  test("renders mission text", () => {
    renderWithTheme();
    expect(
      screen.getByText(/CycleSafe’s mission is to ensure that women and girls/i)
    ).toBeInTheDocument();
  });

  test("renders multiple list items for 'Values'", () => {
    renderWithTheme();
    const valueItems = screen.getAllByRole("listitem");
    expect(valueItems.length).toBeGreaterThanOrEqual(3);
    expect(
      screen.getByText(/Refugee-Centered Empowerment/i)
    ).toBeInTheDocument();
  });

  test("renders with dark theme class when theme is dark", () => {
    renderWithTheme("dark");
    const section = document.querySelector(".about-section");
    expect(section?.classList.contains("dark")).toBe(true);
  });

  test("renders mocked slider correctly", () => {
    renderWithTheme();
    expect(screen.getByTestId("mock-slider")).toBeInTheDocument();
  });

  // ✅ New Snapshot test (tracks rendered output)
  test("matches snapshot", () => {
    const { asFragment } = renderWithTheme();
    expect(asFragment()).toMatchSnapshot();
  });
});
