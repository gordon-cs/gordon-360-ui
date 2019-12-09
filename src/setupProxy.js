const proxy = require('http-proxy-middleware');

module.exports = app => {
  app.use(proxy('/api', { target: 'http://localhost:7777/', changeOrigin: true }));
  app.use(proxy('/token', { target: 'http://localhost:7777/', changeOrigin: true }));
};
