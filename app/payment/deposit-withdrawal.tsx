'use client'

import {
  AlertCircleIcon,
  ArrowDownIcon,
  ArrowRightLeftIcon,
  ArrowUpIcon,
  BitcoinIcon,
  Building2Icon,
  CheckCircle2Icon,
  ClockIcon,
  CreditCardIcon,
  Loader2Icon,
  WalletIcon,
} from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import * as Tabs from '@/components/ui/tabs'

interface PaymentMethod {
  id: string
  name: string
  icon: React.ElementType
  description: string
  processingTime: string
  minAmount: number
  maxAmount: number
}
const paymentMethods: PaymentMethod[] = [
  {
    id: 'card',
    name: 'Credit/Debit Card',
    icon: CreditCardIcon,
    description: 'Visa, Mastercard',
    processingTime: 'Instant',
    minAmount: 10,
    maxAmount: 5000,
  },
  {
    id: 'bank',
    name: 'Bank Transfer',
    icon: Building2Icon,
    description: 'SEPA, Wire Transfer',
    processingTime: '1-3 days',
    minAmount: 50,
    maxAmount: 50000,
  },
  {
    id: 'stripe',
    name: 'Stripe',
    icon: WalletIcon,
    description: 'Fast & Secure',
    processingTime: 'Instant',
    minAmount: 10,
    maxAmount: 10000,
  },
  {
    id: 'crypto',
    name: 'Cryptocurrency',
    icon: BitcoinIcon,
    description: 'BTC, ETH, USDT',
    processingTime: '10-60 min',
    minAmount: 20,
    maxAmount: 100000,
  },
]

const quickAmounts = [20, 50, 100, 200, 500, 1000]

