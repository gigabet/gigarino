import { useMutation } from '@tanstack/react-query'
import { format } from 'date-fns'
import Image from 'next/image'
import { claimBonusMutation } from '@/app/user/context'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import * as Dialog from '@/components/ui/dialog'
import { formatBalance } from '@/lib/utils'
import placeholder from '@/public/images/freebet-active.jpg'
import type {
  DepositMatchPromotion,
  FreespinGrantPromotion,
  LossCashbackPromotion,
  User,
} from '@/types'

export default function Offer({
  user,
  ...props
}: (DepositMatchPromotion | FreespinGrantPromotion | LossCashbackPromotion) & {
  user: User
}) {
  const offerMt = useMutation({
    mutationFn: claimBonusMutation,
  })

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Card className='group relative overflow-clip p-0 transition-transform duration-300 hover:scale-102'>
          <div className='relative aspect-video overflow-hidden'>
            <Image
              src={placeholder}
              alt='placeholder'
              fill
              sizes='(max-width: 1024px) 50vw, 25vw'
              className='size-full object-cover'
            />
          </div>
          <div className='absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent opacity-90' />
          <CardHeader className='absolute bottom-0 left-0 w-full py-4'>
            <CardTitle>{props.name}</CardTitle>
            {getDesc(props).summary}
          </CardHeader>
        </Card>
      </Dialog.Trigger>
      <Dialog.Content className='overflow-hidden p-0'>
        <Dialog.Header className='relative'>
          <div className='relative aspect-3/1 overflow-hidden'>
            <Image
              src={placeholder}
              alt='placeholder'
              fill
              sizes='(max-width: 1024px) 50vw, 25vw'
              className='h-30 w-full object-cover'
            />
          </div>
          <div className='absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent opacity-90' />
          <Dialog.Title className='absolute bottom-3 px-6 text-xl'>{props.name}</Dialog.Title>
        </Dialog.Header>
        <div className='px-6 pb-6'>
          {getDesc(props).body}

          <Button className='mb-2 w-full' onClick={() => offerMt.mutate(props.id)}>
            Claim offer
          </Button>
          <Dialog.Close className='text-foreground/70 w-full text-center text-sm underline-offset-2 hover:underline'>
            Maybe later
          </Dialog.Close>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  )
}

const getDesc = (offer: DepositMatchPromotion | FreespinGrantPromotion | LossCashbackPromotion) => {
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
        // rules: {
        //   eligibility: {
        //     minAccountAgeDays: data?.minAccountAgeDays,
        //     newPlayersWithinDays: data?.newPlayersWithinDays,
        //     minLifetimeDepositAmount: data?.minLifetimeDepositAmount ?? '0',
        //   },
        //   wagering: {
        //     bonusMultiplier: data.bonusMultiplier,
        //     principalMultiplier: data.principalMultiplier,
        //     contributions: [
        //       {
        //         category: 'SLOT',
        //         contributionPct: 100,
        //       },
        //     ],
        //   },
        //   caps: {},
        // },
      ),
    }
  if (offer.type === 'LOSS_CASHBACK' && offer.slug.includes('-slot-cashback-'))
    return {
      summary: (
        <CardDescription className='text-xs'>
          of sport betting losses in the last{' '}
          <strong>
            {offer.rules.window.duration} {offer.rules.window.unit.toLowerCase()}
          </strong>
          {offer.rules.caps.maxBonusPerPlayerLifetime && (
            <>
              , up to <strong>{offer.rules.caps.maxBonusPerPlayerLifetime}</strong> per player
            </>
          )}
          .
        </CardDescription>
      ),
    }
  if (offer.type === 'LOSS_CASHBACK' && offer.slug.includes('-sport-cashback-'))
    return {
      summary: (
        <CardDescription className='text-xs'>
          of slot losses in the last{' '}
          <strong>
            {offer.rules.window.duration} {offer.rules.window.unit.toLowerCase()}
          </strong>
          {offer.rules.caps.maxBonusPerPlayerLifetime && (
            <>
              , up to <strong>{offer.rules.caps.maxBonusPerPlayerLifetime}</strong> per player
            </>
          )}
          .
        </CardDescription>
      ),
    }
  if (offer.type === 'DEPOSIT_MATCH' && offer.slug.includes('-casino-welcome-bonus-'))
    return {
      summary: (
        <CardDescription className='text-xs'>
          when depositing{' '}
          <strong>{formatBalance(Number(offer.rules.triggerGuard.minAmount))}</strong> or more, up
          to <strong>{formatBalance(Number(offer.rules.caps.maxBonusPerClaim))}</strong>.
        </CardDescription>
      ),
    }
  return {}
}
