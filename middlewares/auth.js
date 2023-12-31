/* eslint-disable import/no-extraneous-dependencies */
const jwt = require('jsonwebtoken');
const AuthorizationError = require('../errors/authorizationError');

const { NODE_ENV, JWT_SECRET } = process.env;

// eslint-disable-next-line consistent-return
const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new AuthorizationError('Ошибка авторизации'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret-key');
  } catch (e) {
    return next(new AuthorizationError('Ошибка авторизации'));
  }

  req.user = payload;
  return next();
};

module.exports = auth;
