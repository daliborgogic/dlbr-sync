'use strict'
const _ = require('lodash')

module.exports = function (e) {
  if (_.has(e.db, 'nextSyncToken') === false) {
    e.config.initialSync = true
  }
  return e
}