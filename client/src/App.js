import './App.css'
import React, {useEffect} from 'react'
import {Routes, Route, useRouteMatch, useLocation} from 'react-router-dom'

import Navigation from './components/Navigation'
import HomePage from './components/pages/HomePage'
import DraftPage from './components/pages/DraftPage'
import KeeperPage from './components/pages/KeeperPage'
import StatPage from './components/pages/StatPage'
import HistoryPage from './components/pages/HistoryPage'
import RulePage from './components/pages/RulePage'

import {useSelector, useDispatch} from 'react-redux'
import { getStaticData } from './reducers/dataReducer'

import {Container} from '@material-ui/core'
import {ThemeProvider} from '@material-ui/styles'
import theme from './theme'

export default function App() {
  const dispatch = useDispatch()
  useEffect(() => dispatch(getStaticData()))

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
