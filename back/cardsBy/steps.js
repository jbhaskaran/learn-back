module.exports = [
  {
    dateCreated: '2020-01-31',
    actions: [
      {
        action: 'createObject',
        name: 'cards',
        readCapacityUnits: 10,
        writeCapacityUnits: 5,
        properties: [
          {
            name: 'partitionKey',
            type: 'string',
            key: 'partition'
          },
          {
            name: 'sortKey',
            type: 'string',
            key: 'range'
          }
        ],
        indexes: []
      }
    ]
  }
]
