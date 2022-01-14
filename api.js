// const GoogleSpreadsheet = require('google-spreadsheet');
const creds = require('./client/client_secret.json');
const dotenv = require('dotenv').config();

// https://www.npmjs.com/package/google-spreadsheet
// https://theoephraim.github.io/node-google-spreadsheet/#/
// https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication

//console.log('hello world');
//console.log(process.env.REACT_APP_CLIENT_EMAIL);
//console.log(process.env.REACT_APP_PRIVATE_KEY.replace(/\\n/g, '\n'));

const docId = '1YvznM3U5FS6SnirNS_JyLHElkD4FlqVJu_qz_-NIhWg';
const sheetNames = ['Players', 'Draft'];

async function getDataFromSheets(docId, sheetNames) {
  // get doc by docID
  const doc = new GoogleSpreadsheet.GoogleSpreadsheet(docId);
  // doc.useApiKey(process.env.REACT_APP_API_KEY);

  await doc.useServiceAccountAuth({
    client_email: process.env.REACT_APP_CLIENT_EMAIL,
    private_key: process.env.REACT_APP_PRIVATE_KEY.replace(/\\n/g, '\n'),
  });

  // load info
  await doc.loadInfo();

  console.log(doc)

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
}

getDataFromSheets(docId, [sheetNames[0]])
  .then((data) => console.log(data))
  .catch((err) => console.log(err));
