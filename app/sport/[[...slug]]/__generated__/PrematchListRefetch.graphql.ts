/**
 * @generated SignedSource<<c3304193e27c52fd6f610052bc157b8d>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PrematchListRefetch$variables = {
  eventCount?: number | null | undefined;
  filterActive: boolean;
  hasAny: boolean;
  hasSearch: boolean;
  search?: string | null | undefined;
  tournamentKeys: ReadonlyArray<string>;
};
export type PrematchListRefetch$data = {
  readonly " $fragmentSpreads": FragmentRefs<"PrematchList">;
};
export type PrematchListRefetch = {
  response: PrematchListRefetch$data;
  variables: PrematchListRefetch$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
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
v1 = {
  "kind": "Variable",
  "name": "search",
  "variableName": "search"
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v4 = {
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
        (v2/*:: as any*/),
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
          "kind": "ScalarField",
          "name": "startTime",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "oddCount",
          "storageKey": null
        },
        {
          "if": null,
          "kind": "Defer",
          "label": "PrematchEvent$defer$ListViewMarkets",
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "Market",
              "kind": "LinkedField",
              "name": "markets",
              "plural": true,
              "selections": [
                (v2/*:: as any*/),
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "kind",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "Outcome",
                  "kind": "LinkedField",
                  "name": "outcomes",
                  "plural": true,
                  "selections": [
                    (v2/*:: as any*/),
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "index",
                      "storageKey": null
                    },
                    (v3/*:: as any*/),
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "price",
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
      "storageKey": null
    }
  ],
  "storageKey": null
},
v5 = [
  (v2/*:: as any*/),
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
      },
      (v2/*:: as any*/)
    ],
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "concreteType": "Category",
    "kind": "LinkedField",
    "name": "category",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "countryCode",
        "storageKey": null
      },
      (v2/*:: as any*/)
    ],
    "storageKey": null
  },
  (v3/*:: as any*/),
  {
    "if": null,
    "kind": "Defer",
    "label": "Tournament$defer$TournamentEventList",
    "selections": [
      {
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "first",
            "variableName": "eventCount"
          }
        ],
        "concreteType": "EventConnection",
        "kind": "LinkedField",
        "name": "events",
        "plural": false,
        "selections": [
          (v4/*:: as any*/)
        ],
        "storageKey": null
      }
    ]
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*:: as any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "PrematchListRefetch",
    "selections": [
      {
        "args": [
          {
            "kind": "Variable",
            "name": "filterActive",
            "variableName": "filterActive"
          },
          {
            "kind": "Variable",
            "name": "hasAny",
            "variableName": "hasAny"
          },
          {
            "kind": "Variable",
            "name": "hasSearch",
            "variableName": "hasSearch"
          },
          (v1/*:: as any*/),
          {
            "kind": "Variable",
            "name": "tournamentKeys",
            "variableName": "tournamentKeys"
          }
        ],
        "kind": "FragmentSpread",
        "name": "PrematchList"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*:: as any*/),
    "kind": "Operation",
    "name": "PrematchListRefetch",
    "selections": [
      {
        "condition": "hasAny",
        "kind": "Condition",
        "passingValue": false,
        "selections": [
          {
            "if": null,
            "kind": "Stream",
            "label": "PrematchList$stream$topTournaments_3z2gQm",
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
                "selections": (v5/*:: as any*/),
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
                "if": null,
                "kind": "Stream",
                "label": "PrematchList$stream$tournaments_1FDLHx",
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
                    "selections": (v5/*:: as any*/),
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
              (v1/*:: as any*/)
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
              (v4/*:: as any*/)
            ],
            "storageKey": null
          }
        ]
      }
    ]
  },
  "params": {
    "cacheID": "5b3cf171114cdbbc4a1fdd45043fdac8",
    "id": null,
    "metadata": {},
    "name": "PrematchListRefetch",
    "operationKind": "query",
    "text": "query PrematchListRefetch(\n  $eventCount: Int\n  $filterActive: Boolean!\n  $hasAny: Boolean!\n  $hasSearch: Boolean!\n  $search: String\n  $tournamentKeys: [String!]!\n) {\n  ...PrematchList_kbUTV\n}\n\nfragment ListViewMarkets on PrematchEvent {\n  markets {\n    id\n    kind\n    ...PrematchMarket\n  }\n}\n\nfragment PrematchEvent on PrematchEvent {\n  id\n  homeCompetitor\n  awayCompetitor\n  startTime\n  oddCount\n  ...ListViewMarkets @defer(label: \"PrematchEvent$defer$ListViewMarkets\")\n}\n\nfragment PrematchList_kbUTV on Query {\n  topTournaments(first: 4) @skip(if: $hasAny) @stream(label: \"PrematchList$stream$topTournaments_3z2gQm\", initialCount: 1) {\n    id\n    ...Tournament\n  }\n  tournaments(keys: $tournamentKeys) @include(if: $filterActive) @skip(if: $hasSearch) @stream(label: \"PrematchList$stream$tournaments_1FDLHx\", initialCount: 1) {\n    id\n    ...Tournament\n  }\n  searchResults: events(search: $search, first: 20) @include(if: $hasSearch) {\n    totalCount\n    edges {\n      node {\n        id\n        ...PrematchEvent\n      }\n    }\n  }\n}\n\nfragment PrematchMarket on Market {\n  outcomes {\n    id\n    index\n    name\n    price\n  }\n}\n\nfragment Tournament on Tournament {\n  sport {\n    key\n    id\n  }\n  category {\n    countryCode\n    id\n  }\n  name\n  ...TournamentEventList @defer(label: \"Tournament$defer$TournamentEventList\")\n  id\n}\n\nfragment TournamentEventList on Tournament {\n  events(first: $eventCount) {\n    edges {\n      node {\n        id\n        ...PrematchEvent\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "4602f0a60e5b954a0c24ced3f1cfec7e";

export default node;
