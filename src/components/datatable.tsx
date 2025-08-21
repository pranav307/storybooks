// DataTable.tsx
import React, { useState } from "react";
import type { DataTableProps, Column } from "./datas.types"; 

function DataTable<T extends { id: string | number }>({
  data,
  columns,
  loading = false,
  selectable = false,
  onRowSelect,
}: DataTableProps<T>) {
  const [selectedRows, setSelectedRows] = useState<T[]>([]);
  const [sortConfig, setSortConfig] = useState<{ key: keyof T; direction: "asc" | "desc" } | null>(null);

  // 🔹 Handle sorting
  const sortedData = React.useMemo(() => {
    if (!sortConfig) return data;
    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [data, sortConfig]);

  // 🔹 Handle row selection
  const handleRowClick = (row: T) => {
    if (!selectable) return;
    let newSelection: T[];
    if (selectedRows.includes(row)) {
      newSelection = selectedRows.filter((r) => r !== row);
    } else {
      newSelection = [...selectedRows, row];
    }
    setSelectedRows(newSelection);
    onRowSelect?.(newSelection);
  };

  // 🔹 Handle column sorting click
  const handleSort = (col: Column<T>) => {
    if (!col.sortable) return;
    let direction: "asc" | "desc" = "asc";
    if (sortConfig?.key === col.dataIndex && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key: col.dataIndex, direction });
  };

  return (
    <div className="border rounded-md shadow-sm overflow-x-auto">
      {loading ? (
        <p className="p-4 text-center">Loading...</p>
      ) : data.length === 0 ? (
        <p className="p-4 text-center">No data available</p>
      ) : (
        <table className="w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              {selectable && <th className="p-2 border">Select</th>}
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`p-2 border ${col.sortable ? "cursor-pointer" : ""}`}
                  onClick={() => handleSort(col)}
                >
                  {col.title}
                  {col.sortable && (
                    <span className="ml-1">
                      {sortConfig?.key === col.dataIndex
                        ? sortConfig.direction === "asc"
                          ? "↑"
                          : "↓"
                        : "↕"}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((row) => (
              <tr
                key={row.id}
                className={`hover:bg-gray-50 cursor-pointer ${
                  selectedRows.includes(row) ? "bg-blue-100" : ""
                }`}
                onClick={() => handleRowClick(row)}
              >
                {selectable && (
                  <td className="p-2 border">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(row)}
                      readOnly
                    />
                  </td>
                )}
                {columns.map((col) => (
                  <td key={col.key} className="p-2 border">
                    {String(row[col.dataIndex])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default DataTable;
