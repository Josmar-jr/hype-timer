import type { GetServerSideProps, NextPage } from 'next'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useRouter } from 'next/router'

import { supabase } from '../services/supabase'
import { AiFillGithub } from 'react-icons/ai'

import { Button } from '../components/Form/Button'
import { Input } from '../components/Form/Input'
import { GithubLogo } from 'phosphor-react'
import { useState } from 'react'
import { useAuth } from '../contexts/authContext'

const userLoginFormValidationSchema = zod.object({
  email: zod.string().email({ message: 'Invalid email address' }),
  password: zod
    .string()
    .min(6, { message: 'Must be 6 or more characters long' })
    .max(20, { message: 'Must be 20 or fewer characters long' })
    .regex(/(?=.*[A-Z])/, {
      message: 'A senha deve conter pelo menos uma letra maiuscula',
    })
    .regex(/(?=.*[a-z])/, {
      message: 'A senha deve conter pelo menos uma letra minuscula',
    })
    .regex(/(?=.*[0-9])/, {
      message: 'A senha deve conter pelo menos um número',
    }),
})

type UserLoginFormData = zod.infer<typeof userLoginFormValidationSchema>

const Home: NextPage = () => {
  const router = useRouter()

  const [hasLoginSuccessful, setHasLoginSuccessful] = useState(true)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<UserLoginFormData>({
    resolver: zodResolver(userLoginFormValidationSchema),
  })

  const { session } = useAuth()
  console.log(session)

  async function handleCredentialsLogin({
    email,
    password,
  }: UserLoginFormData) {
    try {
      const { error, user } = await supabase.auth.signIn({
        email,
        password,
      })

      if (error) throw error

      setHasLoginSuccessful(true)

      router.push('/dashboard')
    } catch (err) {
      setHasLoginSuccessful(false)
      console.error('err')
    }

    reset()
  }

  async function handleGithubLogin() {
    const { error } = await supabase.auth.signIn({
      provider: 'github',
    })

    if (error) {
      console.log(error)
    }
  }

  return (
    <div className="h-screen w-full bg-gray-800 flex items-center justify-center">
      <div className="w-full max-w-sm py-4 mx-auto my-auto min-w-min md:py-9 md:w-7/12">
        <form
          onSubmit={handleSubmit(handleCredentialsLogin)}
          className="w-full flex flex-col gap-4"
        >
          {!hasLoginSuccessful && (
            <div className="px-2 py-1 mb-4 border-l-2 border-red-500 dark:text-red-200">
              Invalid Email or password.
            </div>
          )}

          <Input
            label="Email"
            type="email"
            name="email"
            register={register}
            error={errors.email}
          />
          <Input
            label="Password"
            type="password"
            name="password"
            register={register}
            error={errors.password}
          />
          <Button
            type="submit"
            isLoading={isSubmitting}
            disabled={isSubmitting}
          >
            Confirmar
          </Button>
        </form>

        <div className="flex flex-col my-8">
          <hr className="h-0 border-t mt-sm border-gray-300" />
          <div className="-mt-3 text-sm text-center">
            <span className="px-2 bg-primary bg-gray-800 text-gray-150 font-semibold">
              Or with
            </span>
          </div>
        </div>

        <div className="w-full flex">
          <Button variant="outlined" onClick={handleGithubLogin}>
            <span className="inline-flex gap-2 justify-center items-center">
              <AiFillGithub size={22} /> Github
            </span>
          </Button>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { user } = await supabase.auth.api.getUserByCookie(ctx.req)

  if (!user)
    return {
      props: {},
    }

  return {
    redirect: {
      destination: '/dashboard',
      permanent: false,
    },
  }
}

export default Home
