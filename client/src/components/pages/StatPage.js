import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import MuiTable from '../tables/MuiTable'
import {getStaticData, clearCache} from '../../reducers/dataReducer'
import {SelectColumnFilter} from '../tables/TableFilters'

export default function HomePage() {
  const seasonStatsTableData = useSelector(state => state.data.static.SeasonStats)

  const seasonStatColumnOptions = {
    Year: {Filter: SelectColumnFilter, disableSortBy: true},
    Owner: {Filter: SelectColumnFilter, disableSortBy: true}
  }
  return (
    <div>
      {seasonStatsTableData && (
        <MuiTable columnOptions={seasonStatColumnOptions} {...seasonStatsTableData} />
      )}
    </div>
  )
}
