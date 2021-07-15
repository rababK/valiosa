var mongoose = require('mongoose')
var ObjectID = require('mongodb').ObjectID
/* required models */

var env = process.env.NODE_ENV || 'dev'

module.exports = class db {
  constructor (conf) {
    this.config = conf
    // console.log(`database config ${JSON.stringify(conf)}`)
    if (this.config.backend.database.databaseType === 'Mongo') {
      this.connectionString = 'mongodb+srv://{DBUSERNAME}:{DBPASSWORD}@{DBHOST}/{DBNAME}?retryWrites=true&w=majority'
    } else {
      // throw unimplemented
    }

    if (env === 'dev') {
      this.seed = true
      this.connectionString = `mongodb://localhost:27017/${this.config.projectName}`
    } else {
      this.connectionString.replace('{DBUSERNAME}', this.config.backend.service.env.DBUsername)
      this.connectionString.replace('{DBPASSWORD}', this.config.backend.service.env.DBPassword)
      this.connectionString.replace('{DBHOST}', this.config.backend.service.env.DBHost)
      this.connectionString.replace('{DBNAME}', this.config.backend.service.env.DBName)
    }

    this.db = null
    this.templateIds = {}
    this.ids = [
      '5daf9c0d8fbeb31a3f4e5450',
      '5daf9c0d8fbeb31a3f4e5451',
      '5daf9c0d8fbeb31a3f4e5452',
      '5daf9c0d8fbeb31a3f4e5453',
      '5daf9c0d8fbeb31a3f4e5454',
      '5daf9c0d8fbeb31a3f4e5455',
      '5daf9c0d8fbeb31a3f4e5456',
      '5daf9c0d8fbeb31a3f4e5457',
      '5daf9c0d8fbeb31a3f4e5458',
      '5daf9c0d8fbeb31a3f4e5459',
      '5daf9c0d8fbeb31a3f4e545a',
      '5daf9c0d8fbeb31a3f4e545b',
      '5daf9c0d8fbeb31a3f4e545c',
      '5daf9c0d8fbeb31a3f4e545d',
      '5daf9c0d8fbeb31a3f4e545e',
      '5daf9c0d8fbeb31a3f4e545f',
      '5daf9c0d8fbeb31a3f4e5460',
      '5daf9c0d8fbeb31a3f4e5461',
      '5daf9c0d8fbeb31a3f4e5462',
      '5daf9c0d8fbeb31a3f4e5463',
      '5daf9c0d8fbeb31a3f4e5464',
      '5daf9c0d8fbeb31a3f4e5465',
      '5daf9c0d8fbeb31a3f4e5466',
      '5daf9c0d8fbeb31a3f4e5467',
      '5daf9c0d8fbeb31a3f4e5468',
      '5daf9c0d8fbeb31a3f4e5469',
      '5daf9c0d8fbeb31a3f4e546a',
      '5daf9c0d8fbeb31a3f4e546b',
      '5daf9c0d8fbeb31a3f4e546c',
      '5daf9c0d8fbeb31a3f4e546d',
      '5daf9c0d8fbeb31a3f4e546e',
      '5daf9c0d8fbeb31a3f4e546f',
      '5daf9c0d8fbeb31a3f4e5470',
      '5daf9c0d8fbeb31a3f4e5471',
      '5daf9c0d8fbeb31a3f4e5472',
      '5daf9c0d8fbeb31a3f4e5473',
      '5daf9c0d8fbeb31a3f4e5474',
      '5daf9c0d8fbeb31a3f4e5475',
      '5daf9c0d8fbeb31a3f4e5476',
      '5daf9c0d8fbeb31a3f4e5477',
      '5daf9c0d8fbeb31a3f4e5478',
      '5daf9c0d8fbeb31a3f4e5479',
      '5daf9c0d8fbeb31a3f4e547a',
      '5daf9c0d8fbeb31a3f4e547b',
      '5daf9c0d8fbeb31a3f4e547c',
      '5daf9c0d8fbeb31a3f4e547d',
      '5daf9c0d8fbeb31a3f4e547e',
      '5daf9c0d8fbeb31a3f4e547f',
      '5daf9c0d8fbeb31a3f4e5480',
      '5daf9c0d8fbeb31a3f4e5481',
      '5daf9c0d8fbeb31a3f4e5482',
      '5daf9c0d8fbeb31a3f4e5483',
      '5daf9c0d8fbeb31a3f4e5484',
      '5daf9c0d8fbeb31a3f4e5485',
      '5daf9c0d8fbeb31a3f4e5486',
      '5daf9c0d8fbeb31a3f4e5487',
      '5daf9c0d8fbeb31a3f4e5488',
      '5daf9c0d8fbeb31a3f4e5489',
      '5daf9c0d8fbeb31a3f4e548a',
      '5daf9c0d8fbeb31a3f4e548b',
      '5daf9c0d8fbeb31a3f4e548c',
      '5daf9c0d8fbeb31a3f4e548d',
      '5daf9c0d8fbeb31a3f4e548e',
      '5daf9c0d8fbeb31a3f4e548f',
      '5daf9c0d8fbeb31a3f4e5490',
      '5daf9c0d8fbeb31a3f4e5491',
      '5daf9c0d8fbeb31a3f4e5492',
      '5daf9c0d8fbeb31a3f4e5493',
      '5daf9c0d8fbeb31a3f4e5494',
      '5daf9c0d8fbeb31a3f4e5495',
      '5daf9c0d8fbeb31a3f4e5496',
      '5daf9c0d8fbeb31a3f4e5497',
      '5daf9c0d8fbeb31a3f4e5498',
      '5daf9c0d8fbeb31a3f4e5499',
      '5daf9c0d8fbeb31a3f4e549a',
      '5daf9c0d8fbeb31a3f4e549b',
      '5daf9c0d8fbeb31a3f4e549c',
      '5daf9c0d8fbeb31a3f4e549d',
      '5daf9c0d8fbeb31a3f4e549e',
      '5daf9c0d8fbeb31a3f4e549f',
      '5daf9c0d8fbeb31a3f4e54a0',
      '5daf9c0d8fbeb31a3f4e54a1',
      '5daf9c0d8fbeb31a3f4e54a2',
      '5daf9c0d8fbeb31a3f4e54a3',
      '5daf9c0d8fbeb31a3f4e54a4',
      '5daf9c0d8fbeb31a3f4e54a5',
      '5daf9c0d8fbeb31a3f4e54a6',
      '5daf9c0d8fbeb31a3f4e54a7',
      '5daf9c0d8fbeb31a3f4e54a8',
      '5daf9c0d8fbeb31a3f4e54a9',
      '5daf9c0d8fbeb31a3f4e54aa',
      '5daf9c0d8fbeb31a3f4e54ab',
      '5daf9c0d8fbeb31a3f4e54ac',
      '5daf9c0d8fbeb31a3f4e54ad',
      '5daf9c0d8fbeb31a3f4e54ae',
      '5daf9c0d8fbeb31a3f4e54af',
      '5daf9c0d8fbeb31a3f4e54b0',
      '5daf9c0d8fbeb31a3f4e54b1',
      '5daf9c0d8fbeb31a3f4e54b2',
      '5daf9c0d8fbeb31a3f4e54b3']
    // this.connectionString = '' /* connection string */
  }

  getID (template, index) {
    return this.templateIds[template][index]
  }

  generateID (template, index) {
    var id = ObjectID(this.ids[index])
    this.templateIds[template].push(id)
    return id
  }

  async init () {
    console.log('Initalizing Database')
    console.log(this.connectionString)
    mongoose.connect(this.connectionString, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    this.db = mongoose.connection
    this.db.on('error', console.error.bind(console, 'connection error:'))
    const self = this
    this.db.once('open', async function () {
      console.log('Connection with database succeeded.')
      if (this.seed) {
        var counter = 0

        /* template definitions */

        console.log('Cleaning Database')
        await this.db.listCollections().forEach(function (collection) {
          console.log('Dropping Collection : ' + collection.name)
          self.db.collection(collection.name).drop()
        })

        console.log('Cleaning Directories')
        // fs.emptyDirSync(globals.uploadPath)
        console.log('Seeding Database\n')

        /* template seeddings */
      }
    })
  }

  async seed () {

  }
}
