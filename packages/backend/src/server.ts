import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import {shortcutInsertWebhook} from "./webhooks/shortcuts";
import {GraphQLClient} from "graphql-request";
import {getSdk} from "./generated/sdk.admin";
import Hashids from "hashids";

const app = express()
app.use(bodyParser.json({ limit: 10 * 1024 * 1024 }))
app.use(
  cors({
    origin: ['http://localhost:4030'],
  })
)

if (!process.env.HASURA_GRAPHQL_URL)
  throw new Error(
    'You need to provide HASURA_GRAPHQL_URL environment variable'
  )

if (!process.env.HASURA_GRAPHQL_ADMIN_SECRET)
  throw new Error(
    'You need to provide HASURA_GRAPHQL_ADMIN_SECRET environment variable'
  )

app.post('/webhooks/shortcuts/insert', shortcutInsertWebhook({
  sdk: getSdk(new GraphQLClient(process.env.HASURA_GRAPHQL_URL, {
    headers: {
      'x-hasura-admin-secret': process.env.HASURA_GRAPHQL_ADMIN_SECRET,
    },
  })),
  hashids: new Hashids('Deep Shortigin', 6, 'fso6VSiWwZdlx0uhPRXBHQ1mA5zacOJMLvjFIqGbn2r3YtgNC4K9Uk8eEyTD7p')
}))

app.listen(process.env.PORT, () => console.log(`Listening on ${process.env.PORT}`))
