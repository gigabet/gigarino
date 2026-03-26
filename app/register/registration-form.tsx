'use client'

import {
  AlertCircleIcon,
  EyeIcon,
  EyeOffIcon,
  Loader2Icon,
  LockIcon,
  MailIcon,
  UserIcon,
} from 'lucide-react'
import { motion } from 'motion/react'
import Form from 'next/form'
import Link from 'next/link'
import { Activity, useActionState, useRef, useState } from 'react'
import { register } from '@/app/register/actions'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function RegistrationForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const initialState = {
    error: null,
    username: '',
    email: '',
    password: '',
  }
  const [prevState, action, isPending] = useActionState(register, initialState)
  const language = navigator.language

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [password, setPassword] = useState(prevState.password)
  const [confirmPassword, setConfirmPassword] = useState('')
  const [confirmAge, setConfirmAge] = useState(false)

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
      className='relative w-full max-w-lg'
    >
      {/* Card */}
      <div className='min-[32rem]:glass-dark border-0 p-8 min-[32rem]:rounded-2xl min-[32rem]:border min-[32rem]:shadow-2xl'>
        {/* Header */}
        <div className='mb-8 text-center'>
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className='font-display mb-2 text-3xl font-bold text-white'
          >
            Create Account
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className='text-gray-400'
          >
            Join Gigarino for exclusive bonuses
          </motion.p>
        </div>

        {/* Error Message */}
        <Activity mode={prevState.error ? 'visible' : 'hidden'}>
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className='mb-6 flex items-center gap-3 rounded-lg border border-red-500/30 bg-red-500/10 p-4'
          >
            <AlertCircleIcon className='size-5 shrink-0 text-red-400' />
            <p className='text-sm text-red-400'>{prevState.error}</p>
          </motion.div>
        </Activity>

        {/* Form */}
        <Form action={action} className='space-y-7' ref={formRef}>
          {/* Username Field */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className='space-y-2'
          >
            <Label htmlFor='username' className='text-sm font-medium text-gray-300'>
              Username
            </Label>
            <div className='relative'>
              <UserIcon className='absolute top-1/2 left-3 size-5 -translate-y-1/2 text-gray-500' />
              <Input
                id='username'
                name='username'
                type='text'
                defaultValue={prevState.username}
                placeholder='Choose a username'
                className='pl-10'
                required
              />
            </div>
          </motion.div>

          {/* Email Field */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35 }}
            className='space-y-2'
          >
            <Label htmlFor='email' className='text-sm font-medium text-gray-300'>
              Email
            </Label>
            <div className='relative'>
              <MailIcon className='absolute top-1/2 left-3 size-5 -translate-y-1/2 text-gray-500' />
              <Input
                id='email'
                name='email'
                type='email'
                defaultValue={prevState.email}
                placeholder='Enter your email'
                className='pl-10'
                required
              />
            </div>
          </motion.div>

          {/* Password Field */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className='relative space-y-2'
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

          <input type='hidden' id='language' name='language' value={language} />

          {/* Checkboxes */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55 }}
            className='space-y-3'
          >
            <div className='flex items-start space-x-3'>
              <Checkbox
                id='age'
                checked={confirmAge}
                onCheckedChange={checked => setConfirmAge(checked as boolean)}
                className='mt-1'
              />
              <Label htmlFor='age' className='cursor-pointer text-sm leading-relaxed text-gray-400'>
                I confirm I am 18+ years old and agree to the responsible gaming terms
              </Label>
            </div>
          </motion.div>

          {/* Submit Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <button
              type='submit'
              disabled={
                isPending || !confirmAge || password !== confirmPassword || passwordStrength < 3
              }
              className='bg-primary enabled:hover:shadow-glow disabled:bg-muted disabled:text-muted-foreground flex w-full cursor-default items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-black uppercase transition-all disabled:cursor-not-allowed'
              title={
                !confirmAge
                  ? 'Please confirm your age'
                  : password !== confirmPassword
                    ? 'Passwords must match'
                    : passwordStrength < 3
                      ? 'Password is too weak'
                      : undefined
              }
            >
              {isPending ? (
                <>
                  <Loader2Icon className='mr-2 size-5 animate-spin' />
                  Creating account...
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </motion.div>
        </Form>

        {/* Login Link */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className='mt-6 text-center text-sm text-gray-400'
        >
          Already have an account?{' '}
          <Link
            href='/login'
            className='text-primary group relative font-medium transition-colors hover:text-white'
          >
            Log in
            <span className='bg-primary absolute -bottom-0.5 left-0 h-px w-0 transition-all duration-300 group-hover:w-full' />
          </Link>
        </motion.p>
      </div>
    </motion.div>
  )
}
