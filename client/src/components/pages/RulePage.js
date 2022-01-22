import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import { Typography, List, ListItem } from '@mui/material'

export default function RulePage () {
  const markdown = `Just a link: https://reactjs.com.`

  function MarkdownParagraph (props) {
    console.log(props)
    return <Typography>{props.children}</Typography>
  }

  const renderers = {
    text: MarkdownParagraph
  }
  const components = {
    h1: props => <Typography variant='h4'>{props.children}</Typography>,
    h2: props => <Typography variant='h5'>{props.children}</Typography>,
    h3: props => <Typography variant='h6'>{props.children}</Typography>,
    li: props => <li><Typography>{props.children}</Typography></li>,
    ul: props => <ul>{props.children}</ul>,
    ol: props => <ol>{props.children}</ol>,
    p: props => <Typography>{props.children}</Typography>
  }

  const rules = useSelector(state => state.rules.rules)
  return (
    <div style={{ textAlign: 'left' }}>
      <ReactMarkdown children={rules} components={components} />
    </div>
  )
}
