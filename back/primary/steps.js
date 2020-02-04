module.exports = [
  {
    dateCreated: '2020-01-31',
    actions: [
      {
        action: 'removeObject',
        name: 'cards'
      },
      {
        action: 'createObject',
        name: 'cards',
        properties: [
          {
            name: 'id',
            type: 'byte',
            length: 16
          },
          {
            name: 'name',
            type: 'string',
            length: 128
          },
          {
            name: 'tags',
            type: 'object'
          },
          {
            name: 'level',
            type: 'string',
            length: 12
          },
          {
            name: 'component',
            type: 'string',
            length: 18
          },
          {
            name: 'userId',
            type: 'byte',
            length: 16
          },
          {
            name: 'meta',
            type: 'object'
          }
        ]
      },
      {
        action: 'createObject',
        name: 'users',
        properties: [
          {
            name: 'id',
            type: 'byte',
            length: 16
          },
          {
            name: 'email',
            type: 'string',
            length: 21
          },
          {
            name: 'password',
            type: 'string',
            length: 190
          },
          {
            name: 'active',
            type: 'boolean',
            default: true
          },
          {
            name: 'verificationCode',
            type: 'string',
            length: 128
          },
          {
            name: 'verified',
            type: 'boolean',
            default: false
          },
          {
            name: 'passwordResetCode',
            type: 'string',
            length: 128
          }
        ]
      }
    ]
  }
]
