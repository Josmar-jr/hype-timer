import classNames from 'classnames'
import Image from 'next/future/image'

const sizes = {
  sm: 'w-[3rem] md:w-[3.5rem]',
  md: 'w-[5.5rem] md:w-24 border-violet-500 border-2 p-1 text-2xl',
  lg: '',
} as const

interface ProfileProps {
  avatarSize?: keyof typeof sizes
  avatarUrl?: string
  name?: string
  level?: number
}

export function Profile({
  avatarSize = 'md',
  avatarUrl,
  name,
  level,
}: ProfileProps) {
  return (
    <div className="flex gap-4 items-center">
      <div
        className={classNames('w-[5.5rem] md:w-24 rounded-full', {
          [sizes[avatarSize]]: avatarSize,
        })}
      >
        <Image
          className="w-full rounded-full "
          src={avatarUrl ?? 'https://github.com/josmar-jr.png'}
          alt="Image Profile"
          width={100}
          height={100}
        />
      </div>

      <div className="flex flex-col">
        <span
          className={classNames('font-semibold', {
            'text-lg': avatarSize,
          })}
        >
          {name}
        </span>
        <p className="text-base text-gray-150 inline-flex gap-2 mt-[2px]">
          <img src="/icons/arrow-up.svg" alt="arrow up" />
          Level {level}
        </p>
      </div>
    </div>
  )
}
