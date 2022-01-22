import React from 'react'
import { useSelector } from 'react-redux'
import MuiTable from '../tables/MuiTable'
import { SelectColumnFilter } from '../tables/TableFilters'

export default function StatPage () {
  const seasonStatsTableData = useSelector(state => state.data.static.SeasonStats)

  const seasonStatColumnOptions = {
    Year: { Filter: SelectColumnFilter, disableSortBy: true },
    Owner: { Filter: SelectColumnFilter, disableSortBy: true }
  }
  return (
    <div>
      {seasonStatsTableData && (
        <MuiTable columnOptions={seasonStatColumnOptions} {...seasonStatsTableData} />
      )}
    </div>
  )
}
