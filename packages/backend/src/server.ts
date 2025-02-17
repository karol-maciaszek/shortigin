import bodyParser from 'body-parser'
import express, { NextFunction, Request, Response } from 'express'
import { GraphQLClient } from 'graphql-request'
import { getSdk } from './generated/sdk.admin'
import Hashids from 'hashids'
import { shortcutValidateWebhook } from './webhooks/shortcuts/validate'
import { shortcutInsertWebhook } from './webhooks/shortcuts/insert'
import { getIntEnv, getStringEnv } from './lib/env'

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason)
})

const app = express()
app.use(bodyParser.json({ limit: 10 * 1024 * 1024 }))
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack)
  res.status(500).json({ message: 'Something went wrong!' })
})

app.post('/webhooks/shortcuts/validate', shortcutValidateWebhook)
app.post(
  '/webhooks/shortcuts/insert',
  shortcutInsertWebhook({
    sdk: getSdk(
      new GraphQLClient(getStringEnv('HASURA_GRAPHQL_URL'), {
        headers: {
          'x-hasura-admin-secret': getStringEnv('HASURA_GRAPHQL_ADMIN_SECRET'),
        },
      })
    ),
    hashids: new Hashids(
      getStringEnv('HASHIDS_SALT'),
      getIntEnv('HASHIDS_MIN_LENGTH'),
      getStringEnv('HASHIDS_ALPHABET')
    ),
  })
)

const port = getIntEnv('PORT')
app.listen(port, () => console.log(`Listening on ${port}`))
