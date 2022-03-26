import { createTheme } from '@mui/material'
import { grey, red } from '@mui/material/colors'
import "@fontsource/roboto"

const theme = createTheme({
  palette: {
    secondary: { main: red[800] },
    primary: { main: grey[800] },
    row: {
      header: grey[800],
      main: grey[0],
      secondary: grey[200]
    }
  },
  typography: {
    allVariants: {
      fontFamily: ['roboto', 'sans-serif'].join(','),
    },
    h4: { margin: 15 },
    h5: { marginTop: 15 },
    h6: { marginTop: 8, color: red[800], fontSize: '1.1rem' },
    ul: { marginTop: 0 }
  }
})

export default theme
