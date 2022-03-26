import React from 'react'
import { useSelector } from 'react-redux'
import { Grid, Paper, Typography } from '@mui/material'
import { EmojiEvents } from '@mui/icons-material'
import theme from '../theme'

export default function Rafters () {
  const leagueWinnerData = useSelector(state => {
    if (!state.static.tables.SeasonStats) return
    const seasonStats = state.static.tables.SeasonStats.data
    return seasonStats && seasonStats.filter(row => row['playrk'] === '1')
  })
  const leagueWinnerBanner = row => {
    const { year, owner, wins, losses, ties } = row
    const record = `${wins}-${losses}-${ties}`

    return (
      <Grid item key={year}>
        <Paper
          variant='outlined'
          elevation={0}
          style={{
            borderColor: theme.palette.secondary.main,
            background: theme.palette.primary.main,
            height: 200,
            width: 100
          }}
        >
          <Typography variant='h5' color={theme.palette.common.white} align='center'>{owner}</Typography>
          <Typography variant='body1' color={theme.palette.common.white} align='center'>{record}</Typography>
          <Typography variant='h4' color={theme.palette.common.white} align='center'>{year}</Typography>
          <Typography variant='h4' color={theme.palette.common.white} align='center'><EmojiEvents fontSize='large' /></Typography>
        </Paper>
      </Grid>

    )
  }
  return <Grid container spacing={1} justifyContent="center">
    {leagueWinnerData && leagueWinnerData.map(year => leagueWinnerBanner(year))}
  </Grid>
}
