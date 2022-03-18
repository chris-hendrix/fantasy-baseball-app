import React from 'react'
import { useSelector } from 'react-redux'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import { Box } from '@mui/material'

export default function RulePage () {
  const components = {
    h1: props => <Box typography='h4'>{props.children}</Box>,
    h2: props => <Box typography='h5'>{props.children}</Box>,
    h3: props => <Box typography='h6'>{props.children}</Box>,
    li: props => <Box typography="body1"><li>{props.children}</li></Box>,
    ul: props => <Box typography="body1"><ul>{props.children}</ul></Box>,
    ol: props => <Box typography="body1"><ol>{props.children}</ol></Box>,
    p: props => <Box typography="body1" sx={{ mt: 1, mb: 1 }}>{props.children}</Box>
  }

  const rules = useSelector(state => state.rules.rules)
  return (
    <Box sx={{ textAlign: 'left' }}>
      <ReactMarkdown children={rules} components={components} />
    </Box>
  )
}
