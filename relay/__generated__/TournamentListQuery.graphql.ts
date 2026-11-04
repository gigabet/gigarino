/**
 * @generated SignedSource<<3b85d3fd7f6b4f42b1aba102b89d5634>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type TournamentListQuery$variables = {
  eventCount: number;
  filterActive: boolean;
  hasAny: boolean;
  hasSearch: boolean;
  search?: string | null | undefined;
  tournamentKeys: ReadonlyArray<string>;
};
export type TournamentListQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"TournamentList">;
};
export type TournamentListQuery = {
  response: TournamentListQuery$data;
  variables: TournamentListQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "eventCount"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "filterActive"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "hasAny"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "hasSearch"
},
v4 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "search"
},
v5 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "tournamentKeys"
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "key",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "concreteType": "Sport",
  "kind": "LinkedField",
  "name": "sport",
  "plural": false,
  "selections": [
    (v7/*:: as any*/),
    (v6/*:: as any*/)
  ],
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v10 = {
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
        (v6/*:: as any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "isLive",
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
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "oddCount",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "isFavourite",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "sportradarMatchId",
          "storageKey": null
        },
        {
          "if": null,
          "kind": "Defer",
          "label": "PrematchEvent$defer$ListViewMarkets",
          "selections": [
            (v8/*:: as any*/),
            {
              "alias": null,
              "args": null,
              "concreteType": "Market",
              "kind": "LinkedField",
              "name": "markets",
              "plural": true,
              "selections": [
                (v6/*:: as any*/),
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
                  "kind": "ScalarField",
                  "name": "period",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "line",
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
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "price",
                      "storageKey": null
                    },
                    (v6/*:: as any*/),
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "index",
                      "storageKey": null
                    },
                    (v7/*:: as any*/),
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "status",
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
v11 = [
  (v6/*:: as any*/),
  (v8/*:: as any*/),
  {
    "alias": null,
    "args": null,
    "concreteType": "Category",
    "kind": "LinkedField",
    "name": "category",
    "plural": false,
    "selections": [
      (v9/*:: as any*/),
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "countryCode",
        "storageKey": null
      },
      (v6/*:: as any*/)
    ],
    "storageKey": null
  },
  (v9/*:: as any*/),
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
          (v10/*:: as any*/)
        ],
        "storageKey": null
      }
    ]
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*:: as any*/),
      (v1/*:: as any*/),
      (v2/*:: as any*/),
      (v3/*:: as any*/),
      (v4/*:: as any*/),
      (v5/*:: as any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "TournamentListQuery",
    "selections": [
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "TournamentList"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*:: as any*/),
      (v3/*:: as any*/),
      (v2/*:: as any*/),
      (v5/*:: as any*/),
      (v4/*:: as any*/),
      (v0/*:: as any*/)
    ],
    "kind": "Operation",
    "name": "TournamentListQuery",
    "selections": [
      {
        "condition": "hasAny",
        "kind": "Condition",
        "passingValue": false,
        "selections": [
          {
            "if": null,
            "kind": "Stream",
            "label": "TournamentList$stream$topTournaments_3z2gQm",
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
                "selections": (v11/*:: as any*/),
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
                "label": "TournamentList$stream$tournaments_1FDLHx",
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
                    "selections": (v11/*:: as any*/),
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
              (v10/*:: as any*/)
            ],
            "storageKey": null
          }
        ]
      }
    ]
  },
  "params": {
    "cacheID": "2265633403dfa3c7c97ff684ad21dfac",
    "id": null,
    "metadata": {},
    "name": "TournamentListQuery",
    "operationKind": "query",
    "text": "query TournamentListQuery(\n  $filterActive: Boolean!\n  $hasSearch: Boolean!\n  $hasAny: Boolean!\n  $tournamentKeys: [String!]!\n  $search: String\n  $eventCount: Int!\n) {\n  ...TournamentList\n}\n\nfragment FavouriteButton on Event {\n  id\n  isFavourite\n  isLive\n}\n\nfragment ListViewMarket on Market {\n  kind\n  line\n  outcomes {\n    id\n    index\n    key\n    price\n    status\n  }\n}\n\nfragment ListViewMarkets on Event {\n  sport {\n    key\n    id\n  }\n  markets {\n    id\n    kind\n    period\n    line\n    outcomes {\n      price\n      id\n    }\n    ...ListViewMarket\n  }\n}\n\nfragment PrematchEvent on Event {\n  id\n  homeCompetitor\n  homeImageUrl\n  awayCompetitor\n  awayImageUrl\n  startTime\n  oddCount\n  ...FavouriteButton\n  ...TrackerButton\n  ...ListViewMarkets @defer(label: \"PrematchEvent$defer$ListViewMarkets\")\n}\n\nfragment Tournament on Tournament {\n  id\n  sport {\n    key\n    id\n  }\n  category {\n    name\n    countryCode\n    id\n  }\n  name\n  ...TournamentEventList @defer(label: \"Tournament$defer$TournamentEventList\")\n}\n\nfragment TournamentEventList on Tournament {\n  events(first: $eventCount) {\n    edges {\n      node {\n        id\n        isLive\n        ...PrematchEvent\n      }\n    }\n  }\n}\n\nfragment TournamentList on Query {\n  topTournaments(first: 4) @skip(if: $hasAny) @stream(label: \"TournamentList$stream$topTournaments_3z2gQm\", initialCount: 1) {\n    id\n    ...Tournament\n  }\n  tournaments(keys: $tournamentKeys) @include(if: $filterActive) @skip(if: $hasSearch) @stream(label: \"TournamentList$stream$tournaments_1FDLHx\", initialCount: 1) {\n    id\n    ...Tournament\n  }\n  searchResults: events(search: $search, first: 20) @include(if: $hasSearch) {\n    totalCount\n    edges {\n      node {\n        id\n        isLive\n        ...PrematchEvent\n      }\n    }\n  }\n}\n\nfragment TrackerButton on Event {\n  id\n  sportradarMatchId\n}\n"
  }
};
})();

(node as any).hash = "2b179d45c05842367caecb0f293b0294";

export default node;
