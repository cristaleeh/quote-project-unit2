const express = require('express');
const router = express.Router();
const User = require('../models/user.js');



router.get('/new', async (req, res) => {
  res.render('quotes/new.ejs');
});


router.post('/', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    console.log('Form submission:', req.body);

    currentUser.quotes.push({
      quote: req.body.quote,   
      author: req.body.author,
    });

    await currentUser.save();
    res.redirect(`/users/${currentUser._id}/quotes`);
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});



router.get('/', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id); 
    console.log(currentUser.quotes);
    res.render('quotes/index.ejs', {
      user: currentUser,
      quotes: currentUser.quotes,
    });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});



router.get('/:quoteId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const quote = currentUser.quotes.id(req.params.quoteId);
    res.render('quotes/show.ejs', {
      user: currentUser,
      quote: quote,
    });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});



router.get('/:quoteId/edit', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const quote = currentUser.quotes.id(req.params.quoteId);
    res.render('quotes/edit.ejs', {
      user: currentUser,
      quote: quote,
    });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});






router.put('/:quoteId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const quote = currentUser.quotes.id(req.params.quoteId);
    quote.set(req.body);
    await currentUser.save();
    res.redirect(`/users/${currentUser._id}/quotes/${req.params.quoteId}`);
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});








router.delete('/:quoteId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    currentUser.quotes.id(req.params.quoteId).deleteOne();
    await currentUser.save();
    res.redirect(`/users/${currentUser._id}/quotes`);
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});
module.exports = router;