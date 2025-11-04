import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import MenstrualCard, { MenstrualResult } from "../components/MenstrualCard";

describe("🩸 MenstrualCard Component", () => {
  const mockOnOpen = jest.fn();

  const mockItem: MenstrualResult = {
    title: "Understanding Menstrual Health",
    snippet: "Learn about the phases of your menstrual cycle and what they mean.",
    source: "World Health Organization",
    url: "https://example.com/menstrual-health",
    type: "Article",
    published: "2025-11-02",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the card with correct content", () => {
    render(<MenstrualCard item={mockItem} onOpen={mockOnOpen} />);

    // Headline and snippet
    expect(
      screen.getByText(/Understanding Menstrual Health/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Learn about the phases of your menstrual cycle/i)
    ).toBeInTheDocument();

    // Metadata (source + published date)
    expect(
      screen.getByText(/World Health Organization • 2025-11-02/i)
    ).toBeInTheDocument();
  });

  test("calls onOpen with correct arguments when 'Open' button is clicked", () => {
    render(<MenstrualCard item={mockItem} onOpen={mockOnOpen} />);
    const openButton = screen.getByRole("button", { name: /Open/i });
    fireEvent.click(openButton);
    expect(mockOnOpen).toHaveBeenCalledWith(
      mockItem.url,
      mockItem.title
    );
  });

  test("renders a working external link", () => {
    render(<MenstrualCard item={mockItem} onOpen={mockOnOpen} />);
    const externalLink = screen.getByRole("link", { name: /Open in new tab/i });
    expect(externalLink).toHaveAttribute("href", mockItem.url);
    expect(externalLink).toHaveAttribute("target", "_blank");
    expect(externalLink).toHaveAttribute("rel", "noopener noreferrer");
  });

  test("displays source without published date if not provided", () => {
    const noDateItem = { ...mockItem, published: null };
    render(<MenstrualCard item={noDateItem} onOpen={mockOnOpen} />);
    expect(screen.getByText(/World Health Organization$/)).toBeInTheDocument();
  });

  test("matches snapshot", () => {
    const { asFragment } = render(
      <MenstrualCard item={mockItem} onOpen={mockOnOpen} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
