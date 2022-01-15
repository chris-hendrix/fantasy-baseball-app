const sheetRouter = require('express').Router()
const config = require('../utils/config')
const sheet = require('../utils/sheet')

sheetRouter.get('/', async (req, res) => {
  const sheetData = await sheet.getDataFromSheets(config.DOC_ID, config.CLIENT_EMAIL, config.PRIVATE_KEY)
  res.status(200).json(sheetData)
})

sheetRouter.get('/draft', async (req, res) => {
  const sheetNames = ['Draft', 'OwnerDraft', 'Players']
  const sheetData = await sheet.getDataFromSheets(
    config.DOC_ID,
    config.CLIENT_EMAIL,
    config.PRIVATE_KEY,
    sheetNames
  )
  res.status(200).json(sheetData)
})

sheetRouter.get('/static', async (req, res) => {
  const sheetNames = ['Owners', 'Keepers', 'SeasonStats', 'DraftHistory', 'KeeperHistory']
  const sheetData = await sheet.getDataFromSheets(
    config.DOC_ID,
    config.CLIENT_EMAIL,
    config.PRIVATE_KEY,
    sheetNames
  )
  res.status(200).json(sheetData)
})

module.exports = sheetRouter
