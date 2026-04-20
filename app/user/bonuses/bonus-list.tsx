'use client'
import { motion } from 'motion/react'
import { TbGiftOff } from 'react-icons/tb'

export default function BonusList() {
  return (
    <motion.div
      className='text-muted-foreground flex flex-col items-center gap-4 text-3xl font-bold'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <TbGiftOff className='size-40 stroke-[0.8]' />
      <div>No bonuses</div>
    </motion.div>
  )
}
