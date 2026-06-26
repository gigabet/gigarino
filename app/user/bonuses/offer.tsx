'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { format, formatDistanceToNowStrict } from 'date-fns'
import { ChevronRight, Loader2Icon } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { claimBonusMutation } from '@/app/user/context'
import { Button, buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import * as Dialog from '@/components/ui/dialog'
import { Progress } from '@/components/ui/progress'
import { addToDate, cn, formatBalance, formatBalanceBasic } from '@/lib/utils'
import placeholder from '@/public/images/freebet-active.jpg'
import type {
  DepositMatchPromotion,
  FreespinGrantPromotion,
  LossCashbackPromotion,
  PlayerClaimResponseDto,
} from '@/types'

type OfferProps = (DepositMatchPromotion | FreespinGrantPromotion | LossCashbackPromotion) & {
  claim?: PlayerClaimResponseDto | null
}

export default function Offer({ claim, ...props }: OfferProps) {
  const [open, setOpen] = useState(false)

  const qc = useQueryClient()
  const offerMt = useMutation({
    mutationFn: claimBonusMutation,
    onSuccess: () => {
      setOpen(false)
      qc.invalidateQueries({ queryKey: ['promotions_feed'] })
    },
  })

  return (
    <Dialog.Root open={open} onOpenChange={() => setOpen(!open)}>
      <Dialog.Trigger asChild>
        <Card
          // data-claimed={claim?.status}
          // className='group bg-dark-200 data-[claimed=PENDING_TRIGGER]:border-accent data-[claimed=ACTIVE]:border-primary data-[claimed=PENDING_TRIGGER]:shadow-accent data-[claimed=ACTIVE]:shadow-primary @container cursor-pointer gap-0 overflow-clip p-0 transition-transform duration-300 hover:scale-103 data-claimed:shadow-[0_0_6px]'
          className={cn(
            'group bg-dark-200 @container cursor-pointer gap-0 overflow-clip p-0 transition-transform duration-300 hover:scale-103 data-claimed:shadow-[0_0_6px]',
            claim?.status === 'PENDING_TRIGGER' && 'border-accent shadow-accent shadow-[0_0_6px]',
            claim?.status === 'ACTIVE' && 'border-primary shadow-primary shadow-[0_0_6px]',
            claim?.status === 'EXPIRED' && 'grayscale'
          )}
        >
          <CardContent className='relative isolate p-0'>
            <div className='relative aspect-8/9 w-1/2 overflow-hidden'>
              <Image
                src={props.imageUrl ?? placeholder}
                alt={props.name}
                fill
                sizes='(max-width: 600px) 50vw, 25vw'
                className='size-full object-cover'
              />
            </div>
            <div className='absolute inset-0 bg-linear-to-r from-transparent from-30% via-black via-50% to-black to-55%' />
            <CardHeader className='absolute top-0 right-1 flex h-full w-1/2 flex-col items-center justify-center text-center'>
              <CardTitle className='scale-120 text-sm leading-tight uppercase'>
                {props.name}
              </CardTitle>
              {getDesc(props, claim).summary}
              {!claim && (
                <div
                  className={cn(
                    buttonVariants({ size: 'sm' }),
                    'pointer-events-none mt-2 text-xs font-semibold uppercase'
                  )}
                >
                  Claim now <ChevronRight className='-ml-1' />
                </div>
              )}
            </CardHeader>
          </CardContent>
        </Card>
      </Dialog.Trigger>
      <Dialog.Content
        className={cn(
          'data-claimed:border-accent data-claimed:shadow-accent w-full! max-w-3xl! gap-0 overflow-hidden p-0',
          claim?.status === 'PENDING_TRIGGER' &&
            'border-accent/70 shadow-accent/70 shadow-[0_0_24px]',
          claim?.status === 'ACTIVE' && 'border-primary/60 shadow-primary/50 shadow-[0_0_24px]',
          claim?.status === 'EXPIRED' && 'grayscale'
        )}
        aria-describedby={undefined}
      >
        <Dialog.Header className='relative'>
          <Dialog.Title className='bg-dark-200 px-6 py-4 text-center'>{props.name}</Dialog.Title>
        </Dialog.Header>
        <div className='flex flex-nowrap'>
          <div className='relative aspect-8/9 flex-2 overflow-hidden'>
            <Image
              src={props.imageUrl ?? placeholder}
              alt={props.name}
              fill
              sizes='(max-width: 600px) 50vw, 25vw'
              className='size-full object-cover'
            />
          </div>
          <div className='w-full flex-3 px-6 py-4'>
            {getDesc(props, claim).body}
            {/* TODO: fail to claim error */}
            {!claim && (
              <>
                <Button
                  className='mb-2 w-full'
                  onClick={() => offerMt.mutate(props.id)}
                  disabled={offerMt.isPending}
                >
                  {offerMt.isPending ? (
                    <>
                      <Loader2Icon className='animate-spin' />
                      Claiming...
                    </>
                  ) : (
                    'Claim offer'
                  )}
                </Button>
                <Dialog.Close className='text-foreground/70 w-full text-center text-sm underline-offset-2 hover:underline'>
                  Maybe later
                </Dialog.Close>
              </>
            )}
          </div>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  )
}

// TODO: Ready to collect dialogs
const getDesc = (
  offer: DepositMatchPromotion | FreespinGrantPromotion | LossCashbackPromotion,
  claim?: PlayerClaimResponseDto | null
) => {
  if (offer.type === 'FREESPIN_GRANT')
    return {
      summary: (
        <div className='flex items-center justify-between text-xs'>
          <div className='text-primary'>
            {formatBalance(Number(offer.rules.resolvedStake?.perSpinAmount))} each
          </div>
          {offer.validUntil && (
            <div className='text-foreground/70'>expires {format(offer.validUntil, 'dd MMM y')}</div>
          )}
        </div>
      ),
      body: (
        <div className=''>
          <h2 className='text-accent mb-2 text-sm font-bold tracking-wider uppercase'>
            Bonus Details
          </h2>
          <Card className='mb-6 bg-black'>
            <CardContent>
              <ul className='text-card-foreground/60 space-y-3 text-sm'>
                <li>
                  The bonus includes <span className='text-primary'>{offer.rules.quantity}</span>{' '}
                  freespins for the game{' '}
                  <span className='text-primary'>{offer.name.match(/spins for (.*)$/)?.[1]}</span>.
                </li>
                <li>
                  Each freespin is worth{' '}
                  <span className='text-primary'>
                    {formatBalance(Number(offer.rules.resolvedStake?.perSpinAmount))}
                  </span>
                  .
                </li>
                {offer.validUntil && (
                  <li>
                    The offer is valid until{' '}
                    <span className='text-primary'>{format(offer.validUntil, 'dd MMM y')}</span>.
                  </li>
                )}
                {offer.rules.wagering?.bonusMultiplier && (
                  <li>
                    You must bet a total of{' '}
                    <span className='text-primary'>
                      {formatBalance(
                        Number(offer.rules.resolvedStake?.perSpinAmount) *
                          offer.rules.quantity *
                          offer.rules.wagering.bonusMultiplier
                      )}
                    </span>{' '}
                    before you can withdraw your bonus winnings.
                  </li>
                )}
              </ul>
            </CardContent>
          </Card>
        </div>
      ),
    }
  if (offer.type === 'LOSS_CASHBACK') {
    const date = claim
      ? addToDate(claim.claimedAt, offer.rules.window.duration, offer.rules.window.unit)
      : new Date(0)

    return {
      summary: (
        <>
          {!claim && (
            <p className='text-foreground/70 mt-2 text-xs text-nowrap uppercase'>
              Reclaim your losses
              <br />
              in the next {offer.rules.window.duration} {offer.rules.window.unit.toLowerCase()}
            </p>
          )}

          {claim && (
            <div className='my-2 flex flex-col'>
              <span className='text-foreground/70 text-xs tracking-wider text-nowrap uppercase'>
                Reclaimed
              </span>
              <span
                className={cn(
                  'text-accent text-lg leading-tight font-semibold',
                  claim.status === 'ACTIVE' && 'text-primary'
                )}
              >
                {formatBalance(Number(claim.bonusBalance))}
              </span>
            </div>
          )}

          {claim?.status === 'PENDING_TRIGGER' && (
            <div
              className={cn(
                buttonVariants({ size: 'sm' }),
                'bg-accent text-accent-foreground pointer-events-none text-xs font-semibold uppercase'
              )}
            >
              {Date.parse(date.toISOString()) < Date.now()
                ? 'Expired'
                : `${formatDistanceToNowStrict(date)} left`}
            </div>
          )}

          {claim?.status === 'ACTIVE' && (
            <div className='flex w-full flex-col items-center gap-1.5'>
              <Progress
                value={(Number(claim.wageringProgress) / Number(claim.wageringRequired)) * 100}
              />
              <div className='text-foreground text-center text-xs leading-none text-nowrap'>
                bet{' '}
                <span className='text-primary'>
                  {formatBalance(Number(claim.wageringRequired) - Number(claim.wageringProgress))}
                </span>{' '}
                to unlock
              </div>
            </div>
          )}
        </>
      ),
      body: (
        <>
          <section className='mb-8'>
            <h2 className='text-accent mb-3 text-sm font-bold tracking-wider uppercase'>
              {claim ? 'Offer Claimed' : 'Overview'}
            </h2>
            <div>
              {!claim && (
                <p className='mb-2 text-sm'>
                  Claim this offer, then receive{' '}
                  <span className='font-semibold'>{offer.rules.cashbackPct}%</span> of your losses
                  in the next
                  {offer.rules.window.duration} {offer.rules.window.unit.toLowerCase()} as bonus
                  credit
                  {offer.rules.caps.maxBonusPerPlayerLifetime &&
                    `, up to ${formatBalance(Number(offer.rules.caps.maxBonusPerPlayerLifetime))}`}
                  .
                </p>
              )}
              {claim?.status === 'PENDING_TRIGGER' && (
                <p className='mb-2 text-sm'>
                  Accummulating <span className='font-semibold'>{offer.rules.cashbackPct}%</span> of
                  your losses as bonus credit
                  {offer.rules.caps.maxBonusPerPlayerLifetime &&
                    `, up to ${formatBalance(Number(offer.rules.caps.maxBonusPerPlayerLifetime))}`}
                  .
                </p>
              )}
              {claim?.status === 'ACTIVE' && (
                <p className='mb-2 text-sm'>
                  Bet{' '}
                  <span className='text-primary'>
                    {formatBalance(Number(claim.wageringRequired) - Number(claim.wageringProgress))}
                  </span>{' '}
                  more to withdraw your bonus.
                </p>
              )}
              <p className='mb-4 text-sm'>
                Valid for{' '}
                <span className='font-semibold'>
                  {offer.slug.match('-slot-') ? 'Slot and Live Casino' : 'Sport Betting'}
                </span>{' '}
                only.
              </p>
            </div>
            {claim?.status === 'ACTIVE' && (
              <div className='mt-6 mb-10 flex flex-nowrap items-start gap-4'>
                <div className='flex flex-col items-center gap-2'>
                  <span className='text-foreground/70 text-xs tracking-wider text-nowrap uppercase'>
                    Bonus Balance
                  </span>
                  <span className='text-primary text-lg leading-tight font-semibold'>
                    {formatBalance(Number(claim.bonusBalance))}
                  </span>
                </div>
                <div className='flex grow flex-col items-center gap-3'>
                  <span className='text-foreground/70 text-xs tracking-wider text-nowrap uppercase'>
                    Wagering Progress
                  </span>
                  <div className='relative w-full'>
                    <Progress
                      className='h-4'
                      value={
                        (Number(claim.wageringProgress) / Number(claim.wageringRequired)) * 100
                      }
                    />
                    <span className='absolute -bottom-5 w-full text-center text-xs'>
                      {formatBalance(Number(claim.wageringProgress))} /{' '}
                      {formatBalance(Number(claim.wageringRequired))}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {claim?.status === 'PENDING_TRIGGER' && (
              <div className='mt-6 mb-10 flex flex-nowrap items-start gap-4'>
                <div className='flex flex-1 flex-col items-center gap-2'>
                  <span className='text-foreground/70 text-xs tracking-wider text-nowrap uppercase'>
                    Reclaimed
                  </span>
                  <span className='text-accent text-lg leading-tight font-semibold'>
                    {formatBalance(Number(claim.bonusBalance))}
                  </span>
                </div>
                <div className='flex flex-1 flex-col items-center gap-2'>
                  <span className='text-foreground/70 text-xs tracking-wider text-nowrap uppercase'>
                    Time remaining
                  </span>
                  <span className='text-foreground text-lg leading-tight font-semibold'>
                    {Date.parse(date.toISOString()) < Date.now()
                      ? 'Expired'
                      : `${formatDistanceToNowStrict(date)} left`}
                  </span>
                </div>
              </div>
            )}

            {!claim && (
              <div className='mb-8 flex gap-4'>
                <Card className='flex-1 items-center justify-center gap-1 py-4'>
                  <CardDescription className='text-foreground/60'>Duration</CardDescription>
                  <CardTitle>
                    {offer.rules.window.duration} {offer.rules.window.unit.toLowerCase()}
                  </CardTitle>
                </Card>
                {offer.rules.eligibility.minLifetimeDepositAmount && (
                  <Card className='flex-1 items-center justify-center gap-1 py-4'>
                    <CardDescription className='text-foreground/60'>Min deposit</CardDescription>
                    <CardTitle>
                      {formatBalanceBasic(Number(offer.rules.eligibility.minLifetimeDepositAmount))}
                    </CardTitle>
                  </Card>
                )}
                {offer.rules.caps.maxBonusPerClaim && (
                  <Card className='flex-1 items-center justify-center gap-1 py-4'>
                    <CardDescription className='text-foreground/60'>Max bonus</CardDescription>
                    <CardTitle>
                      {formatBalanceBasic(Number(offer.rules.caps.maxBonusPerClaim))}
                    </CardTitle>
                  </Card>
                )}
                {!offer.rules.eligibility.minLifetimeDepositAmount &&
                  !offer.rules.caps.maxBonusPerClaim && (
                    <Card className='flex-1 items-center justify-center gap-1 py-4'>
                      <CardDescription className='text-foreground/60'>Cashback</CardDescription>
                      <CardTitle>{offer.rules.cashbackPct}%</CardTitle>
                    </Card>
                  )}
              </div>
            )}

            <h2 className='text-accent mb-3 text-sm font-bold tracking-wider uppercase'>
              Wagering Requirements
            </h2>
            <Card className='mb-6 p-3'>
              <ul className='space-y-1 text-sm'>
                {!!offer.rules.wagering.bonusMultiplier && (
                  <li>
                    Bonus Multiplier:{' '}
                    <span className='text-primary font-semibold'>
                      &times;{offer.rules.wagering.bonusMultiplier}
                    </span>
                  </li>
                )}
                {!!offer.rules.wagering.principalMultiplier && (
                  <li>
                    Principal Multiplier:{' '}
                    <span className='text-primary font-semibold'>
                      &times;{offer.rules.wagering.principalMultiplier}
                    </span>
                  </li>
                )}
              </ul>
            </Card>
          </section>
          {claim?.status === 'PENDING_TRIGGER' && (
            <div
              className={cn(
                buttonVariants(),
                'bg-accent text-accent-foreground pointer-events-none mb-2 w-full'
              )}
            >
              Accruing Cashback
            </div>
          )}
        </>
      ),
    }
  }
  if (offer.type === 'DEPOSIT_MATCH' && offer.slug.includes('-casino-welcome-bonus-'))
    return {
      summary: (
        <>
          {claim?.status !== 'ACTIVE' && (
            <p className='text-foreground/70 mt-2 text-xs text-nowrap uppercase'>
              double your deposit
              <br />
              up to {formatBalanceBasic(Number(offer.rules.caps.maxBonusPerClaim))}
            </p>
          )}

          {claim?.status === 'ACTIVE' && (
            <>
              <div className='my-2 flex flex-col'>
                <span className='text-foreground/70 text-xs tracking-wider text-nowrap uppercase'>
                  Balance
                </span>
                <span className='text-primary text-lg leading-tight font-semibold'>
                  {formatBalance(Number(claim.bonusBalance))}
                </span>
              </div>
              <div className='flex w-full flex-col items-center gap-1.5'>
                <Progress
                  value={(Number(claim.wageringProgress) / Number(claim.wageringRequired)) * 100}
                />
                <div className='text-foreground text-center text-xs leading-none text-nowrap'>
                  bet{' '}
                  <span className='text-primary'>
                    {formatBalance(Number(claim.wageringRequired) - Number(claim.wageringProgress))}
                  </span>{' '}
                  to unlock
                </div>
              </div>
            </>
          )}

          {claim?.status === 'PENDING_TRIGGER' && (
            <div
              className={cn(
                buttonVariants({ size: 'sm' }),
                'bg-accent text-accent-foreground pointer-events-none mt-2 text-xs font-semibold uppercase'
              )}
            >
              Awaiting deposit
            </div>
          )}
        </>
      ),
      body: (
        <>
          <section className='mb-8'>
            <h2 className='text-accent mb-3 text-sm font-bold tracking-wider uppercase'>
              {claim ? 'Offer Claimed' : 'Overview'}
            </h2>
            <div>
              {!claim && (
                <p className='mb-2 text-sm'>
                  Claim this offer, then make a deposit to receive{' '}
                  <span className='text-primary'>{offer.rules.matchPct}%</span> of your deposit as
                  bonus credit.
                </p>
              )}
              {claim?.status === 'PENDING_TRIGGER' && (
                <p className='mb-2 text-sm'>
                  Make a deposit to receive{' '}
                  <span className='text-primary'>{offer.rules.matchPct}%</span> of your deposit as
                  bonus credit.
                </p>
              )}
              {claim?.status === 'ACTIVE' && (
                <p className='mb-2 text-sm'>
                  Bet{' '}
                  <span className='text-primary'>
                    {formatBalance(Number(claim.wageringRequired) - Number(claim.wageringProgress))}
                  </span>{' '}
                  more to withdraw your bonus.
                </p>
              )}
              <p className='mb-4 text-sm'>
                Valid for <span className='font-semibold'>Slot and Live Casino</span> only.
              </p>
            </div>
            {claim?.status === 'ACTIVE' ? (
              <div className='mt-6 mb-10 flex flex-nowrap items-start gap-4'>
                <div className='flex flex-col items-center gap-2'>
                  <span className='text-foreground/70 text-xs tracking-wider text-nowrap uppercase'>
                    Bonus Balance
                  </span>
                  <span className='text-primary text-lg leading-tight font-semibold'>
                    {formatBalance(Number(claim.bonusBalance))}
                  </span>
                </div>
                <div className='flex grow flex-col items-center gap-3'>
                  <span className='text-foreground/70 text-xs tracking-wider text-nowrap uppercase'>
                    Wagering Progress
                  </span>
                  <div className='relative w-full'>
                    <Progress
                      className='h-4'
                      value={
                        (Number(claim.wageringProgress) / Number(claim.wageringRequired)) * 100
                      }
                    />
                    <span className='absolute -bottom-5 w-full text-center text-xs'>
                      {formatBalance(Number(claim.wageringProgress))} /{' '}
                      {formatBalance(Number(claim.wageringRequired))}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className='mb-8 flex gap-4'>
                <Card className='flex-1 items-center justify-center gap-1 py-4'>
                  <CardDescription className='text-foreground/60'>Min deposit</CardDescription>
                  <CardTitle>
                    {formatBalanceBasic(Number(offer.rules.triggerGuard.minAmount))}
                  </CardTitle>
                </Card>
                <Card className='flex-1 items-center justify-center gap-1 py-4'>
                  <CardDescription className='text-foreground/60'>Max bonus</CardDescription>
                  <CardTitle>
                    {formatBalanceBasic(Number(offer.rules.caps.maxBonusPerClaim))}
                  </CardTitle>
                </Card>
              </div>
            )}
            <h2 className='text-accent mb-3 text-sm font-bold tracking-wider uppercase'>
              Wagering Requirements
            </h2>
            <Card className='mb-6 p-3'>
              <ul className='space-y-1 text-sm'>
                {offer.rules.wagering.bonusMultiplier && (
                  <li>
                    Bonus Multiplier:{' '}
                    <span className='text-primary font-semibold'>
                      &times;{offer.rules.wagering.bonusMultiplier}
                    </span>
                  </li>
                )}
                {offer.rules.wagering.principalMultiplier && (
                  <li>
                    Principal Multiplier:{' '}
                    <span className='text-primary font-semibold'>
                      &times;{offer.rules.wagering.principalMultiplier}
                    </span>
                  </li>
                )}
              </ul>
            </Card>
          </section>
          {claim?.status === 'PENDING_TRIGGER' && (
            <div
              className={cn(
                buttonVariants(),
                'bg-accent text-accent-foreground pointer-events-none mb-2 w-full'
              )}
            >
              Awaiting deposit
            </div>
          )}
        </>
      ),
    }
  return {}
}
