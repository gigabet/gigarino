'use client'

import { useQuery } from '@tanstack/react-query'
import { useSetAtom } from 'jotai'
import {
  ChevronLeft,
  ChevronRight,
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
      const scrollAmount = 320
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
    <section className='py-6'>
      {/* Section Header */}
      <div className='mb-4 flex items-center justify-between px-8'>
        <div className='flex items-center gap-2'>
          {category.slug === 'live-casino' && (
            <div className='bg-danger size-3 animate-pulse rounded-full'></div>
          )}
          <h2 className='font-display text-xl text-white sm:text-2xl lg:text-3xl'>{title}</h2>
        </div>
        <Link
          href={`/casino/${category.slug}`}
          className='flex items-center gap-1 text-sm text-neutral-500 transition-colors hover:text-neutral-300'
        >
          <span>See all ({data?.total})</span>
        </Link>
      </div>

      {/* Games Carousel */}
      <div className='relative'>
        {/* Scroll Buttons */}
        <button
          type='button'
          onClick={() => scroll('left')}
          className='absolute top-1/2 left-2 z-10 flex h-10 w-10 -translate-y-3/4 items-center justify-center rounded-full bg-neutral-800/90 text-neutral-300 shadow-lg transition-colors hover:bg-neutral-700'
        >
          <ChevronLeft size={20} />
        </button>
        <button
          type='button'
          onClick={() => scroll('right')}
          className='absolute top-1/2 right-2 z-10 flex h-10 w-10 -translate-y-3/4 items-center justify-center rounded-full bg-neutral-800/90 text-neutral-300 shadow-lg transition-colors hover:bg-neutral-700'
        >
          <ChevronRight size={20} />
        </button>

        {/* Games Container */}
        <div className='w-full overflow-hidden px-8 pb-2'>
          <div
            ref={scrollRef}
            className='no-scrollbar @container flex gap-4 overflow-x-auto'
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
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
      className='group w-[calc(50cqi-1rem)] shrink-0 cursor-pointer sm:w-[calc(33.33cqi-1rem)] md:w-[calc(25cqi-1rem)] lg:w-[calc(20cqi-1rem)] xl:w-[calc(16.67cqi-1rem)]'
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
