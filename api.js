const config = require('./utils/config')
const sheet = require('./utils/sheet')

// https://www.npmjs.com/package/google-spreadsheet
// https://theoephraim.github.io/node-google-spreadsheet/#/
// https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication

const sheetNames = ['Draft', 'OwnerDraft', 'Players']
sheet
  .getDataFromSheets(config.DOC_ID, config.CLIENT_EMAIL, config.PRIVATE_KEY, sheetNames)
  .then(data => {
    const sheet = data[sheetNames[0]]
    console.log(`'${sheetNames[0]}' header and first row`)
    console.log(sheet.headers)
    console.log(sheet.rows[0])
  })
  .catch(err => console.log(err))
