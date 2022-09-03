/* eslint-disable no-undef */
import React, { forwardRef, ForwardRefRenderFunction } from 'react'
import type { UseFormRegister, FieldError } from 'react-hook-form'

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  name: string
  label: string
  // icon?: React.SVGAttributes<HTMLOrSVGElement> | any
  register: UseFormRegister<any>
  error?: FieldError
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { name, label, register, error, ...rest },
  ref,
) => {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor="" className="font-bold">
        {label}
      </label>
      <input
        {...rest}
        {...register(name)}
        className="border border-gray-300 bg-transparent rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-violet-600 focus:border-violet-300 focus:z-10"
      />
      {error ? (
        <small className="text-red-400 font-medium">{error.message}</small>
      ) : (
        <small className="">{''}</small>
      )}
    </div>
  )
}

export const Input = forwardRef(InputBase)
