import NextNProgress from 'nextjs-progressbar'
import { ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'
import { QueryClient, QueryClientProvider } from 'react-query'
import { AuthProvider } from '../contexts/authContext'

const queryClient = new QueryClient()

interface GlobalProvidersProps {
  children: ReactNode
}

export function GlobalProviders({ children }: GlobalProvidersProps) {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <NextNProgress
          color="#7c3aed"
          startPosition={0.3}
          stopDelayMs={100}
          height={3}
        />

        {children}

        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}
