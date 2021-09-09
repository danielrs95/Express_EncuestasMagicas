const User = require('./models/User');
const Poll = require('./models/Poll');
const express = require('express');
const router = express.Router();
const middlewares = require('./middlewares');

router.use(middlewares.setUser);

router.get('/login', (req, res) => {
  res.render('index');
});

router.post('/login', async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  // console.log(email, password);

  try {
    const user = await User.authenticate(email, password);
    if (user) {
      req.session.userId = user._id; // acá guardamos el id en la sesión
      res.redirect('/');
      // res.render('index', { success: `Welcome back ${user.name}` });
    } else {
      console.log('error');
      res.render('index', {
        error: 'Email or Password wrong, try again',
      });
    }
  } catch (e) {
    return next(e);
  }
});

router.get('/logout', (req, res) => {
  res.session = null;
  res.clearCookie('express:sess');
  res.clearCookie('express:sess.sig');
  res.redirect('/');
  // res.render('logout');
});

router.get('/register', (req, res) => {
  res.render('index');
});

router.post('/register', async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  console.log(email, password);

  const data = {
    name: name,
    email: email,
    password: password,
  };

  try {
    const user = await User.create(data);
    req.session.userId = user._id;
    res.redirect('/');
  } catch (e) {
    // console.log(e)
    res.render('index', {
      error: 'This email is already registered',
    });
  }
});

router.get('/', async (req, res, next) => {
  try {
    const polls = await Poll.find().populate('User');
    res.render('index', { polls: polls });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
