'use strict'
const _ = require('lodash')
const writeJsonFile = require('write-json-file')

function upsertItem (db, type, item) {
  const target = _.find(db[type], {'sys': {'id': item.sys.id}})

  target
    ? _.merge(target, item)
    : db[type].push(item)
}

function upsertItems (db, type, items) {
  items.forEach(i => upsertItem(db, type, i))
}

function deleteItem (db, type, item) {
  _.remove(db[type], {'sys': {'id': item.sys.id}})
}

function deleteItems (db, type, items) {
  items.forEach(i => deleteItem(db, type, i))
}

module.exports = exports = function (e) {
  if (e.config.initialSync) {
    e.db.entries = e.sync.entries
    e.db.assets = e.sync.assets
  } else {
    upsertItems(e.db, 'entries', e.sync.entries)
    deleteItems(e.db, 'entries', e.sync.deletedEntries)
    upsertItems(e.db, 'assets', e.sync.assets)
    deleteItems(e.db, 'assets', e.sync.deletedAssets)
  }

  e.db['nextSyncToken'] = e.sync.nextSyncToken

  return writeJsonFile(e.config.dbPath, e.db).then(() => {
    e.stored = true
    return e
  })
}
