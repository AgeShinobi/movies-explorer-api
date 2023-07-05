/* eslint-disable import/no-extraneous-dependencies */
// Packages
const router = require('express').Router();
const { Joi, celebrate } = require('celebrate');

// Controllers
const { signUp } = require('../controllers/users');

// Routes
router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), signUp);

module.exports = router;
