const NotFoundError = require('./not-found')
const BadRequestError = require('./bad-request')
const CustomAPIError = require('./custom-api')
const UnauthenticatedError = require('./unauthenticated')
const UnauthorizedError = require('./unauthorized')
module.exports = {
  NotFoundError,
  BadRequestError,
  CustomAPIError,
  UnauthenticatedError,
  UnauthorizedError,
}
