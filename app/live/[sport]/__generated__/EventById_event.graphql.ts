/**
 * @generated SignedSource<<cfb213b0f1c938edf805787815730982>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime'
import { FragmentRefs } from 'relay-runtime'
export type MockEventById_event$data = {
  readonly id: string
  readonly league: string
  readonly name: string
  readonly startTime: string
  readonly ' $fragmentSpreads': FragmentRefs<'Event_odds'>
  readonly ' $fragmentType': 'EventById_event'
}
export type MockEventById_event$key = {
  readonly ' $data'?: MockEventById_event$data
  readonly ' $fragmentSpreads': FragmentRefs<'EventById_event'>
}

const node: ReaderFragment = {
  argumentDefinitions: [],
  kind: 'Fragment',
  metadata: null,
  name: 'EventById_event',
  selections: [
    {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'id',
      storageKey: null,
    },
    {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'league',
      storageKey: null,
    },
    {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'name',
      storageKey: null,
    },
    {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'startTime',
      storageKey: null,
    },
    {
      args: null,
      kind: 'FragmentSpread',
      name: 'Event_odds',
    },
  ],
  type: 'Event',
  abstractKey: null,
}

;(node as any).hash = '8afcfe1b8abbca692174934166d02877'

export default node
