const { PORT = 3000 } = process.env;
const { DATABASE_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;

const STATUS_CREATED = 201;
const STATUS_BAD_REQUEST = 400;
const STATUS_UNAUTHORIZED = 401;
const STATUS_FORBIDDEN_ERROR = 403;
const STATUS_NOT_FOUND = 404;
const STATUS_CONFLICT_ERROR = 409;
const STATUS_INTERNAL_SERVER_ERROR = 500;
const DEFAULT_ERROR_MESSAGE = 'На сервере произошла ошибка';

const LINK_REGEX = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,}\.[a-zA-Z0-9()]+\b([-a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*)?/im;
const NAME_EN_REGEX = /^[A-Za-z0-9\s\d\W]+$/im;
const NAME_RU_REGEX = /^[А-Яа-яёЁ\s\d\W]+$/im;

module.exports = {
  PORT,
  DATABASE_URL,
  STATUS_CREATED,
  STATUS_BAD_REQUEST,
  STATUS_UNAUTHORIZED,
  STATUS_FORBIDDEN_ERROR,
  STATUS_NOT_FOUND,
  STATUS_CONFLICT_ERROR,
  STATUS_INTERNAL_SERVER_ERROR,
  DEFAULT_ERROR_MESSAGE,
  LINK_REGEX,
  NAME_EN_REGEX,
  NAME_RU_REGEX,
};
