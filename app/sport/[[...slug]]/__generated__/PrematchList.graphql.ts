/**
 * @generated SignedSource<<9f232e5933001a47bbbbd8ef108448fd>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PrematchList$data = {
  readonly searchResults?: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly " $fragmentSpreads": FragmentRefs<"PrematchEvent">;
      };
    }>;
    readonly totalCount: number;
  };
  readonly topTournaments?: ReadonlyArray<{
    readonly id: string;
    readonly " $fragmentSpreads": FragmentRefs<"Tournament">;
  }>;
  readonly tournaments?: ReadonlyArray<{
    readonly id: string;
    readonly " $fragmentSpreads": FragmentRefs<"Tournament">;
  }>;
  readonly " $fragmentType": "PrematchList";
};
export type PrematchList$key = {
  readonly " $data"?: PrematchList$data;
  readonly " $fragmentSpreads": FragmentRefs<"PrematchList">;
};

import PrematchListRefetch_graphql from './PrematchListRefetch.graphql';

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = [
  (v0/*:: as any*/),
  {
    "args": null,
    "kind": "FragmentSpread",
    "name": "Tournament"
  }
];
return {
  "argumentDefinitions": [
    {
      "kind": "RootArgument",
      "name": "eventCount"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "filterActive"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "hasAny"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "hasSearch"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "search"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "tournamentKeys"
    }
  ],
  "kind": "Fragment",
  "metadata": {
    "refetch": {
      "connection": null,
      "fragmentPathInResult": [],
      "operation": PrematchListRefetch_graphql
    }
  },
  "name": "PrematchList",
  "selections": [
    {
      "condition": "hasAny",
      "kind": "Condition",
      "passingValue": false,
      "selections": [
        {
          "kind": "Stream",
          "selections": [
            {
              "alias": null,
              "args": [
                {
                  "kind": "Literal",
                  "name": "first",
                  "value": 4
                }
              ],
              "concreteType": "Tournament",
              "kind": "LinkedField",
              "name": "topTournaments",
              "plural": true,
              "selections": (v1/*:: as any*/),
              "storageKey": "topTournaments(first:4)"
            }
          ]
        }
      ]
    },
    {
      "condition": "hasSearch",
      "kind": "Condition",
      "passingValue": false,
      "selections": [
        {
          "condition": "filterActive",
          "kind": "Condition",
          "passingValue": true,
          "selections": [
            {
              "kind": "Stream",
              "selections": [
                {
                  "alias": null,
                  "args": [
                    {
                      "kind": "Variable",
                      "name": "keys",
                      "variableName": "tournamentKeys"
                    }
                  ],
                  "concreteType": "Tournament",
                  "kind": "LinkedField",
                  "name": "tournaments",
                  "plural": true,
                  "selections": (v1/*:: as any*/),
                  "storageKey": null
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "condition": "hasSearch",
      "kind": "Condition",
      "passingValue": true,
      "selections": [
        {
          "alias": "searchResults",
          "args": [
            {
              "kind": "Literal",
              "name": "first",
              "value": 20
            },
            {
              "kind": "Variable",
              "name": "search",
              "variableName": "search"
            }
          ],
          "concreteType": "EventConnection",
          "kind": "LinkedField",
          "name": "events",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "totalCount",
              "storageKey": null
            },
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
                  "concreteType": "PrematchEvent",
                  "kind": "LinkedField",
                  "name": "node",
                  "plural": false,
                  "selections": [
                    (v0/*:: as any*/),
                    {
                      "args": null,
                      "kind": "FragmentSpread",
                      "name": "PrematchEvent"
                    }
                  ],
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ]
    }
  ],
  "type": "Query",
  "abstractKey": null
};
})();

(node as any).hash = "4602f0a60e5b954a0c24ced3f1cfec7e";

export default node;
