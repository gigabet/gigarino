'use client'

import { StarIcon } from 'lucide-react'
import { graphql, useFragment } from 'react-relay'
import { Button } from '@/components/ui/button'
import { useToggleFavourite } from '@/context/favourites'
import { useT, useUser } from '@/context/providers'
import { cn } from '@/lib/utils'
import type { FavouriteButton$key } from '@/relay/__generated__/FavouriteButton.graphql'

export function FavouriteButton(props: { event: FavouriteButton$key; className?: string }) {
  const { id, isFavourite, isLive } = useFragment(
    graphql`
      fragment FavouriteButton on Event {
        id
        isFavourite
        isLive
      }
    `,
    props.event
  )
  const { user } = useUser()
  const toggle = useToggleFavourite()
  const t = useT()

  // isFavourite is false when signed out, but guard against a stale cache after logout
  const active = !!user && isFavourite

  return (
    <Button
      type='button'
      variant='ghost'
      size='icon-sm'
      className={cn('rounded-full', props.className)}
      aria-pressed={active}
      aria-label={active ? t('Remove from favourites') : t('Add to favourites')}
      onClick={() => toggle({ id, isFavourite, isLive })}
    >
      <StarIcon
        className={cn('size-4 transition-colors', active && 'fill-yellow-400 text-yellow-400')}
      />
    </Button>
  )
}
