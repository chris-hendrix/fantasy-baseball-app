import {Table, TableBody, TableCell, TableHead, TableRow} from '@mui/material'
import {useTable} from 'react-table'
import {styled} from '@mui/material/styles'
import {tableCellClasses} from '@mui/material/TableCell'

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

const addHyperlinksToColumns = columns =>{
  columns.forEach(column => {
    if (!column.linkAccessor) return
    column.Cell = ({row}) => (
      <a href={row.original[column.linkAccessor]} target="_blank" rel="noreferrer">
        {row.original[column.accessor]}
      </a>
    )
  })
}

export default function ReactTable({columns, data}) {
  
  addHyperlinksToColumns(columns)

  // Use the state and functions returned from useTable to build your UI
  const {getTableProps, headerGroups, rows, prepareRow} = useTable({
    columns,
    data,
    initialState: {
      hiddenColumns: columns.filter(col => col.show === false).map(col => col.accessor)
    }
  })

  // Render the UI for your table
  return (
    <Table size="small" padding="none" {...getTableProps()}>
      <TableHead>
        {headerGroups.map(headerGroup => (
          <TableRow {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <StyledTableHeaderCell {...column.getHeaderProps()}>
                {column.render('Header')}
              </StyledTableHeaderCell>
            ))}
          </TableRow>
        ))}
      </TableHead>
      <TableBody>
        {rows.map((row, i) => {
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
    </Table>
  )
}
