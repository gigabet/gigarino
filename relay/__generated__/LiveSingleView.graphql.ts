/**
 * @generated SignedSource<<5adcd7bf473649b1916a1b1f8bd34dde>>
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
  readonly awayCountryCode: string | null | undefined;
  readonly awayImageUrl: string | null | undefined;
  readonly homeCompetitor: string;
  readonly homeCountryCode: string | null | undefined;
  readonly homeImageUrl: string | null | undefined;
  readonly sport: {
    readonly key: string;
  };
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
      "concreteType": "Sport",
      "kind": "LinkedField",
      "name": "sport",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "key",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
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
      "name": "homeCountryCode",
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
      "name": "awayCountryCode",
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

(node as any).hash = "be230178e4653778c29acf70ef9d68f9";

export default node;
