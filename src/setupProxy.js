const proxy = require('http-proxy-middleware');

module.exports = app => {
  app.use(proxy('/api', { target: 'https://360Api.gordon.edu/', changeOrigin: true }));
  app.use(proxy('/token', { target: 'https://360Api.gordon.edu/', changeOrigin: true }));
};
