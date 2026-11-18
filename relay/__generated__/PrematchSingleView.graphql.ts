/**
 * @generated SignedSource<<1367b627060e78fdd511c94c7a336437>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PrematchSingleView$data = {
  readonly awayCompetitor: string;
  readonly awayImageUrl: string | null | undefined;
  readonly homeCompetitor: string;
  readonly homeImageUrl: string | null | undefined;
  readonly startTime: string;
  readonly " $fragmentSpreads": FragmentRefs<"EventLiveState" | "MarketGroups" | "MatchTracker" | "PrematchSingleHeader" | "StatisticsWidget">;
  readonly " $fragmentType": "PrematchSingleView";
};
export type PrematchSingleView$key = {
  readonly " $data"?: PrematchSingleView$data;
  readonly " $fragmentSpreads": FragmentRefs<"PrematchSingleView">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PrematchSingleView",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "homeCompetitor",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "homeImageUrl",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "awayCompetitor",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "awayImageUrl",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "startTime",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PrematchSingleHeader"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "EventLiveState"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "MatchTracker"
    },
    {
      "kind": "Defer",
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "StatisticsWidget"
        }
      ]
    },
    {
      "kind": "Defer",
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "MarketGroups"
        }
      ]
    }
  ],
  "type": "Event",
  "abstractKey": null
};

(node as any).hash = "e09a67f7a1fe19ecf9ae7a116f2a2742";

export default node;
