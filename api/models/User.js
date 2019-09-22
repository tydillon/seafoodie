const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

//creating the schema for a restaurant
const UserSchema = mongoose.Schema({
  username: {
    type: String,
    require: true,
    unique: true
  },
  password: {
    type: String,
    require: true
  }
})

UserSchema.methods = {
  checkPassword: function(inputPassword) {
    return bcrypt.compareSync(inputPassword, this.password)
  },
  hashPassword: plainTextPassword => {
    return bcrypt.hashSync(plainTextPassword, 10)
  }
}

UserSchema.pre('save', function(next) {
  if (!this.password) {
    console.log('models/User.js --- No password provided ---')
    next()
  } else {
    console.log('models/User.js hashPassword in presave')
    this.password = this.hashPassword(this.password)
    next()
  }
})
//assigning the schema to the mongoose model
const User = mongoose.model('User', UserSchema)

module.exports = User
