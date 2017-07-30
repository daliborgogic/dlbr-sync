'use strict'
const _ = require('lodash')
const contentful = require('contentful')

module.exports = exports = function (e) {
  const options = e.config.initialSync
    ? {initial: true}
    : {nextSyncToken: _.get(e.db, 'nextSyncToken')}

  const client = contentful.createClient({
    space: e.config.contentfulSpace,
    accessToken: e.config.contentfulApiKey
  })

  return client.sync(options)
    .then(r => {
      e.sync = {
        entries: r.entries,
        assets: r.assets,
        deletedEntries: r.deletedEntries || [],
        deletedAssets: r.deletedAssets || [],
        nextSyncToken: r.nextSyncToken
      }
      return e
    })
}
