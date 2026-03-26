'use client'

import { useQuery } from '@tanstack/react-query'
import Bowser from 'bowser'
import { AlertCircleIcon, EyeIcon, EyeOffIcon, Loader2Icon, LockIcon, MailIcon } from 'lucide-react'
import { motion } from 'motion/react'
import Form from 'next/form'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Activity, useActionState, useEffect, useState } from 'react'
import { login } from '@/app/login/actions'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function LoginForm() {
  const [formData, action, isPending] = useActionState(login, {
    identifier: '',
    password: '',
    error: null,
    rememberMe: true,
  })
  const [showPassword, setShowPassword] = useState(false)

  const { data: ipAddress } = useQuery({
    queryKey: ['ip'],
    queryFn: async () => {
      const res = await fetch('https://api64.ipify.org')
      return await res.text()
    },
  })
  const { userAgent } = navigator
  const device = Bowser.parse(
    navigator.userAgent,
    // biome-ignore lint/suspicious/noExplicitAny: userAgentData is an experimental feature that isn't in TS definitions yet
    (navigator as any).userAgentData
  ).platform.type

  const router = useRouter()
  const searchParams = useSearchParams()
  const [registered, setRegistered] = useState(false)
  useEffect(() => {
    const isRegistered = searchParams.get('registered') === 'true'

    if (isRegistered) {
      setRegistered(true)

      // remove query param without adding history entry
      router.replace('/login')
    }
  }, [router.replace, searchParams.get])

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
            Welcome Back
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className='text-secondary'
          >
            Sign in to your Gigarino account
          </motion.p>
        </div>

        {/* Error Message */}
        <Activity mode={formData.error ? 'visible' : 'hidden'}>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className='mb-6 flex items-center gap-3 rounded-lg border border-red-500/30 bg-red-500/10 p-4'
          >
            <AlertCircleIcon className='size-5 shrink-0 text-red-400' />
            <p className='text-sm text-red-400'>{formData.error}</p>
          </motion.div>
        </Activity>

        {/* Success Message */}
        <Activity mode={registered ? 'visible' : 'hidden'}>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className='mb-6 flex items-center gap-3 rounded-lg border border-lime-500/30 bg-lime-500/10 p-4'
          >
            <AlertCircleIcon className='text-lime size-5 shrink-0' />
            <p className='text-lime text-sm'>Registration successful!</p>
          </motion.div>
        </Activity>

        {/* Form */}
        <Form action={action} className='space-y-6'>
          {/* Email Field */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className='space-y-2'
          >
            <Label htmlFor='identifier' className='text-sm font-medium text-gray-300'>
              Email or Username
            </Label>
            <div className='relative'>
              <MailIcon className='absolute top-1/2 left-3 size-5 -translate-y-1/2 text-gray-500' />
              <Input
                id='identifier'
                name='identifier'
                type='text'
                defaultValue={formData.identifier}
                placeholder='Enter your username or email'
                className='border-white/10 bg-[#141414] pl-10 text-white placeholder:text-gray-600 focus:border-[#c8f06a] focus:ring-[#c8f06a]/20'
                required
              />
            </div>
          </motion.div>

          {/* Password Field */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className='space-y-2'
          >
            <Label htmlFor='password' className='text-sm font-medium text-gray-300'>
              Password
            </Label>
            <div className='relative'>
              <LockIcon className='absolute top-1/2 left-3 size-5 -translate-y-1/2 text-gray-500' />
              <Input
                id='password'
                name='password'
                type={showPassword ? 'text' : 'password'}
                defaultValue={formData.password}
                placeholder='Enter your password'
                className='border-white/10 bg-[#141414] pr-10 pl-10 text-white placeholder:text-gray-600 focus:border-[#c8f06a] focus:ring-[#c8f06a]/20'
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
          </motion.div>

          {/* Remember Me & Forgot Password */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className='flex items-center justify-between'
          >
            <div className='flex items-center space-x-2'>
              <Checkbox id='rememberMe' name='rememberMe' defaultChecked={formData.rememberMe} />
              <Label htmlFor='rememberMe' className='cursor-pointer text-sm text-gray-400'>
                Remember me
              </Label>
            </div>
            <Link
              href=''
              className='text-primary group relative text-sm transition-colors hover:text-white'
            >
              Forgot password?
              <span className='bg-primary absolute -bottom-0.5 left-0 h-px w-0 transition-all duration-300 group-hover:w-full' />
            </Link>
          </motion.div>

          <input type='hidden' name='ipAddress' value={ipAddress} />
          <input type='hidden' name='userAgent' value={userAgent} />
          <input type='hidden' name='device' value={device} />

          {/* Submit Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <button
              type='submit'
              disabled={isPending}
              className='bg-primary hover:shadow-glow flex w-full cursor-default items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-black uppercase transition-all'
            >
              {isPending ? (
                <>
                  <Loader2Icon className='mr-2 size-5 animate-spin' />
                  Logging in...
                </>
              ) : (
                'Log In'
              )}
            </button>
          </motion.div>
        </Form>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className='my-8 flex items-center gap-4'
        >
          <div className='grow'>
            <div className='w-full border-t border-white/10' />
          </div>
          <div className='text-sm text-gray-500'>Or continue with</div>
          <div className='grow'>
            <div className='w-full border-t border-white/10' />
          </div>
        </motion.div>

        {/* Social Login */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className='grid grid-cols-2 gap-4'
        >
          <Button
            type='button'
            variant='outline'
            className='border-white/20 text-white hover:border-white/40 hover:bg-white/5'
          >
            <svg className='mr-1 size-5' viewBox='0 0 24 24'>
              <title>Google Icon</title>
              <path
                fill='currentColor'
                d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
              />
              <path
                fill='currentColor'
                d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
              />
              <path
                fill='currentColor'
                d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
              />
              <path
                fill='currentColor'
                d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
              />
            </svg>
            Google
          </Button>
          <Button
            type='button'
            variant='outline'
            className='border-white/20 text-white hover:border-white/40 hover:bg-white/5'
          >
            <svg className='mr-1 size-5' fill='currentColor' viewBox='0 0 24 24'>
              <title>Facebook Icon</title>
              <path d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' />
            </svg>
            Facebook
          </Button>
        </motion.div>

        {/* Register Link */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className='mt-8 text-center text-sm text-gray-400'
        >
          Don't have an account?{' '}
          <Link
            href='/register'
            className='text-primary group relative font-medium transition-colors hover:text-white'
          >
            Register now
            <span className='bg-primary absolute -bottom-0.5 left-0 h-px w-0 transition-all duration-300 group-hover:w-full' />
          </Link>
        </motion.p>
      </div>
    </motion.div>
  )
}
