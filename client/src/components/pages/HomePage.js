import React from 'react'
import {useSelector} from 'react-redux'
import {List, ListItem, ListItemText, ListItemIcon} from '@mui/material'
import {Card, CardContent, CardHeader, Typography} from '@mui/material'
import {Avatar} from '@mui/material'
import {EmojiEvents} from '@mui/icons-material'

export default function HomePage() {
  const leagueWinnerData = useSelector(state => {
    const seasonStats = state.data.static.SeasonStats.data
    return seasonStats && seasonStats.filter(row => row['playrnk'] === '1')
  })

  const leagueWinnerCard = row => {
    const {year, owner, wins, losses, ties} = row
    const info = `${owner} (${wins}-${losses}-${ties})`
    return (
      <Card sx={{minWidth: 275, maxWidth: 345}}>
        <CardHeader
          avatar={<Avatar aria-label="recipe"><EmojiEvents/></Avatar>}
          title={year}
        />
        <CardContent>
          <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
            Word of the Day
          </Typography>
          <Typography variant="h5" component="div">
            Test
          </Typography>
          <Typography sx={{mb: 1.5}} color="text.secondary">
            adjective
          </Typography>
          <Typography variant="body2">
            well meaning and kindly.
            <br />
            {'"a benevolent smile"'}
          </Typography>
        </CardContent>
      </Card>
    )
  }

  const leagueWinnerList = () => (
    <List dense={true}>
      {leagueWinnerData.map(row => leagueWinnerCard(row))}
    </List>
  )
  return <div>{leagueWinnerData && leagueWinnerList()}</div>
}
