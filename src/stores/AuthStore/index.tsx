import create from 'zustand'
import { persist } from 'zustand/middleware'
import { supabase } from '../../services/supabase'

interface Auth {
  email: string
  password: string
}

export interface User {
  id: string
  email: string
  user_name: string
  avatar_url?: string
}

interface AuthStoreData {
  user: User | null
  signIn: ({ email, password }: Auth) => Promise<User | null | undefined>
}

export const useAuthStore = create(
  persist<AuthStoreData>(
    (set, get) => ({
      user: null,
      async signIn({ email, password }) {
        try {
          const { error, user } = await supabase.auth.signIn({
            email,
            password,
          })

          if (error || !user) throw error

          set(() => ({
            user: {
              email,
              id: user.id,
              user_name: email,
            },
          }))

          return get().user
        } catch (err) {
          console.error(`Auth Error: ${err}`)
        }
      },
    }),
    {
      name: 'auth-user-storage',
    },
  ),
)
