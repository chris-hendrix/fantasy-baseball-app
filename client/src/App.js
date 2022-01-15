import './App.css'
import Navigation from './Components/Navigation'
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
        <div>hello world</div>
      </Container>
    </ThemeProvider>
  )
}
