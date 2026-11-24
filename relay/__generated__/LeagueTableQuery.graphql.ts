/**
 * @generated SignedSource<<b222c4f8ab54b9951dd7cdf1869a55c8>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type LeagueTableQuery$variables = {
  ids: ReadonlyArray<string>;
};
export type LeagueTableQuery$data = {
  readonly tournaments: ReadonlyArray<{
    readonly standings: {
      readonly currentRound: number | null | undefined;
      readonly groups: ReadonlyArray<{
        readonly " $fragmentSpreads": FragmentRefs<"LeagueTableGroup">;
      }>;
      readonly maxRounds: number | null | undefined;
      readonly season: string | null | undefined;
    } | null | undefined;
  }>;
};
export type LeagueTableQuery = {
  response: LeagueTableQuery$data;
  variables: LeagueTableQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "ids"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "ids",
    "variableName": "ids"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "season",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "currentRound",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "maxRounds",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*:: as any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "LeagueTableQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*:: as any*/),
        "concreteType": "Tournament",
        "kind": "LinkedField",
        "name": "tournaments",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Standings",
            "kind": "LinkedField",
            "name": "standings",
            "plural": false,
            "selections": [
              (v2/*:: as any*/),
              (v3/*:: as any*/),
              (v4/*:: as any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "StandingGroup",
                "kind": "LinkedField",
                "name": "groups",
                "plural": true,
                "selections": [
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "LeagueTableGroup"
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
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*:: as any*/),
    "kind": "Operation",
    "name": "LeagueTableQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*:: as any*/),
        "concreteType": "Tournament",
        "kind": "LinkedField",
        "name": "tournaments",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Standings",
            "kind": "LinkedField",
            "name": "standings",
            "plural": false,
            "selections": [
              (v2/*:: as any*/),
              (v3/*:: as any*/),
              (v4/*:: as any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "StandingGroup",
                "kind": "LinkedField",
                "name": "groups",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "name",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "StandingRow",
                    "kind": "LinkedField",
                    "name": "rows",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "position",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "teamName",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "played",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "won",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "drawn",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "lost",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "goalsFor",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "goalsAgainst",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "points",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "zone",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "dee37bae84b9701ec12daae21652964b",
    "id": null,
    "metadata": {},
    "name": "LeagueTableQuery",
    "operationKind": "query",
    "text": "query LeagueTableQuery(\n  $ids: [ID!]!\n) {\n  tournaments(ids: $ids) {\n    standings {\n      season\n      currentRound\n      maxRounds\n      groups {\n        ...LeagueTableGroup\n      }\n    }\n    id\n  }\n}\n\nfragment LeagueTableGroup on StandingGroup {\n  name\n  rows {\n    position\n    teamName\n    played\n    won\n    drawn\n    lost\n    goalsFor\n    goalsAgainst\n    points\n    zone\n  }\n}\n"
  }
};
})();

(node as any).hash = "42ffd65686909af1dbddb6581b93b1a5";

export default node;
