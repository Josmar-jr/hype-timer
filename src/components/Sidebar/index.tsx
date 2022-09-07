/* eslint-disable react/no-unknown-property */

import { supabase } from '../../services/supabase'
import { NavLink } from './NavLink'
import { SignOutModal } from './SingOutModal'

export function Sidebar() {
  return (
    <aside className="bg-gray-700 h-screen w-24 absolute top-0 left-0">
      <div className="h-full flex flex-col justify-between grow px-4 py-8">
        <div>logo</div>

        <nav className="flex flex-col gap-4 mb-10">
          <NavLink href="/dashboard" shouldMatchExactHref>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="38"
              height="38"
              fill="currentColor"
              viewBox="0 0 256 256"
            >
              <rect width="256" height="256" fill="none"></rect>
              <path
                className="group-hover:stroke-violet-500"
                d="M152,208V160a8,8,0,0,0-8-8H112a8,8,0,0,0-8,8v48a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V115.5a8.3,8.3,0,0,1,2.6-5.9l80-72.7a8,8,0,0,1,10.8,0l80,72.7a8.3,8.3,0,0,1,2.6,5.9V208a8,8,0,0,1-8,8H160A8,8,0,0,1,152,208Z"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="16"
              ></path>
            </svg>
          </NavLink>
          <NavLink href="/users">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="38"
              height="38"
              fill="currentColor"
              viewBox="0 0 256 256"
            >
              <rect width="256" height="256" fill="none"></rect>
              <circle
                className="group-hover:stroke-violet-500"
                cx="128"
                cy="96"
                r="80"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="16"
              ></circle>
              <circle
                className="group-hover:stroke-violet-500"
                cx="128"
                cy="96"
                r="48"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="16"
              ></circle>
              <polyline
                className="group-hover:stroke-violet-500"
                points="176 160 176 240 128 216 80 240 80 160"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="16"
              ></polyline>
            </svg>
          </NavLink>
        </nav>

        <div className="flex justify-center items-center">
          <SignOutModal />
        </div>
      </div>
    </aside>
  )
}
