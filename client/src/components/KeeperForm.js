import React, { useRef } from 'react'
import { Button, Grid, TextField } from '@mui/material'
import emailjs from '@emailjs/browser';
import { useField } from '../hooks'

export default function KeeperForm () {
  const form = useRef();
  const email = useField('email')
  const keepers = useField('text')

  const handleFormSubmit = (e) => {
    e.preventDefault()
    emailjs.sendForm(
      process.env.REACT_APP_EMAILJS_SERVICE_ID,
      process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
      form.current,
      process.env.REACT_APP_EMAILJS_USER_ID
    )
    alert(`${email.value} - ${keepers.value} sent`)
    email.reset()
    keepers.reset()
  }
  return (
    <form ref={form} onSubmit={handleFormSubmit}>
      <Grid container rowSpacing={2}>
        <Grid item xs={12}>
          <TextField
            id="email-input"
            name="email"
            label="Email"
            fullWidth
            required
            {...email}
            reset={undefined}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="keeper-input"
            name="keepers"
            label="Keeper Input"
            placeholder='Enter keepers one per line and in the order in which you want to draft them'
            rows={5}
            fullWidth
            multiline
            required
            {...keepers}
            reset={undefined}
          />
        </Grid>
        <Grid item>
          <Button type='submit' variant='contained' color='secondary'>Submit</Button>
        </Grid>
      </Grid>
    </form>
  )
}
