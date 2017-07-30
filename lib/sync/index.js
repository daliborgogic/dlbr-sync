'use strict'
const fs = require('fs')
const contentful = require('contentful')
const path = require('path')
const loadDb = require('./../loadDb')
const isInitial = require('./isInitial')
const syncFromContentFul = require('./syncFromContentFul')
const storeSyncedData = require('./storeSyncedData')

function initConfig () {
  const basePath = fs.realpathSync('./')
  const dbPath = `${basePath}/db.json`

  return {
    config: {
      dbPath: dbPath,
      contentfulSpace: process.env.CONTENTFUL_SPACE,
      contentfulApiKey: process.env.CONTENTFUL_DELIVERY_ACCESS_TOKEN,
      initialSync: process.env.CONTENTFUL_INITIAL_SYNC || false
    }
  }
}

function report (e) {
  console.log(`
    ${e.config.initialSync ? 'Performed initial sync' : 'Performed incremental sync'}
    Synced ${e.sync.entries.length} entries
    Synced ${e.sync.assets.length} assets
    Removed ${e.sync.deletedEntries.length} entries
    Removed ${e.sync.deletedAssets.length} assets
  `)
  return e
}

module.exports = exports = function (e) {
  return Promise.resolve()
    .then(initConfig)
    .then(loadDb)
    .then(isInitial)
    .then(syncFromContentFul)
    .then(storeSyncedData)
    .then(report)
    .catch(err => console.error(err))
}
