const tagsGet = async ({ context, store }) => {
  const storeName = 'cardsBy'
  const search = (context.request.query.q || '').toLowerCase()
  const name = 'cards'

  const idName = 'partitionKey'
  let id = '@tag'
  const query = {
    sortKeyFunction: 'begins_with',
    sortKeySearch: search
  }
  const result = await store.get({ storeName, name, id, idName, query })
  const cards = result.Items.map(item => {
    Object.keys(item).forEach(property => {
      item[property] = item[property].S
    })
    item.name = item.cardName
    delete item.cardName
    item.tags = JSON.parse(item.tags)
    return item
  })
  context.body = cards.map(card => {
    return {
      tag: card.sortKey
    }
  })
  return false
}

module.exports = tagsGet
