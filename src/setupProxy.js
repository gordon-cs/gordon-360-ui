const proxy = require('http-proxy-middleware');

module.exports = app => {
  app.use(proxy('/api', { target: 'http://localhost:5849/', changeOrigin: true }));
  app.use(proxy('/token', { target: 'http://localhost:5849/', changeOrigin: true }));
};
