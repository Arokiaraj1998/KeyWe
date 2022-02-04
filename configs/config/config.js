const loadash = require('lodash')
require('dotenv').config();
const dbConnectionSettings = require('./db')

const env = process.env.NODE_ENV || 'local';

const envConfig = require('./' + env)

let defaultConfig = {
    env:env,
    dbSettings:dbConnectionSettings
}

module.exports = loadash.merge(defaultConfig,envConfig)