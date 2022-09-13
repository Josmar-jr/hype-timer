import { GetServerSideProps, NextPage } from 'next'
import { DefaultLayout } from '../components/Layouts/intex'
import { Profile } from '../components/Profile'
import { supabase } from '../services/supabase'

export type IProfile = {
  id: string
  username: string
  avatar_url: string
  updated_at: string
  level_id?: string
}

type Level = {
  id: string
  created_at: string
  rank: number
  complete_challenges: number
  rating: number
}

interface Player extends Omit<IProfile, 'updated_at'> {
  levels: Level
}

interface LeaderboardsProps {
  players: Player[]
}

const Leaderboards: NextPage<LeaderboardsProps> = ({ players }) => {
  console.log(players)
  return (
    <DefaultLayout>
      <div className="w-full overflow-auto block h-[600px] pr-2">
        <table className="m-0 p-0 w-full text-left">
          <thead className="text-gray-150">
            <tr className="w-full flex">
              <th className="basis-[76.8px] tracking-wide w-full pr-2">
                Posição
              </th>
              <th className="basis-[588.8px] pl-4 w-full tracking-wide">
                Usuário
              </th>
              <th className="basis-[202.75px] pr-12 md:pr-0 w-full tracking-wide">
                Desafios
              </th>
              <th className="basis-[164px] pl-1 w-full tracking-wide">
                Experiência
              </th>
            </tr>
          </thead>

          <tbody>
            {players?.map((player, index) => (
              <tr
                key={player.id}
                className="w-full flex  border-y-4 border-y-gray-800 text-gray-150"
              >
                <td className="font-bold rounded-l-md bg-gray-700 border border-gray-500 text-lg px-8 whitespace-nowrap basis-[76.8px] w-full border-r-[3px] border-r-gray-800 flex items-center justify-center">
                  {index + 1}
                </td>
                <td className="whitespace-nowrap bg-gray-700 border border-r-transparent border-gray-500 basis-[588.8px] w-full px-4 py-4">
                  <Profile
                    name={player.username}
                    level={player.levels.rating}
                    avatarSize="sm"
                    avatarUrl={player.avatar_url}
                  />
                </td>
                <td className="md:whitespace-nowrap bg-gray-700 border-y border-gray-500 whitespace-wrap w-full text-center basis-[202.75px] px-8 md:px-0 flex items-center">
                  <span className="font-medium pr-2 text-violet-500">
                    {player.levels.complete_challenges}
                  </span>
                  completados
                </td>
                <td className="whitespace-nowrap rounded-r-md border border-gray-500 border-l-transparent bg-gray-700 basis-[164px] w-full px-4 md:px-0 flex items-center">
                  <span className="font-medium pr-2 text-violet-500">
                    {player.levels.rating}
                  </span>
                  xp
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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

  const { data } = await supabase
    .from('profiles')
    .select('id, username, avatar_url, levels:level_id (*)')
    .order('level', { foreignTable: 'levels' })
    .order('rating', { foreignTable: 'levels' })

  return {
    props: {
      players: data,
    },
  }
}

export default Leaderboards
