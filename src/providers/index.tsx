import { AppProps } from 'next/app'
import { ChallengesContextProvider } from '../contexts/challengesContext'
import { GlobalProviders } from './GlobalProviders'

type Path = '/' | '/dashboard' | '/leaderboard'

export function GlobalProvider({ Component, pageProps, router }: AppProps) {
  switch (router.asPath as Path) {
    case '/dashboard':
      return (
        <GlobalProviders>
          <ChallengesContextProvider>
            <Component {...pageProps} />
          </ChallengesContextProvider>
        </GlobalProviders>
      )
    default:
      return (
        <GlobalProviders>
          <Component {...pageProps} />
        </GlobalProviders>
      )
  }
}
