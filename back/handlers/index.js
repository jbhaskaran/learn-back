const usersPost = require('./usersPost')
const verificationsVerificationCodePut = require('./verificationsVerificationCodePut')
const usersUserIdVerificationsPut = require('./usersUserIdVerificationsPut')
const passwordResetsPut = require('./passwordResetsPut')
const passwordResetsPasswordResetCodePut = require('./passwordResetsPasswordResetCodePut')
const cardsPost = require('./cardsPost')
const cardsPut = require('./cardsPut')
const cardsGet = require('./cardsGet')
const tagsGet = require('./tagsGet')
const integrationsFacebookPost = require('./integrationsFacebookPost')

module.exports = {
  usersPost,
  verificationsVerificationCodePut,
  usersUserIdVerificationsPut,
  passwordResetsPut,
  passwordResetsPasswordResetCodePut,
  cardsPost,
  cardsPut,
  cardsGet,
  tagsGet,
  integrationsFacebookPost
}
