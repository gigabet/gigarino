'use client'

import { useQuery } from '@tanstack/react-query'
import GameList from '@/app/casino/[slug]/game-list'
import { providersQuery } from '@/app/context'
import { useT } from '@/context/providers'

export default function Provider(props: { slug: string }) {
  const { data: providers } = useQuery({
    queryKey: ['providers'],
    queryFn: providersQuery,
  })
  const t = useT()

  const name = providers?.find(p => p.providerSlug === props.slug)?.name ?? props.slug

  return (
    <div className='mx-auto max-w-360'>
      <GameList
        key={props.slug}
        title={t('Games by {name}', { name })}
        query={`?provider=${props.slug}`}
      />
    </div>
  )
}
