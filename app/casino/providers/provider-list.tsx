'use client'

import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import { providersQuery } from '@/app/context'

export default function ProviderList() {
  const { data } = useQuery({
    queryKey: ['providers'],
    queryFn: providersQuery,
  })

  return (
    <div className='mx-auto max-w-(--breakpoint-2xl) px-8 py-6'>
      <h2 className='mb-4 text-lg font-semibold text-gray-200'>Providers</h2>
      <div className='flex flex-wrap gap-4'>
        {data?.map(prov => (
          <Link
            key={prov.providerSlug}
            href={`/casino/providers/${prov.providerSlug}`}
            className='group w-40 shrink-0 sm:w-60'
          >
            <div className='relative mb-2 aspect-22/10 overflow-hidden rounded-xl bg-black/20 px-2'>
              {/* Provider Image */}
              <div className='relative h-full w-full'>
                <Image
                  src={`/images/providers/${prov.providerSlug}.png`}
                  alt={prov.name}
                  // width={360}
                  // height={164}
                  // objectPosition='50% 50%'
                  fill
                  objectFit='contain'
                />
              </div>
              {/* Hover Overlay */}
              <div className='absolute inset-0 bg-gray-900/0 transition-colors group-hover:bg-gray-900/30' />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
