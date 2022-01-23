import React from 'react'
import { Button, Grid, TextField, Typography } from '@mui/material'

export default function KeeperForm () {
  return (
    <form>
      <Grid container rowSpacing={2} xs={12}>
        <Grid item xs={12}>
          <TextField
            id="email-input"
            name="email"
            label="Email"
            type="email"
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="keeper-input"
            name="email"
            label="Keeper Input"
            type="text"
            placeholder='Enter keepers one per line and in the order in which you want to draft them'
            rows={5}
            fullWidth
            multiline
            required
          />
        </Grid>
        <Grid item>
          <Button variant='contained' color='secondary'>Submit</Button>
        </Grid>
      </Grid>
    </form>
  )
}
