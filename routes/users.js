/* eslint-disable import/no-extraneous-dependencies */
const router = require('express').Router();
const { Joi, celebrate } = require('celebrate');

// Controllers
const {
  getMyInfo,
  updateUserInfo,
} = require('../controllers/users');

// возвращает информацию о пользователе (email и имя)
router.get('/me', getMyInfo);

// обновляет информацию о пользователе (email и имя)
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
}), updateUserInfo);

module.exports = router;
