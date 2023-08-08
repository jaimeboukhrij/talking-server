const router = require('express').Router()
const { isAuthenticated } = require('../middlewares/verifyToken.middleware')
const {
  recentsearched, searchUser, getUser, getRequest,
  editRecentSearched
} = require('../Controllers/user.controllers')

router.get('/:userId', isAuthenticated, getUser)
router.get('/recentsearched/:userId', isAuthenticated, recentsearched)
router.put('/recentsearched/:userSearchedId', isAuthenticated, editRecentSearched)
router.get('/searchuser/:queryUser', isAuthenticated, searchUser)
router.put('/request/:idUserReq', isAuthenticated, getRequest)

module.exports = router
