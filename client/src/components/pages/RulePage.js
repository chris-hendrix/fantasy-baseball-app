import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import remarkGfm from 'remark-gfm'

export default function RulePage () {
  const markdown = `Just a link: https://reactjs.com.`
  const rules = useSelector(state => state.rules)
  console.log(rules)
  return (
    <div>
      <ReactMarkdown children={markdown} remarkPlugins={[remarkGfm]} />
    </div>
  )
}
