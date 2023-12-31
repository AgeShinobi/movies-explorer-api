/* eslint-disable import/no-extraneous-dependencies */
// Packages
const router = require('express').Router();
const { Joi, celebrate } = require('celebrate');

// Controllers
const { signIn } = require('../controllers/users');

router.post('/', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), signIn);

module.exports = router;
