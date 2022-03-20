import React from 'react'
import { Box, Divider, Typography } from '@mui/material'

export default function PageHeader ({ children }) {
  return (
    <Box sx={{ m: 1 }}>
      <Typography variant="h4" align="center">{children}</Typography>
      <Divider />
    </Box>
  )
}
