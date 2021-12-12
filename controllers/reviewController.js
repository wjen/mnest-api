const User = require('../models/User')
const Product = require('../models/Product')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors/index')
const Review = require('../models/Review')
const { checkPermissions } = require('../utils')

const createReview = async (req, res) => {
  const { product: productId } = req.body
  const isValidProduct = await Product.findOne({ _id: productId })
  if (!isValidProduct) {
    throw new CustomError.NotFoundError(`No product with id: ${id}`)
  }
  const alreadySubmitted = await Review.findOne({
    product: productId,
    user: req.user.userId,
  })

  if (alreadySubmitted) {
    throw new CustomError.BadRequestError(
      'Already submitted review for this product'
    )
  }
  req.body.user = req.user.userId

  const review = await Review.create(req.body)

  res.status(StatusCodes.CREATED).json({ review })
}
const getAllReviews = async (req, res) => {
  const reviews = await Review.find({})

  res.status(StatusCodes.OK).json({ reviews, count: reviews.length })
}
const getSingleReview = async (req, res) => {
  const { id: reviewId } = req.params
  const review = await Review.findOne({ _id: reviewId })
  if (!review) {
    throw new CustomError.NotFoundError(`No product found with id: ${reviewId}`)
  }
  res.status(StatusCodes.OK).json({ review })
}
const updateReview = async (req, res) => {
  const { id: reviewId } = req.params
  const { title, rating, comment } = req.body
  const review = await Review.findOne({ _id: reviewId })
  if (!review) {
    throw new CustomError.NotFoundError(`No review with id: ${reviewId}`)
  }
  checkPermissions(req.user, review.user)
  review.title = title
  review.rating = rating
  review.comment = comment

  review.save()

  res.status(StatusCodes.OK).json({ msg: 'Review updated' })
}
const deleteReview = async (req, res) => {
  const { id: reviewId } = req.params

  const review = await Review.findOne({ _id: reviewId })
  if (!review) {
    throw new CustomError.NotFoundError(`No review with id: ${reviewId}`)
  }
  checkPermissions(req.user, review.user)
  await review.remove()
  res.status(StatusCodes.OK).json({ msg: 'Success! Review removed' })
}

module.exports = {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
}