import { TriangleAlert } from 'lucide-react'
import LeagueStrip from '@/app/live/[sport]/league-strip'
import LiveSportPage from '@/app/live/[sport]/page'
import SportsSelection from '@/app/live/[sport]/sports-selection'

export default async function LiveLayout() {
  return (
    <div className='z-1 mx-auto grid min-h-screen w-full max-w-480 grid-cols-[18.75rem_minmax(auto,1fr)_18.75rem] gap-12 px-4 py-6 pb-24 sm:px-6 lg:px-8'>
      <aside className='hidden'></aside>
      <div className='col-span-2 flex flex-col gap-4'>
        <SportsSelection />
        <LeagueStrip />
        <h1 className='text-destructive mx-auto flex items-center gap-2 text-center text-3xl'>
          <TriangleAlert /> NOT FINISHED — IGNORE THIS PAGE <TriangleAlert />
        </h1>
        <LiveSportPage />
      </div>
      <aside>Betslip</aside>
    </div>
  )
}
