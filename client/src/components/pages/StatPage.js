import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import ReactTable from '../ReactTable'
import {getStaticData} from '../../reducers/dataReducer'
import dataService from '../../services/data'

export default function HomePage() {
  const seasonStatsTableData = useSelector(state => state.data.static.SeasonStats)
  const dispatch = useDispatch()
  // clear cache on first load
  useEffect(() => dataService.clearCache(), [])
  useEffect(() => dispatch(getStaticData()), [dispatch])
  return (
    <div>
      {seasonStatsTableData && <ReactTable {...seasonStatsTableData} />}
    </div>
  )
}
