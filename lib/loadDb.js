'use strict'
const fs = require('fs')

module.exports = function (e) {
  e.db = fs.existsSync(e.config.dbPath)
    ? require(e.config.dbPath)
    : {}
  return e
}
