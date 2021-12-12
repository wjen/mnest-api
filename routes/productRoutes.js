const express = require('express')
const router = express.Router()
const { checkPermissions } = require('../utils')
const {
  authorizePermissions,
  authenticateUser,
} = require('../middlewares/authentication')

const {
  getAllProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
} = require('../controllers/productController')

router
  .route('/')
  .get(getAllProducts)
  .post([authenticateUser, authorizePermissions('admin')], createProduct)
router
  .route('/uploadImage')
  .post([authenticateUser, authorizePermissions('admin')], uploadImage)
router
  .route('/:id')
  .get(getSingleProduct)
  .patch([authenticateUser, authorizePermissions('admin')], updateProduct)
  .delete([authenticateUser, authorizePermissions('admin')], deleteProduct)

module.exports = router
