import { createTheme } from '@mui/material'
import { grey, red } from '@mui/material/colors'
import "@fontsource/roboto"

const theme = createTheme({
  palette: {
    secondary: { main: red[800] },
    primary: { main: grey[800] },
    row: {
      header: grey[800],
      white: grey[0],
      grey: grey[200],
      red: red[50]
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
  },
  components: {
    MuiLink: {
      styleOverrides: {
        root: {
          cursor: 'pointer',
          underline: 'hover',
          color: red[800]
        }
      }
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          textAlign: 'center',
        },
        head: {
          textAlign: 'center',
        }
      }
    },
  }
})

export default theme
