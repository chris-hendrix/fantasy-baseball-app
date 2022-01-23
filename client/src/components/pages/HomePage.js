import React from 'react'
import { useSelector } from 'react-redux'
import { Box, Grid, Paper, Typography } from '@mui/material'
import Rafters from '../Rafters'
import ownerImages from '../../assets/images/owners'
import theme from '../../theme'

export default function HomePage () {
  const leagueWinnerData = useSelector(state => {
    if (!state.data.static.SeasonStats) return
    const seasonStats = state.data.static.SeasonStats.data
    return seasonStats && seasonStats.filter(row => row['playrnk'] === '1')
  })

  const lastWinner = () => {
    if (!leagueWinnerData) return
    console.log(leagueWinnerData.slice(-1)[0])
    const { year, owner } = leagueWinnerData.slice(-1)[0]
    console.log(ownerImages)
    return { info: `${year} Champion: ${owner}`, img: ownerImages[owner] }
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Grid container rowSpacing={2} columnSpacing={2} justifyContent='center' alignItems='center'>
        <Grid item xs={12} />
        <Grid item xs={12}>
          <Rafters />
        </Grid>
        <Grid item xs={6} justifyContent='center'>
          <Typography variant="h5" align='center'>{lastWinner().info}</Typography>
          <Paper
          style={{
              borderRadius: '10%',
              backgroundImage: `url(${lastWinner().img})`,
              backgroundSize: 600,
              width: 600,
              height: 600
          }}
          >
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}
