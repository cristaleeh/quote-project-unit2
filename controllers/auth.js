const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const bcrypt = require('bcrypt');






router.get('/sign-up', async (req, res) => {
  res.render('auth/sign-up.ejs');

});





router.post('/sign-up', async (req,res) => {
  if (req.body.password !== req.body.confirmPassword) {
    res.send("Passwords must match");
    return;
  }
  const hashedPassword = await bcrypt.hashSync(req.body.password, 10);
  req.body.password = hashedPassword;
  delete req.body.confirmPassword;
  const user = await User.create(req.body);
  res.send(`Welcome ${user.username}!`);
});





module.exports = router;