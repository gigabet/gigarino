'use client'
import { motion } from 'motion/react'

export default function Header() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='mb-8'
    >
      <h1 className='font-display mb-2 text-3xl font-bold text-white md:text-4xl'>Wallet</h1>
      <p className='text-gray-400'>Manage your funds, deposits, and withdrawals</p>
    </motion.div>
  )
}
