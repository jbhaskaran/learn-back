const common = {
  development: {
    sender: 'no-reply@onstartgo.com',
    baseUrl: 'http://localhost/'
  },
  production: {
    sender: 'no-reply@onstartgo.com',
    baseUrl: 'https://onstartgo.com/'
  }
}

module.exports = {
  development: {
    primary: {
      adapter: 'mysql',
      config: {
        user: 'root',
        password: 'example',
        database: 'learn'
      }
    },
    cardsBy: {
      adapter: 'dynamodb',
      config: {
        region: 'localhost',
        endpoint: 'http://localhost:8000'
      },
      rangeKey: 'sortKey'
    },
    emailVerificationQueue: {
      adapter: 'sqsQueue',
      config: {
        endpoint: 'http://localhost:9324/queue/',
        queueName: 'EmailVerificationQueue',
        region: 'localhost'
      },
      sender: common.development.sender,
      baseUrl: common.development.baseUrl
    },
    passwordResetQueue: {
      adapter: 'sqsQueue',
      config: {
        endpoint: 'http://localhost:9324/queue/',
        queueName: 'PasswordResetQueue',
        region: 'localhost'
      },
      sender: common.development.sender,
      baseUrl: common.development.baseUrl
    },
    cardEditQueue: {
      adapter: 'sqsQueue',
      config: {
        endpoint: 'http://localhost:9324/queue/',
        queueName: 'CardEditQueue',
        region: 'localhost',
        delaySeconds: 0
      }
    }
  },
  production: {
    primary: {
      loader: 'awsSecrets',
      params: {
        region: 'us-west-2',
        secretName: 'BackRDSSecret'
      }
    },
    cardsBy: {
      adapter: 'dynamodb',
      config: {
        region: 'us-west-2'
      },
      rangeKey: 'sortKey'
    },
    emailVerificationQueue: {
      adapter: 'sqsQueue',
      config: {
        endpoint: 'https://sqs.us-west-2.amazonaws.com/422105039824/',
        queueName: 'EmailVerificationQueue',
        region: 'us-west-2'
      },
      sender: common.production.sender,
      baseUrl: common.production.baseUrl
    },
    passwordResetQueue: {
      adapter: 'sqsQueue',
      config: {
        endpoint: 'https://sqs.us-west-2.amazonaws.com/422105039824/',
        queueName: 'PasswordResetQueue',
        region: 'us-west-2'
      },
      sender: common.production.sender,
      baseUrl: common.production.baseUrl
    },
    cardEditQueue: {
      adapter: 'sqsQueue',
      config: {
        endpoint: 'https://sqs.us-west-2.amazonaws.com/422105039824/',
        queueName: 'CardEditQueue',
        region: 'us-west-2',
        delaySeconds: 0
      }
    }
  }
}
