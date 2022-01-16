import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import ReactTable from '../ReactTable'
import {getStaticData} from '../../reducers/dataReducer'

export default function HomePage() {
  const seasonStatsTableData = useSelector(state => state.data.static.SeasonStats)
  const dispatch = useDispatch()
  useEffect(() => dispatch(getStaticData()), [dispatch])
  return (
    <div>
      {seasonStatsTableData && <ReactTable {...seasonStatsTableData} />}
    </div>
  )
}
