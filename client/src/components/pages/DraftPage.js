import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import ReactTable from '../ReactTable'
import {getDraftData} from '../../reducers/dataReducer'

import {Box, Grid} from '@mui/material'

export default function HomePage() {
  const draftTableData = useSelector(state => state.data.draft.Draft)
  const playerTableData = useSelector(state => state.data.draft.Players)
  const dispatch = useDispatch()
  useEffect(() => dispatch(getDraftData()), [dispatch])
  return (
    <Box sx={{width: '100%'}}>
      <Grid container rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 3}}>
        <Grid item xs={6}>
          {draftTableData && <ReactTable {...draftTableData} />}
        </Grid>
        <Grid item xs={6}>
          {playerTableData && <ReactTable {...playerTableData} />}
        </Grid>
      </Grid>
    </Box>
  )
}
