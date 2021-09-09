const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const flash = require('connect-flash');
const cookieSession = require('cookie-session');

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost:27017/encuestas',
  { useNewUrlParser: true }
);
mongoose.set('useFindAndModify', false);

const app = express();
app.set('view engine', 'pug');
app.set('views', 'views');

app.use(express.urlencoded({ extended: true }));
app.use(cookieSession({ secret: process.env.SECRET || 'secretcode' }));

app.use(flash());

app.use('/', routes);

module.exports = app;
