import { useEffect, useMemo, useState } from 'react'

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useDebounce } from '@uidotdev/usehooks'

import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header'
import { DataTableViewOptions } from '@/components/data-table/data-table-view-options'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export type CustomColumnDef<TData, TValue = unknown> = ColumnDef<
  TData,
  TValue
> & {
  enableFilter?: boolean
}

interface DataTableProps<TData> {
  columns: CustomColumnDef<TData>[]
  data: TData[]
  totalItems: number
  totalItemsLabel: string
}

export function DataTable<TData extends Record<string, unknown>>({
  columns,
  data,
  totalItems,
  totalItemsLabel,
}: DataTableProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [filteredItemsCount, setFilteredItemsCount] = useState<number>(0)

  const debouncedData = useDebounce(data, 1000)

  const memoizedColumns = useMemo(() => columns, [columns])

  const table = useReactTable({
    data: debouncedData,
    columns: memoizedColumns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
    getSortedRowModel: getSortedRowModel(),
  })

  useEffect(() => {
    const filteredRows = table.getFilteredRowModel().rows
    setFilteredItemsCount(filteredRows.length)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedData, columnFilters, sorting, table.getFilteredRowModel().rows])

  return (
    <div className="overflow-auto">
      <div className="w-full flex justify-between items-center space-y-2 py-4">
        <div className="text-sm text-zinc-700 dark:text-zinc-200">
          {totalItemsLabel}: {filteredItemsCount} de {totalItems}
        </div>
        <DataTableViewOptions table={table} />
      </div>
      <div className="bg-zinc-50 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50 rounded">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup, index) => (
              <TableRow key={headerGroup.id ?? `headerGroup-${index}`}>
                {headerGroup.headers.map((header, headerIndex) => (
                  <TableHead
                    key={header.id ?? `header-${headerIndex}`}
                    className="text-zinc-900 dark:text-zinc-50"
                  >
                    <DataTableColumnHeader
                      column={header.column}
                      title={header.column.columnDef.header as string}
                      enableFilter={
                        (header.column.columnDef as CustomColumnDef<TData>)
                          .enableFilter ?? true
                      }
                    />
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row, index) => {
                const receivedValue = Number(
                  row.original.receivedValue,
                ) as number
                const expectedValue = Number(
                  row.original.expectedValue,
                ) as number

                const rowClassName =
                  receivedValue === 0 ||
                  receivedValue === null ||
                  Number.isNaN(receivedValue)
                    ? 'text-zinc-800'
                    : receivedValue < expectedValue
                      ? 'text-red-500'
                      : 'text-green-500'

                return (
                  <TableRow
                    key={row.id ?? `row-${index}-${Math.random()}`}
                    data-state={row.getIsSelected() ? 'selected' : undefined}
                    className={rowClassName}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className="text-center text-zinc-900 dark:text-zinc-200"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                )
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-zinc-700 dark:text-zinc-200"
                >
                  Sem resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
