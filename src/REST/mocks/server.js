const jsonServer = require('json-server');
const path = require('path');
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, './db.json'));
const routes = require('./routes');
const middlewares = jsonServer.defaults(undefined);

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// Add custom routes before JSON Server router
server.get('/echo', (req, res) => {
  res.json(req.query);
});

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);
server.use(jsonServer.rewriter(routes));

// Use middlewares loader to load custom middlewares
const normalizedPath = require('path').join(__dirname, 'middlewares');

require('fs')
  .readdirSync(normalizedPath)
  .forEach(function (file) {
    const middleware = require('./middlewares/' + file);
    server.use((...args) => {
      middleware(...args, router.db);
    });
  });

// Use default router
server.use(router);
server.listen(3001, () => {
  console.log('JSON Server is running');
});
