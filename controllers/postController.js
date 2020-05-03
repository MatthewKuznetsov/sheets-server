const { getPostById } = require('../data');

function postController(_, res, params) {
  getPostById(params.id)
    .then(data => {
      if (!data[0]) {
        res.writeHead(404, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ error: 'No such post' }));
      } else {
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify(data[0]));
      }
    });
}

module.exports = postController;