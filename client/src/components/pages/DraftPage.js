import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import MuiTable from '../tables/MuiTable'
import {getDraftData} from '../../reducers/dataReducer'
import {Typography} from '@material-ui/core'

import {Box, Grid} from '@mui/material'

export default function HomePage() {
  const draftTableData = useSelector(state => state.data.draft.Draft)
  const playerTableData = useSelector(state => state.data.draft.Players)
  const ownerDraftTableData = useSelector(state => state.data.draft.OwnerDraft)

  const draftTableFilters = {
    Name: 'DefaultColumnFilter'
  }

  const dispatch = useDispatch()
  useEffect(() => dispatch(getDraftData()), [dispatch])
  return (
    <Box sx={{width: '100%'}}>
      <Grid container rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 3}}>
        <Grid item xs={12}>
          <Typography variant="h6">Owner Draft Info</Typography>
          {ownerDraftTableData && <MuiTable defaultPageSize={10} {...ownerDraftTableData} />}
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6">Draft Board</Typography>
          {draftTableData && (
            <MuiTable defaultPageSize={220} filterMap={draftTableFilters} {...draftTableData} />
          )}
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6">Player Pool</Typography>
          {playerTableData && <MuiTable defaultPageSize={220} {...playerTableData} />}
        </Grid>
      </Grid>
    </Box>
  )
}
