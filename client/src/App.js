import './App.css'
import React, { useEffect } from 'react'
import { Routes, Route, useRouteMatch, useLocation } from 'react-router-dom'

import Navigation from './components/Navigation'
import HomePage from './components/pages/HomePage'
import DraftPage from './components/pages/DraftPage'
import KeeperPage from './components/pages/KeeperPage'
import StatPage from './components/pages/StatPage'
import HistoryPage from './components/pages/HistoryPage'
import RulePage from './components/pages/RulePage'

import { useSelector, useDispatch } from 'react-redux'
import { getStaticData, getDraftData, clearCache } from './reducers/dataReducer'

import { useInterval } from './hooks/useInterval'

import { Container } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/styles'
import theme from './theme'

const DRAFT_UPDATE_INTERVAL = 10000

export default function App() {
  const dispatch = useDispatch()
  const location = useLocation()

  // load data on first load
  useEffect(() => {
    dispatch(getStaticData())
    dispatch(getDraftData())
  }, [dispatch])

  // update draft tables on interval if on draft page
  useInterval(() => {
    if (location && location.pathname.toLowerCase().includes('draft')) {
      dispatch(getDraftData())
    }
  }, DRAFT_UPDATE_INTERVAL)

  return (
    <ThemeProvider theme={theme}>
      <Container className="App">
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/draft" element={<DraftPage />} />
          <Route path="/keepers" element={<KeeperPage />} />
          <Route path="/stats" element={<StatPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/rules" element={<RulePage />} />
        </Routes>
      </Container>
    </ThemeProvider>
  )
}
