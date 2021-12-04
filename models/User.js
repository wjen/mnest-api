const mongoose = require('mongoose')
const validator = require('validator')
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter a name'],
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: [true, 'Please enter an email address'],
    validate: {
      validator: validator.isEmail,
      message: 'Please provide a valid email',
    },
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    minlength: 6,
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
})

module.exports = mongoose.model('User', UserSchema)
