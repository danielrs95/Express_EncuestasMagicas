const mongoose = require('mongoose');
const User = require('./models/User');
const Poll = require('./models/Poll');

// const User = mongoose.model('User');

// authentication middleware
exports.setUser = async (req, res, next) => {
  const userId = req.session.userId;
  if (userId) {
    const user = await User.findOne({ _id: userId });
    if (user) {
      res.locals.user = user;
    } else {
      delete req.session.userId;
    }
  }

  next();
};

exports.requireUser = (req, res, next) => {
  if (!res.locals.user) {
    // const polls = [];
    return res.render('index', {
      error: 'You cant access this route, log in first',
    });
  }
  next();
};

exports.getPolls = async (req, res) => {
  const polls = await Poll.find().populate('user');
  res.render('index', { polls });
};
