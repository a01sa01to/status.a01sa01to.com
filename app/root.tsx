import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
} from 'react-router'

import { Body, CodeHighlight, Heading, MainContainer } from '@a01sa01to/ui'

import type { Route } from './+types/root'

import './reset.scss'
import '@a01sa01to/ui/style.css'

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />

        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossOrigin='anonymous'
        />
        <link
          href={`https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&display=swap&text=${encodeURIComponent('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz01234567890 !"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~')}`}
          rel='stylesheet'
        />

        <Meta />
        <Links />
      </head>
      <Body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </Body>
    </html>
  )
}

export default function App() {
  return <Outlet />
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Oops!'
  let details = 'An unexpected error occurred.'
  let stack: string | undefined

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error'
    details =
      error.status === 404
        ? 'The requested page could not be found.'
        : error.statusText || details
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message
    stack = error.stack
  }

  return (
    <MainContainer>
      <Heading size='h1'>{message}</Heading>
      <p>{details}</p>
      {stack && <CodeHighlight code={stack} language='plaintext' />}
    </MainContainer>
  )
}
