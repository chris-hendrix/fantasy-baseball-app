import React from 'react'
import { useSelector } from 'react-redux'
import {
  Accordion, AccordionDetails, AccordionSummary,
  Box, Divider, Tabs, Tab
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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
          {children}
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
    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <Box sx={{ width: '75%', display: 'block', justifyContent: 'center', justifyItems: 'center' }}>
        <Box typography="h4" sx={{ width: '100%', textAlign: 'center' }}>Keepers</Box>
        <Divider />
        <Box sx={{ width: '100%', textAlign: 'center', pt: 1 }}>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}            >
              <Box typography="h6">Keeper Entry</Box>
            </AccordionSummary>
            <AccordionDetails><KeeperForm /></AccordionDetails>
          </Accordion>
        </Box>
        <Box sx={{ mt: 1 }}>
          <Tabs value={value} onChange={handleChange} centered>
            <Tab label="Keepers" />
            <Tab label="Last Year's Keepers" />
            <Tab label="Last Year's Draft" />
            <Tab label="Deadline Rosters" />
          </Tabs>
          <TabPanel value={value} index={0}>
            <MuiTable
              defaultPageSize={220}
              columnOptions={defaultColumnOptions}
              {...keeperTable}
            />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <MuiTable
              defaultPageSize={220}
              columnOptions={defaultColumnOptions}
              {...keeperHistoryTable}
            />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <MuiTable
              defaultPageSize={220}
              columnOptions={defaultColumnOptions}
              {...draftHistoryTable}
            />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <PdfViewer file={deadlineRostersFile} />
          </TabPanel>
        </Box>
      </Box>
    </Box>

  )
}
