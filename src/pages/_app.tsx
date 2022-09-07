import type { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from '../contexts/authContext'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
      <Toaster />
    </AuthProvider>
  )
}

export default MyApp
