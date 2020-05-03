const http = require('http');
const router = require('./router');
const PORT = 8080;

http.createServer((req, res) => {
  console.log(req.url);
  if (req.method === 'OPTIONS') {
    res.writeHead(200, {
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Origin': '*'
    })
    res.end();
  } else {
    res.setHeader('Access-Control-Expose-Headers', [
      'Access-Control-Allow-Origin',
      'Authorization'
    ]);
    res.setHeader('Access-Control-Allow-Origin', '*');
    router(req, res);
  }
}).listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
})
