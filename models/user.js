/* eslint-disable import/no-extraneous-dependencies */
const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');
const bcrypt = require('bcryptjs');

// Config
const {
  VALIDATION_MESSAGE_EMAIL,
  AUTHORIZATION_ERROR_MESSAGE,
} = require('../config');

const AuthorizationError = require('../errors/authorizationError');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => isEmail(v),
      message: VALIDATION_MESSAGE_EMAIL,
    },
  },
  password: {
    type: String,
    require: true,
    select: false,
  },
  name: {
    type: String,
    require: true,
    minlength: 2,
    maxlength: 30,
  },
}, {
  versionKey: false,
  statics: {
    findUserByCredentials(email, password) {
      // Ищем пользователя по почте
      return this.findOne({ email }).select('+password')
        .then((user) => {
          // Не нашелся - отклоняем запрос
          if (!user) {
            throw new AuthorizationError(AUTHORIZATION_ERROR_MESSAGE);
          }
          return bcrypt.compare(password, user.password)
            .then((matched) => {
              if (!matched) {
                throw new AuthorizationError(AUTHORIZATION_ERROR_MESSAGE);
              }
              return user;
            });
        });
    },
  },
});

module.exports = mongoose.model('user', userSchema);
