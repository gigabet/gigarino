/**
 * @generated SignedSource<<2d3980606e70c4391dd6bc72ceeabc32>>
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
  "name": "sport"
},
v3 = {
  "kind": "Variable",
  "name": "orderBy",
  "variableName": "orderBy"
},
v4 = {
  "kind": "Variable",
  "name": "sport",
  "variableName": "sport"
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "key",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v8 = {
  "kind": "Literal",
  "name": "first",
  "value": 50
},
v9 = [
  (v8/*:: as any*/),
  (v3/*:: as any*/),
  (v4/*:: as any*/)
],
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "startTime",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "status",
  "storageKey": null
},
v12 = [
  (v6/*:: as any*/),
  (v5/*:: as any*/)
],
v13 = {
  "alias": null,
  "args": null,
  "concreteType": "Sport",
  "kind": "LinkedField",
  "name": "sport",
  "plural": false,
  "selections": (v12/*:: as any*/),
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "tradingStatus",
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "period",
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "clockRunning",
  "storageKey": null
},
v17 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "clockElapsedSeconds",
  "storageKey": null
},
v18 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "clockAnchorAt",
  "storageKey": null
},
v19 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "homeCompetitor",
  "storageKey": null
},
v20 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "homeImageUrl",
  "storageKey": null
},
v21 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "awayCompetitor",
  "storageKey": null
},
v22 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "awayImageUrl",
  "storageKey": null
},
v23 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "homeScore",
  "storageKey": null
},
v24 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "awayScore",
  "storageKey": null
},
v25 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "kind",
  "storageKey": null
},
v26 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "index",
  "storageKey": null
},
v27 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "price",
  "storageKey": null
},
v28 = {
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
    (v5/*:: as any*/),
    (v25/*:: as any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "Outcome",
      "kind": "LinkedField",
      "name": "outcomes",
      "plural": true,
      "selections": [
        (v5/*:: as any*/),
        (v26/*:: as any*/),
        (v7/*:: as any*/),
        (v27/*:: as any*/),
        (v11/*:: as any*/)
      ],
      "storageKey": null
    }
  ],
  "storageKey": "markets(groups:[\"MAIN\"])"
},
v29 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v30 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
  "storageKey": null
},
v31 = {
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
v32 = [
  {
    "kind": "Literal",
    "name": "favourites",
    "value": true
  },
  (v8/*:: as any*/)
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*:: as any*/),
      (v1/*:: as any*/),
      (v2/*:: as any*/)
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
          (v3/*:: as any*/),
          (v4/*:: as any*/)
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
          (v3/*:: as any*/),
          (v4/*:: as any*/)
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
                  (v5/*:: as any*/)
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
          (v6/*:: as any*/),
          (v7/*:: as any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "liveEventCount",
            "storageKey": null
          },
          (v5/*:: as any*/)
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v9/*:: as any*/),
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
                  (v5/*:: as any*/),
                  (v10/*:: as any*/),
                  (v11/*:: as any*/),
                  (v13/*:: as any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Tournament",
                    "kind": "LinkedField",
                    "name": "tournament",
                    "plural": false,
                    "selections": [
                      (v6/*:: as any*/),
                      (v5/*:: as any*/),
                      (v7/*:: as any*/),
                      (v13/*:: as any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Category",
                        "kind": "LinkedField",
                        "name": "category",
                        "plural": false,
                        "selections": [
                          (v7/*:: as any*/),
                          (v5/*:: as any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  (v14/*:: as any*/),
                  (v15/*:: as any*/),
                  (v16/*:: as any*/),
                  (v17/*:: as any*/),
                  (v18/*:: as any*/),
                  (v19/*:: as any*/),
                  (v20/*:: as any*/),
                  (v21/*:: as any*/),
                  (v22/*:: as any*/),
                  (v23/*:: as any*/),
                  (v24/*:: as any*/),
                  (v28/*:: as any*/),
                  (v29/*:: as any*/)
                ],
                "storageKey": null
              },
              (v30/*:: as any*/)
            ],
            "storageKey": null
          },
          (v31/*:: as any*/)
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v9/*:: as any*/),
        "filters": [
          "orderBy",
          "sport"
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
            "args": (v32/*:: as any*/),
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
                      (v5/*:: as any*/),
                      (v10/*:: as any*/),
                      (v11/*:: as any*/),
                      (v13/*:: as any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Tournament",
                        "kind": "LinkedField",
                        "name": "tournament",
                        "plural": false,
                        "selections": (v12/*:: as any*/),
                        "storageKey": null
                      },
                      (v19/*:: as any*/),
                      (v21/*:: as any*/),
                      (v23/*:: as any*/),
                      (v24/*:: as any*/),
                      (v14/*:: as any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "oddCount",
                        "storageKey": null
                      },
                      (v15/*:: as any*/),
                      (v16/*:: as any*/),
                      (v17/*:: as any*/),
                      (v18/*:: as any*/),
                      (v20/*:: as any*/),
                      (v22/*:: as any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Market",
                        "kind": "LinkedField",
                        "name": "markets",
                        "plural": true,
                        "selections": [
                          (v5/*:: as any*/),
                          (v25/*:: as any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Outcome",
                            "kind": "LinkedField",
                            "name": "outcomes",
                            "plural": true,
                            "selections": [
                              (v5/*:: as any*/),
                              (v26/*:: as any*/),
                              (v6/*:: as any*/),
                              (v27/*:: as any*/),
                              (v11/*:: as any*/)
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
                      (v28/*:: as any*/),
                      (v29/*:: as any*/)
                    ],
                    "storageKey": null
                  },
                  (v30/*:: as any*/)
                ],
                "storageKey": null
              },
              (v31/*:: as any*/)
            ],
            "storageKey": "liveEvents(favourites:true,first:50)"
          },
          {
            "alias": "favouriteLiveEvents",
            "args": (v32/*:: as any*/),
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
    "cacheID": "faa468e55f4ea7cbb1596685d6fa603a",
    "id": null,
    "metadata": {},
    "name": "LiveLayoutQuery",
    "operationKind": "query",
    "text": "query LiveLayoutQuery(\n  $orderBy: LiveEventOrder!\n  $sport: String\n  $hasUser: Boolean!\n) {\n  ...LiveHeader\n  ...LiveEventSidebar_2NLrvA\n  ...FavouriteLiveEvents @include(if: $hasUser)\n}\n\nfragment FavouriteButton on Event {\n  id\n  isFavourite\n  isLive\n}\n\nfragment FavouriteLiveEvents on Query {\n  favouriteLiveEvents: liveEvents(first: 50, favourites: true) {\n    edges {\n      node {\n        id\n        ...LiveOrder\n        ...LiveEvent\n        ...LiveEventStrip\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment ListViewMarket on Market {\n  outcomes {\n    id\n    index\n    key\n    price\n    status\n  }\n}\n\nfragment ListViewMarkets on Event {\n  markets {\n    id\n    kind\n    ...ListViewMarket\n  }\n}\n\nfragment LiveEvent on Event {\n  id\n  homeCompetitor\n  awayCompetitor\n  homeScore\n  awayScore\n  tradingStatus\n  oddCount\n  ...LiveTime\n  ...LiveTeams\n  ...LiveScore\n  ...ListViewMarkets\n  ...FavouriteButton\n}\n\nfragment LiveEventSidebar_2NLrvA on Query {\n  liveEvents(first: 50, orderBy: $orderBy, sport: $sport) {\n    edges {\n      node {\n        ...LiveOrder\n        ...LiveEventStrip\n        tournament {\n          ...LiveStripTournament\n          id\n        }\n        id\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment LiveEventStrip on Event {\n  id\n  tradingStatus\n  ...LiveTime\n  ...LiveTeams\n  ...LiveScore\n  ...LiveStripOdds\n}\n\nfragment LiveHeader on Query {\n  firstLive: liveEvents(first: 1, orderBy: $orderBy, sport: $sport) {\n    edges {\n      node {\n        id\n      }\n    }\n  }\n  ...LiveSportTabs\n}\n\nfragment LiveOrder on Event {\n  id\n  startTime\n  status\n  sport {\n    key\n    id\n  }\n  tournament {\n    key\n    id\n  }\n}\n\nfragment LiveScore on Event {\n  homeScore\n  awayScore\n}\n\nfragment LiveSportTabs on Query {\n  allLive: liveEvents {\n    totalCount\n  }\n  sports {\n    key\n    name\n    liveEventCount\n    id\n  }\n}\n\nfragment LiveStripMarket on Market {\n  outcomes {\n    id\n    index\n    ...LiveStripOdd\n  }\n}\n\nfragment LiveStripOdd on Outcome {\n  id\n  name\n  price\n  status\n}\n\nfragment LiveStripOdds on Event {\n  tradingStatus\n  mainMarkets: markets(groups: [MAIN]) {\n    id\n    kind\n    ...LiveStripMarket\n  }\n}\n\nfragment LiveStripTournament on Tournament {\n  name\n  sport {\n    key\n    id\n  }\n  category {\n    name\n    id\n  }\n}\n\nfragment LiveTeams on Event {\n  homeCompetitor\n  homeImageUrl\n  awayCompetitor\n  awayImageUrl\n}\n\nfragment LiveTime on Event {\n  period\n  clockRunning\n  clockElapsedSeconds\n  clockAnchorAt\n  tradingStatus\n}\n"
  }
};
})();

(node as any).hash = "10de43cdcbdeec8a458e0271e4c81968";

export default node;
