/* eslint-disable import/no-extraneous-dependencies */
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 час
  max: 100, // 100 запросов в час
});

module.exports = { limiter };
