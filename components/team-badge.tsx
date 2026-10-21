'use client'
import Image from 'next/image'
import { useState } from 'react'
import { cn, initials, stringToHue } from '@/lib/utils'

export function TeamBadge(props: { name: string; imageUrl?: string | null; className?: string }) {
  const [failed, setFailed] = useState(false)
  const hue = stringToHue(props.name)

  if (props.imageUrl && !failed)
    return (
      <Image
        src={props.imageUrl}
        alt=''
        width={80}
        height={80}
        onError={() => setFailed(true)}
        className={cn('size-6 min-w-6 shrink-0 object-contain', props.className)}
      />
    )

  return (
    <div
      className={cn(
        'flex size-6 min-w-6 shrink-0 items-center justify-center rounded-full text-[0.55rem] font-bold text-white',
        props.className
      )}
      style={{
        background: `linear-gradient(135deg, hsl(${hue} 70% 42%), hsl(${(hue + 40) % 360} 70% 30%))`,
        boxShadow: `0 0 8px hsla(${hue}, 70%, 55%, 0.35)`,
      }}
    >
      {initials(props.name)}
    </div>
  )
}
