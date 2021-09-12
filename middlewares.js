const mongoose = require('mongoose');
const User = require('./models/User');
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
    return res.render('/', { message: 'Login first' });
  }
  next();
};
