const URL = require('url');
const verifyAuth = require('./verifyAuth');

const usersController = require('./controllers/usersController');
const userController = require('./controllers/userController');
const postsController = require('./controllers/postsController');
const postController = require('./controllers/postController');
const addPostController = require('./controllers/addPostController');
const addUserController = require('./controllers/addUserController');
const { authController } = require('./controllers/authController');

const controller404 = require('./controllers/404Controller');

const routes = [
  {
    path: 'api/posts',
    auth: true,
    controller: postsController
  },
  {
    path: 'api/post/',
    auth: true,
    params: ['id'],
    controller: postController
  },
  {
    path: 'api/users',
    auth: true,
    controller: usersController
  },
  {
    path: 'api/user',
    auth: true,
    params: ['id'],
    controller: userController
  },
  {
    path: 'api/add/post',
    auth: true,
    controller: addPostController
  },
  {
    path: 'api/signup',
    controller: addUserController
  },
  {
    path: 'api/auth',
    controller: authController
  }

]

function normalizePath(path) {
  let normalized = path;
  if (normalized[path.length - 1] !== '/') { normalized = normalized + '/' }
  if (normalized[0] !== '/') { normalized = '/' + normalized }
  return normalized;
}

function router(req, res) {
  const url = URL.parse(req.url);
  const execute = {};
  for (const r of routes) {
    const actualPath = normalizePath(url.pathname);
    const routePath = normalizePath(r.path);
    if (actualPath.match(routePath) && actualPath.match(routePath).index === 0) {
      const segments = actualPath.split(routePath);
      const paramsSegment = segments[segments.length - 1];
      const paramsArray = paramsSegment.split('/').slice(0, -1);
      let actualParams;
      if (r.params) {
        if (paramsArray.length !== r.params.length) { continue; }
        actualParams = {};
        r.params.forEach((e, i) => {
          actualParams[e] = paramsArray[i]
        })
      } else {
        if (paramsArray.length) { continue; }
      }
      execute.controller = r.controller
      execute.params = actualParams;
      execute.auth = r.auth;
    }
  }
  if (execute.controller) {
    if (execute.auth) {
      const token = req.headers['authorization'];
      if (!token) {
        res.writeHead(403, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ error: 'Unauthorized. No auth token has been provided.' }));
      } else {
        if (verifyAuth(token)) {
          execute.controller(req, res, execute.params);
        } else {
          res.writeHead(403, { 'Content-Type': 'application/json; charset=utf-8' });
          res.end(JSON.stringify({ error: 'Unauthorized. No auth token has been provided.' }));
        }
      }
    } else {
      execute.controller(req, res, execute.params);
    }
  } else {
    controller404(req, res);
  }
}

module.exports = router;