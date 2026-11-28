'use client'

/** Fixed-size slot, so nothing shifts when the serve changes sides. */
export function ServeDot(props: { active: boolean }) {
  return (
    <span
      role={props.active ? 'img' : undefined}
      aria-hidden={props.active ? undefined : true}
      className='flex size-2 shrink-0 items-center justify-center'
    >
      {props.active && (
        <span className='bg-primary glow-xs size-1.5 rounded-full' />
      )}
    </span>
  )
}
