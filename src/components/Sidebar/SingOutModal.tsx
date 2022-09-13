import { useState } from 'react'
import * as AlertDialog from '@radix-ui/react-alert-dialog'

import { SignIn, SignOut } from 'phosphor-react'
import { supabase } from '../../services/supabase'
import Router from 'next/router'

export function SignOutModal() {
  const [isOpenSignOutModal, setIsOpenSignOutModal] = useState(false)

  function onToggleSignOutModal() {
    setIsOpenSignOutModal(!isOpenSignOutModal)
  }

  async function logout() {
    await supabase.auth.signOut()
    Router.push('/')
  }

  return (
    <AlertDialog.Root
      open={isOpenSignOutModal}
      onOpenChange={onToggleSignOutModal}
    >
      <AlertDialog.Trigger asChild>
        <button>
          <SignOut size={38} color="#a0a0a0" />
        </button>
      </AlertDialog.Trigger>

      <AlertDialog.Portal>
        <AlertDialog.Overlay className="bg-[rgba(0,0,0,0.7)] fixed top-0 flex justify-center items-center left-0 w-full h-full z-50">
          <AlertDialog.Content className="max-w-md w-full h-1/3 m-auto bg-gray-700 rounded p-8 gap-4 flex flex-col justify-center items-center">
            <AlertDialog.Title className="text-2xl font-bold text-center p-2">
              Quer mesmo sair? :/
            </AlertDialog.Title>
            <div className="flex items-center gap-2 justify-center">
              <AlertDialog.Cancel className="w-32 h-36 outline-none focus:brightness-95 focus:ring focus:bg-violet-600 focus:text-gray-100 hover:opacity-80 transition-opacity flex flex-col gap-2 justify-center items-center text-gray-200 dark:bg-secondary bg-primary rounded-md">
                <SignIn size={42} weight="bold" className="drop-shadow-lg" />
                <strong>Noooo!</strong>
              </AlertDialog.Cancel>
              <AlertDialog.Action
                onClick={logout}
                className="w-32 h-36 outline-none focus:brightness-95 focus:ring focus:bg-violet-600 focus:text-gray-100 hover:opacity-80 transition-opacity flex flex-col gap-2 justify-center items-center text-gray-200 dark:bg-secondary bg-primary rounded-md"
              >
                <SignOut size={42} weight="bold" className="drop-shadow-lg" />
                <strong>Sair</strong>
              </AlertDialog.Action>
            </div>
          </AlertDialog.Content>
        </AlertDialog.Overlay>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  )
}
