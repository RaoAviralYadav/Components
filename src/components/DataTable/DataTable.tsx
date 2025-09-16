import React, { useState } from "react";

export interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
}

export function DataTable<T>({
  data,
  columns,
  loading,
  selectable,
  onRowSelect,
}: DataTableProps<T>) {
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" } | null>(null);
  const [selectedRows, setSelectedRows] = useState<T[]>([]);

  const handleSort = (col: Column<T>) => {
    if (!col.sortable) return;
    let direction: "asc" | "desc" = "asc";
    if (sortConfig && sortConfig.key === col.key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key: col.key, direction });
  };

  const sortedData = React.useMemo(() => {
    if (!sortConfig) return data;
    return [...data].sort((a, b) => {
      const aVal = a[sortConfig.key as keyof T];
      const bVal = b[sortConfig.key as keyof T];
      if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [data, sortConfig]);

  const toggleRow = (row: T) => {
    if (!selectable) return;
    const already = selectedRows.includes(row);
    const updated = already ? selectedRows.filter(r => r !== row) : [...selectedRows, row];
    setSelectedRows(updated);
    onRowSelect?.(updated);
  };

  if (loading) return <div className="p-4 text-center">Loading...</div>;
  if (data.length === 0) return <div className="p-4 text-center">No data available</div>;

  return (
    <table className="w-full border-collapse border border-gray-200">
      <thead className="bg-gray-100">
        <tr>
          {selectable && <th className="border p-2">Select</th>}
          {columns.map((col) => (
            <th
              key={col.key}
              className="border p-2 cursor-pointer"
              onClick={() => handleSort(col)}
            >
              {col.title}
              {sortConfig?.key === col.key && (sortConfig.direction === "asc" ? " 🔼" : " 🔽")}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedData.map((row, idx) => (
          <tr key={idx} className="hover:bg-gray-50">
            {selectable && (
              <td className="border p-2">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(row)}
                    onChange={() => toggleRow(row)}
                  />
                  <span className="sr-only">Select row {idx + 1}</span>
                </label>

              </td>
            )}
            {columns.map((col) => (
              <td key={col.key} className="border p-2">
                {String(row[col.dataIndex])}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
