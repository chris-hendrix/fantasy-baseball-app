import React from 'react'
import { useSelector } from 'react-redux'
import { List, ListItem, ListItemText, ListItemAvatar, ListItemIcon } from '@mui/material'
import { Card, CardContent, CardHeader, Typography } from '@mui/material'
import { Avatar } from '@mui/material'
import { EmojiEvents } from '@mui/icons-material'
import { RED, GREY } from '../../theme'

export default function HomePage () {
  const leagueWinnerData = useSelector(state => {
    if (!state.data.static.SeasonStats) return
    const seasonStats = state.data.static.SeasonStats.data
    return seasonStats && seasonStats.filter(row => row['playrnk'] === '1' || row['playrnk'] === '2')
  })

  const getInfo = row => {
    const { owner, wins, losses, ties } = row
    return `${owner} (${wins}-${losses}-${ties})`
  }

  const leagueWinnerCard = year => {
    const rows = leagueWinnerData.filter(row => row.year === year)
    const row1 = rows.filter(row => row['playrnk'] === '1')[0]
    const row2 = rows.filter(row => row['playrnk'] === '2')[0]
    return (
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar sx={{ bgcolor: RED }} aria-label="recipe">
            {`'` + year.slice(-2)}
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={'🥇 ' + getInfo(row1)} secondary={'🥈 ' + getInfo(row2)} />
      </ListItem>
    )
  }

  const leagueWinnerList = () => {
    const years = [...new Set(leagueWinnerData.map(row => row.year))]
    return (
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {leagueWinnerData && years.map(year => leagueWinnerCard(year))}
      </List>
    )
  }
  return <div>{leagueWinnerData && leagueWinnerList()}</div>
}
