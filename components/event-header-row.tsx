export function EventHeaderRow(props: { left: React.ReactNode; favourite: React.ReactNode }) {
  return (
    <div className='text-secondary flex items-center gap-2 text-xs uppercase'>
      <div className='flex min-w-0 flex-1 items-center gap-x-2'>{props.left}</div>
      <div className='-my-2 -mr-2 shrink-0'>{props.favourite}</div>
    </div>
  )
}
