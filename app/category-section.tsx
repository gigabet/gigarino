'use client'

import { useQuery } from '@tanstack/react-query'
import { cx } from 'class-variance-authority'
import { atom, useAtom, useAtomValue } from 'jotai'
import { entries } from 'lodash'
import { useEffect, useRef, useState } from 'react'
import { type categories, getGameQuery, providersQuery } from '@/app/context'
import GameSection from '@/app/game-section'
import ProviderSection from '@/app/provider-section'

const categorySectionTabState = atom<keyof typeof categories>('Providers')

export default function CategorySection(props: { categories: typeof categories }) {
  const tab = useAtomValue(categorySectionTabState)
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

  return (
    <section ref={sectionRef} className='relative py-12 sm:py-20'>
      <div className='absolute inset-0 h-full border-y border-white/5 bg-black/30' />
      <div className='mx-auto max-w-360 px-6 lg:px-8'>
        <div
          className={cx(
            'mb-4 transition-all duration-700',
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          )}
        >
          <h2 className='font-display text-2xl font-bold sm:text-3xl'>Game Categories</h2>
        </div>
        <div
          className={cx(
            'flex min-h-20 max-w-360 flex-wrap items-center gap-2 py-2 transition-all delay-100 duration-700',
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          )}
        >
          {entries(props.categories).map(([label, category]) => (
            <Tab key={label} {...{ label, ...category }} />
          ))}
        </div>
        {tab === 'Providers' ? (
          <ProviderSection noHeader />
        ) : (
          <GameSection key={tab} category={props.categories[tab]} title={tab} noHeader />
        )}
      </div>
    </section>
  )
}

function Tab({
  label,
  ...props
}: {
  label: string
} & (typeof categories)[keyof typeof categories]) {
  const [tab, setTab] = useAtom(categorySectionTabState)
  const handleClick = () => setTab(label as keyof typeof categories)

  const { data } = useQuery({
    queryKey: ['games', props.query],
    queryFn: getGameQuery(props.query),
  })

  const { data: providers } = useQuery({
    queryKey: ['providers'],
    queryFn: providersQuery,
  })

  return (
    <button
      type='button'
      key={label}
      onClick={handleClick}
      className={cx(
        'shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all duration-300',
        tab === label
          ? 'bg-primary text-primary-foreground shadow-primary/50 shadow-[0_0_15px]'
          : 'bg-dark-200 text-white/70 hover:bg-white/10 hover:text-white'
      )}
    >
      <span>{label}</span>
      <span className='ml-2 text-xs text-current/60'>
        ({label === 'Providers' ? providers?.length : data?.total})
      </span>
    </button>
  )
}
