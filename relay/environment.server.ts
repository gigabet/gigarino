// src/relay/environment.server.ts

import { cache } from 'react'
import { createServerEnvironment, type ServerEnvironment } from 'react-relay/rsc_EXPERIMENTAL'
import { Environment, Network, RecordSource, Store } from 'relay-runtime'
import { fetchOrSubscribe } from '@/relay/environment.client' // export this, don't export the singleton getter

// A fresh IEnvironment factory — NOT the browser singleton.
function createFreshEnvironment() {
  return new Environment({
    network: Network.create(fetchOrSubscribe, fetchOrSubscribe),
    store: new Store(new RecordSource()),
    isServer: true,
  })
}

// `cache()` scopes this to a single request's render lifecycle in RSC.
// Calling getServerEnvironment() multiple times within the same request
// returns the same instance; a new request gets a brand new one.
export const getServerEnvironment = cache((): ServerEnvironment => {
  return createServerEnvironment(createFreshEnvironment)
})
