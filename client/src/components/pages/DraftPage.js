import React from 'react'
import {useSelector} from 'react-redux'
import {Typography} from '@material-ui/core'
import {Box, Grid} from '@mui/material'

import MuiTable from '../tables/MuiTable'
import {DefaultColumnFilter, SelectColumnFilter, PositionColumnFilter, RoundColumnFilter} from '../tables/TableFilters'

export default function DraftPage() {
  const draftTableData = useSelector(state => state.data.draft.Draft)
  const playerTableData = useSelector(state => state.data.draft.Players)
  const ownerDraftTableData = useSelector(state => state.data.draft.OwnerDraft)

  const playerColumnOptions = {
    Name: {Filter: DefaultColumnFilter, disableSortBy: true},
    Team: {Filter: SelectColumnFilter, disableSortBy: true},
    Owner: {Filter: SelectColumnFilter, disableSortBy: true},
    Pos: {Filter: PositionColumnFilter, disableSortBy: true},
    ADP: {Filter: RoundColumnFilter, disableSortBy: true},
    Pick: {Filter: RoundColumnFilter, disableSortBy: true}
  }

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
            <MuiTable
              defaultPageSize={220}
              columnOptions={playerColumnOptions}
              {...draftTableData}
            />
          )}
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6">Player Pool</Typography>
          {playerTableData && (
            <MuiTable
              defaultPageSize={220}
              columnOptions={playerColumnOptions}
              {...playerTableData}
            />
          )}
        </Grid>
      </Grid>
    </Box>
  )
}
