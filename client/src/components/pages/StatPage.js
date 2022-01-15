import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'

export default function HomePage() {
  const seasonStats = useSelector(state => state.data.static.SeasonStats)
  console.log(seasonStats)
  return (
    <div>
      Stats
      {seasonStats && seasonStats.headers}
    </div>
  )
}
