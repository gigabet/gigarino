/**
 * @generated SignedSource<<d665843ebbe086d4214b4205b2f5943e>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PrematchQuery$variables = {
  hasUser: boolean;
};
export type PrematchQuery$data = {
  readonly favouriteEvents?: {
    readonly " $fragmentSpreads": FragmentRefs<"FavouriteEvents">;
  } | null | undefined;
  readonly " $fragmentSpreads": FragmentRefs<"Carousel" | "ShortcutRow">;
};
export type PrematchQuery = {
  response: PrematchQuery$data;
  variables: PrematchQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "hasUser"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "kind",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "price",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "homeCompetitor",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "awayCompetitor",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "startTime",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "status",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "key",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "concreteType": "Sport",
  "kind": "LinkedField",
  "name": "sport",
  "plural": false,
  "selections": [
    (v8/*:: as any*/),
    (v1/*:: as any*/)
  ],
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "index",
  "storageKey": null
},
v12 = [
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
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*:: as any*/),
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
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*:: as any*/),
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
              (v1/*:: as any*/),
              (v2/*:: as any*/),
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
                  (v3/*:: as any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Event",
                    "kind": "LinkedField",
                    "name": "event",
                    "plural": false,
                    "selections": [
                      (v1/*:: as any*/),
                      (v4/*:: as any*/),
                      (v5/*:: as any*/),
                      (v6/*:: as any*/),
                      (v7/*:: as any*/),
                      (v9/*:: as any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Tournament",
                        "kind": "LinkedField",
                        "name": "tournament",
                        "plural": false,
                        "selections": [
                          (v10/*:: as any*/),
                          (v1/*:: as any*/)
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
                          (v1/*:: as any*/),
                          (v2/*:: as any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Outcome",
                            "kind": "LinkedField",
                            "name": "outcomes",
                            "plural": true,
                            "selections": [
                              (v1/*:: as any*/),
                              (v11/*:: as any*/),
                              (v10/*:: as any*/),
                              (v8/*:: as any*/),
                              (v3/*:: as any*/),
                              (v7/*:: as any*/)
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
              (v9/*:: as any*/),
              (v8/*:: as any*/),
              (v10/*:: as any*/),
              (v1/*:: as any*/)
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
            "args": (v12/*:: as any*/),
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
                      (v1/*:: as any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "isLive",
                        "storageKey": null
                      },
                      (v4/*:: as any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "homeImageUrl",
                        "storageKey": null
                      },
                      (v5/*:: as any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "awayImageUrl",
                        "storageKey": null
                      },
                      (v6/*:: as any*/),
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
                          (v9/*:: as any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Market",
                            "kind": "LinkedField",
                            "name": "markets",
                            "plural": true,
                            "selections": [
                              (v1/*:: as any*/),
                              (v2/*:: as any*/),
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
                                  (v3/*:: as any*/),
                                  (v1/*:: as any*/),
                                  (v11/*:: as any*/),
                                  (v8/*:: as any*/),
                                  (v7/*:: as any*/)
                                ],
                                "storageKey": null
                              }
                            ],
                            "storageKey": null
                          }
                        ]
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
            "storageKey": "events(favourites:true,first:50)"
          },
          {
            "alias": null,
            "args": (v12/*:: as any*/),
            "filters": [
              "favourites"
            ],
            "handle": "connection",
            "key": "FavouriteEvents_events",
            "kind": "LinkedHandle",
            "name": "events"
          }
        ]
      }
    ]
  },
  "params": {
    "cacheID": "e056fef74f8a6c95e59487e476ab16a3",
    "id": null,
    "metadata": {},
    "name": "PrematchQuery",
    "operationKind": "query",
    "text": "query PrematchQuery(\n  $hasUser: Boolean!\n) {\n  ...Carousel @defer(label: \"PrematchQuery$defer$Carousel\")\n  ...ShortcutRow\n  ...FavouriteEvents @include(if: $hasUser)\n}\n\nfragment BetBoostCard on FeaturedBet {\n  boostedPrice\n  combinedPrice\n  maxStake\n  validTo\n  selections {\n    outcomeId\n    outcomeName\n    marketName\n    eventName\n    available\n  }\n}\n\nfragment Carousel on Query {\n  featuredBets {\n    id\n    kind\n    ...BetBoostCard\n    ...ComboOfWeekCard\n    ...FeaturedGameCard\n  }\n}\n\nfragment ComboOfWeekCard on FeaturedBet {\n  title\n  combinedPrice\n  validTo\n  selections {\n    outcomeId\n    outcomeName\n    marketName\n    eventName\n    price\n    available\n  }\n}\n\nfragment FavouriteButton on Event {\n  id\n  isFavourite\n  isLive\n}\n\nfragment FavouriteEvents on Query {\n  events(first: 50, favourites: true) {\n    edges {\n      node {\n        id\n        isLive\n        ...PrematchEvent\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment FeaturedGameCard on FeaturedBet {\n  validTo\n  selections {\n    event {\n      id\n      homeCompetitor\n      awayCompetitor\n      startTime\n      status\n      sport {\n        key\n        id\n      }\n      tournament {\n        name\n        id\n      }\n      markets(groups: [MAIN]) {\n        id\n        kind\n        outcomes {\n          id\n          index\n          name\n          key\n          price\n          status\n        }\n      }\n    }\n  }\n}\n\nfragment ListViewMarket on Market {\n  kind\n  line\n  outcomes {\n    id\n    index\n    key\n    price\n    status\n  }\n}\n\nfragment ListViewMarkets on Event {\n  sport {\n    key\n    id\n  }\n  markets {\n    id\n    kind\n    period\n    line\n    outcomes {\n      price\n      id\n    }\n    ...ListViewMarket\n  }\n}\n\nfragment PrematchEvent on Event {\n  id\n  homeCompetitor\n  homeImageUrl\n  awayCompetitor\n  awayImageUrl\n  startTime\n  oddCount\n  ...FavouriteButton\n  ...TrackerButton\n  ...ListViewMarkets @defer(label: \"PrematchEvent$defer$ListViewMarkets\")\n}\n\nfragment ShortcutRow on Query {\n  scr_topTournaments: topTournaments(first: 6) @stream(label: \"ShortcutRow$stream$scr_topTournaments_4ktKph\", initialCount: 1) {\n    sport {\n      key\n      id\n    }\n    key\n    name\n    id\n  }\n}\n\nfragment TrackerButton on Event {\n  id\n  sportradarMatchId\n}\n"
  }
};
})();

(node as any).hash = "5e32045fe842ac222bc33c04dd774e7f";

export default node;
