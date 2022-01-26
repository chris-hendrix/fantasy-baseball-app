import React from 'react'
import { useSelector } from 'react-redux'
import { Box, Typography } from '@mui/material'
import MuiTable from '../tables/MuiTable'
import { SelectColumnFilter } from '../tables/TableFilters'

export default function StatPage () {
  const seasonStatsTableData = useSelector(state => state.static.tables.SeasonStats)

  const seasonStatColumnOptions = {
    Year: { Filter: SelectColumnFilter, disableSortBy: true },
    Owner: { Filter: SelectColumnFilter, disableSortBy: true }
  }
  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h4" align="center">Stats</Typography>
      {seasonStatsTableData && (
        <MuiTable columnOptions={seasonStatColumnOptions} {...seasonStatsTableData} />
      )}
    </Box>
  )
}
