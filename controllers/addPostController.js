const { addPost } = require('../data');
const generateNewKey = require('../extra/generateNewKey');

function addPostController(req, res) {
  if (req.method === 'POST') {
    let body = '';
    req.on('data', function (data) {
      body += data;
      if (body.length > 1e6) { req.connection.destroy(); }
    });

    req.on('end', function () {
      const post = JSON.parse(body);
      post.key = generateNewKey();
      addPost(post)
        .then(data => {
          res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
          res.end(JSON.stringify(data));
        });
    });

  }

}

module.exports = addPostController;