/**
 * @generated SignedSource<<3b25db2d37740b3a967291c24ddfe929>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PrematchList$data = {
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
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "id",
    "storageKey": null
  },
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
      "condition": "filterActive",
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
              "selections": (v0/*:: as any*/),
              "storageKey": "topTournaments(first:4)"
            }
          ]
        }
      ]
    },
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
                  "name": "ids",
                  "variableName": "tournamentKeys"
                }
              ],
              "concreteType": "Tournament",
              "kind": "LinkedField",
              "name": "tournaments",
              "plural": true,
              "selections": (v0/*:: as any*/),
              "storageKey": null
            }
          ]
        }
      ]
    }
  ],
  "type": "Query",
  "abstractKey": null
};
})();

(node as any).hash = "e7642c1392c21ae15a2920565d25f64a";

export default node;
