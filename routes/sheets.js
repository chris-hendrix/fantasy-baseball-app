const sheetRouter = require('express').Router()
const config = require('../utils/config')
const sheetHelper = require('../utils/sheetHelper')
const tableHelper = require('../utils/tableHelper')

sheetRouter.get('/', async (req, res) => {
  const {headers, rows} = await sheetHelper.getSheetData(config.DOC_ID, config.CLIENT_EMAIL, config.PRIVATE_KEY)
  const tableData = tableHelper.getTableData(headers, rows)
  res.status(200).json(tableData)
})

sheetRouter.get('/draft', async (req, res) => {
  const sheetNames = ['Draft', 'OwnerDraft', 'Players']
  const sheetData = await sheetHelper.getSheetData(
    config.DOC_ID,
    config.CLIENT_EMAIL,
    config.PRIVATE_KEY,
    sheetNames
  )
  const tableData = tableHelper.getTableData(sheetData)
  res.status(200).json(tableData)
})

sheetRouter.get('/static', async (req, res) => {
  const sheetNames = ['Owners', 'Keepers', 'SeasonStats', 'DraftHistory', 'KeeperHistory']
  const sheetData = await sheetHelper.getSheetData(
    config.DOC_ID,
    config.CLIENT_EMAIL,
    config.PRIVATE_KEY,
    sheetNames
  )
  const tableData = tableHelper.getTableData(sheetData)
  res.status(200).json(tableData)
})

module.exports = sheetRouter
