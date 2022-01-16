const config = require('./utils/config')
const sheetHelper = require('./utils/sheetHelper')
const tableHelper = require('./utils/tableHelper')

// https://www.npmjs.com/package/google-spreadsheet
// https://theoephraim.github.io/node-google-spreadsheet/#/
// https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication

const sheetNames = ['Draft']
sheetHelper
  .getSheetData(config.DOC_ID, config.CLIENT_EMAIL, config.PRIVATE_KEY, sheetNames)
  .then(sheetData => {
    const {headers, rows} = sheetData[sheetNames[0]]
    console.log(`'${sheetNames[0]}' header and first row`)
    const {columns, data} = tableHelper.getTableData(headers, rows)
    console.log(columns)
    console.log(data[0])
  })
  .catch(err => console.log(err))
