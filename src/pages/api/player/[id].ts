import { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '../../../services/supabase'

interface Profile {
  id: string
  updated_at?: string
  username: string
  avatar_url: string
  level_id: string
}

export interface IPlayerResponse extends Profile {
  levels: {
    id: string
    created_at: string
    level: number
    complete_challenges: number
    rating: number
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { id } = req.query

  if (req.method === 'GET') {
    const { data } = await supabase
      .from<IPlayerResponse>('profiles')
      .select('*, levels:level_id (*)', {
        count: 'planned',
      })
      .match({
        id,
      })
      .single()

    return res.status(200).json(data)
  }

  return res.status(404).json({ message: 'Route not found' })
}
