/**
 * @generated SignedSource<<d4fa4636939e466249aec6e7ab4aaee6>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type LiveSingleView$data = {
  readonly StatisticsWidget?: {
    readonly " $fragmentSpreads": FragmentRefs<"StatisticsWidget">;
  } | null | undefined;
  readonly awayCompetitor: string;
  readonly awayImageUrl: string | null | undefined;
  readonly homeCompetitor: string;
  readonly homeImageUrl: string | null | undefined;
  readonly startTime: string;
  readonly " $fragmentSpreads": FragmentRefs<"EventState" | "LiveScoreboard" | "LiveSingleHeader" | "MarketGroups" | "MatchTracker" | "ServingIndicator">;
  readonly " $fragmentType": "LiveSingleView";
};
export type LiveSingleView$key = {
  readonly " $data"?: LiveSingleView$data;
  readonly " $fragmentSpreads": FragmentRefs<"LiveSingleView">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "kind": "RootArgument",
      "name": "showStats"
    }
  ],
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
      "condition": "showStats",
      "kind": "Condition",
      "passingValue": true,
      "selections": [
        {
          "fragment": {
            "kind": "InlineFragment",
            "selections": [
              {
                "kind": "Defer",
                "selections": [
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "StatisticsWidget"
                  }
                ]
              }
            ],
            "type": "Event",
            "abstractKey": null
          },
          "kind": "AliasedInlineFragmentSpread",
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

(node as any).hash = "c8f54ab40260969a5c54111bd2cf7b78";

export default node;
