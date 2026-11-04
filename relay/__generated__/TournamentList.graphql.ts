/**
 * @generated SignedSource<<5ccb913464d7575543ae180611a4063d>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type TournamentList$data = {
  readonly searchResults?: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly isLive: boolean;
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
  readonly " $fragmentType": "TournamentList";
};
export type TournamentList$key = {
  readonly " $data"?: TournamentList$data;
  readonly " $fragmentSpreads": FragmentRefs<"TournamentList">;
};

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
      "name": "filterActive"
    },
    {
      "kind": "RootArgument",
      "name": "hasAny"
    },
    {
      "kind": "RootArgument",
      "name": "hasSearch"
    },
    {
      "kind": "RootArgument",
      "name": "search"
    },
    {
      "kind": "RootArgument",
      "name": "tournamentKeys"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "TournamentList",
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
                  "concreteType": "Event",
                  "kind": "LinkedField",
                  "name": "node",
                  "plural": false,
                  "selections": [
                    (v0/*:: as any*/),
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "isLive",
                      "storageKey": null
                    },
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

(node as any).hash = "fa506b046f50b98d421e96eedf0db0f0";

export default node;
