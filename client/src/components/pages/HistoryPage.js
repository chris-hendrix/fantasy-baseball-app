import React from 'react'
import { useSelector } from 'react-redux'
import { Box, Grid, Typography } from '@mui/material'

import MuiTable from '../tables/MuiTable'
import { defaultColumnOptions } from '../tables/TableFilters'

export default function HistoryPage () {
  const draftHistoryTable = useSelector(state => state.static.tables.DraftHistory)
  const keeperHistoryTable = useSelector(state => state.static.tables.KeeperHistory)

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h4" align="center" >History</Typography>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <Typography variant="h6">Draft History</Typography>
          {draftHistoryTable && (
            <MuiTable
              defaultPageSize={220}
              columnOptions={defaultColumnOptions}
              {...draftHistoryTable}
            />
          )}
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6">Keeper History</Typography>
          {keeperHistoryTable && (
            <MuiTable
              defaultPageSize={220}
              columnOptions={defaultColumnOptions}
              {...keeperHistoryTable}
            />
          )}
        </Grid>
      </Grid>
    </Box>
  )
}