export default function DepositWithdrawal() {
  const [activeTab, setActiveTab] = useState('deposit')
  const [selectedMethod, setSelectedMethod] = useState<string>('card')
  const [amount, setAmount] = useState<string>('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [error, setError] = useState('')

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
    }).format(value)
  }

  const handleAmountSelect = (value: number) => {
    setAmount(value.toString())
    setError('')
  }

  const handleDeposit = async () => {
    setError('')
    const depositAmount = parseFloat(amount)

    if (!depositAmount || depositAmount <= 0) {
      setError('Please enter a valid amount')
      return
    }

    const method = paymentMethods.find(m => m.id === selectedMethod)
    if (method && depositAmount < method.minAmount) {
      setError(`Minimum deposit amount is ${formatCurrency(method.minAmount)}`)
      return
    }

    setIsProcessing(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))

    // addFunds(depositAmount)
    setIsProcessing(false)
    setShowSuccess(true)
    setAmount('')

    setTimeout(() => setShowSuccess(false), 3000)
  }

  const handleWithdraw = async () => {
    setError('')
    const withdrawAmount = parseFloat(amount)

    if (!withdrawAmount || withdrawAmount <= 0) {
      setError('Please enter a valid amount')
      return
    }

    const method = paymentMethods.find(m => m.id === selectedMethod)
    if (method && withdrawAmount < method.minAmount) {
      setError(`Minimum withdrawal amount is ${formatCurrency(method.minAmount)}`)
      return
    }

    // if (true) {
    setError('Insufficient balance')
    return
    // }

    // setIsProcessing(true)

    // const success = true //await withdrawFunds(withdrawAmount)
    // setIsProcessing(false)

    // if (success) {
    //   setShowSuccess(true)
    //   setAmount('')
    //   setTimeout(() => setShowSuccess(false), 3000)
    // } else {
    //   setError('Withdrawal failed. Please try again.')
    // }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className='lg:col-span-2'
    >
      <Tabs.Root
        value={activeTab}
        onValueChange={tab => {
          setError('')
          setShowSuccess(false)
          setActiveTab(tab)
        }}
        className='w-full'
      >
        <Tabs.List className='mb-6 grid w-full grid-cols-2 border border-white/5 p-1'>
          <Tabs.Trigger
            value='deposit'
            className='data-[state=active]:bg-primary text-gray-400 data-[state=active]:text-black'
          >
            <ArrowDownIcon className='mr-2 size-4' />
            Deposit
          </Tabs.Trigger>
          <Tabs.Trigger
            value='withdraw'
            className='data-[state=active]:bg-primary text-gray-400 data-[state=active]:text-black'
          >
            <ArrowUpIcon className='mr-2 size-4' />
            Withdraw
          </Tabs.Trigger>
        </Tabs.List>

        <AnimatePresence mode='wait'>
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Tabs.Content value='deposit' className='mt-0'>
              <div className='bg-dark/40 rounded-2xl border border-white/5 p-6'>
                <h2 className='mb-6 text-xl font-bold text-white'>Add Funds</h2>

                {/* Payment Methods */}
                <div className='mb-6 grid grid-cols-2 gap-3'>
                  {paymentMethods.map(method => (
                    <button
                      type='button'
                      key={method.id}
                      onClick={() => setSelectedMethod(method.id)}
                      className={`rounded-xl border p-4 text-left transition-all ${
                        selectedMethod === method.id
                          ? 'border-primary bg-primary/10'
                          : 'bg-dark border-white/10 hover:border-white/30'
                      }`}
                    >
                      <method.icon
                        className={`mb-2 h-6 w-6 ${
                          selectedMethod === method.id ? 'text-primary' : 'text-gray-400'
                        }`}
                      />
                      <div className='text-sm font-medium text-white'>{method.name}</div>
                      <div className='text-xs text-gray-500'>{method.description}</div>
                    </button>
                  ))}
                </div>

                {/* Amount Selection */}
                <div className='mb-6'>
                  <Label className='mb-3 block text-sm text-gray-400'>Select Amount</Label>
                  <div className='mb-4 grid grid-cols-3 gap-2 sm:grid-cols-6'>
                    {quickAmounts.map(amt => (
                      <button
                        type='button'
                        key={amt}
                        onClick={() => handleAmountSelect(amt)}
                        className={`rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                          amount === amt.toString()
                            ? 'bg-primary text-black'
                            : 'bg-dark border border-white/10 text-gray-400 hover:text-white'
                        }`}
                      >
                        €{amt}
                      </button>
                    ))}
                  </div>
                  <Input
                    type='number'
                    placeholder='Or enter custom amount'
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                    className='bg-dark focus:border-primary border-white/10 text-white placeholder:text-gray-600'
                  />
                </div>

                {/* Error Message */}
                {error && (
                  <div className='mb-4 flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 p-3'>
                    <AlertCircleIcon className='h-4 w-4 text-red-400' />
                    <span className='text-sm text-red-400'>{error}</span>
                  </div>
                )}

                {/* Success Message */}
                {showSuccess && (
                  <div className='mb-4 flex items-center gap-2 rounded-lg border border-green-500/30 bg-green-500/10 p-3'>
                    <CheckCircle2Icon className='h-4 w-4 text-green-400' />
                    <span className='text-sm text-green-400'>Deposit successful!</span>
                  </div>
                )}

                <button
                  onClick={handleDeposit}
                  disabled={isProcessing}
                  type='button'
                  className='group/button bg-primary hover:shadow-glow-lg text-primary-foreground relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-full px-10 py-4 text-base font-bold tracking-wide uppercase transition-all duration-300'
                >
                  <div className='from-primary to-primary absolute inset-0 bg-linear-to-r via-white/30 opacity-0 transition-opacity duration-500 group-hover/button:opacity-100' />
                  <div className='absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/40 to-transparent transition-transform duration-1000 group-hover/button:translate-x-full' />
                  {isProcessing ? (
                    <div className='relative flex items-center'>
                      <Loader2Icon className='mr-2 size-5 animate-spin' />
                      Processing...
                    </div>
                  ) : (
                    <span className='relative'>Deposit</span>
                  )}
                </button>
                <p className='mt-4 text-center text-xs text-gray-500'>
                  Processing time:{' '}
                  {paymentMethods.find(m => m.id === selectedMethod)?.processingTime}
                </p>
              </div>
            </Tabs.Content>

            <Tabs.Content value='withdraw' className='mt-0'>
              <div className='rounded-2xl border border-white/10 bg-[#141414] p-6'>
                <h2 className='mb-6 text-xl font-bold text-white'>Withdraw Funds</h2>

                {/* Payment Methods */}
                <div className='mb-6 grid grid-cols-2 gap-3'>
                  {paymentMethods.map(method => (
                    <button
                      type='button'
                      key={method.id}
                      onClick={() => setSelectedMethod(method.id)}
                      className={`rounded-xl border p-4 text-left transition-all ${
                        selectedMethod === method.id
                          ? 'border-primary bg-primary/10'
                          : 'bg-dark border-white/10 hover:border-white/30'
                      }`}
                    >
                      <method.icon
                        className={`mb-2 h-6 w-6 ${
                          selectedMethod === method.id ? 'text-primary' : 'text-gray-400'
                        }`}
                      />
                      <div className='text-sm font-medium text-white'>{method.name}</div>
                      <div className='text-xs text-gray-500'>{method.description}</div>
                    </button>
                  ))}
                </div>

                {/* Amount Input */}
                <div className='mb-6'>
                  <Label className='mb-3 block text-sm text-gray-400'>Amount</Label>
                  <div className='relative'>
                    <Input
                      type='number'
                      placeholder='Enter amount'
                      value={amount}
                      onChange={e => setAmount(e.target.value)}
                      className='bg-dark focus:border-primary border-white/10 pr-20 text-white placeholder:text-gray-600'
                    />
                    <button
                      type='button'
                      // onClick={() => setAmount(user?.balance.toString() || '0')}
                      className='text-primary hover:text-primary-400 absolute top-1/2 right-2 -translate-y-1/2 text-xs font-medium'
                    >
                      MAX
                    </button>
                  </div>
                </div>

                {/* Withdrawal Info */}
                <div className='bg-dark mb-6 space-y-2 rounded-xl p-4'>
                  <div className='flex items-center gap-2 text-sm text-gray-400'>
                    <ClockIcon className='h-4 w-4' />
                    Processing time:{' '}
                    {paymentMethods.find(m => m.id === selectedMethod)?.processingTime}
                  </div>
                  <div className='flex items-center gap-2 text-sm text-gray-400'>
                    <ArrowRightLeftIcon className='h-4 w-4' />
                    Min:{' '}
                    {formatCurrency(
                      paymentMethods.find(m => m.id === selectedMethod)?.minAmount || 0
                    )}
                  </div>
                  <div className='flex items-center gap-2 text-sm text-gray-400'>
                    <ArrowRightLeftIcon className='h-4 w-4' />
                    Max:{' '}
                    {formatCurrency(
                      paymentMethods.find(m => m.id === selectedMethod)?.maxAmount || 0
                    )}
                    /day
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className='mb-4 flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 p-3'>
                    <AlertCircleIcon className='h-4 w-4 text-red-400' />
                    <span className='text-sm text-red-400'>{error}</span>
                  </div>
                )}

                {/* Success Message */}
                {showSuccess && (
                  <div className='mb-4 flex items-center gap-2 rounded-lg border border-green-500/30 bg-green-500/10 p-3'>
                    <CheckCircle2Icon className='h-4 w-4 text-green-400' />
                    <span className='text-sm text-green-400'>Withdrawal request submitted!</span>
                  </div>
                )}

                <button
                  onClick={handleWithdraw}
                  disabled={isProcessing}
                  type='button'
                  className='group/button bg-primary hover:shadow-glow-lg text-primary-foreground relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-full px-10 py-4 text-base font-bold tracking-wide uppercase transition-all duration-300'
                >
                  <div className='from-primary to-primary absolute inset-0 bg-linear-to-r via-white/30 opacity-0 transition-opacity duration-500 group-hover/button:opacity-100' />
                  <div className='absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/40 to-transparent transition-transform duration-1000 group-hover/button:translate-x-full' />
                  {isProcessing ? (
                    <div className='relative'>
                      <Loader2Icon className='mr-2 size-5 animate-spin' />
                      Processing...
                    </div>
                  ) : (
                    <span className='relative'>Request Withdrawal</span>
                  )}
                </button>
              </div>
            </Tabs.Content>
          </motion.div>
        </AnimatePresence>
      </Tabs.Root>
    </motion.div>
  )
}
