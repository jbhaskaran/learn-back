const crypto = require('crypto')

const usersPost = async ({ name, object, store }) => {
  const storeName = 'emailVerificationQueue'
  const config = await store.getConfig(storeName)

  const verificationCode = crypto
    .createHash('md5')
    .update(`${object.email}${Date.now()}`)
    .digest('hex')
  const sqsMessage = {
    queueName: 'EmailVerificationQueue',
    verificationCode,
    email: object.email,
    sender: config.sender,
    template: 'emailVerification',
    url: `${config.baseUrl}verification/${verificationCode}`
  }
  await store.add({ storeName, name, object: sqsMessage })
  object.verificationCode = verificationCode
  return true
}

module.exports = usersPost
