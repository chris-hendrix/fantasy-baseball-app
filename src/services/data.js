import GoogleSpreadsheet from 'google-spreadsheet';

// returns sheet from a google doc
export const getDataFromSheets = async (docId, sheetNames) => {
  // get doc by docID
  const doc = new GoogleSpreadsheet.GoogleSpreadsheet(docId);

  // authenticate
  await doc.useServiceAccountAuth({
    client_email: process.env.REACT_APP_CLIENT_EMAIL,
    private_key: process.env.REACT_APP_PRIVATE_KEY.replace(/\\n/g, '\n'),
  });
  // load info
  await doc.loadInfo();

  // get sheet bdata
  const data = [];
  for (let sheetName in sheetNames) {
    let sheet = doc.sheetsByTitle[sheetName];
    await sheet.loadHeaderRow();
    let rows = await sheet.getRows({ offset: 0 });
    let headers = sheet.headerValues;
    data.append({ sheetName: { headers, rows } });
  }
  return data;
};
