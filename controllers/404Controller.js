function usersController(_, res) {
  res.writeHead(404, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify({ error: 'No such path' }));
}

module.exports = usersController;
