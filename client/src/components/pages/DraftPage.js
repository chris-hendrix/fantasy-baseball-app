import React from 'react'
import { useSelector } from 'react-redux'
import { Box, Divider } from '@mui/material'

import PageHeader from '../PageHeader'
import MuiTable from '../tables/MuiTable'
import { defaultColumnOptions } from '../tables/TableFilters'

export default function DraftPage() {
  const draftTableData = useSelector(({ draft }) => draft.tables.Draft)
  const playerTableData = useSelector(({ draft }) => draft.tables.Players)
  const ownerDraftTableData = useSelector(({ draft }) => draft.tables.OwnerDraft)

  return (
    <Box sx={{ width: '100%' }}>
      <PageHeader>Draft</PageHeader>
      <Box sx={{ width: '100%' }}>
        <MuiTable 
          title="Owner Draft Info"
          defaultPageSize={10}
          {...ownerDraftTableData} />
      </Box>
      <Divider />
      <Box sx={{ width: '49%', display: 'inline-block', pr: 1 }}>
        <MuiTable
          title="Draft"
          defaultPageSize={220}
          columnOptions={defaultColumnOptions}
          {...draftTableData}
        />
      </Box>
      <Box sx={{ width: '49%', display: 'inline-block', pl: 1 }}>
        <MuiTable
          title="Player Pool"
          defaultPageSize={220}
          columnOptions={defaultColumnOptions}
          {...playerTableData}
        />
      </Box>
    </Box>
  )
}
