const { getUserById } = require('../data');

function userController(_, res, params) {
  getUserById(params.id)
    .then(data => {
      if (!data[0]) {
        res.writeHead(404, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ error: 'No such user' }));
      } else {
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify(data[0]));
      }
    });
}

module.exports = userController;