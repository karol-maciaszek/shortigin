import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
import { Auth0Provider } from '@auth0/auth0-react'
import { guessApiAddress } from './lib/client'
import { createBrowserHistory } from 'history'

const history = createBrowserHistory()
const root = document.getElementById('root')

if (!root) {
  throw new Error('No root element found')
}

createRoot(root)
  .render(
  <React.StrictMode>
    <Auth0Provider
      onRedirectCallback={(appState) => {
        history.push(
          appState && appState.returnTo
            ? appState.returnTo
            : window.location.pathname
        )
      }}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: guessApiAddress(),
      }}
      domain={process.env.REACT_APP_AUTH0_DOMAIN || ''}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID || ''}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>,
)
