const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
  // @PROD
  // app.use(
  //   '/api',
  //   createProxyMiddleware({ target: 'https://360Api.gordon.edu/', changeOrigin: true }),
  // );
  // app.use(
  //   '/token',
  //   createProxyMiddleware({ target: 'https://360Api.gordon.edu/', changeOrigin: true }),
  // );

  // @TRAIN
  app.use(
    '/api',
    createProxyMiddleware({ target: 'https://360ApiTrain.gordon.edu/', changeOrigin: true }),
  );
  app.use(
    '/token',
    createProxyMiddleware({ target: 'https://360ApiTrain.gordon.edu/', changeOrigin: true }),
  );

  // @LOCALHOST
  // app.use('/api', createProxyMiddleware({ target: 'http://localhost:2477/', changeOrigin: true }));
  // app.use('/token', createProxyMiddleware({ target: 'http://localhost:2477/', changeOrigin: true }));
};
