/**
 * @generated SignedSource<<c2054dcd79c3ccda3c7b3210e5c68153>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type LiveSingleView$data = {
  readonly awayCompetitor: string;
  readonly homeCompetitor: string;
  readonly startTime: string;
  readonly " $fragmentSpreads": FragmentRefs<"EventState" | "LiveSingleHeader" | "MarketGroups">;
  readonly " $fragmentType": "LiveSingleView";
};
export type LiveSingleView$key = {
  readonly " $data"?: LiveSingleView$data;
  readonly " $fragmentSpreads": FragmentRefs<"LiveSingleView">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "LiveSingleView",
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
      "name": "LiveSingleHeader"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "EventState"
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

(node as any).hash = "969b31804f1fd98d00e90ad6f6a42578";

export default node;
