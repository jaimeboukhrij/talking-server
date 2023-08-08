const { Schema, model } = require('mongoose')
const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'El email es obligatorio.'],
      unique: true,
      lowercase: true,
      trim: true
    },
    hassPassword: {
      type: String,
      required: [true, 'La contraseña es obligatoria.']
    },
    userName: {
      type: String,
      required: [true, 'El usuario es obligatorio.']
    },
    firstName: {
      type: String,
      required: [true, 'El nombre es obligatorio.']
    },
    avatar: {
      type: String,
      required: [true, 'La imagen es obligatoria.']
    },
    lastName: String,
    searchedFriends: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }],
    allFriends: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }],
    request: [{
      userReq: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      },
      dateReq: Date
    }]
  }
  ,
  {
    timestamps: true
  }
)

const User = model('User', userSchema)
module.exports = User
