import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import { differenceInSeconds } from 'date-fns'
import { v4 as uuidV4 } from 'uuid'

interface Challenge {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptDate?: Date
  finishedDate?: Date
}

interface ChallengesContextType {
  challenges: Challenge[]
  activeChallenge: Challenge | undefined
  activeChallengeId: string | null
  amountSecondsPassed: number
  markCurrentCycleAsFinished: () => void
  setSecondsPassed: (seconds: number) => void
  createNewChallenge: () => void
  interruptCurrentChallenge: () => void
}

interface ChallengesContextProviderProps {
  children: ReactNode
}

export const ChallengesContext = createContext({} as ChallengesContextType)

export function ChallengesContextProvider({
  children,
}: ChallengesContextProviderProps) {
  const [challenges, setChallenges] = useState<Challenge[]>([])
  const [activeChallengeId, setActiveChallengeId] = useState<string | null>(
    null,
  )
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const activeChallenge = challenges.find(
    (challenge) => challenge.id === activeChallengeId,
  )

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  function markCurrentCycleAsFinished() {
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
  }

  function createNewChallenge() {
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

  function interruptCurrentChallenge() {
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

  return (
    <ChallengesContext.Provider
      value={{
        activeChallenge,
        activeChallengeId,
        amountSecondsPassed,
        challenges,
        createNewChallenge,
        interruptCurrentChallenge,
        markCurrentCycleAsFinished,
        setSecondsPassed,
      }}
    >
      {children}
    </ChallengesContext.Provider>
  )
}

export function useChallenge() {
  const data = useContext(ChallengesContext)

  return data
}
