const { getUsers } = require('../data');

function usersController(_, res) {
  getUsers()
    .then(data => {
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify(data));
    });
}

module.exports = usersController;