import type { AppProps } from 'next/app'
import NextNProgress from 'nextjs-progressbar'
import { Toaster } from 'react-hot-toast'
import { QueryClient, QueryClientProvider } from 'react-query'

import { AuthProvider } from '../contexts/authContext'
import { GlobalProvider } from '../providers'

import '../styles/globals.css'

function MyApp(props: AppProps) {
  return <GlobalProvider {...props} />
}

export default MyApp
