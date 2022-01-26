import { createTheme } from '@mui/material'
import { grey, red } from '@mui/material/colors'
import "@fontsource/roboto"

export const RED = red[800]
export const GREY = grey[800]

const theme = createTheme({
  palette: {
    secondary: { main: RED },
    primary: { main: GREY }
  },
  typography: {
    allVariants: {
      fontFamily: ['roboto', 'sans-serif'].join(','),
    },
    h4: { margin: 15 },
    h5: { marginTop: 15 },
    h6: { marginTop: 8, color: RED, fontSize: '1.1rem' },
    ul: { marginTop: 0 }
  }
})

export default theme
