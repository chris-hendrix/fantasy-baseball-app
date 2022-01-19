import React from 'react'

import { AppBar, Toolbar, Button, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'

export default function Navigation() {
  return (
    <AppBar position="static">
      <Toolbar>
        <img src="img/mit-logo.svg" alt="logo" style={{ maxWidth: 50, paddingRight: 10 }} />
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
        >
          MIT Fantasy Baseball
        </Typography>
        <Button color="secondary" component={Link} to="/">
          Home
        </Button>
        <Button color="inherit" component={Link} to="/draft">
          Draft
        </Button>
        <Button color="inherit" component={Link} to="/keepers">
          Keepers
        </Button>
        <Button color="inherit" component={Link} to="/stats">
          Stats
        </Button>
        <Button color="inherit" component={Link} to="/history">
          History
        </Button>
        <Button color="inherit" component={Link} to="/rules">
          Rules
        </Button>
      </Toolbar>
    </AppBar>
  )
}
