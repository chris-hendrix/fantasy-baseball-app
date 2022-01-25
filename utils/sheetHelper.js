const GoogleSpreadsheet = require('google-spreadsheet')

const getSheetData = async (docId, clientEmail, privateKey, sheetNames = null) => {
  // load from spreadsheet api
  const doc = new GoogleSpreadsheet.GoogleSpreadsheet(docId)
  await doc.useServiceAccountAuth({
    client_email: clientEmail,
    private_key: privateKey
  })
  await doc.loadInfo()

  // get sheet data
  const sheetTitles = sheetNames || Object.keys(doc.sheetsByTitle)
  const sheetPromises = []
  sheetTitles.forEach((sheetTitle) => {
    const sheet = doc.sheetsByTitle[sheetTitle]
    sheetPromises.push(
      sheet.loadHeaderRow()
        .then(() => sheet.getRows({ offset: 0 }))
        .then((rowObjects) => {
          /* eslint no-underscore-dangle: "off" */
          const rows = rowObjects.map((row) => row._rawData)
          return { sheetTitle, rows, headers: sheet.headerValues }
          /* eslint-enable */
        })
    )
  })
  const sheets = await Promise.all(sheetPromises)
  const sheetData = {}
  sheets.forEach((sheet) => {
    const { sheetTitle, headers, rows } = sheet
    sheetData[sheetTitle] = { headers, rows }
  })
  return sheetData
}

module.exports = { getSheetData }
