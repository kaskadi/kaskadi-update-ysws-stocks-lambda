const AWS = require('aws-sdk')
const lambda = new aws.Lambda({
  region: 'eu-central-1'
})
const WemaloClient = require('wemalo-api-wrapper')
const client = new WemaloClient({token: process.env.WEMALO_TOKEN})

module.exports.handler = async (event) => {
  const yswsStockData = await client.availableStock(new Date(parseInt(process.env.LAST_UPDATED)))
  process.env.LAST_UPDATED = Date.now().toString()
  const stocks = yswsStockData.articles.map(article => {
    return {
      id: article.externalId,
      quantity: article.quantity
    }
  })
  // TODO: call lambda to update stocks
}