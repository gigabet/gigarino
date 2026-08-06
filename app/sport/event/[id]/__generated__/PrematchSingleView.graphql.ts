/**
 * @generated SignedSource<<a29640505c674f0b39a74059d0492272>>
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
  "type": "PrematchEvent",
  "abstractKey": null
};

(node as any).hash = "11c36696099103c43645be1a3586642d";

export default node;
