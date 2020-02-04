const crypto = require('crypto')

const passwordResetsPut = async ({ name, object, store }) => {
  const storeName = 'passwordResetQueue'
  const config = await store.getConfig(storeName)
  const passwordResetCode = crypto
    .createHash('md5')
    .update(`${object.email}${Date.now()}`)
    .digest('hex')
  const sqsMessage = {
    queueName: 'PasswordResetQueue',
    passwordResetCode,
    email: object.email,
    sender: config.sender,
    template: 'passwordReset',
    url: `${config.baseUrl}passwordReset/${passwordResetCode}`
  }
  await store.add({ storeName, name, object: sqsMessage })
  object.passwordResetCode = passwordResetCode
  return true
}

module.exports = passwordResetsPut
