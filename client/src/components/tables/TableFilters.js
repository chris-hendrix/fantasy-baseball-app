import React, {useMemo} from 'react'
import {matchSorter} from 'match-sorter'

export function DefaultColumnFilter({column: {filterValue, preFilteredRows, setFilter}}) {
  const count = preFilteredRows.length
  return (
    <input
      value={filterValue || ''}
      onChange={e => {
        setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
      }}
      placeholder={`Search ${count} records...`}
    />
  )
}

export function SelectColumnFilter({column: {filterValue, setFilter, preFilteredRows, id}}) {
  const options = useMemo(() => {
    const options = new Set()
    preFilteredRows.forEach(row => {
      options.add(row.values[id])
    })

    return [...options.values()].sort()
  }, [id, preFilteredRows])

  return (
    <select
      value={filterValue}
      onChange={e => {
        setFilter(e.target.value || undefined)
      }}
    >
      <option value="">All</option>
      {options.map((option, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </select>
  )
}

export function PositionColumnFilter({column: {filterValue, setFilter, preFilteredRows, id}}) {
  const options = ['C', '1B', '2B', '3B', 'SS', 'OF', 'DH', 'SP', 'RP']
  return (
    <select
      value={filterValue}
      onChange={e => {
        console.log(e.target.value)
        setFilter(e.target.value || undefined)
      }}
    >
      <option value="">All</option>
      {options.map((option, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </select>
  )
}

export function RoundColumnFilter({column: {filterValue, setFilter, preFilteredRows, id}}) {
  // Calculate the options for filtering
  // using the preFilteredRows
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
    <select
      value={filterValue}
      onChange={e => {
        setFilter(e.target.value || undefined)
      }}
    >
      <option value="">All</option>
      {options().map((option, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </select>
  )
}

function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, {keys: [row => row.values[id]]})
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
