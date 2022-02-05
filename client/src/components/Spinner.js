import React from 'react';
import { Box, CircularProgress } from '@mui/material';

export default function Spinner () {
  return (
    <Box sx={{
      position: "fixed",
      top: "10%",
      left: "50%",
      transform: "translate(-50%, -50%)"
    }}>
      <CircularProgress />
    </Box>
  );
}