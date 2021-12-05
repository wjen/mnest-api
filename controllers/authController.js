const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')

const login = (req, res) => {
  res.send('login')
}
const logout = (req, res) => {
  res.send('logout')
}
const register = (req, res) => {
  res.send('register')
}
module.exports = { logout, register, login }
