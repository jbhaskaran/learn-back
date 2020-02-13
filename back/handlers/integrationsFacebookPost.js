const integrationsFacebookPost = async ({
  context,
  name,
  object,
  store
}) => {
  const { id, email } = object
  const provider = 'FACEBOOK'
  if (!email) {
    context.status = 401
    return false
  }
  const query = { email, provider }
  const users = await store.get({ name, query })
  const user = users[0]
  if (user) {
    context.status = 200
    context.body = {
      user: { email: user.email, id: user.id, provider: user.provider }
    }
  } else {
    object.provider = provider
    await store.add({ name, object })
    context.status = 201
    context.body = {
      user: { email, id, provider }
    }
  }
  return false
}

module.exports = integrationsFacebookPost
