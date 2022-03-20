import React from 'react'
import { useSelector } from 'react-redux'
import { Box, Grid, Typography } from '@mui/material'

import PageHeader from '../PageHeader'
import MuiTable from '../tables/MuiTable'
import { defaultColumnOptions } from '../tables/TableFilters'

export default function HistoryPage () {
  const draftHistoryTable = useSelector(state => state.static.tables.DraftHistory)
  const keeperHistoryTable = useSelector(state => state.static.tables.KeeperHistory)

  return (
    <Box sx={{ width: '100%' }}>
      <PageHeader>History</PageHeader>
      <Box sx={{ width: '49%', display: 'inline-block', pr: 1 }}>
        <MuiTable
          title="Draft History"
          defaultPageSize={220}
          columnOptions={defaultColumnOptions}
          {...draftHistoryTable}
        />
      </Box>
      <Box sx={{ width: '49%', display: 'inline-block', pl: 1 }}>
        <MuiTable
          title="Keeper History"
          defaultPageSize={220}
          columnOptions={defaultColumnOptions}
          {...keeperHistoryTable}
        />
      </Box>
    </Box>
  )
}
