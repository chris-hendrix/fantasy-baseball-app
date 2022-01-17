import React, {useMemo} from 'react'
import {usePagination, useTable, useSortBy, useFilters} from 'react-table'
import {styled} from '@mui/material/styles'
import {tableCellClasses} from '@mui/material/TableCell'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableFooter,
  TablePagination,
  TableRow
} from '@mui/material'

import TablePaginationActions from './TablePaginationActions'
import {FilterTypes, DefaultColumnFilter} from './TableFilters'

const StyledTableHeaderCell = styled(TableCell)(({theme}) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}))

const StyledTableRow = styled(TableRow)(({theme}) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0
  }
}))

const addHyperlinksToColumns = columns => {
  columns.forEach(column => {
    if (!column.linkAccessor) return
    column.Cell = ({row}) => (
      <a href={row.original[column.linkAccessor]} target="_blank" rel="noreferrer">
        {row.original[column.accessor]}
      </a>
    )
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

export default function MuiTable({columns, data, defaultPageSize, columnOptions}) {
  addHyperlinksToColumns(columns)
  addColumnOptions(columns, columnOptions)

  const filterTypes = useMemo(()=>(FilterTypes),[])

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
    state: {pageIndex, pageSize}
  } = useTable(
    {
      columns,
      data,
      filterTypes,
      defaultColumn,
      initialState: {
        pageSize: defaultPageSize || 100,
        hiddenColumns: columns.filter(col => col.show === false).map(col => col.accessor)
      }
    },
    useFilters,
    useSortBy,
    usePagination
  )

  // Render the UI for your table
  return (
    <Table size="small" padding="none" {...getTableProps()}>
      <TableHead>
        {headerGroups.map(headerGroup => (
          <TableRow {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <StyledTableHeaderCell style={{ verticalAlign: 'top' }} {...column.getHeaderProps(column.getSortByToggleProps())}>
                {column.render('Header')}
                <span>{column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}</span>
                <div>{column.canFilter ? column.render('Filter') : null}</div>
              </StyledTableHeaderCell>
            ))}
          </TableRow>
        ))}
      </TableHead>
      <TableBody>
        {page.map((row, i) => {
          prepareRow(row)
          return (
            <StyledTableRow {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <TableCell {...cell.getCellProps()}>{cell.render('Cell')}</TableCell>
              })}
            </StyledTableRow>
          )
        })}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TablePagination
            rowsPerPageOptions={[10, 50, 100, 220, {label: 'All', value: data.length}]}
            colSpan={8}
            count={data.length}
            rowsPerPage={pageSize}
            labelRowsPerPage={'Rows:'}
            page={pageIndex}
            SelectProps={{
              inputProps: {'aria-label': 'rows per page'},
              native: true
            }}
            onPageChange={(event, newPage) => gotoPage(newPage)}
            onRowsPerPageChange={event => setPageSize(Number(event.target.value))}
            ActionsComponent={TablePaginationActions}
          />
        </TableRow>
      </TableFooter>
    </Table>
  )
}
