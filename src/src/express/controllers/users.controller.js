const User = require('../models/user.model'),
  PhoneVerification = require('../models/phoneVerification.model'),
  Notifcation = require('../models/notification.model'),
  https = require('https'),
  querystring = require('querystring'),
  { Joi } = require('express-validation')

var success, msg, result, accessTokenSecret


exports.setAccessTokenSecretValidation = {
  headers: Joi.object(),
  params: Joi.object(),
  query: Joi.object(),
  cookies: Joi.object(),
  signedCookies: Joi.object(),
  body: Joi.object(),
}


exports.setAccessTokenSecret = function (ats) {
  accessTokenSecret = ats
}

exports.getSessionValidation = {
  headers: Joi.object(),
  params: Joi.object(),
  query: Joi.object(),
  cookies: Joi.object(),
  signedCookies: Joi.object(),
  body: Joi.object(),
}


exports.getSession = function (req, res) {
  req.session.app_version = '1.0.0'
  var session = req.session
  res.json(session)
}

exports.loginValidation = {
  headers: Joi.object(),
  params: Joi.object(),
  query: Joi.object(),
  cookies: Joi.object(),
  signedCookies: Joi.object(),
  body: Joi.object(),
}
// authorize : make sure that the requesting user is authorized to access this end point
// validate : make shure that the requesting user is sending the right parameters
// call model: passing th params to the model to do the proper operations
// respond : send the response back to the server with proper status
exports.login = async function (req, res) {
  // accesss
  var result = await User.login(req.body)
  console.log(`result ${JSON.stringify(result)}`)
  // req.session.user_id = result.user_id
  // req.session.role_id = result.role_id
  // req.session.avatar_url = result.avatar_url
  // req.session.username = result.username
  res.json(result)
}

exports.doChangePasswordValidation = {
  headers: Joi.object(),
  params: Joi.object(),
  query: Joi.object(),
  cookies: Joi.object(),
  signedCookies: Joi.object(),
  body: Joi.object(),
}

exports.doChangePassword = async function (req, res) {
  success = false
  msg = '目前密码不正确'
  console.log(`doChangePassword query ${JSON.stringify(req.query)}`)
  var user = await User.findOne({ _id: req.query.user_id })
  user.password = req.query.new_password
  await user.save()
  success = true
  msg = '成功'
  res.json({ success: success, msg: msg })
}

exports.addNotificationValidation = {
  headers: Joi.object(),
  params: Joi.object(),
  query: Joi.object(),
  cookies: Joi.object(),
  signedCookies: Joi.object(),
  body: Joi.object(),
}

exports.addNotification = async function (req, res) {
  console.log(`do log in ${JSON.stringify(req.query)}`)
  result = await Notifcation.find({})
  req.session.user_id = result.user_id
  req.session.role_id = result.role_id
  req.session.avatar_url = result.avatar_url
  req.session.username = result.username
  res.json(result)
}

exports.readNotificationValidation = {
  headers: Joi.object(),
  params: Joi.object(),
  query: Joi.object(),
  cookies: Joi.object(),
  signedCookies: Joi.object(),
  body: Joi.object(),
}

exports.readNotification = async function (req, res) {
  await Notifcation.readNotification(req.query)
  res.json({ success: true })
}
exports.getAllMyNotificationsValidation = {
  headers: Joi.object(),
  params: Joi.object(),
  query: Joi.object(),
  cookies: Joi.object(),
  signedCookies: Joi.object(),
  body: Joi.object(),
}

exports.getAllMyNotifications = async function (req, res) {
  result = await Notifcation.getAllMyNotifications(req.query.user_id)
  res.json(result)
}

exports.getMyNewNotificationsValidation = {
  headers: Joi.object(),
  params: Joi.object(),
  query: Joi.object(),
  cookies: Joi.object(),
  signedCookies: Joi.object(),
  body: Joi.object(),
}

exports.getMyNewNotifications = async function (req, res) {
  result = await Notifcation.getMyNewNotifications(req.query.user_id)
  res.json(result)
}
exports.doLogoutValidation = {
  headers: Joi.object(),
  params: Joi.object(),
  query: Joi.object(),
  cookies: Joi.object(),
  signedCookies: Joi.object(),
  body: Joi.object(),
}


exports.doLogout = async function (req, res) {
  console.log('recived logout request')
  req.session.destroy()
  res.sendStatus(200)
}
exports.doVerifyNameValidation = {
  headers: Joi.object(),
  params: Joi.object(),
  query: Joi.object(),
  cookies: Joi.object(),
  signedCookies: Joi.object(),
  body: Joi.object(),
}

exports.doVerifyName = async function (req, res) {
  result = await User.verifyUsername(req.query.username)
  res.json(result)
}

exports.doSignupValidation = {
  headers: Joi.object(),
  params: Joi.object(),
  query: Joi.object(),
  cookies: Joi.object(),
  signedCookies: Joi.object(),
  body: Joi.object(),
}

