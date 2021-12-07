const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')
const { isTokenValid } = require('../utils')

const authenticateUser = (req, res, next) => {
  const token = req.signedCookies.token
  if (!token) {
    throw new CustomError.UnauthenticatedError('Authentication Invalid')
  }
  try {
    const { name, userId, role } = isTokenValid({ token })
    req.user = { name, userId, role }
    console.log(req.user)
    next()
  } catch (error) {
    throw new CustomError.UnauthenticatedError('Authentication Invalid')
  }
}

const authorizePermissions = (...rest) => {
  return (req, res, next) => {
    if (!rest.includes(req.user.role)) {
      throw new CustomError.UnauthorizedError(
        'Unauthorized to access this error'
      )
    }
    next()
  }
}

module.exports = { authenticateUser, authorizePermissions }
