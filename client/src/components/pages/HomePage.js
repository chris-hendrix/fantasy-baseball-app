import React from 'react'
import { useSelector } from 'react-redux'
import { List, ListItem, ListItemText, ListItemAvatar, ListItemIcon } from '@mui/material'
import { Card, CardContent, CardHeader, Typography } from '@mui/material'
import { Avatar } from '@mui/material'
import { EmojiEvents } from '@mui/icons-material'
import { PRIMARY_COLOR, SECONDARY_COLOR } from '../../theme'

export default function HomePage() {
  const leagueWinnerData = useSelector(state => {
    if (!state.data.static.SeasonStats) return
    const seasonStats = state.data.static.SeasonStats.data
    return seasonStats && seasonStats.filter(row => row['playrnk'] === '1')
  })

  const leagueWinnerCard = row => {
    const { year, owner, wins, losses, ties } = row
    const info = `${owner} (${wins}-${losses}-${ties})`
    return (
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar sx={{ bgcolor: PRIMARY_COLOR }} aria-label="recipe">
            {`'` + year.slice(-2)}
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={'🥇 ' + info} secondary={'🥈 ' + info} />
      </ListItem>
    )
  }

  const leagueWinnerList = () => (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {leagueWinnerData && leagueWinnerData.map(row => leagueWinnerCard(row))}
    </List>
  )
  return <div>{leagueWinnerData && leagueWinnerList()}</div>
}
