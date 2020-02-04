const verificationsVerificationCodePut = async ({
  context,
  name,
  object,
  store
}) => {
  const { verificationCode } = context.request.params
  if (!verificationCode) {
    context.status = 401
    return false
  }
  const query = { verificationCode }
  const users = await store.get({ name, query })
  const user = users[0]

  if (user && !user.verified) {
    object.verified = true
    return true
  } else {
    context.status = 401
    return false
  }
}

module.exports = verificationsVerificationCodePut
