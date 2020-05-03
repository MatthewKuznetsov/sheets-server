const jwt = require('jsonwebtoken');
const { getUserByLogin } = require('../data');

const privateKey = 'sobaka';

function authController(req, res) {
  if (req.method === 'POST') {
    let body = '';
    req.on('data', function (data) {
      body += data;
      if (body.length > 1e6) { req.connection.destroy(); }
    });

    req.on('end', function () {
      const authData = JSON.parse(body);
      getUserByLogin(authData.login)
        .then(user => {
          if (!user[0] || user[0].password !== authData.password) {
            res.writeHead(403, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({ error: 'Unauthorized. Incorrect login or password.' }));
          } else {
            const token = jwt.sign(
              { userKey: user[0].key },
              privateKey
            )
            res.writeHead(200, {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json; charset=utf-8'
            });
            res.end(JSON.stringify(
              {
                key: user[0].key,
                login: user[0].login,
                name: user[0].name
              }
            ));
          }
        })
    });

  }

}

module.exports = {
  privateKey,
  authController
};