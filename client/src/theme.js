import { createTheme } from '@mui/material'
import { grey, red } from '@mui/material/colors'

export const PRIMARY_COLOR = red[800]
export const SECONDARY_COLOR = grey[800]

const theme = createTheme({
  palette: {
    secondary: { main: PRIMARY_COLOR },
    primary: { main: SECONDARY_COLOR }
  },
  typography: {
    fontFamily: ['"Lato"', 'sans-serif'].join(',')
  }
})

export default theme
