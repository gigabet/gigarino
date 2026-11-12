import { cn } from '@/lib/utils'

const MAX = 9

/** Small unread counter. Renders nothing at 0. Position it with `className`. */
export function CountBadge(props: { count: number; className?: string }) {
  if (props.count <= 0) return null

  return (
    <span
      className={cn(
        'bg-destructive flex h-4 min-w-4 shrink-0 items-center justify-center rounded-full px-1 text-[0.6rem] leading-none font-bold text-white normal-case',
        props.className
      )}
    >
      {props.count > MAX ? `${MAX}+` : props.count}
    </span>
  )
}
