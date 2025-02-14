import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import {shortcutCreatorAction} from "./actions/shortcuts";
import {GraphQLClient} from "graphql-request";

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

const sdk = new GraphQLClient(process.env.HASURA_GRAPHQL_URL, {
  headers: {
    'x-hasura-admin-secret': process.env.HASURA_GRAPHQL_ADMIN_SECRET,
  },
})

app.post('/actions/shortcuts/create', shortcutCreatorAction({ sdk }))

app.listen(process.env.PORT, () => console.log(`Listening on ${process.env.PORT}`))
