const getRules = async () => {
  const file = await fetch('rules.md')
  const text = await file.text()
  return text
}

const ruleService = { getRules }
export default ruleService