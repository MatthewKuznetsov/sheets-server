const { getPosts } = require('../data');

function postsController(_, res) {
  getPosts()
    .then(data => {
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify(data));
    });
}

module.exports = postsController;