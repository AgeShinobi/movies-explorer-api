/* eslint-disable import/order */
/* eslint-disable import/no-extraneous-dependencies */
// Import Packages
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const { PORT, DATABASE_URL } = require('./config');

// Import Middlewares
const errorsCentral = require('./middlewares/errorsCentral');
const { cors } = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

// Celebrate Joi Validator Middleware
const { errors } = require('celebrate');

// Import Router
const mainRouter = require('./routes/index');

// DataBase connect
mongoose.connect(DATABASE_URL);

// App
const app = express();

app.use(requestLogger);

app.use(express.json());
app.use(cors);
app.use(mainRouter);

app.use(errorLogger);

app.use(errors());
app.use(errorsCentral);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening: PORT ${PORT}`);
});
