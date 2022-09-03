import type { NextPage } from 'next'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

import { Button } from '../components/Form/Button'
import { Input } from '../components/Form/Input'

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
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<UserLoginFormData>({
    resolver: zodResolver(userLoginFormValidationSchema),
  })

  async function handleLoginUser(data: UserLoginFormData) {
    console.log(data)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    reset()
  }

  return (
    <div className="h-screen w-full bg-gray-700 flex items-center justify-center">
      <form
        onSubmit={handleSubmit(handleLoginUser)}
        action=""
        className="max-w-sm w-full flex flex-col gap-4"
      >
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
        <Button type="submit" isLoading={isSubmitting} disabled={isSubmitting}>
          Confirmar
        </Button>
      </form>
    </div>
  )
}

export default Home
