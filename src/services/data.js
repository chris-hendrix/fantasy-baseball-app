import GoogleSpreadsheet from 'google-spreadsheet';

export const getDataFromSheets = async (docId, sheetNames) => {
  // get doc by docID
  const doc = new GoogleSpreadsheet.GoogleSpreadsheet(docId);
  // doc.useApiKey(process.env.REACT_APP_API_KEY);
  await doc.useServiceAccountAuth({
    client_email: process.env.REACT_APP_CLIENT_EMAIL,
    private_key: process.env.REACT_APP_PRIVATE_KEY.replace(/\\n/g, '\n'),
  });

  // load info
  await doc.loadInfo();

  //console.log(doc.sheetsByTitle);

  // get sheet data
  const data = [];
  console.log(sheetNames);
  for (const sheetName of sheetNames) {
    console.log(sheetName);
    let sheet = doc.sheetsByTitle[sheetName];
    await sheet.loadHeaderRow();
    let rows = await sheet.getRows({ offset: 0 });
    let headers = sheet.headerValues;
    data.push({ sheetName: { headers, rows } });
  }
  return data;
};
