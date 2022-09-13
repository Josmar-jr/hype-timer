import { User, Session } from '@supabase/supabase-js'
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import { supabase } from '../services/supabase'

type AuthContextType = {
  user?: User
  session?: Session
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>()
  const [session, setSession] = useState<Session>()

  useEffect(() => {
    let mounted = true

    const currentSession = supabase.auth.session()

    if (mounted && currentSession?.user) {
      setSession(currentSession)
      setUser(currentSession.user)
    }

    const { data } = supabase.auth.onAuthStateChange((event, newSession) => {
      if (!newSession?.user) return

      setSession(newSession)
      setUser(newSession.user)

      fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({ event, session: newSession }),
      })
    })

    return () => {
      mounted = false

      data?.unsubscribe()
    }
  }, [])

  return (
    <AuthContext.Provider value={{ user, session }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const data = useContext(AuthContext)

  return data
}
