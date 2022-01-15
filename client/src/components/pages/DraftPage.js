import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {getDraftData} from '../../reducers/dataReducer'

export default function HomePage() {
  const draft = useSelector(state => state.data)
  const dispatch = useDispatch()
  useEffect(() => dispatch(getDraftData()), [dispatch])
  console.log(draft)
  return <div>Draft</div>
}
