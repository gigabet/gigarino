import Tournament from '@/app/sport/[[...slug]]/tournament'

export default function PrematchList() {
  return (
    <div className='mt-2 space-y-8'>
      <Tournament />
      <Tournament />
      <Tournament />
      <Tournament />
    </div>
  )
}
