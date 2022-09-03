import { ButtonHTMLAttributes, ReactNode } from 'react'
import { CircleNotch } from 'phosphor-react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading?: boolean
  children: ReactNode
}

export function Button({ isLoading = false, children, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className="bg-violet-700 p-2 rounded inline-flex justify-center focus:outline-none focus:border-transparent
       focus:ring transition-colors hover:bg-violet-800 focus:ring-violet-600 focus:ring-offset-2 font-medium
       disabled:bg-violet-800 disabled:cursor-not-allowed"
    >
      {isLoading ? (
        <CircleNotch
          className="animate-spin"
          size={18}
          weight="bold"
          color="white"
        />
      ) : (
        children
      )}
    </button>
  )
}
