import React, { useMemo } from 'react'
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom'
import { Provider as UrqlProvider } from 'urql'
import { getClient } from './lib/client'
import { NotFoundPage } from './pages/NotFoundPage'
import {HomePage} from "./pages/HomePage";
import {Frame} from "./components/Frame";
import {useAuth0, withAuthenticationRequired} from "@auth0/auth0-react";

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <Routes location={location}>
      <Route path="/" element={<Frame />}>
        <Route index element={<HomePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

function App() {
  const { getAccessTokenSilently, isLoading, error } = useAuth0()

  const client = useMemo(
    () => getClient(getAccessTokenSilently),
    [getAccessTokenSilently]
  )

  if (error) {
    return <div>Oops... {error.message}</div>
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <UrqlProvider value={client}>
      <BrowserRouter>
      <AnimatedRoutes />
      </BrowserRouter>
    </UrqlProvider>
  )
}

export default withAuthenticationRequired(App, {
  onRedirecting: () => <div>Loading...</div>,
})
