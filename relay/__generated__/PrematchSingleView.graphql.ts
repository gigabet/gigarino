/**
 * @generated SignedSource<<c5c7167a414f5090036ded9446c3973a>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PrematchSingleView$data = {
  readonly StatisticsWidget?: {
    readonly " $fragmentSpreads": FragmentRefs<"StatisticsWidget">;
  } | null | undefined;
  readonly awayCompetitor: string;
  readonly awayImageUrl: string | null | undefined;
  readonly homeCompetitor: string;
  readonly homeImageUrl: string | null | undefined;
  readonly startTime: string;
  readonly " $fragmentSpreads": FragmentRefs<"EventLiveState" | "MarketGroups" | "MatchTracker" | "PrematchSingleHeader">;
  readonly " $fragmentType": "PrematchSingleView";
};
export type PrematchSingleView$key = {
  readonly " $data"?: PrematchSingleView$data;
  readonly " $fragmentSpreads": FragmentRefs<"PrematchSingleView">;
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

(node as any).hash = "3e7f9102137127801563cf065fb5c872";

export default node;
