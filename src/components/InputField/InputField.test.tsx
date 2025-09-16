import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect, vi } from "vitest"; // ✅ import vi
import { InputField } from "./InputField";

describe("InputField", () => {
  it("renders label and placeholder", () => {
    render(<InputField label="Name" placeholder="Enter name" />);
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter name")).toBeInTheDocument();
  });

  it("calls onChange when typing", () => {
    const handleChange = vi.fn();
    render(<InputField label="Name" onChange={handleChange} />);
    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "Aviral" },
    });
    expect(handleChange).toHaveBeenCalled();
  });

  it("shows error message when invalid", () => {
    render(<InputField label="Email" invalid errorMessage="Required" />);
    expect(screen.getByText("Required")).toBeInTheDocument();
  });
});
