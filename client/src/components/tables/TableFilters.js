import React, { useMemo } from 'react'
import { matchSorter } from 'match-sorter'
import { TextField, Select, MenuItem } from '@mui/material'

export const defaultColumnOptions = {
  Name: { Filter: DefaultColumnFilter, disableSortBy: true },
  Team: { Filter: SelectColumnFilter, disableSortBy: true },
  Owner: { Filter: SelectColumnFilter, disableSortBy: true },
  Pos: { Filter: PositionColumnFilter, disableSortBy: true },
  ADP: { Filter: RoundColumnFilter, disableSortBy: true },
  Pick: { Filter: RoundColumnFilter, disableSortBy: true },
  Year: { Filter: SelectColumnFilter, disableSortBy: true }
}

const TableTextField = props => (
  <TextField
    hiddenLabel
    variant="standard"
    placeholder={`Search...`}
    size="small"
    color="secondary"
    sx={{
      backgroundColor: 'white',
      margin: '2px',
      borderRadius: '4px',
      '& .MuiInput-input': {
        padding: '5px',
        fontSize: '12px',
        borderRadius: '4px'
      },
    }}
    {...props}
  />
)

const TableSelect = props => (
  <Select
    defaultValue=""
    color="secondary"
    sx={{
      backgroundColor: 'white',
      margin: '2px',
      '& .MuiSelect-select': {
        paddingTop: '2px',
        paddingBottom: '2px',
        fontSize: '12px'
      },
      '& .MuiMenuItem-root': {
        style: { fontSize: '12px' }
      }
    }}
    {...props}
  >
    <MenuItem value="">All</MenuItem>
    {props.options.map((option, i) => (
      <MenuItem key={i} value={option}>
        {option}
      </MenuItem>
    ))}
  </Select>
)

export function DefaultColumnFilter ({ column: { filterValue, preFilteredRows, setFilter } }) {
  return (
    <TableTextField
      value={filterValue || ''}
      onChange={e => {
        setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
      }}
    />
  )
}

export function SelectColumnFilter ({ column: { filterValue, setFilter, preFilteredRows, id } }) {
  const options = useMemo(() => {
    const options = new Set()
    preFilteredRows.forEach(row => {
      options.add(row.values[id])
    })

    return [...options.values()].sort()
  }, [id, preFilteredRows])

  return (
    <TableSelect
      value={filterValue}
      onChange={e => setFilter(e.target.value || '')}
      options={options}
    />
  )
}

export function PositionColumnFilter ({ column: { filterValue, setFilter, preFilteredRows, id } }) {
  const options = ['C', '1B', '2B', '3B', 'SS', 'OF', 'DH', 'SP', 'RP']
  return (
    <TableSelect
      value={filterValue}
      onChange={e => setFilter(e.target.value || '')}
      options={options}
    />
  )
}

export function RoundColumnFilter ({ column: { filterValue, setFilter, preFilteredRows, id } }) {
  const options = () => {
    const rounds = []
    for (var i = 1; i < 24; i++) {
      var round = '0' + i + ':'
      if (i >= 10) {
        round = i + ':'
      }
      rounds.push(round)
    }
    return rounds
  }

  return (
    <TableSelect
      value={filterValue}
      onChange={e => setFilter(e.target.value || '')}
      options={options()}
    />
  )
}

function fuzzyTextFilterFn (rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [row => row.values[id]] })
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = val => !val

export const FilterTypes = {
  // Add a new fuzzyTextFilterFn filter type.
  fuzzyText: fuzzyTextFilterFn,
  // Or, override the default text filter to use
  // "startWith"
  text: (rows, id, filterValue) => {
    return rows.filter(row => {
      const rowValue = row.values[id]
      return rowValue !== undefined
        ? String(rowValue).toLowerCase().startsWith(String(filterValue).toLowerCase())
        : true
    })
  }
}
