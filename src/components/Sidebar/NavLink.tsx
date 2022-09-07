import { cloneElement, ReactElement } from 'react'
import Link, { LinkProps } from 'next/link'
import { useRouter } from 'next/router'

interface NavLinkProps extends LinkProps {
  children: ReactElement
  shouldMatchExactHref?: boolean
}

export function NavLink({
  children,
  shouldMatchExactHref,
  ...rest
}: NavLinkProps) {
  const { asPath } = useRouter()

  let isActive = false

  if (shouldMatchExactHref && (asPath === rest.href || asPath === rest.as)) {
    isActive = true
  }

  if (
    !shouldMatchExactHref &&
    (asPath.startsWith(String(rest.href)) || asPath.startsWith(String(rest.as)))
  ) {
    isActive = true
  }
  console.log(asPath, isActive)

  return (
    <Link {...rest}>
      <a
        className={`group ${
          isActive
            ? 'before:bg-violet-500 before:h-[58px] before:w-[3px]'
            : 'before:bg-transparent before:h-0 before:w-0'
        } before:transition-all hover:before:h-[58px] hover:before:w-[3px] hover:before:bg-violet-500 p-2 flex justify-center items-center before:content-[''] before:block before:absolute before:left-0 before:rounded-tr-md before:rounded-br-md`}
      >
        {cloneElement(children, {
          color: `${isActive ? 'rgb(139, 92, 246)' : '#a0a0a0'}`,
        })}
      </a>
    </Link>
  )
}
