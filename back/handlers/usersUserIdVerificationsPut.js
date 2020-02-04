const crypto = require('crypto')

const usersUserIdVerificationsPut = async ({
  context,
  name,
  object,
  store
}) => {
  const storeName = 'emailVerificationQueue'
  const config = await store.getConfig(storeName)
  const verificationCode = crypto
    .createHash('md5')
    .update(`${context.user.email}${Date.now()}`)
    .digest('hex')
  const sqsMessage = {
    queueName: 'EmailVerificationQueue',
    verificationCode,
    email: context.user.email,
    sender: config.sender,
    template: 'emailVerification',
    url: `${config.baseUrl}verification/${verificationCode}`
  }
  await store.add({ storeName, name, object: sqsMessage })
  object.verificationCode = verificationCode
  return true
}

module.exports = usersUserIdVerificationsPut
