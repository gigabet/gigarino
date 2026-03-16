'use client'

import { useQuery } from '@tanstack/react-query'
import { cx } from 'class-variance-authority'
import { useSetAtom } from 'jotai'
import {
  ChevronLeft,
  ChevronRight,
  ChevronRightIcon,
  // CirclePlus,
  // Flame,
  // GalleryHorizontalEnd,
  // HandCoins,
  // Landmark,
  // RadioIcon,
  // RefreshCcwDot,
  // Smartphone,
  // Sparkles,
  // StoreIcon,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useRef } from 'react'
import { type categories, getGameDemo, getGameQuery } from '@/app/context'
import { isLoadingOverlayState } from '@/context/providers'
import type { Game } from '@/types'

// const icons = {
//   CirclePlus,
//   Flame,
//   GalleryHorizontalEnd,
//   HandCoins,
//   Landmark,
//   RadioIcon,
//   RefreshCcwDot,
//   Smartphone,
//   Sparkles,
//   StoreIcon,
// }

interface GameSectionProps {
  title: string
  category: (typeof categories)[Exclude<keyof typeof categories, 'Providers'>]
}

export default function GameSection({ title, category }: GameSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 640
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      })
    }
  }

  const { data } = useQuery({
    queryKey: ['games', category.query],
    queryFn: getGameQuery(category.query),
  })

  const games = data?.items
  // const Icon = icons[category.icon]

  return (
    <section className='pt-6 pb-2 sm:pt-10 sm:pb-6'>
      {/* Section Header */}
      <div className='mb-4 flex items-center justify-between px-8'>
        <div className='flex items-center gap-2'>
          {category.slug === 'live-casino' && (
            <div className='bg-danger size-3 animate-pulse rounded-full'></div>
          )}
          <h2 className='font-display text-2xl text-white lg:text-3xl'>{title}</h2>
        </div>
        <Link
          href={`/casino/${category.slug}`}
          className='flex items-center gap-1 text-sm text-neutral-500 transition-colors hover:text-neutral-300'
        >
          <span>See all ({data?.total})</span>
          <ChevronRightIcon className='size-4' />
        </Link>
      </div>

      {/* Games Carousel */}
      <div className='relative'>
        {/* Scroll Buttons */}
        <button
          type='button'
          onClick={() => scroll('left')}
          className={cx(
            'hover:bg-brand hover:text-brand-fg absolute top-1/2 left-2 z-10 hidden h-10 w-10 -translate-y-1/1 items-center justify-center rounded-full bg-neutral-800/90 text-neutral-300 shadow-lg transition-colors',
            !!games?.length && games.length > 6 && 'xl:flex'
          )}
        >
          <ChevronLeft size={20} />
        </button>
        <button
          type='button'
          onClick={() => scroll('right')}
          className={cx(
            'hover:bg-brand hover:text-brand-fg absolute top-1/2 right-2 z-10 hidden h-10 w-10 -translate-y-1/1 items-center justify-center rounded-full bg-neutral-800/90 text-neutral-300 shadow-lg transition-colors',
            !!games?.length && games.length > 6 && 'xl:flex'
          )}
        >
          <ChevronRight size={20} />
        </button>

        {/* Games Container */}
        <div className='w-full px-8 pb-2'>
          <div
            ref={scrollRef}
            className='custom-scrollbar @container flex gap-4 overflow-x-auto pb-4 xl:overflow-hidden'
          >
            {games?.map(game => (
              <CasinoGame key={game.uuid} {...game} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function CasinoGame(props: Game) {
  const router = useRouter()
  const setLoading = useSetAtom(isLoadingOverlayState)

  const handleClick = async () => {
    setLoading(true)
    const url = await getGameDemo(props.uuid)
    router.push(url)
  }

  return (
    <button
      type='button'
      className='group w-[calc(50cqi-0.5rem)] shrink-0 cursor-pointer sm:w-[calc(33.33cqi-0.667rem)] md:w-[calc(25cqi-0.75rem)] lg:w-[calc(20cqi-0.8rem)] xl:w-[calc(16.67cqi-0.833rem)]'
      onClick={handleClick}
    >
      {/* Game Card */}
      <div className='relative mb-2 aspect-16/10 overflow-hidden rounded-xl bg-neutral-700'>
        {/* Game Image */}
        <div className='relative size-full'>
          {/* <div className='absolute inset-0 z-1 size-full bg-linear-to-b from-black/30 via-transparent to-black/30 bg-blend-multiply group-hover:bg-transparent' /> */}
          <Image src={props.image} alt={props.name} fill objectFit='cover' />
        </div>

        {/* New Badge */}
        {props.isNew && (
          <div className='absolute top-2 left-2 rounded bg-neutral-900 px-2 py-0.5 text-xs font-medium text-white'>
            new
          </div>
        )}

        {/* Hover Overlay */}
        <div className='absolute inset-0 bg-linear-to-b from-black/40 via-transparent to-black/40 bg-blend-multiply backdrop-brightness-100 transition-all group-hover:bg-transparent group-hover:backdrop-brightness-120' />
      </div>

      {/* Game Title */}
      <p className='line-clamp-2 text-sm text-neutral-400 transition-colors group-hover:text-neutral-200'>
        {props.name}
      </p>
    </button>
  )
}
