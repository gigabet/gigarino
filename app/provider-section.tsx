'use client'

import { useQuery } from '@tanstack/react-query'
import { cx } from 'class-variance-authority'
import { take } from 'lodash'
import { ChevronRightIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { providersQuery } from '@/app/context'
import type { GameProvider } from '@/types'

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

export default function ProviderSection(
  props: {
    noHeader?: boolean
  } & React.JSX.IntrinsicElements['section']
) {
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
    queryKey: ['providers'],
    queryFn: providersQuery,
  })

  const providers = take(data, 4)
  // const Icon = icons[category.icon]

  return (
    <section
      ref={sectionRef}
      className={cx('relative', props.className, props.noHeader ? 'pt-10' : 'py-16 sm:py-20')}
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
            <h2 className='font-display text-2xl font-bold sm:text-3xl'>Providers</h2>
            <Link
              href={`/casino/providers`}
              className='hover:text-primary group flex items-center gap-1 text-sm text-white/60 transition-colors'
            >
              <span>See all ({data?.length})</span>
              <ChevronRightIcon className='size-4 transition-transform group-hover:translate-x-1' />
            </Link>
          </div>
        )}

        {/* Providers Container */}
        <div className='grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4'>
          {providers?.map((provider, index) => (
            <div
              key={provider.id}
              className={cx(
                'duration-700',
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              )}
              style={{ transitionDelay: `${index * 0.15}s` }}
            >
              <ProviderCard provider={provider} />
            </div>
          ))}
        </div>

        {props.noHeader && (
          <div className='flex items-center justify-end pt-6'>
            <Link
              href={`/casino/providers`}
              className='hover:text-primary group flex items-center gap-1 text-sm text-white/60 transition-colors'
            >
              <span>See all ({data?.length})</span>
              <ChevronRightIcon className='size-4 transition-transform group-hover:translate-x-1' />
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}

export function ProviderCard({ provider }: { provider: GameProvider }) {
  const cardRef = useRef<HTMLAnchorElement>(null)
  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0 })
  // const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
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
    <Link
      href={`/casino/providers/${provider.providerSlug}`}
      ref={cardRef}
      className='perspective-1000 group w-full shrink-0 select-none'
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className='relative scale-100 overflow-hidden rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.3)] transition-all duration-300 group-hover:scale-104 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.5),0_0_30px_rgba(209,243,102,0.2)]'
        // style={{
        //   transform: `rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg)`,
        //   transformStyle: 'preserve-3d',
        // }}
      >
        {/* Image - 16:10 aspect ratio */}
        <div className='relative aspect-22/10 overflow-hidden'>
          <Image
            src={`/images/providers/${provider.providerSlug}.png`}
            alt={provider.name}
            fill
            objectFit='contain'
            className='h-full w-full scale-100 object-cover transition-transform duration-500 group-hover:scale-108'
          />

          {/* Glare effect */}
          <div
            className='pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100'
            style={{
              background: `linear-gradient(${105 + transform.rotateY * 2}deg, transparent 40%, rgba(255,255,255,0.18) 50%, transparent 60%)`,
            }}
          />
        </div>
      </div>
    </Link>
  )
}
