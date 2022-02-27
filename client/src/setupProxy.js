/*
import config from './utils/config'
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: config.BACKEND_URL,
      changeOrigin: true,
    })
  );
};

// replaces "proxy": "http://localhost:5000" in package.json
*/