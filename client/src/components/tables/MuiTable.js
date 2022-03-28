import React, { useMemo } from 'react'
import { usePagination, useTable, useSortBy, useFilters } from 'react-table'
import {
  Box,
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableFooter,
  TablePagination,
  TableRow,
} from '@mui/material'
import { useTheme } from '@mui/styles'
import TablePaginationActions from './TablePaginationActions'
import { FilterTypes, DefaultColumnFilter } from './TableFilters'

const formatColumns = columns => {
  columns.forEach(column => {
    column.Cell = ({ row }) => {
      const { linkAccessor, alignment } = column
      const value = row.original[column.accessor]
      return (
        <Box sx={{ textAlign: alignment }}>
          {linkAccessor ? (
            <Link underline='hover' href={row.original[column.linkAccessor]} target="_blank" rel="noreferrer">
              {value}
            </Link>
          ) : (
            <span>{value}</span>
          )}
        </Box>
      )
    }
  })
}

const addColumnOptions = (columns, columnOptions) => {
  if (!columnOptions) return
  columns.forEach(column => {
    if (column.Header in columnOptions) {
      Object.assign(column, columnOptions[column.Header])
      column.disableFilters = typeof column.Filter === 'undefined'
    }
  })
}

export default function MuiTable ({
  title,
  columns,
  data,
  defaultPageSize,
  columnOptions,
  rowGroupSize = 1,
  rowColors = ['row.white', 'row.grey'],
  columnValueColors = []
}) {
  formatColumns(columns)
  addColumnOptions(columns, columnOptions)

  const theme = useTheme()
  const filterTypes = useMemo(() => (FilterTypes), [])

  const defaultColumn = useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  )

  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    headerGroups,
    page,
    prepareRow,
    gotoPage,
    setPageSize,
    state: { pageIndex, pageSize }
  } = useTable(
    {
      columns,
      data,
      filterTypes,
      defaultColumn,
      initialState: {
        pageSize: defaultPageSize || 100,
        hiddenColumns: columns.filter(col => col.show === false).map(col => col.accessor)
      },
      autoResetPage: false,
      autoResetSortBy: false,
      autoResetSelectedRows: false,
      autoResetFilters: false,
      disableMultiSort: true,
    },
    useFilters,
    useSortBy,
    usePagination
  )

  // Render the UI for your table
  return (
    <Box>
      {title && <Box typography='h6'>{title}</Box>}
      <Table size="small" padding="none" {...getTableProps()}>
        <TableHead>
          {headerGroups.map(headerGroup => (
            <TableRow style={{ verticalAlign: 'top' }}{...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <TableCell theme={theme} align="center" {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <span>{column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}</span>
                  <div>{column.canFilter ? column.render('Filter') : null}</div>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {page.map((row, i) => {
            prepareRow(row)
            let backgroundColor = rowColors[Math.floor(i / rowGroupSize) % rowColors.length]
            columnValueColors.forEach(cvc => {
              if (
                (cvc.op === '!==' && row.values[cvc.accessor] !== cvc.value) ||
                (cvc.op === '===' && row.values[cvc.accessor] === cvc.value)
              )
                backgroundColor = cvc.color
            })
            return (
              <TableRow
                {...row.getRowProps()}
                sx={{ backgroundColor }}>
                {row.cells.map(cell => {
                  return <TableCell {...cell.getCellProps()}>{cell.render('Cell')}</TableCell>
                })}
              </TableRow>
            )
          })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[10, 50, 100, 220, { label: 'All', value: data.length }]}
              colSpan={8}
              count={data.length}
              rowsPerPage={pageSize}
              labelRowsPerPage={'Rows:'}
              page={pageIndex}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true
              }}
              onPageChange={(event, newPage) => gotoPage(newPage)}
              onRowsPerPageChange={event => setPageSize(Number(event.target.value))}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </Box>
  )
}
