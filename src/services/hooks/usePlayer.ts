import { useQuery } from 'react-query'
import { IPlayerResponse } from '../../pages/api/player/[id]'

import { api } from '../api'

interface Player {
  id: string
  username: string
  avatar_url: string
  rating: number
  complete_challenges: number
  level: number
}

export async function getPlayer(id?: string): Promise<Player> {
  const { data } = await api.get<IPlayerResponse>(`/player/${id}`)

  return {
    id: data.id,
    username: data.username,
    avatar_url: data.avatar_url,
    rating: data.levels.rating,
    complete_challenges: data.levels.complete_challenges,
    level: data.levels.level,
  }
}

export function usePlayer(id?: string) {
  return useQuery('player', () => getPlayer(id), {
    staleTime: 60 * 60 * 1,
  })
}
