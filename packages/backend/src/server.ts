import bodyParser from 'body-parser'
import express from 'express'
import {GraphQLClient} from "graphql-request";
import {getSdk} from "./generated/sdk.admin";
import Hashids from "hashids";
import {shortcutValidateWebhook} from "./webhooks/shortcuts/validate";
import {shortcutInsertWebhook} from "./webhooks/shortcuts/insert";

const app = express()
app.use(bodyParser.json({ limit: 10 * 1024 * 1024 }))

function getStringEnv(name: string): string {
  const value = process.env[name]
  if (!value) {
    throw new Error(`You need to provide ${name} environment variable`)
  }

  return value
}

function getIntEnv(name: string): number {
  const value = getStringEnv(name)
  const parsed = parseInt(value)
  if (isNaN(parsed)) {
    throw new Error(`${name} environment variable is not a number`)
  }

  return parsed
}

app.post('/webhooks/shortcuts/validate', shortcutValidateWebhook)
app.post('/webhooks/shortcuts/insert', shortcutInsertWebhook({
  sdk: getSdk(new GraphQLClient(getStringEnv('HASURA_GRAPHQL_URL'), {
    headers: {
      'x-hasura-admin-secret': getStringEnv('HASURA_GRAPHQL_ADMIN_SECRET'),
    },
  })),
  hashids: new Hashids(getStringEnv('HASHIDS_SALT'), getIntEnv('HASHIDS_MIN_LENGTH'), getStringEnv('HASHIDS_ALPHABET')),
}))

const port = getIntEnv('PORT')
app.listen(port, () => console.log(`Listening on ${port}`))
