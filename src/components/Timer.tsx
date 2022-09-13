import { useEffect } from 'react'
import Head from 'next/head'
import { differenceInSeconds } from 'date-fns'

import { useChallengeStore } from '../stores/useChallengeStore'

const clsNumber =
  'flex pb-2 pt-3 flex-1 justify-center bg-gray-700 font-bold rounded'

export function Timer() {
  const activeChallengeId = useChallengeStore(
    (state) => state.activeChallengeId,
  )
  const challenges = useChallengeStore((state) => state.challenges)
  const setSecondsPassed = useChallengeStore((state) => state.setSecondsPassed)
  const amountSecondsPassed = useChallengeStore(
    (state) => state.amountSecondsPassed,
  )
  const markCurrentCycleAsFinished = useChallengeStore(
    (state) => state.markCurrentCycleAsFinished,
  )

  const activeChallenge = challenges.find(
    (challenge) => challenge.id === activeChallengeId,
  )

  const totalSeconds = activeChallenge ? activeChallenge.minutesAmount * 60 : 0

  useEffect(() => {
    let interval: number | any

    if (activeChallenge) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          activeChallenge.startDate,
        )

        if (secondsDifference >= totalSeconds) {
          markCurrentCycleAsFinished()

          setSecondsPassed(totalSeconds)
          clearInterval(interval)
        } else {
          setSecondsPassed(secondsDifference)
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [
    activeChallenge,
    totalSeconds,
    activeChallengeId,
    setSecondsPassed,
    markCurrentCycleAsFinished,
  ])

  const currentSeconds = activeChallenge
    ? totalSeconds - amountSecondsPassed
    : 0

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  return (
    <div className="flex font-mono text-9xl w-full">
      <Head>
        <title>
          {minutes[0]}
          {minutes[1]}:{seconds[0]}
          {seconds[1]}
        </title>
      </Head>

      <div className="flex flex-1 justify-evenly gap-2 items-center">
        <span className={clsNumber}>{minutes[0]}</span>
        <span className={clsNumber}>{minutes[1]}</span>
      </div>
      <span className="font-bold px-1">:</span>
      <div className="flex flex-1 justify-evenly gap-2 items-center">
        <span className={clsNumber}>{seconds[0]}</span>
        <span className={clsNumber}>{seconds[1]}</span>
      </div>
    </div>
  )
}
