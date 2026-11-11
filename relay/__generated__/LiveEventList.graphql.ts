/**
 * @generated SignedSource<<95af17331bf82ba21f1c263da5000142>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type LiveEventList$data = {
  readonly liveEvents: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly tournament: {
          readonly " $fragmentSpreads": FragmentRefs<"LiveTournament">;
        };
        readonly " $fragmentSpreads": FragmentRefs<"LiveEvent" | "LiveOrder">;
      };
    }>;
  };
  readonly " $fragmentType": "LiveEventList";
};
export type LiveEventList$key = {
  readonly " $data"?: LiveEventList$data;
  readonly " $fragmentSpreads": FragmentRefs<"LiveEventList">;
};

import LiveEventListPaginationQuery_graphql from './LiveEventListPaginationQuery.graphql';

const node: ReaderFragment = (function(){
var v0 = [
  "liveEvents"
];
return {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "after"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "category"
    },
    {
      "defaultValue": 20,
      "kind": "LocalArgument",
      "name": "first"
    },
    {
      "defaultValue": "TOURNAMENT",
      "kind": "LocalArgument",
      "name": "orderBy"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "search"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "sport"
    }
  ],
  "kind": "Fragment",
  "metadata": {
    "connection": [
      {
        "count": "first",
        "cursor": "after",
        "direction": "forward",
        "path": (v0/*:: as any*/)
      }
    ],
    "refetch": {
      "connection": {
        "forward": {
          "count": "first",
          "cursor": "after"
        },
        "backward": null,
        "path": (v0/*:: as any*/)
      },
      "fragmentPathInResult": [],
      "operation": LiveEventListPaginationQuery_graphql
    }
  },
  "name": "LiveEventList",
  "selections": [
    {
      "alias": "liveEvents",
      "args": [
        {
          "kind": "Variable",
          "name": "category",
          "variableName": "category"
        },
        {
          "kind": "Variable",
          "name": "orderBy",
          "variableName": "orderBy"
        },
        {
          "kind": "Variable",
          "name": "search",
          "variableName": "search"
        },
        {
          "kind": "Variable",
          "name": "sport",
          "variableName": "sport"
        }
      ],
      "concreteType": "EventConnection",
      "kind": "LinkedField",
      "name": "__LiveEventList_liveEvents_connection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "EventEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "Event",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "LiveOrder"
                },
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "LiveEvent"
                },
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "Tournament",
                  "kind": "LinkedField",
                  "name": "tournament",
                  "plural": false,
                  "selections": [
                    {
                      "args": null,
                      "kind": "FragmentSpread",
                      "name": "LiveTournament"
                    }
                  ],
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "__typename",
                  "storageKey": null
                }
              ],
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "cursor",
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "PageInfo",
          "kind": "LinkedField",
          "name": "pageInfo",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "endCursor",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "hasNextPage",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Query",
  "abstractKey": null
};
})();

(node as any).hash = "a2dc8baa6248c34416f35476bfb2a15c";

export default node;
