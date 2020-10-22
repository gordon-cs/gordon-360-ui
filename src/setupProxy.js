const proxy = require('http-proxy-middleware');

module.exports = app => {
  // @PROD
  // app.use(proxy('/api', { target: 'https://360Api.gordon.edu/', changeOrigin: true }));
  // app.use(proxy('/token', { target: 'https://360Api.gordon.edu/', changeOrigin: true }));

  // @TRAIN
  app.use(proxy('/api', { target: 'http://360apitrain.gordon.edu/', changeOrigin: true }));
  app.use(proxy('/token', { target: 'http://360apitrain.gordon.edu/', changeOrigin: true }));
};
