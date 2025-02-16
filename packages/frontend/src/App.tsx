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
import {ThreeDots} from "react-loader-spinner";

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

function Loading() {
  return <div className="w-screen h-screen flex items-center justify-center">
    <ThreeDots height={8} color="#00E0FF" />
  </div>
}

function App() {
  const {getAccessTokenSilently, isLoading, error} = useAuth0()

  const client = useMemo(
    () => getClient(getAccessTokenSilently),
    [getAccessTokenSilently]
  )

  if (error) {
    return <div>Oops... {error.message}</div>
  }

  if (isLoading) {
    return <Loading />
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
  onRedirecting: () => <Loading />,
})
