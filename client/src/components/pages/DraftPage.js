import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Container} from '@material-ui/core'
import ReactTable from '../ReactTable'
import {getDraftData} from '../../reducers/dataReducer'

export default function HomePage() {
  const draftTableData = useSelector(state => state.data.draft.Draft)
  const dispatch = useDispatch()
  useEffect(() => dispatch(getDraftData()), [dispatch])
  console.log(draftTableData)
  return (
    <Container>
      {draftTableData && <ReactTable {...draftTableData} />}
    </Container>
  )
}
