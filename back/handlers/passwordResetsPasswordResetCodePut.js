const { sign } = require('@glueit/back/src/jwt')

const passwordResetsPasswordResetCodePut = async ({
  context,
  name,
  object,
  store
}) => {
  const { passwordResetCode } = context.request.params
  if (!passwordResetCode) {
    context.status = 401
    return false
  }
  const query = { passwordResetCode }
  const users = await store.get({ name, query })
  const user = users[0]

  if (user) {
    const { email } = user
    context.status = 200
    context.body = {
      token: sign({ email }),
      user: { email: user.email, verified: user.verified, id: user.id }
    }
    object.passwordResetCode = ''
    return true
  } else {
    context.status = 401
    return false
  }
}

module.exports = passwordResetsPasswordResetCodePut
