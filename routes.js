const express = require('express');
const router = express.Router();
const middlewares = require('./middlewares');
const userController = require('./controllers/userController');
const pollController = require('./controllers/pollController');

router.use(middlewares.setUser);

// Rutas para manejo de la sesion del usuario
router.post('/login', middlewares.getPolls, userController.login);
router.post('/register', userController.register);
router.get('/logout', userController.logout);

// Rutas para las polls
// router.get('/newPoll', middlewares.requireUser, pollController.newPoll);
router.post('/newPoll', pollController.createPoll);
router.get('/polls/:id', middlewares.requireUser, pollController.getPollById);
router.get(
  '/polls/:id/delete',
  middlewares.requireUser,
  pollController.deletePoll
);
router.get('/polls/:id/vote', pollController.votePoll);
router.post('/polls/:id/vote', pollController.postVote);
router.get('/', pollController.getPolls);

module.exports = router;
