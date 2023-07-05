const Movie = require('../models/movie');

const { STATUS_CREATED } = require('../config');
const ForbiddenError = require('../errors/forbiddenError');

// возвращает все сохранённые текущим пользователем фильмы
const getSavedMovies = (req, res, next) => {
  const user = req.user._id;
  Movie.find({ owner: user })
    .then((movies) => {
      res.send({ data: movies });
    })
    .catch(next);
};

/*
создаёт фильм с переданными в теле country, director, duration, year,
description, image, trailer, nameRU, nameEN и thumbnail, movieId
*/
const createMovie = (req, res, next) => {
  const ownerId = req.user._id;
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner: ownerId,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => res.status(STATUS_CREATED).send({ data: movie }))
    .catch(next);
};

// DELETE /movies/_id удаляет фильм по _id
const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail()
    .then((movie) => {
      Movie.deleteOne({ _id: movie._id, owner: req.user._id })
        .then((result) => {
          if (result.deletedCount === 0) {
            throw new ForbiddenError('Данный фильм принадлежит другому пользователю');
          } else {
            res.send({ message: 'Фильм удален успешно' });
          }
        })
        .catch(next);
    })
    .catch(next);
};

module.exports = {
  getSavedMovies,
  createMovie,
  deleteMovie,
};
