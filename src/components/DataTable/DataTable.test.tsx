import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect, vi } from "vitest";
import { DataTable } from "./DataTable";
import type { Column } from "./DataTable"; 

interface User {
  id: number;
  name: string;
  email: string;
}

const data: User[] = [{ id: 1, name: "Alice", email: "alice@mail.com" }];

const columns: Column<User>[] = [
  { key: "id", title: "ID", dataIndex: "id" },
  { key: "name", title: "Name", dataIndex: "name" },
];

describe("DataTable", () => {
  it("renders table headers", () => {
    render(<DataTable data={data} columns={columns} />);
    expect(screen.getByText("ID")).toBeInTheDocument();
    expect(screen.getByText("Name")).toBeInTheDocument();
  });

  it("renders rows", () => {
    render(<DataTable data={data} columns={columns} />);
    expect(screen.getByText("Alice")).toBeInTheDocument();
  });

  it("handles row selection", () => {
    const handleSelect = vi.fn();
    render(
      <DataTable
        data={data}
        columns={columns}
        selectable
        onRowSelect={handleSelect}
      />
    );
    fireEvent.click(screen.getByRole("checkbox"));
    expect(handleSelect).toHaveBeenCalled();
  });
});
