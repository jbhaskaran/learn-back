const handleCard = async ({ name, object, store }) => {
  const storeName = 'cardEditQueue'
  const id = object.id.value
  const updatedTime = new Date().toISOString()
  object.meta.updatedTime = updatedTime
  const sqsMessage = {
    queueName: 'CardEditQueue',
    objectName: name,
    id,
    updatedTime,
    deleteData: false
  }
  await store.add({ storeName, name, object: sqsMessage })
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