exports.doSignup = async function (req, res) {
  result = await User.signup(req.query)
  res.json(result)
}

exports.doResetValidation = {
  headers: Joi.object(),
  params: Joi.object(),
  query: Joi.object(),
  cookies: Joi.object(),
  signedCookies: Joi.object(),
  body: Joi.object(),
}

exports.doReset = function (req, res) {
  res.json({})
}

exports.doVerifyPhoneValidation = {
  headers: Joi.object(),
  params: Joi.object(),
  query: Joi.object(),
  cookies: Joi.object(),
  signedCookies: Joi.object(),
  body: Joi.object(),
}

exports.doVerifyPhone = async function (req, res) {
  var result
  if (req.query.code) {
    result = await PhoneVerification.verifCode(req.query.code, req.query.phone_number)
  } else {
    result = await User.verifyPhonenumber(req.query.phone_number)
  }
  res.json(result)
}

exports.doGetAllUsersValidation = {
  headers: Joi.object(),
  params: Joi.object(),
  query: Joi.object(),
  cookies: Joi.object(),
  signedCookies: Joi.object(),
  body: Joi.object(),
}

exports.doGetAllUsers = async function (req, res) {
  var result = await User.getAllUsers(req.query)
  res.json(result)
}

exports.doSendCodeValidation = {
  headers: Joi.object(),
  params: Joi.object(),
  query: Joi.object(),
  cookies: Joi.object(),
  signedCookies: Joi.object(),
  body: Joi.object(),
}

exports.doSendCode = async function (req, res) {
  var mobileNumber = req.query.phonenumber
  console.log(`phone number is : ${mobileNumber}`)
  var code = await PhoneVerification.generateCode(mobileNumber)
  console.log(`code is : ${code}`)
  if (process.platform === 'linux') {
    var postData = querystring.stringify({
      apikey: 'c76b9b8bb2ec8fe405cecd15150d05ce',
      mobile: `${mobileNumber}`,
      text: `【大德汇】您的验证码是${code}`,
      register: 'false'
    })

    console.log(`Post Data is : ${postData}`)
    console.log('Updating...')

    var options = {
      hostname: 'sms.yunpian.com',
      port: 443,
      path: '/v2/sms/single_send.json',
      method: 'POST',
      headers: {
        Accept: 'application/json;charset=utf-8',
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        'Content-Length': Buffer.byteLength(postData)
      }
    }
    let data = ''
    var requ = https.request(options, (resp) => {
      resp.on('data', (chunk) => {
        data += chunk
        console.log(`Recived Chunk : ${chunk}`)
      })
      resp.on('end', () => {
        console.log(`final data is  ${JSON.parse(data)}`)
      })
    }).on('error', (err) => {
      console.log('Error:' + err.message)
    })
    await requ.write(postData)
    console.log('postData :')
    console.log(postData)
    console.log('data :')
    console.log(data)

    requ.end()
    res.json(JSON.parse(data))
  }
  success = true
  res.json({ msg: '发送成功', success: success })
}

exports.doGetMyPersonalInfoValidation = {
  headers: Joi.object(),
  params: Joi.object(),
  query: Joi.object(),
  cookies: Joi.object(),
  signedCookies: Joi.object(),
  body: Joi.object(),
}

exports.doGetMyPersonalInfo = async function (req, res) {
  var me = await User.findOne({ _id: req.query.user_id })
  res.json({ basicInfo: me, success: true })
}
exports.doSavePersonalInfoValidation = {
  headers: Joi.object(),
  params: Joi.object(),
  query: Joi.object(),
  cookies: Joi.object(),
  signedCookies: Joi.object(),
  body: Joi.object(),
}

exports.doSavePersonalInfo = async function (req, res) {
  await User.updateOne({ _id: req.body.info._id }, req.body.info)
  res.json({ success: true })
}
exports.doMessageUserValidation = {
  headers: Joi.object(),
  params: Joi.object(),
  query: Joi.object(),
  cookies: Joi.object(),
  signedCookies: Joi.object(),
  body: Joi.object(),
}

exports.doMessageUser = function (req, res) {
  res.json({})
}

exports.doGetMessagesValidation = {
  headers: Joi.object(),
  params: Joi.object(),
  query: Joi.object(),
  cookies: Joi.object(),
  signedCookies: Joi.object(),
  body: Joi.object(),
}

exports.doGetMessages = function (req, res) {
  res.json({})
}

exports.doGetNotificationsValidation = {
  headers: Joi.object(),
  params: Joi.object(),
  query: Joi.object(),
  cookies: Joi.object(),
  signedCookies: Joi.object(),
  body: Joi.object(),
}

exports.doGetNotifications = function (req, res) {
  res.json({})
}

exports.doGetAlertsValidation = {
  headers: Joi.object(),
  params: Joi.object(),
  query: Joi.object(),
  cookies: Joi.object(),
  signedCookies: Joi.object(),
  body: Joi.object(),
}

exports.doGetAlerts = function (req, res) {
  res.json({})
}
