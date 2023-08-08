const router = require('express').Router()

// AUTH ROUTES
router.use('/auth', require('./auth.routes'))

// UPLOAD IMGS ROUTES
router.use('/upload', require('./upload.routes'))

// USER ROUTES
router.use('/user', require('./user.routes'))

module.exports = router
