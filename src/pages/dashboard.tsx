import { useState, useEffect } from 'react'
import { GetServerSideProps, NextPage } from 'next'
import { v4 as uuidV4 } from 'uuid'
import { differenceInSeconds } from 'date-fns'
import { CircleNotch, HandPalm, Play } from 'phosphor-react'

import { supabase } from '../services/supabase'

import { usePlayer } from '../services/hooks/usePlayer'

import { Timer } from '../components/Timer'
import { ChallengeBox } from '../components/ChallengeBox'
import { ExperienceBar } from '../components/ExpirenciBar'
import { Button } from '../components/Form/Button'
import { DefaultLayout } from '../components/Layouts/intex'
import { Profile } from '../components/Profile'
import { User } from '@supabase/supabase-js'
import Head from 'next/head'

type Challenge = {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptDate?: Date
  finishedDate?: Date
}

interface DashboardProps {
  user: User
}

const Dashboard: NextPage<DashboardProps> = ({ user }) => {
  const [challenges, setChallenges] = useState<Challenge[]>([])
  const [activeChallengeId, setActiveChallengeId] = useState<string | null>(
    null,
  )
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const { data: player, isLoading, isError } = usePlayer(user.id)

  function handleCreateNewChallenge() {
    const id = uuidV4()

    const newChallenge: Challenge = {
      id,
      minutesAmount: 0.2,
      task: 'Comer',
      startDate: new Date(),
    }

    setChallenges((oldChallenge) => [...oldChallenge, newChallenge])
    setActiveChallengeId(id)
    setAmountSecondsPassed(0)
  }

  function handleInterruptChallenge() {
    setChallenges((oldChallenge) =>
      oldChallenge.map((challenge) => {
        if (challenge.id === activeChallengeId) {
          return {
            ...challenge,
            interruptDate: new Date(),
          }
        }

        return challenge
      }),
    )

    setActiveChallengeId(null)
  }

  const activeChallenge = challenges.find(
    (challenge) => challenge.id === activeChallengeId,
  )

  const totalSeconds = activeChallenge ? activeChallenge.minutesAmount * 60 : 0
  const currentSeconds = activeChallenge
    ? totalSeconds - amountSecondsPassed
    : 0

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  useEffect(() => {
    let interval: number

    if (activeChallenge) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          activeChallenge.startDate,
        )

        if (secondsDifference >= totalSeconds) {
          setChallenges((oldChallenge) =>
            oldChallenge.map((challenge) => {
              if (challenge.id === activeChallengeId) {
                return {
                  ...challenge,
                  finishedDate: new Date(),
                }
              }

              return challenge
            }),
          )
          setAmountSecondsPassed(totalSeconds)

          clearInterval(interval)
        } else {
          setAmountSecondsPassed(secondsDifference)
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [activeChallenge, totalSeconds, activeChallengeId])

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
        <Head>
          <title>
            {minutes[0]}
            {minutes[1]}:{seconds[0]}
            {seconds[1]}
          </title>
        </Head>

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

            {minutes[0]}
            {minutes[1]}
            {seconds[0]}
            {seconds[1]}

            {activeChallenge ? (
              <Button
                onClick={handleInterruptChallenge}
                style={{ padding: '1.25rem' }}
                clns="bg-red-700"
              >
                <HandPalm size={20} />
                Stop
              </Button>
            ) : (
              <Button
                onClick={handleCreateNewChallenge}
                style={{ padding: '1.25rem' }}
              >
                <Play size={20} />
                Iniciar
              </Button>
            )}
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
