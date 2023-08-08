const User = require('../models/User.model')

const recentsearched = (req, res, next) => {
  const { userId } = req.params
  User
    .findById(userId)
    .populate('searchedFriends')
    .exec()
    .then(userFound => {
      res.status(202).json(userFound)
    })
    .catch(e => next(e))
}

const searchUser = (req, res, next) => {
  const { queryUser } = req.params
  User
    .find()
    .then(usersFound => {
      if (usersFound.length === 0) { res.status(404).json({ message: 'User not found' }) } else {
        const filterUser = usersFound.filter((user) => user.userName.toLowerCase().includes(queryUser.toLowerCase()))
        res.status(202).json(filterUser)
      }
    })
    .catch(e => next(e))
}

const editRecentSearched = (req, res, next) => {
  const { _id: idUser } = req.payload
  const { userSearchedId } = req.params
  User
    .findById(idUser)
    .then(userFound => {
      let newData = []
      if (userFound.searchedFriends.includes(userSearchedId)) {
        const deleteUser = userFound.searchedFriends.filter(elem => elem._id.toString() !== userSearchedId)
        deleteUser.unshift(userSearchedId)
        deleteUser.length > 4 && deleteUser.pop()
        newData = [...deleteUser]
      } else {
        userFound.searchedFriends.unshift(userSearchedId)
        userFound.searchedFriends.length > 4 && userFound.searchedFriends.pop()
        newData = [...userFound.searchedFriends]
      }
      User.findByIdAndUpdate(idUser, { searchedFriends: newData }).then(user => res.json(user)).catch(e => next(e))
    })
    .catch(e => next(e))
}

const getUser = (req, res, next) => {
  const { userId } = req.params
  User.findById(userId).then(user => res.status(202).json(user)).catch(e => next(e))
}

const getRequest = (req, res, next) => {
  const { idUserReq } = req.params
  const { _id: idUser } = req.payload
  User
    .findById(idUserReq)
    .then(userFound => {
      let newData
      if (userFound.request.some(elem => elem.userReq.toString() === idUser)) {
        newData = userFound.request.filter(elem => elem.userReq.toString() !== idUser)
      } else {
        newData = [...userFound.request, { userReq: idUser, dateReq: new Date() }]
      }
      User.findByIdAndUpdate(idUserReq, { request: newData }).then(user => res.json(user)).catch(e => next(e))
    })
    .catch(e => next(e))
}

module.exports = { recentsearched, searchUser, getUser, getRequest, editRecentSearched }
