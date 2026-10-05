'use client'
import Image from 'next/image'
import { initials, stringToHue } from '@/lib/utils'

/** Hash-based colored initials avatar — gives every matchup its own
 * identity without real team logos or thumbnail-style imagery. */
export function TeamBadge(props: { name: string; imageUrl?: string | null }) {
  const hue = stringToHue(props.name)

  if (props.imageUrl)
    return <Image src={props.imageUrl} alt='' className='size-6' width={24} height={24} />
  return (
    <div
      className='flex size-6 min-w-6 shrink-0 items-center justify-center rounded-full text-[0.55rem] font-bold text-white'
      style={{
        background: `linear-gradient(135deg, hsl(${hue} 70% 42%), hsl(${(hue + 40) % 360} 70% 30%))`,
        boxShadow: `0 0 8px hsla(${hue}, 70%, 55%, 0.35)`,
      }}
    >
      {initials(props.name)}
    </div>
  )
}
