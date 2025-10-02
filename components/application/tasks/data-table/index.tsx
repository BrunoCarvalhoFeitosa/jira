"use client"
import * as React from "react"
import { useFilterContext } from "@/contexts/filter-context"
import { cn } from "@/lib/utils"
import { ColumnDef, ColumnFiltersState, flexRender, getCoreRowModel, getPaginationRowModel, SortingState, getFilteredRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { TbFilterSearch } from "react-icons/tb"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

const placeholders = [
  "Pesquise pelo títlo da tarefa",
  "Pesquise por um termo específico",
  "Pesquise por uma palavra específica"
]

export const DataTable = <TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) => {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const { isFilterVisible } = useFilterContext()
  
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters
    }
  })
  
  return (
    <div>
      <div className="flex items-center pb-4">
        <div className={cn("flex items-center gap-x-2", isFilterVisible && "w-full")}>
          <div className="relative flex items-center w-full">
            {isFilterVisible && (
              <div className="absolute top-2/4 -translate-y-2/4 left-2">
                <TbFilterSearch className="size-5 text-muted-foreground dark:text-white" />
              </div>
            )}
            <PlaceholdersAndVanishInput
              placeholders={placeholders}
              onSubmit={(event) => {
                event.preventDefault()

                const input = event.currentTarget.querySelector("input") as HTMLInputElement
                table.getColumn("name")?.setFilterValue(input.value)
              }}
            />
          </div>
        </div>
      </div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="text-base">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="text-base"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-base text-center">
                  Nenhum resultado encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Anterior
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Próximo
        </Button>
      </div>
    </div>
  )
}

