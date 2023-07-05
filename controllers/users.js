/* eslint-disable import/no-extraneous-dependencies */
// Packages
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Models
const User = require('../models/user');

// Config
const { STATUS_CREATED } = require('../config');

const { NODE_ENV, JWT_SECRET } = process.env;

// Общий метод для поиска пользователя по ID
const findUserById = (req, res, data, next) => {
  User.findById(data)
    .orFail()
    .then((user) => res.send(user))
    .catch(next);
};

// возвращает информацию о пользователе (email и имя)
const getMyInfo = (req, res, next) => {
  const data = req.user._id;
  findUserById(req, res, data, next);
};

// создаёт пользователя с переданными в теле name, email и password
const signUp = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => {
      const data = user.toObject();
      delete data.password;
      res
        .status(STATUS_CREATED)
        .send(data);
    })
    .catch(next);
};

// обновляет информацию о пользователе (email и имя)
const updateUserInfo = (req, res, next) => {
  const id = req.user._id;
  const { name, email } = req.body;

  User.findByIdAndUpdate(
    id,
    { name, email },
    { new: true, runValidators: true },
  )
    .orFail()
    .then((user) => {
      res.send({ user });
    })
    .catch(next);
};

// проверяет переданные в теле почту и пароль и передает JWT
const signIn = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret-key',
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch(next);
};

// Exports
module.exports = {
  getMyInfo,
  updateUserInfo,
  signUp,
  signIn,
};
