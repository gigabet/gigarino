/**
 * @generated SignedSource<<353fbe37d87917e49b1ee00727e13af6>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type EventStatus = "ABANDONED" | "CANCELLED" | "ENDED" | "LIVE" | "POSTPONED" | "SCHEDULED" | "%future added value";
export type MatchOutcome = "D" | "L" | "W" | "%future added value";
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
      readonly outcome: MatchOutcome | null | undefined;
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
var v0 = {
  "args": null,
  "kind": "FragmentSpread",
  "name": "StatisticsWidgetPastMatch"
},
v1 = [
  (v0/*:: as any*/)
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
          "selections": (v1/*:: as any*/),
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "PastMatch",
          "kind": "LinkedField",
          "name": "awayRecent",
          "plural": true,
          "selections": (v1/*:: as any*/),
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "PastMatch",
          "kind": "LinkedField",
          "name": "headToHead",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "outcome",
              "storageKey": null
            },
            (v0/*:: as any*/)
          ],
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

(node as any).hash = "0ac2c4ceab42994396616327e5c313c9";

export default node;
