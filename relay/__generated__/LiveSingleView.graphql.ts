/**
 * @generated SignedSource<<54c5076a38f583a5db4477267c7dada9>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type LiveSingleView$data = {
  readonly awayCompetitor: string;
  readonly awayImageUrl: string | null | undefined;
  readonly homeCompetitor: string;
  readonly homeImageUrl: string | null | undefined;
  readonly startTime: string;
  readonly " $fragmentSpreads": FragmentRefs<"EventState" | "LiveScoreboard" | "LiveSingleHeader" | "MarketGroups" | "MatchTracker" | "ServingIndicator" | "StatisticsWidget">;
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
      "name": "LiveSingleHeader"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "EventState"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "LiveScoreboard"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ServingIndicator"
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

(node as any).hash = "9795d4dd13b3fdef17a2de701bca701b";

export default node;
