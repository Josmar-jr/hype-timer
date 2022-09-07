import { GetServerSideProps, NextPage } from 'next'
import { ChallengeBox } from '../components/ChallengeBox'
import { ExperienceBar } from '../components/ExpirenciBar'
import { Button } from '../components/Form/Button'
import { DefaultLayout } from '../components/Layouts/intex'
import { Profile } from '../components/Profile'

import { Timer } from '../components/Timer'
import { supabase } from '../services/supabase'

const Dashboard: NextPage = () => {
  return (
    <DefaultLayout>
      <>
        <ExperienceBar />

        <section className="w-full md:flex-row flex-col flex justify-between md:gap-20 items-center h-full py-12 md:py-52">
          <div className="grow max-w-md h-full w-full flex flex-col gap-8 md:gap-12 justify-center">
            <Profile />

            <div className="flex justify-between text-lg font-semibold border-b-2 border-gray-300 pb-1">
              <span>Desafios completados</span>
              <span>2</span>
            </div>

            <Timer />

            <Button style={{ padding: '1rem' }}>Iniciar</Button>
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
    props: {},
  }
}

export default Dashboard
