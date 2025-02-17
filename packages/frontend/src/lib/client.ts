import { authExchange } from '@urql/exchange-auth'
import {
  cacheExchange,
  createClient,
  fetchExchange,
  makeOperation,
  subscriptionExchange,
  SubscriptionOperation,
} from 'urql'
import { Auth0ContextInterface } from '@auth0/auth0-react'
import { Client, createClient as createWSClient } from 'graphql-ws'

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

export const getClient = (getAccessToken: Auth0ContextInterface['getAccessTokenSilently']) => {
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

  function getAccessTokenFromOperation(request: SubscriptionOperation) {
    if (
      typeof request.context.fetchOptions === 'function' ||
      !request.context.fetchOptions?.headers ||
      !('Authorization' in request.context.fetchOptions.headers)
    ) {
      return undefined
    }

    return request.context.fetchOptions.headers.Authorization.replace('Bearer ', '')
  }

  const subscriptionClient: { client: Client; accessToken?: string } = {
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
      // @ts-expect-error - this is a known issue with the types
      authExchange<string>({
        // @ts-expect-error - this is a known issue with the types
        addAuthToOperation: ({ authState, operation }) => {
          if (!authState) return operation

          const fetchOptions =
            typeof operation.context.fetchOptions === 'function'
              ? operation.context.fetchOptions()
              : operation.context.fetchOptions || {}

          // @ts-expect-error - this is a known issue with the types
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
          return error.graphQLErrors.some((e) => e.extensions?.code === 'invalid-jwt')
        },
        getAuth: async () => {
          try {
            return await getAccessToken()
          } catch (e) {
            console.error(e)
            return null
          }
        },
      }),
      fetchExchange,
      subscriptionExchange({
        forwardSubscription(request) {
          const accessToken = getAccessTokenFromOperation(request)
          if (accessToken !== subscriptionClient.accessToken) {
            subscriptionClient.accessToken = accessToken
            subscriptionClient.client.dispose()
            subscriptionClient.client = getSubscriptionClient(accessToken)
          }
          const input = { ...request, query: request.query || '' }
          return {
            subscribe: (sink) => {
              const unsubscribe = subscriptionClient.client.subscribe(input, sink)
              return { unsubscribe }
            },
          }
        },
      }),
    ],
  })
}
