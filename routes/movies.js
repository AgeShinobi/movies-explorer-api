/* eslint-disable import/no-extraneous-dependencies */
const router = require('express').Router();
const { Joi, celebrate } = require('celebrate');
const { LINK_REGEX, NAME_RU_REGEX, NAME_EN_REGEX } = require('../config');

// Controllers
const {
  getSavedMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

// возвращает все сохранённые текущим пользователем фильмы
router.get('/', getSavedMovies);

/*
создаёт фильм с переданными в теле country, director, duration, year,
description, image, trailer, nameRU, nameEN и thumbnail, movieId
*/
router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().regex(LINK_REGEX),
    trailerLink: Joi.string().required().regex(LINK_REGEX),
    thumbnail: Joi.string().required().regex(LINK_REGEX),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required().regex(NAME_RU_REGEX),
    nameEN: Joi.string().required().regex(NAME_EN_REGEX),
  }),
}), createMovie);

// Delete card
router.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().hex().length(24),
  }),
}), deleteMovie);

module.exports = router;
