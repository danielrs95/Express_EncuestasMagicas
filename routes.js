const express = require('express');
const router = express.Router();
const middlewares = require('./middlewares');
const userController = require('./controllers/userController');

router.use(middlewares.setUser);

// Rutas para manejo de la sesion del usuario
router.post('/login', userController.login);
router.post('/register', userController.register);
router.get('/logout', userController.logout);

router.get('/', async (req, res, next) => {
  try {
    const polls = await Poll.find().populate('User');
    res.render('index', { polls: polls });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
