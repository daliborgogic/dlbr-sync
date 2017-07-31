'use strict'
// You don't (may not) need Lodash
// const _ = require('lodash')
const contentful = require('contentful')

module.exports = function (e) {
  const options = e.config.initialSync
    ? {initial: true}
    // : {nextSyncToken: _.get(e.db, 'nextSyncToken')}
    : {nextSyncToken: e.db['nextSyncToken']}

  const client = contentful.createClient({
    space: e.config.contentfulSpace,
    accessToken: e.config.contentfulAccessToken
  })

  return client.sync(options)
    .then(response => {
      e.sync = {
        entries: response.entries,
        assets: response.assets,
        deletedEntries: response.deletedEntries || [],
        deletedAssets: response.deletedAssets || [],
        nextSyncToken: response.nextSyncToken
      }
      return e
    })
    .catch(err => console.error(err))
}
