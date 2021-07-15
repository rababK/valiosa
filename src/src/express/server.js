/* eslint-disable no-unused-expressions */
/* eslint-disable standard/no-callback-literal */
/* eslint-disable handle-callback-err */
console.clear()

const
  // globals = require('../dependencies/global'),
  express = require('express'),
  app = express(),
  history = require('connect-history-api-fallback'),
  session = require('express-session'),
  throttle = require('express-throttle-bandwidth'),
  path = require('path'),
  DB = require('../database/database'),
  // kurentoApi = require('../dependencies/kurento.api'),
  // ws = require('ws'),
  // minimist = require('minimist'),
  // https = require('https'),
  // multer = require('multer'),
  http = require('http'),
  fs = require('fs-extra'),

  dashboard = require('../routes/dashboards.route'),
  pages = require('../routes/pages.route'),
  user = require('../routes/users.route'),
  courses = require('../routes/courses.route'),
  wechat = require('../routes/wechats.route'),
  contents = require('../routes/contents.route'),
  uploader = require('../routes/uploads.route'),
  instruction = require('../routes/instructions.route'),
  blog = require('../routes/blogs.route'),

  deliveryItemsBoxesOrdersTypesPatches = require('../routes/deliveryItemsBoxesOrdersTypesPatches.route'),
  rolesPermissions = require('../routes/rolesPermissions.route'),
  clientsPassengers = require('../routes/clientsPassengers.route'),
  tripsLinesPorts = require('../routes/tripsLinesPorts.route'),
  trackingCodesRfidTags = require('../routes/trackingsCodesRfidTags.route')
// io = require('socket.io')(server)
class Server {
  constructor (newConfig) {
    // var idCounter = 0
    this.config = newConfig
    this.expressServer = null
    this.db = null
    // var config = {
    //  kms_uri: 'ws://172.16.188.135:8888/kurento'
    // kms_uri: 'ws://192.168.1.103:8888/kurento'
    // }
  }

  init () {
    this.expressServer = http.Server(app)
    // file uploade
    /* var storage = multer.diskStorage({
      destination: function (req, file, cb) {
        var uploadPath = `${globals.uploadPath}/${req.query.user_id}`
        cb(null, uploadPath)
      },
      filename: function (req, file, cb) {
        cb(null, Date.now() + '_' +  file.fieldname)
      }
    })
    app.use(multer({ storage: storage }).any())
    app.use(multer({ dest: uploadFolder })) */
    // const accessTokenSecret = 'youraccesstokensecret'

    app.use(throttle(1024 * 128)) // throttling bandwidth
    app.use(history())
    app.use(express.json({ limit: '10000kb' }))
    app.use(express.urlencoded({ limit: '10000kb', extended: true }))
    app.use(function (req, res, next) {
      res.header('Access-Control-Allow-Origin', '*')
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
      // res.header('Access-Control-Allow-Credentials', 'true')
      console.log(`here here here ${req.originalUrl}`)
      next()
    })
    // express - session
    app.use(session({
      secret: 'wkfhwifiu3gr2il3ug2qw',
      resave: true,
      saveUninitialized: true
    }))
    // routes

    app.use('/blog', blog)
    app.use('/uploader', uploader)
    app.use('/contents', contents)
    app.use('/courses', courses)
    app.use('/dashboard', dashboard)
    app.use('/pages', pages)
    // user.setAccessTokenSecret(accessTokenSecret)
    app.use('/user', user)
    app.use('/wechat', wechat)
    app.use('/instruction', instruction)
    // mgdad routes temprorry
    app.use('/delivery', deliveryItemsBoxesOrdersTypesPatches)
    app.use('/role', rolesPermissions)
    app.use('/client', clientsPassengers)
    app.use('/trips'
      , tripsLinesPorts)
    app.use('/track', trackingCodesRfidTags)

    // Handle production
    // if (process.env.NODE_ENV === 'production') {

    // Static folder
    console.log(this.config.backend.projectPath)
    console.log(this.config.backend.service.server.mode)
    if (this.config.backend.service.server.mode === 'spa') {
      if (!fs.existsSync(path.join(this.config.backend.projectPath, '/../dist/spa/index.html'))) {
        console.log('Error: Could Not Find index.html')
        process.exit(1)
      }
      app.use(express.static(path.join(this.config.backend.projectPath, '/../dist/spa')))
      app.use(express.static(path.join(this.config.backend.projectPath, '/../dist/spa/assets')))
      app.use(express.static(path.join(this.config.backend.projectPath, '/../dist/spa/statics')))
      app.get(/.*/, (req, res) => res.sendFile(path.join(this.config.backend.projectPath, '/../dist/spa/index.html')))
    } else if (this.config.backend.service.server.mode === 'template') {
      if (!fs.existsSync(path.join(this.config.backend.projectPath, '/../dist/template/index.html'))) {
        console.log('Error: Could Not Find index.html')
        process.exit(1)
      }
      app.use(express.static(path.join(this.config.backend.projectPath, '/../dist/template')))
      app.use(express.static(path.join(this.config.backend.projectPath, '/../dist/template/assets')))
      app.use(express.static(path.join(this.config.backend.projectPath, '/../dist/template/statics')))
      app.use(express.static(path.join(this.config.backend.projectPath, '/../dist/template/images')))
      app.get('/', (req, res) => res.sendFile(path.join(this.config.backend.projectPath, '/../dist/template/index.html')))
    }

    // app.use(express.static(path.join(config.projectPath, '/public')))
    // Handle SPA

    this.db = new DB(this.config)
    this.db.init()
  }

  listen () {
    var port
    if (process.env.NODE_ENV === 'production') {
      port = this.config.backend.service.env.prod.port
    } else {
      port = this.config.backend.service.env.dev.port
    }
    console.log(`server port ${port}`)
    this.expressServer.listen(port)
  }
}

exports.server = Server



app.use('/assetsTraffics', assetsTraffics)
app.use('/defencesAssets', defencesAssets)
app.use('/possessions', possessions)
