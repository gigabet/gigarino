import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import ProviderList from '@/app/casino/providers/provider-list'
import { providersQuery } from '@/app/context'

export default async function Providers() {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['providers'],
    queryFn: providersQuery,
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProviderList />
    </HydrationBoundary>
  )
}
