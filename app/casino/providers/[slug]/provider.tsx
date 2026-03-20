'use client'

import { useQuery } from '@tanstack/react-query'
import GameList from '@/app/casino/[slug]/game-list'
import { providersQuery } from '@/app/context'

export default function Provider(props: { slug: string }) {
  const { data: providers } = useQuery({
    queryKey: ['providers'],
    queryFn: providersQuery,
  })

  return (
    <div className='mx-auto max-w-360'>
      <GameList
        key={props.slug}
        title={`Games by ${providers?.find(p => p.providerSlug === props.slug)?.name ?? props.slug}`}
        query={`?provider=${props.slug}`}
      />
    </div>
  )
}
