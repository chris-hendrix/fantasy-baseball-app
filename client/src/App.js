import React, { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'

import Navigation from './components/Navigation'
import Spinner from './components/Spinner'
import HomePage from './components/pages/HomePage'
import DraftPage from './components/pages/DraftPage'
import KeeperPage from './components/pages/KeeperPage'
import StatPage from './components/pages/StatPage'
import HistoryPage from './components/pages/HistoryPage'
import RulePage from './components/pages/RulePage'

import { useDispatch, useSelector } from 'react-redux'
import { getDraftTables } from './reducers/draftDataReducer'
import { getStaticTables } from './reducers/staticDataReducer'
import { getRules } from './reducers/rulesReducer'

import { useInterval } from './hooks'

import { Container, ThemeProvider } from '@mui/material'
import theme from './theme'

const DRAFT_UPDATE_INTERVAL = 10000

export default function App() {
  const dispatch = useDispatch()
  const location = useLocation()
  const staticLoading = useSelector(state => state.static.loading)
  const draftLoading = useSelector(state => state.draft.loading)

  // load data on first load
  useEffect(() => {
    dispatch(getStaticTables())
    dispatch(getDraftTables())
    dispatch(getRules())
  }, [dispatch])

  // update draft tables on interval if on draft page
  useInterval(() => {
    if (location && location.pathname.toLowerCase().includes('draft')) {
      dispatch(getDraftTables())
    }
  }, DRAFT_UPDATE_INTERVAL)

  return (
    <ThemeProvider theme={theme}>
      <Container className="App">
        <Navigation />
        <Routes>
          <Route path="/" element={staticLoading ? <Spinner /> : <HomePage />} />
          <Route path="/draft" element={draftLoading ? <Spinner /> : <DraftPage />} />
          <Route path="/keepers" element={staticLoading ? <Spinner /> : <KeeperPage />} />
          <Route path="/stats" element={staticLoading ? <Spinner /> : <StatPage />} />
          <Route path="/history" element={staticLoading ? <Spinner /> : <HistoryPage />} />
          <Route path="/rules" element={<RulePage />} />
        </Routes>
      </Container>
    </ThemeProvider>
  )
}
