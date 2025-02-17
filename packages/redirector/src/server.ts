import express, { Request, Response, NextFunction } from 'express'
import { GraphQLClient } from 'graphql-request'
import { getSdk } from './generated/sdk.admin'
import { redirectRoute } from './routes/redirect'
import { getIntEnv, getStringEnv } from './lib/env'

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason)
})

const app = express()
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack)
  res.status(500).json({ message: 'Something went wrong!' })
})

app.get(
  '/:slug',
  redirectRoute({
    sdk: getSdk(
      new GraphQLClient(getStringEnv('HASURA_GRAPHQL_URL'), {
        headers: {
          'x-hasura-admin-secret': getStringEnv('HASURA_GRAPHQL_ADMIN_SECRET'),
        },
      })
    ),
  })
)

const port = getIntEnv('PORT')
app.listen(port, () => console.log(`Listening on ${port}`))
