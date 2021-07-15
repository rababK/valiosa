const mongoose = require('mongoose'),
  Schema = mongoose.Schema, bcrypt = require('bcryptjs'),
  jwt = require('jsonwebtoken')

// phoneToken = require('generate-sms-verification-code')
// eslint-disable-next-line no-unused-vars
var success, msg

const userSchema = new Schema({
  username: { type: String, minlength: 5, index: true, unique: true, allowNull: false },
  password: { type: String, unique: true, allowNull: false },
  isNewUser: { type: Boolean, default: true },
  phoneNumber: { type: String, unique: true, allowNull: false },
  emailAddress: { type: String, unique: true, allowNull: false },
  token: { type: String },
  others: { type: Object },

  roleId: { type: String, unique: true, allowNull: false },
  permissionIds: { type: Array },

  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
  createdById: { type: String, null: false, default: 'System' },
  updatedById: { type: String, null: false, default: 'System' }
})

userSchema.pre('save', function (next) {
  var user = this
  if (user.isNewUser) {
    user.isNewUser = false
  }
  delete user.__v
  if (user.isModified('password')) {
    var SALT_WORK_FACTOR = 10
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
      if (err) return next(err)
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err)
        user.password = hash
        next()
      })
    })
  } else {
    console.log('not modified')
    return next()
  }
})
userSchema.statics.login = async function (params) {
  var user = await this.findOne({ username: params.username })

  success = false
  msg = 'wrong username or password'
  var accessToken
  if (user) {
    success = await bcrypt.compareSync(params.password, user.password)
    success ? msg = 'success' : msg = 'wrong_pass_or_user'
    accessToken = jwt.sign({ username: user.username, role: user.role }, params.accessTokenSecret)
  }
  return { success: success, msg: msg, accessToken: accessToken }
}
userSchema.statics.getUsers = async function (params) {
  var users = await this.find(params)
  return users
}

userSchema.statics.addUser = async function (params) {
  var user = await this.create(params)
  await user.save()
  return true
}

userSchema.statics.getUser = async function (userId) {
  var user = await this.findOne({ _id: userId })
  return user
}

userSchema.statics.updateUser = async function (params) {
  var id = params._id
  delete params._id
  await this.updateOne({ _id: id }, { $set: params })
  return true
}

userSchema.statics.deleteUser = async function (userId) {
  var msg = await this.deleteOne(userId)
  console.log(`deleted ${JSON.stringify(msg)}`)
  return true
}

const userModel = mongoose.model('User', userSchema)

module.exports = userModel
