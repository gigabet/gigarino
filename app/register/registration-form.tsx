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
import { useT } from '@/context/providers'

export default function RegistrationForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const initialState = {
    error: null as string | null,
    username: '',
    email: '',
    password: '',
  }
  const [prevState, action, isPending] = useActionState(register, initialState)
  const language = navigator.language
  const t = useT()

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
      <div className='min-[32rem]:glass-strong border-0 p-8 min-[32rem]:rounded-2xl min-[32rem]:border min-[32rem]:shadow-2xl'>
        {/* Header */}
        <div className='mb-8 text-center'>
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className='font-display text-foreground mb-2 text-3xl font-bold'
          >
            {t('Create Account')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className='text-secondary'
          >
            {t('Join {brand} for exclusive bonuses', { brand: 'Gigarino' })}
          </motion.p>
        </div>

        {/* Error Message */}
        <Activity mode={prevState.error ? 'visible' : 'hidden'}>
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className='border-danger/30 bg-danger/10 mb-6 flex items-center gap-3 rounded-lg border p-4'
          >
            <AlertCircleIcon className='text-danger size-5 shrink-0' />
            <p className='text-danger text-sm'>{prevState.error}</p>
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
            <Label htmlFor='username' className='text-secondary text-sm font-medium'>
              {t('Username')}
            </Label>
            <div className='relative'>
              <UserIcon className='text-subtle absolute top-1/2 left-3 size-5 -translate-y-1/2' />
              <Input
                id='username'
                name='username'
                type='text'
                defaultValue={prevState.username}
                placeholder={t('Choose a username')}
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
            <Label htmlFor='email' className='text-secondary text-sm font-medium'>
              {t('Email')}
            </Label>
            <div className='relative'>
              <MailIcon className='text-subtle absolute top-1/2 left-3 size-5 -translate-y-1/2' />
              <Input
                id='email'
                name='email'
                type='email'
                defaultValue={prevState.email}
                placeholder={t('Enter your email')}
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
            <Label htmlFor='password' className='text-secondary text-sm font-medium'>
              {t('Password')}
            </Label>
            <div className='relative'>
              <LockIcon className='text-subtle absolute top-1/2 left-3 size-5 -translate-y-1/2' />
              <Input
                id='password'
                name='password'
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder={t('Create a password')}
                className='px-10'
                required
              />
              <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                className='text-subtle hover:text-secondary absolute top-1/2 right-3 -translate-y-1/2 transition-colors'
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
                          ? 'bg-success'
                          : passwordStrength >= 2
                            ? 'bg-warning'
                            : 'bg-danger'
                        : 'bg-surface-3'
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
            <Label htmlFor='confirmPassword' className='text-secondary text-sm font-medium'>
              {t('Confirm Password')}
            </Label>
            <div className='relative'>
              <LockIcon className='text-subtle absolute top-1/2 left-3 size-5 -translate-y-1/2' />
              <Input
                id='confirmPassword'
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder={t('Confirm your password')}
                className='px-10'
                required
              />
              <button
                type='button'
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className='text-subtle hover:text-secondary absolute top-1/2 right-3 -translate-y-1/2 transition-colors'
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
              <Label
                htmlFor='age'
                className='text-secondary cursor-pointer text-sm leading-relaxed'
              >
                {t('I confirm I am 18+ years old and agree to the responsible gaming terms')}
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
              className='bg-primary enabled:hover:shadow-glow disabled:bg-muted disabled:text-muted-foreground text-primary-foreground flex w-full cursor-default items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-medium uppercase transition-all disabled:cursor-not-allowed'
              title={
                !confirmAge
                  ? t('Please confirm your age')
                  : password !== confirmPassword
                    ? t('Passwords must match')
                    : passwordStrength < 3
                      ? t('Password is too weak')
                      : undefined
              }
            >
              {isPending ? (
                <>
                  <Loader2Icon className='mr-2 size-5 animate-spin' />
                  {t('Creating account...')}
                </>
              ) : (
                t('Create Account')
              )}
            </button>
          </motion.div>
        </Form>

        {/* Login Link */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className='text-secondary mt-6 text-center text-sm'
        >
          {t('Already have an account?')}{' '}
          <Link
            href='/login'
            className='text-brand group hover:text-foreground relative font-medium transition-colors'
          >
            {t('Log in')}
            <span className='bg-brand absolute -bottom-0.5 left-0 h-px w-0 transition-all duration-300 group-hover:w-full' />
          </Link>
        </motion.p>
      </div>
    </motion.div>
  )
}
