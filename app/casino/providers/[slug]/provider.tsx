'use client'

import { useQuery } from '@tanstack/react-query'
import { providersQuery } from '@/app/context'
import GameList from '@/app/game-list'

export default function Provider(props: { slug: string }) {
  const { data: providers } = useQuery({
    queryKey: ['providers'],
    queryFn: providersQuery,
  })

  return (
    <div className='mx-auto max-w-(--breakpoint-2xl)'>
      <GameList
        title={`Games by ${providers?.find(p => p.providerSlug === props.slug)?.name ?? props.slug}`}
        query={`?provider=${props.slug}`}
      />
    </div>
  )
}
