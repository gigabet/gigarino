'use client'
import { useQuery } from '@tanstack/react-query'
import { motion } from 'motion/react'
import { TbGiftOff } from 'react-icons/tb'
import { bonusesQuery } from '@/app/user/context'
import type { User } from '@/types'

export default function BonusList(props: { user: User }) {
  const { data } = useQuery({
    queryKey: ['bonuses', props.user.id],
    queryFn: bonusesQuery,
  })

  return (
    <motion.div
      className='text-muted-foreground flex flex-col items-center gap-4 text-3xl font-bold'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      {!data?.length ? (
        <>
          <TbGiftOff className='size-40 stroke-[0.8]' />
          <div>No bonuses</div>
        </>
      ) : (
        data.map(bonus => <pre key={bonus.id}>{JSON.stringify(bonus)}</pre>)
      )}
    </motion.div>
  )
}
