'use client'

import { useQuery } from '@tanstack/react-query'
import { cx } from 'class-variance-authority'
import { useSetAtom } from 'jotai'
import { take } from 'lodash'
import { ChevronRightIcon, PlayIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
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
  noHeader?: boolean
}

export default function GameSection({
  title,
  category,
  ...props
}: GameSectionProps & React.JSX.IntrinsicElements['section']) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const { data } = useQuery({
    queryKey: ['games', category.query],
    queryFn: getGameQuery(category.query),
  })

  const games = take(data?.items, 4)
  // const Icon = icons[category.icon]

  return (
    <section
      ref={sectionRef}
      className={cx('relative', props.className, props.noHeader ? 'pt-10' : 'py-12 sm:py-20')}
    >
      {/* for overlays */}
      {props.children}
      <div className={!props.noHeader ? 'mx-auto max-w-360 px-6 lg:px-8' : ''}>
        {/* Section Header */}
        {!props.noHeader && (
          <div
            className={cx(
              'mb-10 flex items-center justify-between transition-all duration-700',
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            )}
          >
            <div className='flex items-center gap-2'>
              {category.slug === 'live-casino' && (
                <div className='bg-danger size-3 animate-pulse rounded-full'></div>
              )}
              <h2 className='font-display text-2xl font-bold sm:text-3xl'>{title}</h2>
            </div>
            <Link
              href={`/casino/${category.slug}`}
              className='hover:text-primary group flex items-center gap-1 text-sm text-white/60 transition-colors'
            >
              <span>See all ({data?.total})</span>
              <ChevronRightIcon className='size-4 transition-transform group-hover:translate-x-1' />
            </Link>
          </div>
        )}

        {/* Games Container */}
        <div className='grid grid-cols-2 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 @sm:grid-cols-3 @sm:gap-5'>
          {games?.map((game, index) => (
            <div
              key={game.uuid}
              className={cx(
                'duration-700',
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              )}
              style={{ transitionDelay: `${index * 0.15}s` }}
            >
              <GameCard game={game} />
            </div>
          ))}
        </div>

        {props.noHeader && !!category.slug && (
          <div className='flex items-center justify-end pt-6'>
            <Link
              href={`/casino/${category.slug}`}
              className='hover:text-primary group flex items-center gap-1 text-sm text-white/60 transition-colors'
            >
              <span>See all ({data?.total})</span>
              <ChevronRightIcon className='size-4 transition-transform group-hover:translate-x-1' />
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}

export function GameCard({ game }: { game: Game }) {
  const router = useRouter()
  const setLoading = useSetAtom(isLoadingOverlayState)

  const handleClick = async () => {
    setLoading(true)
    const url = await getGameDemo(game.uuid)
    router.push(url)
  }

  const cardRef = useRef<HTMLButtonElement>(null)
  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0 })
  // const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height

    const rotateX = (y - 0.5) * -30
    const rotateY = (x - 0.5) * 30

    setTransform({ rotateX, rotateY })
  }

  const handleMouseLeave = () => {
    setTransform({ rotateX: 0, rotateY: 0 })
  }

  return (
    <button
      type='button'
      onClick={game.image ? handleClick : undefined}
      ref={cardRef}
      className={cx(
        'perspective-1000 group w-full shrink-0 select-none',
        !game.image && 'pointer-events-none opacity-50'
      )}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className='relative scale-100 overflow-hidden rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.3)] transition-all duration-300 group-hover:scale-104 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.5),0_0_30px_rgba(209,243,102,0.2)]'>
        {/* Image - 16:10 aspect ratio */}
        <div className='relative aspect-16/10 overflow-hidden'>
          {game.image ? (
            <Image
              src={game.image}
              alt={game.name}
              fill
              sizes='(max-width: 1024px) 50vw, 25vw'
              className='h-full w-full scale-100 object-cover transition-transform duration-500 group-hover:scale-108'
            />
          ) : (
            <div className='flex h-full w-full scale-100 items-center justify-center object-cover transition-transform duration-500 group-hover:scale-108'>
              <span className='pb-10'>Game unavailable.</span>
            </div>
          )}

          {/* Gradient overlay */}
          <div className='absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent opacity-50 transition-opacity duration-300 group-hover:opacity-90' />

          {/* Badge */}
          <div className='absolute top-2 right-2 flex items-center gap-1'>
            {game.isNew && (
              <div className='bg-dark/70 flex h-5 items-center rounded-full px-2 text-[0.675rem] leading-none font-semibold text-white uppercase'>
                new
              </div>
            )}
            {/* {game.playCount > 1 && (
              <div className='bg-accent text-accent-foreground flex h-5 items-center rounded-full px-2 uppercase'>
                <FlameIcon className='size-3' strokeWidth={2.5} />
              </div>
            )} */}
          </div>

          {/* Hover overlay with play button */}
          <div className='absolute inset-0 z-1 flex items-center justify-center opacity-0 transition-all duration-300 group-hover:opacity-100'>
            <div className='bg-primary shadow-glow-lg flex h-12 w-12 transform cursor-pointer items-center justify-center rounded-full transition-all duration-300 hover:scale-110'>
              <PlayIcon className='ml-0.5 h-5 w-5 text-black' fill='black' />
            </div>
          </div>

          {/* Glare effect */}
          <div
            className='pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100'
            style={{
              background: `linear-gradient(${105 + transform.rotateY * 2}deg, transparent 40%, rgba(255,255,255,0.18) 50%, transparent 60%)`,
            }}
          />
        </div>

        {/* Info */}
        <div className='absolute right-0 bottom-0 left-0 bg-linear-to-t from-black/90 to-transparent p-3'>
          <h3 className='mb-0.5 h-4.5 truncate text-left text-sm leading-none font-semibold text-white text-shadow-[0_0_3px_black]'>
            {game.name}
          </h3>
          <div className='flex items-center text-xs text-gray-400'>
            <span>{game.providerName}</span>
          </div>
        </div>
      </div>
    </button>
  )
}
