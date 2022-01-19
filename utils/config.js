require('dotenv').config()

const PORT = process.env.PORT || 5000
const { DOC_ID } = process.env
const { NODE_ENV } = process.env
const { CLIENT_EMAIL } = process.env
const PRIVATE_KEY = process.env.PRIVATE_KEY.replace(/\\n/g, '\n')

module.exports = {
  PORT,
  DOC_ID,
  NODE_ENV,
  CLIENT_EMAIL,
  PRIVATE_KEY
}
