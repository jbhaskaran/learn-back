const integrationsFacebookPost = async ({
  context,
  name,
  object,
  store
}) => {
  const { email } = object
  if (!email) {
    context.status = 401
    return false
  }
  const query = { email }
  const users = await store.get({ name, query })
  const user = users[0]
  if (user) {
    context.status = 200
    context.body = {
      user: { email: user.email, verified: user.verified, id: user.id }
    }
  } else {
    object.verified = true
    console.log(object)
    await store.add({ name, object })
  }
  return false
}

module.exports = integrationsFacebookPost
