import create from 'zustand'
import { produce } from 'immer'

interface Challenge {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptDate?: Date
  finishedDate?: Date
}

interface ChallengeState {
  challenges: Challenge[]
  activeChallengeId: string | null
  amountSecondsPassed: number
  addNewChallenge: (newChallenge: Challenge) => void
  interruptCurrentChallenge: () => void
  setSecondsPassed: (seconds: number) => void
  markCurrentCycleAsFinished: () => void
}

export const useChallengeStore = create<ChallengeState>((set) => ({
  challenges: [],
  activeChallengeId: null,
  amountSecondsPassed: 0,

  addNewChallenge: (newChallenge) => {
    set((state) => {
      return produce(state, (draft) => {
        draft.challenges.push(newChallenge)
        draft.activeChallengeId = newChallenge.id
      })
    })
  },

  interruptCurrentChallenge: () => {
    set((state) => {
      const currentChallengeIndex = state.challenges.findIndex(
        (challenge) => challenge.id === state.activeChallengeId,
      )

      if (currentChallengeIndex < 0) return state

      return produce(state, (draft) => {
        draft.activeChallengeId = null
        draft.challenges[currentChallengeIndex].interruptDate = new Date()
      })
    })
  },

  markCurrentCycleAsFinished: () => {
    set((state) => {
      const currentChallengeIndex = state.challenges.findIndex(
        (challenge) => challenge.id === state.activeChallengeId,
      )

      if (currentChallengeIndex < 0) return state

      return produce(state, (draft) => {
        draft.activeChallengeId = null
        draft.challenges[currentChallengeIndex].finishedDate = new Date()
      })
    })
  },

  setSecondsPassed: (seconds) => {
    set((state) => {
      return produce(state, (draft) => {
        console.log('asdf', draft.amountSecondsPassed)
        draft.amountSecondsPassed = seconds
      })
    })
  },
}))
