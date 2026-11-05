/**
 * @generated SignedSource<<17376e883ebf44e882a6a9080306124f>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type LiveEventOrder = "START_TIME" | "TOURNAMENT" | "%future added value";
export type LiveLayoutQuery$variables = {
  hasUser: boolean;
  orderBy: LiveEventOrder;
  search?: string | null | undefined;
  sport?: string | null | undefined;
};
export type LiveLayoutQuery$data = {
  readonly favouriteLive?: {
    readonly " $fragmentSpreads": FragmentRefs<"FavouriteLiveEvents">;
  } | null | undefined;
  readonly " $fragmentSpreads": FragmentRefs<"LiveEventSidebar" | "LiveHeader">;
};
export type LiveLayoutQuery = {
  response: LiveLayoutQuery$data;
  variables: LiveLayoutQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "hasUser"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "orderBy"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "search"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "sport"
},
v4 = {
  "kind": "Variable",
  "name": "orderBy",
  "variableName": "orderBy"
},
v5 = {
  "kind": "Variable",
  "name": "search",
  "variableName": "search"
},
v6 = {
  "kind": "Variable",
  "name": "sport",
  "variableName": "sport"
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
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
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v10 = {
  "kind": "Literal",
  "name": "first",
  "value": 50
},
v11 = [
  (v10/*:: as any*/),
  (v4/*:: as any*/),
  (v5/*:: as any*/),
  (v6/*:: as any*/)
],
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "startTime",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "status",
  "storageKey": null
},
v14 = [
  (v8/*:: as any*/),
  (v7/*:: as any*/)
],
v15 = {
  "alias": null,
  "args": null,
  "concreteType": "Sport",
  "kind": "LinkedField",
  "name": "sport",
  "plural": false,
  "selections": (v14/*:: as any*/),
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "tradingStatus",
  "storageKey": null
},
v17 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "period",
  "storageKey": null
},
v18 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "clockRunning",
  "storageKey": null
},
v19 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "clockDirection",
  "storageKey": null
},
v20 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "clockElapsedSeconds",
  "storageKey": null
},
v21 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "clockAnchorAt",
  "storageKey": null
},
v22 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "liveSeenAt",
  "storageKey": null
},
v23 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "homeCompetitor",
  "storageKey": null
},
v24 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "homeImageUrl",
  "storageKey": null
},
v25 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "awayCompetitor",
  "storageKey": null
},
v26 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "awayImageUrl",
  "storageKey": null
},
v27 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "homeScore",
  "storageKey": null
},
v28 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "awayScore",
  "storageKey": null
},
v29 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "serving",
  "storageKey": null
},
v30 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "home",
  "storageKey": null
},
v31 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "away",
  "storageKey": null
},
v32 = {
  "alias": null,
  "args": null,
  "concreteType": "PointScore",
  "kind": "LinkedField",
  "name": "pointScore",
  "plural": false,
  "selections": [
    (v30/*:: as any*/),
    (v31/*:: as any*/)
  ],
  "storageKey": null
},
v33 = {
  "alias": null,
  "args": null,
  "concreteType": "PeriodScore",
  "kind": "LinkedField",
  "name": "periodScores",
  "plural": true,
  "selections": [
    (v17/*:: as any*/),
    (v30/*:: as any*/),
    (v31/*:: as any*/)
  ],
  "storageKey": null
},
v34 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "kind",
  "storageKey": null
},
v35 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "index",
  "storageKey": null
},
v36 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "price",
  "storageKey": null
},
v37 = {
  "alias": "mainMarkets",
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
    (v7/*:: as any*/),
    (v34/*:: as any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "Outcome",
      "kind": "LinkedField",
      "name": "outcomes",
      "plural": true,
      "selections": [
        (v7/*:: as any*/),
        (v35/*:: as any*/),
        (v9/*:: as any*/),
        (v36/*:: as any*/),
        (v13/*:: as any*/)
      ],
      "storageKey": null
    }
  ],
  "storageKey": "markets(groups:[\"MAIN\"])"
},
v38 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v39 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
  "storageKey": null
},
v40 = {
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
},
v41 = [
  {
    "kind": "Literal",
    "name": "favourites",
    "value": true
  },
  (v10/*:: as any*/)
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*:: as any*/),
      (v1/*:: as any*/),
      (v2/*:: as any*/),
      (v3/*:: as any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "LiveLayoutQuery",
    "selections": [
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "LiveHeader"
      },
      {
        "args": [
          (v4/*:: as any*/),
          (v5/*:: as any*/),
          (v6/*:: as any*/)
        ],
        "kind": "FragmentSpread",
        "name": "LiveEventSidebar"
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
                  "name": "FavouriteLiveEvents"
                }
              ],
              "type": "Query",
              "abstractKey": null
            },
            "kind": "AliasedInlineFragmentSpread",
            "name": "favouriteLive"
          }
        ]
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
      (v0/*:: as any*/)
    ],
    "kind": "Operation",
    "name": "LiveLayoutQuery",
    "selections": [
      {
        "alias": "firstLive",
        "args": [
          {
            "kind": "Literal",
            "name": "first",
            "value": 1
          },
          (v4/*:: as any*/),
          (v5/*:: as any*/),
          (v6/*:: as any*/)
        ],
        "concreteType": "EventConnection",
        "kind": "LinkedField",
        "name": "liveEvents",
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
                  (v7/*:: as any*/)
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
        "alias": "allLive",
        "args": null,
        "concreteType": "EventConnection",
        "kind": "LinkedField",
        "name": "liveEvents",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "totalCount",
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Sport",
        "kind": "LinkedField",
        "name": "sports",
        "plural": true,
        "selections": [
          (v8/*:: as any*/),
          (v9/*:: as any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "liveEventCount",
            "storageKey": null
          },
          (v7/*:: as any*/)
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v11/*:: as any*/),
        "concreteType": "EventConnection",
        "kind": "LinkedField",
        "name": "liveEvents",
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
                  (v7/*:: as any*/),
                  (v12/*:: as any*/),
                  (v13/*:: as any*/),
                  (v15/*:: as any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Tournament",
                    "kind": "LinkedField",
                    "name": "tournament",
                    "plural": false,
                    "selections": [
                      (v8/*:: as any*/),
                      (v7/*:: as any*/),
                      (v9/*:: as any*/),
                      (v15/*:: as any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Category",
                        "kind": "LinkedField",
                        "name": "category",
                        "plural": false,
                        "selections": [
                          (v9/*:: as any*/),
                          (v7/*:: as any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  (v16/*:: as any*/),
                  (v17/*:: as any*/),
                  (v18/*:: as any*/),
                  (v19/*:: as any*/),
                  (v20/*:: as any*/),
                  (v21/*:: as any*/),
                  (v22/*:: as any*/),
                  (v23/*:: as any*/),
                  (v24/*:: as any*/),
                  (v25/*:: as any*/),
                  (v26/*:: as any*/),
                  (v27/*:: as any*/),
                  (v28/*:: as any*/),
                  (v29/*:: as any*/),
                  (v32/*:: as any*/),
                  (v33/*:: as any*/),
                  (v37/*:: as any*/),
                  (v38/*:: as any*/)
                ],
                "storageKey": null
              },
              (v39/*:: as any*/)
            ],
            "storageKey": null
          },
          (v40/*:: as any*/)
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v11/*:: as any*/),
        "filters": [
          "orderBy",
          "sport",
          "search"
        ],
        "handle": "connection",
        "key": "LiveEventSidebar_liveEvents",
        "kind": "LinkedHandle",
        "name": "liveEvents"
      },
      {
        "condition": "hasUser",
        "kind": "Condition",
        "passingValue": true,
        "selections": [
          {
            "alias": "favouriteLiveEvents",
            "args": (v41/*:: as any*/),
            "concreteType": "EventConnection",
            "kind": "LinkedField",
            "name": "liveEvents",
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
                      (v7/*:: as any*/),
                      (v12/*:: as any*/),
                      (v13/*:: as any*/),
                      (v15/*:: as any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Tournament",
                        "kind": "LinkedField",
                        "name": "tournament",
                        "plural": false,
                        "selections": (v14/*:: as any*/),
                        "storageKey": null
                      },
                      (v23/*:: as any*/),
                      (v25/*:: as any*/),
                      (v27/*:: as any*/),
                      (v28/*:: as any*/),
                      (v16/*:: as any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "oddCount",
                        "storageKey": null
                      },
                      (v17/*:: as any*/),
                      (v18/*:: as any*/),
                      (v19/*:: as any*/),
                      (v20/*:: as any*/),
                      (v21/*:: as any*/),
                      (v22/*:: as any*/),
                      (v24/*:: as any*/),
                      (v26/*:: as any*/),
                      (v29/*:: as any*/),
                      (v32/*:: as any*/),
                      (v33/*:: as any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Market",
                        "kind": "LinkedField",
                        "name": "markets",
                        "plural": true,
                        "selections": [
                          (v7/*:: as any*/),
                          (v34/*:: as any*/),
                          (v17/*:: as any*/),
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
                              (v36/*:: as any*/),
                              (v7/*:: as any*/),
                              (v35/*:: as any*/),
                              (v8/*:: as any*/),
                              (v13/*:: as any*/)
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
                        "name": "isFavourite",
                        "storageKey": null
                      },
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
                        "name": "sportradarMatchId",
                        "storageKey": null
                      },
                      (v37/*:: as any*/),
                      (v38/*:: as any*/)
                    ],
                    "storageKey": null
                  },
                  (v39/*:: as any*/)
                ],
                "storageKey": null
              },
              (v40/*:: as any*/)
            ],
            "storageKey": "liveEvents(favourites:true,first:50)"
          },
          {
            "alias": "favouriteLiveEvents",
            "args": (v41/*:: as any*/),
            "filters": [
              "favourites"
            ],
            "handle": "connection",
            "key": "FavouriteLiveEvents_favouriteLiveEvents",
            "kind": "LinkedHandle",
            "name": "liveEvents"
          }
        ]
      }
    ]
  },
  "params": {
    "cacheID": "f551aab5b7803b3236aab8daab5471a4",
    "id": null,
    "metadata": {},
    "name": "LiveLayoutQuery",
    "operationKind": "query",
    "text": "query LiveLayoutQuery(\n  $orderBy: LiveEventOrder!\n  $sport: String\n  $search: String\n  $hasUser: Boolean!\n) {\n  ...LiveHeader\n  ...LiveEventSidebar_3E31Tm\n  ...FavouriteLiveEvents @include(if: $hasUser)\n}\n\nfragment FavouriteButton on Event {\n  id\n  isFavourite\n  isLive\n}\n\nfragment FavouriteLiveEvents on Query {\n  favouriteLiveEvents: liveEvents(first: 50, favourites: true) {\n    edges {\n      node {\n        id\n        ...LiveOrder\n        ...LiveEvent\n        ...LiveEventStrip\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment ListViewMarket on Market {\n  kind\n  line\n  outcomes {\n    id\n    index\n    key\n    price\n    status\n  }\n}\n\nfragment ListViewMarkets on Event {\n  sport {\n    key\n    id\n  }\n  markets {\n    id\n    kind\n    period\n    line\n    outcomes {\n      price\n      id\n    }\n    ...ListViewMarket\n  }\n}\n\nfragment LiveEvent on Event {\n  id\n  homeCompetitor\n  awayCompetitor\n  homeScore\n  awayScore\n  tradingStatus\n  oddCount\n  ...LiveTime\n  ...LiveTeams\n  ...LiveScore\n  ...ListViewMarkets\n  ...FavouriteButton\n  ...TrackerButton\n}\n\nfragment LiveEventSidebar_3E31Tm on Query {\n  liveEvents(first: 50, orderBy: $orderBy, sport: $sport, search: $search) {\n    edges {\n      node {\n        ...LiveOrder\n        ...LiveEventStrip\n        tournament {\n          ...LiveStripTournament\n          id\n        }\n        id\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment LiveEventStrip on Event {\n  id\n  tradingStatus\n  ...LiveTime\n  ...LiveTeams\n  ...LiveScore\n  ...LiveStripOdds\n}\n\nfragment LiveHeader on Query {\n  firstLive: liveEvents(first: 1, orderBy: $orderBy, sport: $sport, search: $search) {\n    edges {\n      node {\n        id\n      }\n    }\n  }\n  ...LiveSportTabs\n}\n\nfragment LiveOrder on Event {\n  id\n  startTime\n  status\n  sport {\n    key\n    id\n  }\n  tournament {\n    key\n    id\n  }\n}\n\nfragment LiveScore on Event {\n  status\n  sport {\n    key\n    id\n  }\n  homeScore\n  awayScore\n  serving\n  pointScore {\n    home\n    away\n  }\n  periodScores {\n    period\n    home\n    away\n  }\n}\n\nfragment LiveSportTabs on Query {\n  allLive: liveEvents {\n    totalCount\n  }\n  sports {\n    key\n    name\n    liveEventCount\n    id\n  }\n}\n\nfragment LiveStripMarket on Market {\n  outcomes {\n    id\n    index\n    ...LiveStripOdd\n  }\n}\n\nfragment LiveStripOdd on Outcome {\n  id\n  name\n  price\n  status\n}\n\nfragment LiveStripOdds on Event {\n  tradingStatus\n  mainMarkets: markets(groups: [MAIN]) {\n    id\n    kind\n    ...LiveStripMarket\n  }\n}\n\nfragment LiveStripTournament on Tournament {\n  name\n  sport {\n    key\n    id\n  }\n  category {\n    name\n    id\n  }\n}\n\nfragment LiveTeams on Event {\n  homeCompetitor\n  homeImageUrl\n  awayCompetitor\n  awayImageUrl\n}\n\nfragment LiveTime on Event {\n  id\n  status\n  period\n  clockRunning\n  clockDirection\n  clockElapsedSeconds\n  clockAnchorAt\n  liveSeenAt\n  tradingStatus\n}\n\nfragment TrackerButton on Event {\n  id\n  sportradarMatchId\n}\n"
  }
};
})();

(node as any).hash = "b902b9135c7636af5c86f3be83803492";

export default node;
