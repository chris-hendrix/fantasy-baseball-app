import rules from '../assets/markdown/rules.md'

const getRules = async () => {
  const file = await fetch(rules)
  const text = await file.text()
  return text
}

const ruleService = { getRules }
export default ruleService