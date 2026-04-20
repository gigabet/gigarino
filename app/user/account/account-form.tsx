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
import { Activity, useActionState, useRef, useState } from 'react'
import { changeDetails } from '@/app/user/account/actions'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function AccountForm(props: {
  email: string
  username: string
  displayName: string
}) {
  const formRef = useRef<HTMLFormElement>(null)
  const initialState = {
    error: null as string | null,
    username: props.username,
    displayName: props.displayName,
    email: props.email,
    password: '',
  }
  const [prevState, action, isPending] = useActionState(changeDetails, initialState)
  const language = navigator.language

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

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
      <div className='rounded-2xl border border-white/5 bg-black/20 p-8 shadow-2xl'>
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
            transition={{ delay: 0.1 }}
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
              />
            </div>
          </motion.div>

          {/* Display Name Field */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className='space-y-2'
          >
            <Label htmlFor='displayName' className='text-sm font-medium text-gray-300'>
              Display name
            </Label>
            <div className='relative'>
              <UserIcon className='absolute top-1/2 left-3 size-5 -translate-y-1/2 text-gray-500' />
              <Input
                id='displayName'
                name='displayName'
                type='text'
                defaultValue={prevState.displayName}
                placeholder='Choose a display name'
                className='pl-10'
              />
            </div>
          </motion.div>

          {/* Email Field */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
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
              />
            </div>
          </motion.div>

          {/* Password Field */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className='relative space-y-2'
          >
            <Label htmlFor='password' className='text-sm font-medium text-gray-300'>
              New password
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
            transition={{ delay: 0.4 }}
            className='space-y-2'
          >
            <Label htmlFor='confirmPassword' className='text-sm font-medium text-gray-300'>
              Confirm new password
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

          {/* Submit Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <button
              type='submit'
              disabled={isPending}
              className='bg-primary enabled:hover:shadow-glow flex w-full cursor-default items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-black uppercase transition-all'
            >
              {isPending ? (
                <>
                  <Loader2Icon className='mr-2 size-5 animate-spin' />
                  Changing Details...
                </>
              ) : (
                'Change Details'
              )}
            </button>
          </motion.div>
        </Form>
      </div>
    </motion.div>
  )
}
