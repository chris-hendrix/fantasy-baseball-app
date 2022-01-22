import React from 'react'
import { useSelector } from 'react-redux'
import { Box, Grid, Typography } from '@mui/material'

import MuiTable from '../tables/MuiTable'
import { defaultColumnOptions } from '../tables/TableFilters'

export default function HomePage() {
  const draftHistoryTableData = useSelector(state => state.data.static.DraftHistory)
  const keeperHistoryTableData = useSelector(state => state.data.static.KeeperHistory)

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h4" align="center" >History</Typography>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <Typography variant="h6">Draft History</Typography>
          {draftHistoryTableData && (
            <MuiTable
              defaultPageSize={220}
              columnOptions={defaultColumnOptions}
              {...draftHistoryTableData}
            />
          )}
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6">Keeper History</Typography>
          {keeperHistoryTableData && (
            <MuiTable
              defaultPageSize={220}
              columnOptions={defaultColumnOptions}
              {...keeperHistoryTableData}
            />
          )}
        </Grid>
      </Grid>
    </Box>
  )
}
