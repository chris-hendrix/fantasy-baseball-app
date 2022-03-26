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

  const pages = [
    { path: '/', name: 'Home', component: <HomePage />, loading: staticLoading },
    { path: '/draft', name: 'Draft', component: <DraftPage />, loading: draftLoading },
    { path: '/keepers', name: 'Keepers', component: <KeeperPage />, loading: staticLoading },
    { path: '/stats', name: 'Stats', component: <StatPage />, loading: staticLoading },
    { path: '/history', name: 'History', component: <HistoryPage />, loading: staticLoading },
    { path: '/rules', name: 'Rules', component: <RulePage />, loading: false },
  ]

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
        <Navigation pages={pages} />
        <Routes>
          {pages.map(page => {
            const { path, name, component, loading } = page
            return (
              <Route
                key={name}
                exact
                path={path}
                element={loading ? (<Spinner />) : component} >
                {name}
              </Route>
            )
          })}
        </Routes>
      </Container>
    </ThemeProvider>
  )
}
