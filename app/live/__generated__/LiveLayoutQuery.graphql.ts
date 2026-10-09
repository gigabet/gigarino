/**
 * @generated SignedSource<<d3e33ee30075be68e2f728f1bf830794>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type LiveEventOrder = "START_TIME" | "TOURNAMENT" | "%future added value";
export type LiveLayoutQuery$variables = {
  orderBy: LiveEventOrder;
  sport?: string | null | undefined;
};
export type LiveLayoutQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"LiveEventSidebar" | "LiveHeader">;
};
export type LiveLayoutQuery = {
  response: LiveLayoutQuery$data;
  variables: LiveLayoutQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "orderBy"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "sport"
  }
],
v1 = {
  "kind": "Variable",
  "name": "orderBy",
  "variableName": "orderBy"
},
v2 = {
  "kind": "Variable",
  "name": "sport",
  "variableName": "sport"
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
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
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v6 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 50
  },
  (v1/*:: as any*/),
  (v2/*:: as any*/)
],
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
  "concreteType": "Sport",
  "kind": "LinkedField",
  "name": "sport",
  "plural": false,
  "selections": [
    (v4/*:: as any*/),
    (v3/*:: as any*/)
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*:: as any*/),
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
          (v1/*:: as any*/),
          (v2/*:: as any*/)
        ],
        "kind": "FragmentSpread",
        "name": "LiveEventSidebar"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*:: as any*/),
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
          (v1/*:: as any*/),
          (v2/*:: as any*/)
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
                  (v3/*:: as any*/)
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
          (v4/*:: as any*/),
          (v5/*:: as any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "liveEventCount",
            "storageKey": null
          },
          (v3/*:: as any*/)
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v6/*:: as any*/),
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
                  (v3/*:: as any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "startTime",
                    "storageKey": null
                  },
                  (v7/*:: as any*/),
                  (v8/*:: as any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Tournament",
                    "kind": "LinkedField",
                    "name": "tournament",
                    "plural": false,
                    "selections": [
                      (v4/*:: as any*/),
                      (v3/*:: as any*/),
                      (v5/*:: as any*/),
                      (v8/*:: as any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Category",
                        "kind": "LinkedField",
                        "name": "category",
                        "plural": false,
                        "selections": [
                          (v5/*:: as any*/),
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
                    "name": "tradingStatus",
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
                    "name": "clockRunning",
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
                      (v3/*:: as any*/),
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
                          (v3/*:: as any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "index",
                            "storageKey": null
                          },
                          (v5/*:: as any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "price",
                            "storageKey": null
                          },
                          (v7/*:: as any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": "markets(groups:[\"MAIN\"])"
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
        "args": (v6/*:: as any*/),
        "filters": [
          "orderBy",
          "sport"
        ],
        "handle": "connection",
        "key": "LiveEventSidebar_liveEvents",
        "kind": "LinkedHandle",
        "name": "liveEvents"
      }
    ]
  },
  "params": {
    "cacheID": "bb937885cccc4e22ad4d690738953e63",
    "id": null,
    "metadata": {},
    "name": "LiveLayoutQuery",
    "operationKind": "query",
    "text": "query LiveLayoutQuery(\n  $orderBy: LiveEventOrder!\n  $sport: String\n) {\n  ...LiveHeader\n  ...LiveEventSidebar_2NLrvA\n}\n\nfragment LiveEventSidebar_2NLrvA on Query {\n  liveEvents(first: 50, orderBy: $orderBy, sport: $sport) {\n    edges {\n      node {\n        ...LiveOrder\n        ...LiveEventStrip\n        tournament {\n          ...LiveStripTournament\n          id\n        }\n        id\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment LiveEventStrip on Event {\n  id\n  tradingStatus\n  ...LiveTime\n  ...LiveTeams\n  ...LiveScore\n  ...LiveStripOdds\n}\n\nfragment LiveHeader on Query {\n  firstLive: liveEvents(first: 1, orderBy: $orderBy, sport: $sport) {\n    edges {\n      node {\n        id\n      }\n    }\n  }\n  ...LiveSportTabs\n}\n\nfragment LiveOrder on Event {\n  id\n  startTime\n  status\n  sport {\n    key\n    id\n  }\n  tournament {\n    key\n    id\n  }\n}\n\nfragment LiveScore on Event {\n  homeScore\n  awayScore\n}\n\nfragment LiveSportTabs on Query {\n  allLive: liveEvents {\n    totalCount\n  }\n  sports {\n    key\n    name\n    liveEventCount\n    id\n  }\n}\n\nfragment LiveStripMarket on Market {\n  outcomes {\n    id\n    index\n    ...LiveStripOdd\n  }\n}\n\nfragment LiveStripOdd on Outcome {\n  id\n  name\n  price\n  status\n}\n\nfragment LiveStripOdds on Event {\n  tradingStatus\n  markets(groups: [MAIN]) {\n    id\n    kind\n    ...LiveStripMarket\n  }\n}\n\nfragment LiveStripTournament on Tournament {\n  name\n  sport {\n    key\n    id\n  }\n  category {\n    name\n    id\n  }\n}\n\nfragment LiveTeams on Event {\n  homeCompetitor\n  homeImageUrl\n  awayCompetitor\n  awayImageUrl\n}\n\nfragment LiveTime on Event {\n  period\n  clockRunning\n  clockElapsedSeconds\n  clockAnchorAt\n  tradingStatus\n}\n"
  }
};
})();

(node as any).hash = "ffaec18fc96a6848c63b5c55ce5aa549";

export default node;
