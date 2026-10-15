'use client'

import { useSetAtom } from 'jotai'
import { useCallback } from 'react'
import { graphql, useMutation } from 'react-relay'
import { ConnectionHandler, type RecordSourceSelectorProxy } from 'relay-runtime'
import { toast } from 'sonner'
import { loginDialogOpenAtom } from '@/components/login-dialog'
import { useT, useUser } from '@/context/providers'
import { isAuthError } from '@/lib/utils'
import type { FavouritesSetEventFavouriteMutation } from '@/relay/__generated__/FavouritesSetEventFavouriteMutation.graphql'

// keys of the @connection fields in the two favourites lists
export const FAVOURITES_CONNECTION_KEY = 'FavouriteEvents_events'
export const FAVOURITE_LIVE_CONNECTION_KEY = 'FavouriteLiveEvents_favouriteLiveEvents'

function syncFavouriteLists(store: RecordSourceSelectorProxy, eventId: string, favourite: boolean) {
  const event = store.get(eventId)
  if (!event) return

  // live events go in the live list, everything else in the prematch list
  const key = event.getValue('isLive') ? FAVOURITE_LIVE_CONNECTION_KEY : FAVOURITES_CONNECTION_KEY
  const connection = ConnectionHandler.getConnection(store.getRoot(), key, { favourites: true })
  if (!connection) return // list not mounted/loaded; it will fetch fresh data when it is

  if (!favourite) {
    ConnectionHandler.deleteNode(connection, eventId)
    return
  }

  const exists = connection
    .getLinkedRecords('edges')
    ?.some(e => e?.getLinkedRecord('node')?.getDataID() === eventId)
  if (exists) return // updater runs again after the server response

  const edge = ConnectionHandler.createEdge(store, connection, event, 'EventEdge')
  ConnectionHandler.insertEdgeBefore(connection, edge)
}

export function useToggleFavourite() {
  const [commit] = useMutation<FavouritesSetEventFavouriteMutation>(graphql`
    mutation FavouritesSetEventFavouriteMutation($eventId: ID!, $favourite: Boolean!) {
      setEventFavourite(eventId: $eventId, favourite: $favourite) {
        id
        isFavourite
        isLive
      }
    }
  `)
  const { user, clearUser } = useUser()
  const setLoginOpen = useSetAtom(loginDialogOpenAtom)
  const t = useT()

  return useCallback(
    (event: { id: string; isFavourite: boolean; isLive: boolean }) => {
      if (!user) {
        setLoginOpen(true)
        return
      }

      const favourite = !event.isFavourite
      commit({
        variables: { eventId: event.id, favourite },
        optimisticResponse: {
          setEventFavourite: { id: event.id, isFavourite: favourite, isLive: event.isLive },
        },
        optimisticUpdater: store => syncFavouriteLists(store, event.id, favourite),
        updater: store => syncFavouriteLists(store, event.id, favourite),
        // relay rolls the optimistic change back automatically on error
        onError: err => {
          if (isAuthError(err)) {
            clearUser()
            setLoginOpen(true)
          } else {
            toast.error(t('Could not update favourites.'))
          }
        },
      })
    },
    [commit, user, clearUser, setLoginOpen, t]
  )
}
