import React from 'react'

import { AppBar, Toolbar, Button, Typography } from '@mui/material'
import { Link, useLocation } from 'react-router-dom'

export default function Navigation ({ pages }) {
  const { pathname } = useLocation()
  return (
    <AppBar position="static">
      <Toolbar>
        <img src="img/mit-logo.svg" alt="logo" style={{ maxWidth: 50, paddingRight: 10 }} />
        <Typography
          variant="subtitle1"
          noWrap
          component="div"
          sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
        >
          MIT Fantasy Baseball
        </Typography>
        {pages.map(page => {
          const { path, name } = page
          return (
            <Button
              key={name}
              component={Link}
              to={path}
              sx={{ color: path === pathname ? 'secondary.light' : 'inherit' }}
            >
              {name}
            </Button>
          )
        })}
      </Toolbar>
    </AppBar>
  )
}
