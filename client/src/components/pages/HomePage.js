import React from 'react'
import { useSelector } from 'react-redux'
import { Box, Grid, Paper, Typography } from '@mui/material'
import theme from '../../theme'

export default function HomePage () {
  const leagueWinnerData = useSelector(state => {
    if (!state.data.static.SeasonStats) return
    const seasonStats = state.data.static.SeasonStats.data
    return seasonStats && seasonStats.filter(row => row['playrnk'] === '1')
  })

  const lastWinner = () => {
    console.log(leagueWinnerData.slice(-1)[0])
    const { year, owner } = leagueWinnerData.slice(-1)[0]
    return `${year} Champion: ${owner}`
  }

  const leagueWinnerBanner = row => {
    const { year, owner, wins, losses, ties } = row
    const record = `${wins}-${losses}-${ties}`

    return (
      <Grid item xl={6}>
        <Paper
          variant='outlined'
          elevation={24}
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
          <Typography variant='h6' align='center'>League Champ</Typography>
        </Paper>
      </Grid>

    )
  }
  const bannerGrid = () => (
    <Grid container spacing={2} justifyContent="center">
      {leagueWinnerData && leagueWinnerData.map(year => leagueWinnerBanner(year))}
    </Grid>
  )

  const leagueWinnerList = () => {
    return (
      <Box sx={{ width: '100%' }}>
        <Typography variant="h4" align="center" style={{ marginBottom: 0 }}>MIT Baseball Class of 2012</Typography>
        <Typography variant="h6" align="center">Fantasy Baseball League</Typography>

        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            <Typography variant="h5">{lastWinner()}</Typography>
            <img alt='champ.jpg' src='img/champ.jpg' width='80%' />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h5">Links</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5" align="center">Champions</Typography>
            {bannerGrid()}
          </Grid>
        </Grid>
      </Box>
    )
  }
  return <div>{leagueWinnerData && leagueWinnerList()}</div>
}
