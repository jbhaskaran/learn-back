const handleCard = async ({ name, object, store }) => {
  const storeName = 'cardEditQueue'
  let id = object.id
  const updatedTime = new Date().toISOString()
  const card = await store.get({ name, id: object.id, idName: 'id', query: {} })
  if (card) {
    object.meta.updatedTime = updatedTime
    const sqsMessage = {
      queueName: 'CardEditQueue',
      objectName: name,
      id,
      updatedTime,
      deleteData: {
        prevUpdatedTime: card.meta.updatedTime,
        tags: card.tags,
        userId: card.userId,
        level: card.level,
        component: card.component
      }
    }
    await store.add({ storeName, name, object: sqsMessage })
  }
}

const cardsPut = async ({ name, object, store }) => {
  if (Array.isArray(object)) {
    for (let i in object) {
      await handleCard({ name, object: object[i], store })
    }
  } else {
    await handleCard({ name, object, store })
  }

  return true
}

module.exports = cardsPut