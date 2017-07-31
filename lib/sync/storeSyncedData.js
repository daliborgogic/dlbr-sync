'use strict'
const remove = require('lodash.remove')
const merge = require('lodash.merge')
const writeJsonFile = require('write-json-file')

function upsertItem (db, type, item) {
  // You don't (may not) need Lodash
  // const target = _.find(db[type], {'sys': {'id': item.sys.id}})
  const target = db[type].find((() => {
    return {'sys': {'id': item.sys.id}}
  }))

  target
    ? merge(target, item) // I nead _
    : db[type].push(item)
}

function upsertItems (db, type, items) {
  items.forEach(i =>
    upsertItem(db, type, i)
  )
}

function deleteItem (db, type, item) {
  // I nead _
  remove(db[type], {'sys': {'id': item.sys.id}})
}

function deleteItems (db, type, items) {
  items.forEach(i => deleteItem(db, type, i))
}

module.exports = function (e) {
  if (e.config.initialSync) {
    e.db.entries = e.sync.entries
    // e.db.assets = e.sync.assets
  } else {
    upsertItems(e.db, 'entries', e.sync.entries)
    deleteItems(e.db, 'entries', e.sync.deletedEntries)
    // upsertItems(e.db, 'assets', e.sync.assets)
    // deleteItems(e.db, 'assets', e.sync.deletedAssets)
  }

  e.db['nextSyncToken'] = e.sync.nextSyncToken

  return writeJsonFile(e.config.dbPath, e.db).then(() => {
    e.stored = true
    return e
  })
}
