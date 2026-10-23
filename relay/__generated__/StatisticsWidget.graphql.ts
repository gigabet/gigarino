/**
 * @generated SignedSource<<da194543f6e56f14f017e9d83529f3d0>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type EventStatus = "ABANDONED" | "CANCELLED" | "ENDED" | "LIVE" | "POSTPONED" | "SCHEDULED" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type StatisticsWidget$data = {
  readonly awayCompetitor: string;
  readonly homeCompetitor: string;
  readonly id: string;
  readonly insights: {
    readonly awayPosition: number | null | undefined;
    readonly awayRecent: ReadonlyArray<{
      readonly " $fragmentSpreads": FragmentRefs<"StatisticsWidgetPastMatch">;
    }>;
    readonly headToHead: ReadonlyArray<{
      readonly " $fragmentSpreads": FragmentRefs<"StatisticsWidgetPastMatch">;
    }>;
    readonly homePosition: number | null | undefined;
    readonly homeRecent: ReadonlyArray<{
      readonly " $fragmentSpreads": FragmentRefs<"StatisticsWidgetPastMatch">;
    }>;
    readonly referee: string | null | undefined;
    readonly round: string | null | undefined;
    readonly stats: ReadonlyArray<{
      readonly away: string;
      readonly home: string;
      readonly key: string;
    }>;
    readonly venue: string | null | undefined;
  } | null | undefined;
  readonly status: EventStatus;
  readonly " $fragmentType": "StatisticsWidget";
};
export type StatisticsWidget$key = {
  readonly " $data"?: StatisticsWidget$data;
  readonly " $fragmentSpreads": FragmentRefs<"StatisticsWidget">;
};

import StatisticsWidgetRefetch_graphql from './StatisticsWidgetRefetch.graphql';

const node: ReaderFragment = (function(){
var v0 = [
  {
    "args": null,
    "kind": "FragmentSpread",
    "name": "StatisticsWidgetPastMatch"
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "refetch": {
      "connection": null,
      "fragmentPathInResult": [
        "node"
      ],
      "operation": StatisticsWidgetRefetch_graphql,
      "identifierInfo": {
        "identifierField": "id",
        "identifierQueryVariableName": "id"
      }
    }
  },
  "name": "StatisticsWidget",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "status",
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
      "name": "awayCompetitor",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "MatchInsights",
      "kind": "LinkedField",
      "name": "insights",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "homePosition",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "awayPosition",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "venue",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "referee",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "round",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "MatchStat",
          "kind": "LinkedField",
          "name": "stats",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "key",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "home",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "away",
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "PastMatch",
          "kind": "LinkedField",
          "name": "homeRecent",
          "plural": true,
          "selections": (v0/*:: as any*/),
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "PastMatch",
          "kind": "LinkedField",
          "name": "awayRecent",
          "plural": true,
          "selections": (v0/*:: as any*/),
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "PastMatch",
          "kind": "LinkedField",
          "name": "headToHead",
          "plural": true,
          "selections": (v0/*:: as any*/),
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Event",
  "abstractKey": null
};
})();

(node as any).hash = "58b62acf7a962411c4296de66f80b3d1";

export default node;
