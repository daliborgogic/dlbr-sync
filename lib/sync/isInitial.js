'use strict'
// You don't (may not) need Lodash
// const _ = require('lodash')

module.exports = function (e) {
  //  if (_.has(e.db, 'nextSyncToken') === false) {
  if (e.db['nextSyncToken'] === undefined) {
    e.config.initialSync = true
  }
  return e
}
