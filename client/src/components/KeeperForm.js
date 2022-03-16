import React, { useRef } from 'react'
import { Button, Grid, TextField } from '@mui/material'
import emailjs from '@emailjs/browser';
import { useField } from '../hooks'
import config from '../utils/config'

export default function KeeperForm () {
  const form = useRef();
  const email = useField('email')
  const keepers = useField('text')

  const handleFormSubmit = (e) => {
    e.preventDefault()
    emailjs.sendForm(
      config.EMAILJS_SERVICE_ID,
      config.EMAILJS_TEMPLATE_ID,
      form.current,
      config.EMAILJS_USER_ID
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
