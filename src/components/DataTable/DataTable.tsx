import { useState, useMemo } from "react";
import type { KeyboardEvent } from "react";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import "./DataTable.css";

export interface Column<T> {
  key: keyof T;
  title: string;
  sortable?: boolean;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (rows: T[]) => void;
}

export function DataTable<T>({
  data,
  columns,
  loading,
  selectable,
  onRowSelect,
}: DataTableProps<T>) {
  const [sortCfg, setSortCfg] = useState<{ key: keyof T; dir: "asc" | "desc" }>();
  const [selected, setSelected] = useState<T[]>([]);

  const sortBy = (c: Column<T>) => {
    if (!c.sortable) return;
    setSortCfg(prev => ({
      key: c.key,
      dir: prev && prev.key === c.key && prev.dir === "asc" ? "desc" : "asc",
    }));
  };

  const sorted = useMemo(() => {
    if (!sortCfg) return data;
    return [...data].sort((a, b) => {
      const aVal = a[sortCfg.key];
      const bVal = b[sortCfg.key];
      if (aVal == null || bVal == null) return aVal ? 1 : bVal ? -1 : 0;
      const numA = Number(aVal);
      const numB = Number(bVal);
      if (!Number.isNaN(numA) && !Number.isNaN(numB))
        return sortCfg.dir === "asc" ? numA - numB : numB - numA;
      const sA = String(aVal).toLowerCase();
      const sB = String(bVal).toLowerCase();
      return sortCfg.dir === "asc" ? sA.localeCompare(sB) : sB.localeCompare(sA);
    });
  }, [data, sortCfg]);

  const toggle = (row: T) => {
    if (!selectable) return;
    const next = selected.includes(row)
      ? selected.filter(r => r !== row)
      : [...selected, row];
    setSelected(next);
    onRowSelect?.(next);
  };

  const handleKey = (e: KeyboardEvent, c: Column<T>) => {
    if (c.sortable && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      sortBy(c);
    }
  };

  if (loading) return <div className="dt-empty">Loading…</div>;
  if (!data.length) return <div className="dt-empty">No data</div>;

  return (
    <div className="dt-wrapper">
      <table className="dt-table" cellPadding={0} cellSpacing={0}>
        <thead>
          <tr>
            {selectable && <th className="dt-th dt-th-select">Select</th>}
            {columns.map(c => {
              const sortedNow = sortCfg?.key === c.key;
              return (
                <th
                  key={String(c.key)}
                  className={`dt-th ${c.sortable ? "dt-th-sortable" : ""}`}
                  onClick={() => sortBy(c)}
                  onKeyDown={e => handleKey(e, c)}
                  tabIndex={c.sortable ? 0 : -1}
                >
                  <div className="dt-th-inner">
                    <span className="dt-title">{c.title}</span>
                    {c.sortable && (
                      <span className="dt-sort-icon">
                        {sortedNow
                          ? sortCfg!.dir === "asc"
                            ? <FaSortUp />
                            : <FaSortDown />
                          : <FaSort />}
                      </span>
                    )}
                  </div>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {sorted.map((row, i) => (
            <tr key={i} className={`dt-tr ${i % 2 ? "dt-row-odd" : "dt-row-even"}`}>
              {selectable && (
                <td className="dt-td dt-td-select">
                  <label className="dt-checkbox">
                    {/* Screen-reader-only text provides a label without aria attributes */}
                    <span className="sr-only">Select row {i + 1}</span>
                    <input
                      type="checkbox"
                      checked={selected.includes(row)}
                      onChange={() => toggle(row)}
                    />
                    <span className="dt-checkbox-check" />
                  </label>
                </td>
              )}
              {columns.map(c => (
                <td key={String(c.key)} className="dt-td">
                  <div className="dt-cell-content">{String(row[c.key] ?? "")}</div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
