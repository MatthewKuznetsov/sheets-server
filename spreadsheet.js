const GoogleSpreadsheet = require('google-spreadsheet');
const { promisify } = require('util');

const credentials = require('./client_secret.json');
if (!credentials) {
  console.error('No credentials were provided.');
}
const sheetID = '1hXIfMYdXVOHQUYLANCk3Uzi7V0UXvmxy-Uf5aJYgyWM';

async function accessSpreadsheet() {
  const doc = new GoogleSpreadsheet(sheetID);
  await promisify(doc.useServiceAccountAuth)(credentials);
  return await promisify(doc.getInfo)();
}

module.exports = accessSpreadsheet;