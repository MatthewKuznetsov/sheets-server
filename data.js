const { promisify } = require('util');
const accessSpreadsheet = require('./spreadsheet');

async function getUsers() {
  const spreadsheet = await accessSpreadsheet();
  const usersSheet = spreadsheet.worksheets[0];
  return promisify(usersSheet.getRows)({
    offset: 0
  });
}

async function getPosts() {
  const spreadsheet = await accessSpreadsheet();
  const postsSheet = spreadsheet.worksheets[1];
  return promisify(postsSheet.getRows)({
    offset: 0
  });
}

async function getUserById(id) {
  const spreadsheet = await accessSpreadsheet();
  const usersSheet = spreadsheet.worksheets[0];
  return promisify(usersSheet.getRows)({
    query: `key = ${id}`
  });
}

async function getUserByLogin(login) {
  const spreadsheet = await accessSpreadsheet();
  const usersSheet = spreadsheet.worksheets[0];
  return promisify(usersSheet.getRows)({
    query: `login = ${login}`
  });
}

async function getPostById(id) {
  const spreadsheet = await accessSpreadsheet();
  const postsSheet = spreadsheet.worksheets[1];
  return promisify(postsSheet.getRows)({
    query: `key = ${id}`
  });
}

async function addPost(post) {
  const spreadsheet = await accessSpreadsheet();
  const postsSheet = spreadsheet.worksheets[1];
  return promisify(postsSheet.addRow)(post);
}

async function addUser(user) {
  const spreadsheet = await accessSpreadsheet();
  const usersSheet = spreadsheet.worksheets[0];
  return promisify(usersSheet.addRow)(user);
}

module.exports = {
  getPosts,
  getUsers,

  getPostById,
  getUserById,
  getUserByLogin,
  
  addPost,
  addUser
}
