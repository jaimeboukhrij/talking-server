const User = require('../models/User.model')
const bcrypt = require('bcrypt')
const saltRounds = 10
const jwt = require('jsonwebtoken')

const signup = (req, res, next) => {
  const { userName, password, email, firstName, lastName, avatar } = req.body

  User
    .findOne({ email })
    .then(response => {
      if (response != null) {
        res.status(404).json({ message: 'User already registered' })
      } else {
        const salt = bcrypt.genSaltSync(saltRounds)
        const hassPassword = bcrypt.hashSync(password, salt)
        User
          .create({ userName, hassPassword, email, firstName, lastName, avatar })
          .then(response => res.status(201).json({ message: 'User created successfully', userData: response }))
          .catch(e => next(e))
      }
    })
    .catch(e => next(e))
}

const login = (req, res, next) => {
  const { email, password } = req.body
  User
    .findOne({ email })
    .then(foundUser => {
      if (!foundUser) res.status(400).json({ message: 'Wrong email or password' })
      if (bcrypt.compareSync(password, foundUser.hassPassword)) {
        const { email, userName, firstName, lastName, avatar, _id } = foundUser
        const payload = { email, userName, firstName, lastName, avatar, _id }
        const authToken = jwt.sign(
          payload,
          process.env.TOKEN_SECRET,
          { algorithm: 'HS256', expiresIn: '6h' }
        )
        res.status(200).json({ authToken })
      } else {
        res.status(400).json({ message: 'Wrong email or password' })
      }
    })
    .catch(e => next(e))
}

const verify = (req, res, next) => res.status(200).json(req.payload)

module.exports = { signup, login, verify }
