import React from 'react'
import { useSelector } from 'react-redux'
import { Box, Grid, Tabs, Tab, Typography } from '@mui/material'

import MuiTable from '../tables/MuiTable'
import { defaultColumnOptions } from '../tables/TableFilters'
import KeeperForm from '../KeeperForm'
import PdfViewer from '../PdfViewer'
import deadlineRostersFile from '../../assets/pdf/DeadlineRosters.pdf'

function TabPanel (props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default function KeeperPage () {
  const keeperTable = useSelector(state => state.static.tables.Keepers)
  const keeperHistoryTable = useSelector(state => {
    const keeperHistory = state.static.tables.KeeperHistory
    if (!keeperHistory) return
    const lastYear = keeperHistory.data.reduce((a, b) => a.year > b.year ? a.year : b.year)
    const data = keeperHistory.data.filter(row => row.year === lastYear)
    return { ...keeperHistory, data }
  })
  const draftHistoryTable = useSelector(state => {
    const draftHistory = state.static.tables.DraftHistory
    if (!draftHistory) return
    const lastYear = draftHistory.data.reduce((a, b) => a.year > b.year ? a.year : b.year)
    const data = draftHistory.data.filter(row => row.year === lastYear)
    return { ...draftHistory, data }
  })
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h4" align="center" >Keepers</Typography>

      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={8}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Keepers" />
            <Tab label="Last Year's Keepers" />
            <Tab label="Last Year's Draft" />
            <Tab label="Deadline Rosters" />
          </Tabs>
          <TabPanel value={value} index={0}>
            {keeperTable && (
              <MuiTable
                defaultPageSize={220}
                columnOptions={defaultColumnOptions}
                {...keeperTable}
              />
            )}
          </TabPanel>
          <TabPanel value={value} index={1}>
            {keeperHistoryTable && (
              <MuiTable
                defaultPageSize={220}
                columnOptions={defaultColumnOptions}
                {...keeperHistoryTable}
              />
            )}
          </TabPanel>
          <TabPanel value={value} index={2}>
            {draftHistoryTable && (
              <MuiTable
                defaultPageSize={220}
                columnOptions={defaultColumnOptions}
                {...draftHistoryTable}
              />
            )}
          </TabPanel>
          <TabPanel value={value} index={3}>
            <PdfViewer file={deadlineRostersFile} />
          </TabPanel>
        </Grid>

        <Grid item xs={4}>
          <Box height={36} />
          <Typography variant="h6">Keeper Form</Typography>
          <KeeperForm />
        </Grid>
      </Grid>
    </Box>
  )
}
