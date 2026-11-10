/**
 * @generated SignedSource<<269c159d3efb551fd312eebb11393dd1>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type LiveEventOrder = "START_TIME" | "TOURNAMENT" | "%future added value";
export type LiveEventListPaginationQuery$variables = {
  after?: string | null | undefined;
  first?: number | null | undefined;
  orderBy?: LiveEventOrder | null | undefined;
  search?: string | null | undefined;
  sport?: string | null | undefined;
};
export type LiveEventListPaginationQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"LiveEventList">;
};
export type LiveEventListPaginationQuery = {
  response: LiveEventListPaginationQuery$data;
  variables: LiveEventListPaginationQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "after"
  },
  {
    "defaultValue": 20,
    "kind": "LocalArgument",
    "name": "first"
  },
  {
    "defaultValue": "TOURNAMENT",
    "kind": "LocalArgument",
    "name": "orderBy"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "search"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "sport"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "after",
    "variableName": "after"
  },
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "first"
  },
  {
    "kind": "Variable",
    "name": "orderBy",
    "variableName": "orderBy"
  },
  {
    "kind": "Variable",
    "name": "search",
    "variableName": "search"
  },
  {
    "kind": "Variable",
    "name": "sport",
    "variableName": "sport"
  }
],
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
  "name": "status",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "key",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "concreteType": "Sport",
  "kind": "LinkedField",
  "name": "sport",
  "plural": false,
  "selections": [
    (v4/*:: as any*/),
    (v2/*:: as any*/)
  ],
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "period",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "home",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "away",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*:: as any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "LiveEventListPaginationQuery",
    "selections": [
      {
        "args": (v1/*:: as any*/),
        "kind": "FragmentSpread",
        "name": "LiveEventList"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*:: as any*/),
    "kind": "Operation",
    "name": "LiveEventListPaginationQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*:: as any*/),
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
                  (v2/*:: as any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "startTime",
                    "storageKey": null
                  },
                  (v3/*:: as any*/),
                  (v5/*:: as any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Tournament",
                    "kind": "LinkedField",
                    "name": "tournament",
                    "plural": false,
                    "selections": [
                      (v4/*:: as any*/),
                      (v2/*:: as any*/),
                      (v5/*:: as any*/),
                      (v6/*:: as any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Category",
                        "kind": "LinkedField",
                        "name": "category",
                        "plural": false,
                        "selections": [
                          (v6/*:: as any*/),
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
                      }
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
                      (v6/*:: as any*/),
                      (v2/*:: as any*/)
                    ],
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
                    "name": "awayCompetitor",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "homeScore",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "awayScore",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "tradingStatus",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "oddCount",
                    "storageKey": null
                  },
                  (v7/*:: as any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "clockRunning",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "clockDirection",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "clockElapsedSeconds",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "clockAnchorAt",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "liveSeenAt",
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
                    "name": "awayImageUrl",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "serving",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PointScore",
                    "kind": "LinkedField",
                    "name": "pointScore",
                    "plural": false,
                    "selections": [
                      (v8/*:: as any*/),
                      (v9/*:: as any*/)
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PeriodScore",
                    "kind": "LinkedField",
                    "name": "periodScores",
                    "plural": true,
                    "selections": [
                      (v7/*:: as any*/),
                      (v8/*:: as any*/),
                      (v9/*:: as any*/)
                    ],
                    "storageKey": null
                  },
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
                      (v7/*:: as any*/),
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
                          (v2/*:: as any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "index",
                            "storageKey": null
                          },
                          (v4/*:: as any*/),
                          (v3/*:: as any*/)
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
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v1/*:: as any*/),
        "filters": [
          "orderBy",
          "sport",
          "search"
        ],
        "handle": "connection",
        "key": "LiveEventList_liveEvents",
        "kind": "LinkedHandle",
        "name": "liveEvents"
      }
    ]
  },
  "params": {
    "cacheID": "78f1fb0c2c0a87fbfd5b21702d9f98f9",
    "id": null,
    "metadata": {},
    "name": "LiveEventListPaginationQuery",
    "operationKind": "query",
    "text": "query LiveEventListPaginationQuery(\n  $after: String\n  $first: Int = 20\n  $orderBy: LiveEventOrder = TOURNAMENT\n  $search: String\n  $sport: String\n) {\n  ...LiveEventList_3B7fGr\n}\n\nfragment FavouriteButton on Event {\n  id\n  isFavourite\n  isLive\n}\n\nfragment ListViewMarket on Market {\n  kind\n  line\n  outcomes {\n    id\n    index\n    key\n    price\n    status\n  }\n}\n\nfragment ListViewMarkets on Event {\n  sport {\n    key\n    id\n  }\n  markets {\n    id\n    kind\n    period\n    line\n    outcomes {\n      price\n      id\n    }\n    ...ListViewMarket\n  }\n}\n\nfragment LiveEvent on Event {\n  id\n  homeCompetitor\n  awayCompetitor\n  homeScore\n  awayScore\n  tradingStatus\n  oddCount\n  ...LiveTime\n  ...LiveTeams\n  ...LiveScore\n  ...ListViewMarkets\n  ...FavouriteButton\n  ...TrackerButton\n}\n\nfragment LiveEventList_3B7fGr on Query {\n  liveEvents(first: $first, after: $after, orderBy: $orderBy, sport: $sport, search: $search) {\n    edges {\n      node {\n        ...LiveOrder\n        ...LiveEvent\n        tournament {\n          ...LiveTournament\n          id\n        }\n        id\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment LiveOrder on Event {\n  id\n  startTime\n  status\n  sport {\n    key\n    id\n  }\n  tournament {\n    key\n    id\n  }\n  category {\n    name\n    id\n  }\n}\n\nfragment LiveScore on Event {\n  status\n  sport {\n    key\n    id\n  }\n  homeScore\n  awayScore\n  serving\n  pointScore {\n    home\n    away\n  }\n  periodScores {\n    period\n    home\n    away\n  }\n}\n\nfragment LiveTeams on Event {\n  homeCompetitor\n  homeImageUrl\n  awayCompetitor\n  awayImageUrl\n}\n\nfragment LiveTime on Event {\n  id\n  status\n  period\n  clockRunning\n  clockDirection\n  clockElapsedSeconds\n  clockAnchorAt\n  liveSeenAt\n  tradingStatus\n}\n\nfragment LiveTournament on Tournament {\n  sport {\n    key\n    id\n  }\n  ...LiveTournamentTitle\n}\n\nfragment LiveTournamentTitle on Tournament {\n  name\n  sport {\n    key\n    id\n  }\n  category {\n    name\n    countryCode\n    id\n  }\n}\n\nfragment TrackerButton on Event {\n  id\n  sportradarMatchId\n}\n"
  }
};
})();

(node as any).hash = "1384b93fc213d42905242c981759f996";

export default node;
