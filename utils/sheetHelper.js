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
  const sheetData = {}
  const sheetTitles = sheetNames || Object.keys(doc.sheetsByTitle)
  for (const sheetTitle of sheetTitles) {
    const sheet = doc.sheetsByTitle[sheetTitle]
    await sheet.loadHeaderRow()
    try {
      let rows = await sheet.getRows({ offset: 0 })
      rows = rows.map((row) => row._rawData)
      const headers = sheet.headerValues
      sheetData[sheetTitle] = { headers, rows }
    } catch (error) {
      console.log(`error for sheet ${sheetTitle}`)
      console.log(error)
    }
  }
  return sheetData
}

module.exports = { getSheetData }
