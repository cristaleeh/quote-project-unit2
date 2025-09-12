const mongoose = require('mongoose');


const quoteSchema = new mongoose.Schema({
  quote: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
});


const userSchema = new mongoose.Schema ({
  username: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  quotes: [quoteSchema],
});

const User = mongoose.model('User', userSchema);
module.exports = User;