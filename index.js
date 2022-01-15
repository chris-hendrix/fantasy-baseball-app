const express = require('express')
require('express-async-errors')
const app = express()
const http = require('http');
const cors = require('cors')

const logger = require('./utils/logger');
const config = require('./utils/config')
const sheetRouter = require('./routes/sheets');

app.use(cors())
app.use(express.static('build'))
app.use(express.json())

const server = http.createServer(app);

app.use('/api/sheets', sheetRouter)

server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}, NODE_ENV=${config.NODE_ENV}`)
})
