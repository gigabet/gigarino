/**
 * @generated SignedSource<<ea0dc2e8d532d3a597ce22654b7f4470>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PrematchSingleView$data = {
  readonly awayCompetitor: string;
  readonly homeCompetitor: string;
  readonly startTime: string;
  readonly " $fragmentSpreads": FragmentRefs<"EventLiveState" | "MarketGroups" | "PrematchSingleHeader">;
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
      "name": "awayCompetitor",
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

(node as any).hash = "d2d83fa6595c5316a766d64282fc1e98";

export default node;
