import { ButtonHTMLAttributes, ReactNode } from 'react'
import { CircleNotch } from 'phosphor-react'
import cln from 'classnames'

const VARIANTS_BUTTON = {
  primary:
    'p-2 bg-violet-700 hover:bg-violet-800 focus:ring-violet-600 disabled:bg-violet-800',
  outlined:
    'p-2 bg-transparent border border-gray-100 hover:bg-gray-100 hover:text-gray-800',
} as const

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading?: boolean
  children: ReactNode
  variant?: keyof typeof VARIANTS_BUTTON
  clns?: string
}

export function Button({
  isLoading = false,
  children,
  variant = 'primary',
  clns = '',
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      className={cln(
        'w-full rounded inline-flex justify-center items-center gap-2 focus:outline-none focus:border-transparent focus:ring transition-colors focus:ring-offset-2 font-medium disabled:cursor-not-allowed',
        {
          [clns || VARIANTS_BUTTON[variant]]: variant,
          clns,
        },
      )}
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
