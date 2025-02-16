import { authExchange } from '@urql/exchange-auth'
import {
  cacheExchange,
  createClient,
  fetchExchange,
  makeOperation,
  subscriptionExchange,
} from 'urql'
import { Auth0ContextInterface } from '@auth0/auth0-react'
import { createClient as createWSClient } from 'graphql-ws'

export function guessApiAddress() {
  const host = window.location.host
  if (host.toLowerCase().indexOf('localhost') > -1) {
    return 'http://localhost:4020/v1/graphql'
  } else if (host.toLowerCase().startsWith('app.')) {
    return `https://api.${host.replace(/^app\./i, '')}/v1/graphql`
  } else {
    return `https://api.${host}/v1/graphql`
  }
}

export function guessWsApiAddress() {
  return guessApiAddress().replace(/^http/, 'ws')
}

export const getClient = (
  getAccessToken: Auth0ContextInterface['getAccessTokenSilently']
) => {
  function getSubscriptionClient(accessToken?: string | null) {
    return createWSClient({
      url: guessWsApiAddress(),
      connectionParams: async () => ({
        headers: {
          ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        },
      }),
    })
  }

  const subscriptionClient = {
    client: getSubscriptionClient(undefined),
    accessToken: undefined,
  }

  return createClient({
    url: guessApiAddress(),
    fetchOptions: () => ({
      mode: 'cors',
      credentials: 'include',
      referrerPolicy: 'no-referrer-when-downgrade',
    }),
    exchanges: [
      cacheExchange,
      // @ts-ignore
      authExchange<string>({
        // @ts-ignore
        addAuthToOperation: ({ authState, operation }) => {
          // the token isn't in the auth state, return the operation without changes
          if (!authState) {
            return operation
          }

          // fetchOptions can be a function (See Client API) but you can simplify this based on usage
          const fetchOptions =
            typeof operation.context.fetchOptions === 'function'
              ? operation.context.fetchOptions()
              : operation.context.fetchOptions || {}

          // @ts-ignore
          return makeOperation(operation.kind, operation, {
            ...operation.context,
            fetchOptions: {
              ...fetchOptions,
              headers: {
                ...fetchOptions.headers,
                Authorization: `Bearer ${authState}`,
              },
              credentials: 'include',
            },
          })
        },
        didAuthError: ({ error }) => {
          return error.graphQLErrors.some(
            (e) => e.extensions?.code === 'invalid-jwt'
          )
        },
        getAuth: async ({ mutate }) => {
          try {
            return await getAccessToken()
          } catch (e) {
            return null
          }
        },
      }),
      fetchExchange,
      subscriptionExchange({
        forwardSubscription(request) {
          const accessToken =
            // @ts-ignore
            request.context.fetchOptions.headers.Authorization?.replace(
              'Bearer ',
              ''
            ) || undefined
          if (accessToken !== subscriptionClient.accessToken) {
            subscriptionClient.accessToken = accessToken
            subscriptionClient.client.dispose()
            subscriptionClient.client = getSubscriptionClient(accessToken)
          }
          const input = { ...request, query: request.query || '' }
          return {
            subscribe: (sink) => {
              const unsubscribe = subscriptionClient.client.subscribe(
                input,
                sink
              )
              return { unsubscribe }
            },
          }
        },
      }),
    ],
  })
}
