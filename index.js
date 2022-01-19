const express = require('express')
require('express-async-errors')

const app = express()
const http = require('http')
const cors = require('cors')

const middleware = require('./utils/middleware')

const logger = require('./utils/logger')
const config = require('./utils/config')
const sheetRouter = require('./routes/sheets')

app.use(cors())
app.use(express.static('build'))
app.use(express.json())

app.use(middleware.requestLogger)

app.use('/api/sheets', sheetRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

const server = http.createServer(app)
server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}, NODE_ENV=${config.NODE_ENV}`)
})
