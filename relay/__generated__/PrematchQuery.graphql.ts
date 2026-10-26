/**
 * @generated SignedSource<<26d03758da8508d3fc5125784799d140>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PrematchQuery$variables = {
  eventCount: number;
  filterActive: boolean;
  hasAny: boolean;
  hasSearch: boolean;
  hasUser: boolean;
  tournamentKeys: ReadonlyArray<string>;
};
export type PrematchQuery$data = {
  readonly favouriteEvents?: {
    readonly " $fragmentSpreads": FragmentRefs<"FavouriteEvents">;
  } | null | undefined;
  readonly " $fragmentSpreads": FragmentRefs<"Carousel" | "PrematchList" | "ShortcutRow">;
};
export type PrematchQuery = {
  response: PrematchQuery$data;
  variables: PrematchQuery$variables;
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
  "name": "hasUser"
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
  "name": "kind",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "price",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "homeCompetitor",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "awayCompetitor",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "startTime",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "status",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "key",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "concreteType": "Sport",
  "kind": "LinkedField",
  "name": "sport",
  "plural": false,
  "selections": [
    (v13/*:: as any*/),
    (v6/*:: as any*/)
  ],
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "index",
  "storageKey": null
},
v17 = [
  {
    "kind": "Literal",
    "name": "favourites",
    "value": true
  },
  {
    "kind": "Literal",
    "name": "first",
    "value": 50
  }
],
v18 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isLive",
  "storageKey": null
},
v19 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "homeImageUrl",
  "storageKey": null
},
v20 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "awayImageUrl",
  "storageKey": null
},
v21 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "oddCount",
  "storageKey": null
},
v22 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isFavourite",
  "storageKey": null
},
v23 = {
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
        (v6/*:: as any*/),
        (v7/*:: as any*/),
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
            (v8/*:: as any*/),
            (v6/*:: as any*/),
            (v16/*:: as any*/),
            (v13/*:: as any*/),
            (v12/*:: as any*/)
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ]
},
v24 = {
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
        (v18/*:: as any*/),
        (v9/*:: as any*/),
        (v19/*:: as any*/),
        (v10/*:: as any*/),
        (v20/*:: as any*/),
        (v11/*:: as any*/),
        (v21/*:: as any*/),
        (v22/*:: as any*/),
        (v23/*:: as any*/)
      ],
      "storageKey": null
    }
  ],
  "storageKey": null
},
v25 = [
  (v6/*:: as any*/),
  (v14/*:: as any*/),
  {
    "alias": null,
    "args": null,
    "concreteType": "Category",
    "kind": "LinkedField",
    "name": "category",
    "plural": false,
    "selections": [
      (v15/*:: as any*/),
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
  (v15/*:: as any*/),
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
          (v24/*:: as any*/)
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
    "name": "PrematchQuery",
    "selections": [
      {
        "kind": "Defer",
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "Carousel"
          }
        ]
      },
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "ShortcutRow"
      },
      {
        "condition": "hasUser",
        "kind": "Condition",
        "passingValue": true,
        "selections": [
          {
            "fragment": {
              "kind": "InlineFragment",
              "selections": [
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "FavouriteEvents"
                }
              ],
              "type": "Query",
              "abstractKey": null
            },
            "kind": "AliasedInlineFragmentSpread",
            "name": "favouriteEvents"
          }
        ]
      },
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
    "argumentDefinitions": [
      (v1/*:: as any*/),
      (v3/*:: as any*/),
      (v2/*:: as any*/),
      (v4/*:: as any*/),
      (v5/*:: as any*/),
      (v0/*:: as any*/)
    ],
    "kind": "Operation",
    "name": "PrematchQuery",
    "selections": [
      {
        "if": null,
        "kind": "Defer",
        "label": "PrematchQuery$defer$Carousel",
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "FeaturedBet",
            "kind": "LinkedField",
            "name": "featuredBets",
            "plural": true,
            "selections": [
              (v6/*:: as any*/),
              (v7/*:: as any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "boostedPrice",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "combinedPrice",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "maxStake",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "validTo",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "FeaturedBetSelection",
                "kind": "LinkedField",
                "name": "selections",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "outcomeId",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "outcomeName",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "marketName",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "eventName",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "available",
                    "storageKey": null
                  },
                  (v8/*:: as any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Event",
                    "kind": "LinkedField",
                    "name": "event",
                    "plural": false,
                    "selections": [
                      (v6/*:: as any*/),
                      (v9/*:: as any*/),
                      (v10/*:: as any*/),
                      (v11/*:: as any*/),
                      (v12/*:: as any*/),
                      (v14/*:: as any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Tournament",
                        "kind": "LinkedField",
                        "name": "tournament",
                        "plural": false,
                        "selections": [
                          (v15/*:: as any*/),
                          (v6/*:: as any*/)
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": [
                          {
                            "kind": "Literal",
                            "name": "groups",
                            "value": [
                              "MAIN"
                            ]
                          }
                        ],
                        "concreteType": "Market",
                        "kind": "LinkedField",
                        "name": "markets",
                        "plural": true,
                        "selections": [
                          (v6/*:: as any*/),
                          (v7/*:: as any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Outcome",
                            "kind": "LinkedField",
                            "name": "outcomes",
                            "plural": true,
                            "selections": [
                              (v6/*:: as any*/),
                              (v16/*:: as any*/),
                              (v15/*:: as any*/),
                              (v13/*:: as any*/),
                              (v8/*:: as any*/),
                              (v12/*:: as any*/)
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": "markets(groups:[\"MAIN\"])"
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
                "name": "title",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ]
      },
      {
        "if": null,
        "kind": "Stream",
        "label": "ShortcutRow$stream$scr_topTournaments_4ktKph",
        "selections": [
          {
            "alias": "scr_topTournaments",
            "args": [
              {
                "kind": "Literal",
                "name": "first",
                "value": 6
              }
            ],
            "concreteType": "Tournament",
            "kind": "LinkedField",
            "name": "topTournaments",
            "plural": true,
            "selections": [
              (v14/*:: as any*/),
              (v13/*:: as any*/),
              (v15/*:: as any*/),
              (v6/*:: as any*/)
            ],
            "storageKey": "topTournaments(first:6)"
          }
        ]
      },
      {
        "condition": "hasUser",
        "kind": "Condition",
        "passingValue": true,
        "selections": [
          {
            "alias": null,
            "args": (v17/*:: as any*/),
            "concreteType": "EventConnection",
            "kind": "LinkedField",
            "name": "events",
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
                      (v6/*:: as any*/),
                      (v18/*:: as any*/),
                      (v9/*:: as any*/),
                      (v19/*:: as any*/),
                      (v10/*:: as any*/),
                      (v20/*:: as any*/),
                      (v11/*:: as any*/),
                      (v21/*:: as any*/),
                      (v22/*:: as any*/),
                      (v23/*:: as any*/),
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
            "storageKey": "events(favourites:true,first:50)"
          },
          {
            "alias": null,
            "args": (v17/*:: as any*/),
            "filters": [
              "favourites"
            ],
            "handle": "connection",
            "key": "FavouriteEvents_events",
            "kind": "LinkedHandle",
            "name": "events"
          }
        ]
      },
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
                "selections": (v25/*:: as any*/),
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
                    "selections": (v25/*:: as any*/),
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
              (v24/*:: as any*/)
            ],
            "storageKey": "events(first:20)"
          }
        ]
      }
    ]
  },
  "params": {
    "cacheID": "fb60a85c8293229151f2ebb3e7881476",
    "id": null,
    "metadata": {},
    "name": "PrematchQuery",
    "operationKind": "query",
    "text": "query PrematchQuery(\n  $filterActive: Boolean!\n  $hasSearch: Boolean!\n  $hasAny: Boolean!\n  $hasUser: Boolean!\n  $tournamentKeys: [String!]!\n  $eventCount: Int!\n) {\n  ...Carousel @defer(label: \"PrematchQuery$defer$Carousel\")\n  ...ShortcutRow\n  ...FavouriteEvents @include(if: $hasUser)\n  ...PrematchList_q9UQW\n}\n\nfragment BetBoostCard on FeaturedBet {\n  boostedPrice\n  combinedPrice\n  maxStake\n  validTo\n  selections {\n    outcomeId\n    outcomeName\n    marketName\n    eventName\n    available\n  }\n}\n\nfragment Carousel on Query {\n  featuredBets {\n    id\n    kind\n    ...BetBoostCard\n    ...ComboOfWeekCard\n    ...FeaturedGameCard\n  }\n}\n\nfragment ComboOfWeekCard on FeaturedBet {\n  title\n  combinedPrice\n  validTo\n  selections {\n    outcomeId\n    outcomeName\n    marketName\n    eventName\n    price\n    available\n  }\n}\n\nfragment FavouriteButton on Event {\n  id\n  isFavourite\n  isLive\n}\n\nfragment FavouriteEvents on Query {\n  events(first: 50, favourites: true) {\n    edges {\n      node {\n        id\n        isLive\n        ...PrematchEvent\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment FeaturedGameCard on FeaturedBet {\n  validTo\n  selections {\n    event {\n      id\n      homeCompetitor\n      awayCompetitor\n      startTime\n      status\n      sport {\n        key\n        id\n      }\n      tournament {\n        name\n        id\n      }\n      markets(groups: [MAIN]) {\n        id\n        kind\n        outcomes {\n          id\n          index\n          name\n          key\n          price\n          status\n        }\n      }\n    }\n  }\n}\n\nfragment ListViewMarket on Market {\n  kind\n  line\n  outcomes {\n    id\n    index\n    key\n    price\n    status\n  }\n}\n\nfragment ListViewMarkets on Event {\n  markets {\n    id\n    kind\n    period\n    line\n    outcomes {\n      price\n      id\n    }\n    ...ListViewMarket\n  }\n}\n\nfragment PrematchEvent on Event {\n  id\n  homeCompetitor\n  homeImageUrl\n  awayCompetitor\n  awayImageUrl\n  startTime\n  oddCount\n  ...FavouriteButton\n  ...ListViewMarkets @defer(label: \"PrematchEvent$defer$ListViewMarkets\")\n}\n\nfragment PrematchList_q9UQW on Query {\n  topTournaments(first: 4) @skip(if: $hasAny) @stream(label: \"PrematchList$stream$topTournaments_3z2gQm\", initialCount: 1) {\n    id\n    ...Tournament\n  }\n  tournaments(keys: $tournamentKeys) @include(if: $filterActive) @skip(if: $hasSearch) @stream(label: \"PrematchList$stream$tournaments_1FDLHx\", initialCount: 1) {\n    id\n    ...Tournament\n  }\n  searchResults: events(first: 20) @include(if: $hasSearch) {\n    totalCount\n    edges {\n      node {\n        id\n        isLive\n        ...PrematchEvent\n      }\n    }\n  }\n}\n\nfragment ShortcutRow on Query {\n  scr_topTournaments: topTournaments(first: 6) @stream(label: \"ShortcutRow$stream$scr_topTournaments_4ktKph\", initialCount: 1) {\n    sport {\n      key\n      id\n    }\n    key\n    name\n    id\n  }\n}\n\nfragment Tournament on Tournament {\n  id\n  sport {\n    key\n    id\n  }\n  category {\n    name\n    countryCode\n    id\n  }\n  name\n  ...TournamentEventList @defer(label: \"Tournament$defer$TournamentEventList\")\n}\n\nfragment TournamentEventList on Tournament {\n  events(first: $eventCount) {\n    edges {\n      node {\n        id\n        isLive\n        ...PrematchEvent\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "a759253001ea43d7db3f30ed30fe8fc3";

export default node;
