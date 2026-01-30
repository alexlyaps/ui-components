import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Input } from "./input";

describe("Input component", () => {
  it("renders with placeholder", () => {
    render(<Input />);
    const inputElement = screen.getByPlaceholderText("Enter text here");
    expect(inputElement).toBeInTheDocument();
  });
});
