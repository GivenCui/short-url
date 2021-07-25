const serverless = require('serverless-http')

const app = require('./app.js')

exports.main = serverless(app)