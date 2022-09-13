import { ReactNode } from 'react'
import { Sidebar } from '../Sidebar'

interface DefaultLayoutProps {
  children: ReactNode
}

export function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <div className="h-screen w-full bg-gray-800">
      <Sidebar />

      <div className="max-w-5xl px-4 md:px-8 h-full py-10 flex flex-col items-center justify-center m-auto">
        {children}
      </div>
    </div>
  )
}
