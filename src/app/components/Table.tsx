import React from 'react';
import { useReactTable, getPaginationRowModel, flexRender, ColumnDef, getCoreRowModel } from '@tanstack/react-table';
import { StockEvent } from '../pages/MainView/MainView';

interface TableProps {
  data: StockEvent[];
  columns: ColumnDef<StockEvent>[];
}

function Table({ columns, data }: TableProps) {
  const { getHeaderGroups, getRowModel } = useReactTable({
    columns,
    data,
    initialState: {
      pagination: {
        pageSize: 100,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <table>
      <thead>
        {getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id}>{flexRender(header.column.columnDef.header, header.getContext())}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {getRowModel().rows.map((row) => (
          <tr key={row.id} style={{ backgroundColor: row.original.price < 4000 ? 'red' : 'green', color: 'white' }}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
