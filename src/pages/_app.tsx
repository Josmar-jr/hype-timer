import type { AppProps } from 'next/app'
import NextNProgress from 'nextjs-progressbar'
import { Toaster } from 'react-hot-toast'
import { QueryClient, QueryClientProvider } from 'react-query'

import { AuthProvider } from '../contexts/authContext'
import { GlobalProvider } from '../providers'

import '../styles/globals.css'

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <NextNProgress
          color="#7c3aed"
          startPosition={0.3}
          stopDelayMs={100}
          height={3}
        />

        <Component {...pageProps} />
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default MyApp
