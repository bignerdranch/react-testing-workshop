const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
  app.use(createProxyMiddleware(
    ['/api', '/ws-coffee'],
    { target: 'http://localhost:3030', changeOrigin: true, ws: true },
  ));
};
