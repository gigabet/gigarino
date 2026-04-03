'use client'

import { AlertCircleIcon, ArrowLeftIcon, Loader2Icon, MailIcon } from 'lucide-react'
import { motion } from 'motion/react'
import Form from 'next/form'
import Link from 'next/link'
import { Activity, useActionState } from 'react'
import { forgotPassword } from '@/app/forgot-password/actions'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function ForgotPassForm() {
  const [state, action, isPending] = useActionState(forgotPassword, {
    email: '',
    error: null,
    step: 'email',
  })

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className='relative w-full max-w-md'
    >
      {/* Card */}
      <div className='min-[28rem]:glass-dark border-0 p-8 min-[28rem]:rounded-2xl min-[28rem]:border min-[28rem]:shadow-2xl'>
        <Activity mode={state.step === 'email' ? 'visible' : 'hidden'}>
          {/* Header */}
          <div className='mb-8 text-center'>
            <motion.h1
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className='font-display mb-2 text-3xl font-bold text-white'
            >
              Forgot Password?
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className='text-secondary'
            >
              Enter your email address and we'll send you a link to reset your password.
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
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className='space-y-2'
            >
              <Label htmlFor='email' className='text-sm font-medium text-gray-300'>
                Email
              </Label>
              <div className='relative'>
                <MailIcon className='absolute top-1/2 left-3 size-5 -translate-y-1/2 text-gray-500' />
                <Input
                  className='pl-10'
                  id='email'
                  name='email'
                  type='text'
                  defaultValue={state.email}
                  placeholder='Enter your email'
                  required
                />
              </div>
            </motion.div>

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
                    Pending...
                  </>
                ) : (
                  'Send Reset Link'
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
        </Activity>

        {/* After submitting */}
        <Activity mode={state.step === 'success' ? 'visible' : 'hidden'}>
          {/* Header */}
          <div className='mb-8 text-center'>
            <motion.h1
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className='font-display mb-2 text-3xl font-bold text-white'
            >
              Password Reset
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className='text-secondary'
            >
              If that email exists, a reset link has been sent. Check your inbox and spam folder.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Link
              href='/login'
              className='bg-primary hover:shadow-glow flex w-full cursor-default items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-black uppercase transition-all'
            >
              Log in
            </Link>
          </motion.div>
        </Activity>
      </div>
    </motion.div>
  )
}
