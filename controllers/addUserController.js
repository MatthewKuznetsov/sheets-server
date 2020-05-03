const jwt = require('jsonwebtoken');
const { addUser, getUserByLogin } = require('../data');
const generateNewKey = require('../extra/generateNewKey');
const { privateKey } = require('./authController')

function addUserController(req, res) {
  if (req.method === 'POST') {
    let body = '';
    req.on('data', function (data) {
      body += data;
      if (body.length > 1e6) { req.connection.destroy(); }
    });

    req.on('end', function () {
      const newUser = JSON.parse(body);
      getUserByLogin(newUser.login)
        .then(user => {
          if (user[0]) {
            res.writeHead(403, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({ error: `Unauthorized. User with login ${newUser.login} is already exist.` }));
          } else {
            newUser.key = generateNewKey();
            addUser(newUser)
              .then(user => {
                const token = jwt.sign(
                  { userKey: user.key },
                  privateKey
                )
                res.writeHead(200, {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json; charset=utf-8'
                });
                res.end(JSON.stringify(
                  {
                    key: user.key,
                    login: user.login,
                    name: user.name
                  }
                ));
              });
          }
        })
    });

  }

}

module.exports = addUserController;