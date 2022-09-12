import { GetServerSideProps, NextPage } from 'next'

import { supabase } from '../services/supabase'

import { usePlayer } from '../services/hooks/usePlayer'

import { Timer } from '../components/Timer'
import { ChallengeBox } from '../components/ChallengeBox'
import { ExperienceBar } from '../components/ExpirenciBar'
import { Button } from '../components/Form/Button'
import { DefaultLayout } from '../components/Layouts/intex'
import { Profile } from '../components/Profile'
import { User } from '@supabase/supabase-js'
import { CircleNotch } from 'phosphor-react'

interface DashboardProps {
  user: User
}

const Dashboard: NextPage<DashboardProps> = ({ user }) => {
  const { data: player, isLoading, isError } = usePlayer(user.id)

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircleNotch
          className="animate-spin m-auto"
          size={32}
          weight="bold"
          color="white"
        />
      </div>
    )
  }

  return (
    <DefaultLayout>
      <>
        <ExperienceBar />

        <section className="w-full md:flex-row flex-col flex justify-between md:gap-20 items-center h-full py-12 md:py-52">
          <div className="grow max-w-md h-full w-full flex flex-col gap-8 md:gap-10 justify-center">
            <Profile
              name={player?.username}
              level={player?.level}
              avatarUrl={player?.avatar_url}
            />

            <div className="flex justify-between text-lg font-semibold border-b-2 border-gray-300 pb-1">
              <span>Desafios completados</span>
              <span>{player?.complete_challenges}</span>
            </div>

            <Timer />

            <Button style={{ padding: '1.25rem' }}>Iniciar</Button>
          </div>
          <div className="hidden md:flex h-full items-center justify-center grow">
            <ChallengeBox />
          </div>
        </section>
      </>
    </DefaultLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { user } = await supabase.auth.api.getUserByCookie(ctx.req)

  if (!user) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {
      user,
    },
  }
}

export default Dashboard
