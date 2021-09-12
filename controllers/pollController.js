const mongoose = require('mongoose');
const Poll = require('../models/Poll');

exports.getPolls = async (req, res) => {
  const polls = await Poll.find().populate('user');
  // console.log(polls);
  res.render('index', { polls });
};

exports.newPoll = (req, res) => {
  res.render('newPoll');
};

exports.createPoll = async (req, res) => {
  // console.log(req.body);
  const poll = new Poll(req.body);
  poll.user = res.locals.user._id;
  try {
    await poll.save();
    res.redirect('/');
    // res.redirect(`/polls/${poll._id}/results`);
  } catch (e) {
    return next(e);
  }
};

exports.getPollById = async (req, res) => {
  const poll = await Poll.findOne({ _id: req.params.id });
  // console.log(poll);
  res.render('editPoll', { poll });
};

exports.deletePoll = async (req, res) => {
  try {
    await Poll.deleteOne({ _id: req.params.id });

    res.redirect('/')
    res.status(204).send({});
  } catch (e) {
    return next(e);
  }
};

exports.votePoll = async (req, res) => {
  const poll = await Poll.findOne({ _id: req.params.id }).populate('user');
  // console.log(poll);
  res.render('votePoll', { poll });
};

exports.postVote = async (req, res) => {
  const answer = req.body.answer;
  console.log(answer)

  const poll = await Poll.findOne({ _id: req.params.id });
  poll.options[answer].votes += 1;
  await poll.save();
  console.log(poll)
  res.render('pollResults', { poll });
  // res.redirect(`/polls/${poll._id}/results`);
};