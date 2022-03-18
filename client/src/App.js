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
          <Route exact path="/" element={staticLoading ? <Spinner /> : <HomePage />} />
          <Route exact path="/draft" element={draftLoading ? <Spinner /> : <DraftPage />} />
          <Route exact path="/keepers" element={staticLoading ? <Spinner /> : <KeeperPage />} />
          <Route exact path="/stats" element={staticLoading ? <Spinner /> : <StatPage />} />
          <Route exact path="/history" element={staticLoading ? <Spinner /> : <HistoryPage />} />
          <Route exact path="/rules" element={<RulePage />} />
        </Routes>
      </Container>
    </ThemeProvider>
  )
}
