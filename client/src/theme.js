import {createTheme} from '@material-ui/core/styles'
import {grey, red} from '@material-ui/core/colors'

const theme = createTheme({
  palette: {
    secondary: {main: red[800]},
    primary: {main: grey[800]}
  },
  typography: {
    fontFamily: ['"Lato"', 'sans-serif'].join(',')
  }
})

export default theme