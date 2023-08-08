const router = require('express').Router()
const { signup, login, verify } = require('../Controllers/auth.controllers')
const { isAuthenticated } = require('../middlewares/verifyToken.middleware')

router.post('/signup', signup)
router.post('/login', login)
router.get('/verify', isAuthenticated, verify)

module.exports = router
