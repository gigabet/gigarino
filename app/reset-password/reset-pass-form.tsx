'use client'

import {
  AlertCircleIcon,
  ArrowLeftIcon,
  EyeIcon,
  EyeOffIcon,
  Loader2Icon,
  LockIcon,
} from 'lucide-react'
import { motion } from 'motion/react'
import Form from 'next/form'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Activity, useActionState, useState } from 'react'
import { resetPassword } from '@/app/reset-password/actions'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function ResetPassForm() {
  const [state, action, isPending] = useActionState(resetPassword, {
    newPassword: '',
    error: null,
  })
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const [password, setPassword] = useState(state.newPassword)
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const getPasswordStrength = (password: string) => {
    let strength = 0
    if (password.length >= 8) strength++
    if (/[A-Z]/.test(password)) strength++
    if (/[0-9]/.test(password)) strength++
    if (/[^A-Za-z0-9]/.test(password)) strength++
    return strength
  }
  const passwordStrength = getPasswordStrength(password)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className='relative w-full max-w-md'
    >
      {/* Card */}
      <div className='min-[28rem]:glass-dark border-0 p-8 min-[28rem]:rounded-2xl min-[28rem]:border min-[28rem]:shadow-2xl'>
        {/* Header */}
        <div className='mb-8 text-center'>
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className='font-display mb-2 text-3xl font-bold text-white'
          >
            Reset Password
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className='text-secondary'
          >
            Enter your new password.
          </motion.p>
        </div>

        {/* Error Message */}
        <Activity mode={state.error ? 'visible' : 'hidden'}>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className='mb-6 flex items-center gap-3 rounded-lg border border-red-500/30 bg-red-500/10 p-4'
          >
            <AlertCircleIcon className='size-5 shrink-0 text-red-400' />
            <p className='text-sm text-red-400'>{state.error}</p>
          </motion.div>
        </Activity>

        <Form action={action} className='space-y-6'>
          {/* Password Field */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className='relative space-y-2'
          >
            <Label htmlFor='newPassword' className='text-sm font-medium text-gray-300'>
              Password
            </Label>
            <div className='relative'>
              <LockIcon className='absolute top-1/2 left-3 size-5 -translate-y-1/2 text-gray-500' />
              <Input
                id='newPassword'
                name='newPassword'
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder='Create a password'
                className='px-10'
                required
              />
              <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                className='absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 transition-colors hover:text-gray-300'
              >
                {showPassword ? <EyeOffIcon className='size-5' /> : <EyeIcon className='size-5' />}
              </button>
            </div>
            {/* Password Strength */}
            {password && (
              <div className='absolute -bottom-3 flex w-full gap-1'>
                {[1, 2, 3, 4].map(level => (
                  <div
                    key={level}
                    className={`h-1 flex-1 rounded-full transition-colors ${
                      passwordStrength >= level
                        ? passwordStrength >= 3
                          ? 'bg-green-500'
                          : passwordStrength >= 2
                            ? 'bg-yellow-500'
                            : 'bg-red-500'
                        : 'bg-gray-700'
                    }`}
                  />
                ))}
              </div>
            )}
          </motion.div>

          {/* Confirm Password Field */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.45 }}
            className='space-y-2'
          >
            <Label htmlFor='confirmPassword' className='text-sm font-medium text-gray-300'>
              Confirm Password
            </Label>
            <div className='relative'>
              <LockIcon className='absolute top-1/2 left-3 size-5 -translate-y-1/2 text-gray-500' />
              <Input
                id='confirmPassword'
                name='confirmPassword'
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder='Confirm your password'
                className='px-10'
                required
              />
              <button
                type='button'
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className='absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 transition-colors hover:text-gray-300'
              >
                {showConfirmPassword ? (
                  <EyeOffIcon className='size-5' />
                ) : (
                  <EyeIcon className='size-5' />
                )}
              </button>
            </div>
          </motion.div>

          <input type='hidden' name='token' value={String(token)} />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
          >
            <button
              type='submit'
              disabled={isPending}
              className='bg-primary hover:shadow-glow flex w-full cursor-default items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-black uppercase transition-all'
            >
              {isPending ? (
                <>
                  <Loader2Icon className='mr-2 size-5 animate-spin' />
                  Changing Password...
                </>
              ) : (
                'Change Password'
              )}
            </button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className='flex'
          >
            <Link
              href='/login'
              className='hover:text-primary mx-auto inline-flex items-center justify-center gap-2 px-4 text-sm text-gray-500 transition-colors'
            >
              <ArrowLeftIcon className='size-4' />
              <span>Back to Login</span>
            </Link>
          </motion.div>
        </Form>
      </div>
    </motion.div>
  )
}
