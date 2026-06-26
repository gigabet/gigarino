'use client'

import type { ReactNode } from 'react'
import { RelayEnvironmentProvider } from 'react-relay'
import { getClientEnvironment } from '@/relay/environment.client'

export function RelayProvider({ children }: { children: ReactNode }) {
  const env = getClientEnvironment()
  return <RelayEnvironmentProvider environment={env}>{children}</RelayEnvironmentProvider>
}
