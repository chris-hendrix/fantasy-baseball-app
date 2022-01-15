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

import {Container} from '@material-ui/core'
import {ThemeProvider} from '@material-ui/styles'
import {createTheme} from '@material-ui/core/styles'
import {grey, red} from '@material-ui/core/colors'

export default function App() {
  const theme = createTheme({
    palette: {
      secondary: {main: red[800]},
      primary: {main: grey[800]}
    },
    typography: {
      fontFamily: ['"Lato"', 'sans-serif'].join(',')
    }
  })

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
