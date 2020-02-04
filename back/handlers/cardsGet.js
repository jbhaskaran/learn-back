const cardsGet = async ({ context, name, store }) => {
  const storeName = 'cardsBy'
  const query = context.request.query
  const tagName = query.tag
  const userId = query.userId
  const type = query.type || ''

  if (tagName) {
    const idName = 'partitionKey'
    const lowerCaseTagName = tagName.toLowerCase()
    let id = `@tag-${lowerCaseTagName}`
    if (id === '@tag-@latest') {
      id = lowerCaseTagName
    }
    if (type === '@user') {
      id = `@user-${lowerCaseTagName}-${userId}`
    } else if (type === '@type') {
      id = `@type-${tagName}`
    }
    const result = await store.get({ storeName, name, id, idName, query: {} })
    const cards = result.Items.map(item => {
      Object.keys(item).forEach(property => {
        item[property] = item[property].S
      })
      item.name = item.cardName
      delete item.cardName
      item.tags = JSON.parse(item.tags)
      return item
    })
    context.body = cards
    return false
  }

  return true
}

module.exports = cardsGet
