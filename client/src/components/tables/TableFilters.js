import {matchSorter} from 'match-sorter'

function DefaultColumnFilter({column: {filterValue, preFilteredRows, setFilter}}) {
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

function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, {keys: [row => row.values[id]]})
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = val => !val

export const filterTypes = {
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

const filters = {
  DefaultColumnFilter: DefaultColumnFilter
}

export default filters
