import React from 'react'
import { useSelector } from 'react-redux'
import { Box, Grid, Paper, Typography } from '@mui/material'
import Rafters from '../Rafters'
import ownerImages from '../../assets/images/owners'

export default function HomePage () {
  const leagueWinnerData = useSelector(state => {
    if (!state.static.tables.SeasonStats) return
    const seasonStats = state.static.tables.SeasonStats.data
    return seasonStats && seasonStats.filter(row => row['playrk'] === '1')
  })

  const lastWinner = () => {
    if (!leagueWinnerData) return
    const { year, owner } = leagueWinnerData.slice(-1)[0]
    const [info, img] = [`${year} Champion: ${owner}`, ownerImages[owner]]
    return (
      <Grid item xs={6} justifyContent='center'>
        <Typography variant="h5" align='center'>{info}</Typography>
        <Paper
          style={{
            borderRadius: '10%',
            backgroundImage: `url(${img})`,
            backgroundSize: 600,
            width: 600,
            height: 600
          }}
        >
        </Paper>
      </Grid>
    )
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Grid container rowSpacing={2} columnSpacing={2} justifyContent='center' alignItems='center'>
        <Grid item xs={12} />
        <Grid item xs={12}>
          <Rafters />
        </Grid>
        {lastWinner()}
      </Grid>
    </Box>
  )
}
