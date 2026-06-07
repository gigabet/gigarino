'use client'

import { useQuery } from '@tanstack/react-query'
import { cx } from 'class-variance-authority'
import { atom, useAtom, useAtomValue } from 'jotai'
import { entries } from 'lodash'
import { motion } from 'motion/react'
import { useRef } from 'react'
import { type categories, getGameQuery, providersQuery } from '@/app/context'
import GameSection from '@/app/game-section'
import ProviderSection from '@/app/provider-section'

const categorySectionTabState = atom<keyof typeof categories>('Providers')

export default function CategorySection(props: { categories: typeof categories }) {
  const tab = useAtomValue(categorySectionTabState)
  const sectionRef = useRef<HTMLDivElement>(null)

  return (
    <section ref={sectionRef} className='relative py-12 sm:py-20'>
      <div className='absolute inset-0 h-full border-y border-white/5 bg-black/30' />
      <div className='mx-auto max-w-360 px-6 lg:px-8'>
        <motion.div
          initial={{ opacity: 0, y: 32, z: 1 }}
          whileInView={{ opacity: 1, y: 0, z: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className='mb-4'
        >
          <h2 className='font-display text-2xl font-bold sm:text-3xl'>Game Categories</h2>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 32, z: 1 }}
          whileInView={{ opacity: 1, y: 0, z: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          viewport={{ once: true }}
          className='flex min-h-20 max-w-360 flex-wrap items-center gap-2 py-2'
        >
          {entries(props.categories).map(([label, category]) => (
            <Tab key={label} {...{ label, ...category }} />
          ))}
        </motion.div>
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
