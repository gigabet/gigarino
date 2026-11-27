import '@/app/globals.css'

export function Glossy(props: { label?: string }) {
  return (
    <div className='-m-4 h-screen w-screen bg-slate-200 p-4'>
      <div className='relative isolate inline-block'>
        <button
          type='button'
          className='relative z-1 rounded-lg bg-neutral-100 px-3 py-2 backdrop-blur-md'
        >
          {props.label ?? 'Glossy'}
        </button>
        <div className='absolute -top-0.75 left-0 z-0 size-full scale-y-98 rounded-lg bg-white' />
      </div>
    </div>
  )
}
