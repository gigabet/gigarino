/**
 * @generated SignedSource<<70e1524d2d2d0e5c08d52ab595996634>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type TicketHistoryQuery$variables = Record<PropertyKey, never>;
export type TicketHistoryQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"TicketHistoryList">;
};
export type TicketHistoryQuery = {
  response: TicketHistoryQuery$data;
  variables: TicketHistoryQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 20
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
  "name": "status",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "createdAt",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "home",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "away",
  "storageKey": null
},
v6 = [
  (v4/*:: as any*/),
  (v5/*:: as any*/)
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "TicketHistoryQuery",
    "selections": [
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "TicketHistoryList"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "TicketHistoryQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*:: as any*/),
        "concreteType": "TicketConnection",
        "kind": "LinkedField",
        "name": "myTickets",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "TicketEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Ticket",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v1/*:: as any*/),
                  (v2/*:: as any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "resettled",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "betType",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "stake",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "effectiveOdds",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "potentialPayout",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "payout",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "currency",
                    "storageKey": null
                  },
                  (v3/*:: as any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "resettlementSeen",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "TicketItem",
                    "kind": "LinkedField",
                    "name": "items",
                    "plural": true,
                    "selections": [
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
                        "name": "marketName",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "outcomeName",
                        "storageKey": null
                      },
                      (v1/*:: as any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "priceAtAcceptance",
                        "storageKey": null
                      },
                      (v2/*:: as any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "eventStartTime",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "inPlay",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "TicketItemScore",
                        "kind": "LinkedField",
                        "name": "scoreAtBet",
                        "plural": false,
                        "selections": (v6/*:: as any*/),
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "TicketItemResult",
                        "kind": "LinkedField",
                        "name": "result",
                        "plural": false,
                        "selections": [
                          (v4/*:: as any*/),
                          (v5/*:: as any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "TicketItemScore",
                            "kind": "LinkedField",
                            "name": "halfTime",
                            "plural": false,
                            "selections": (v6/*:: as any*/),
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
                    "name": "settledAt",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "payoutCapped",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "rejectReason",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "TicketBoost",
                    "kind": "LinkedField",
                    "name": "boost",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "boostedOdds",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "normalOdds",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "TicketCorrection",
                    "kind": "LinkedField",
                    "name": "corrections",
                    "plural": true,
                    "selections": [
                      (v1/*:: as any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "itemId",
                        "storageKey": null
                      },
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
                        "name": "amount",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "previousPrice",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "newPrice",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "previousStatus",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "newStatus",
                        "storageKey": null
                      },
                      (v3/*:: as any*/)
                    ],
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
        "storageKey": "myTickets(first:20)"
      },
      {
        "alias": null,
        "args": (v0/*:: as any*/),
        "filters": null,
        "handle": "connection",
        "key": "TicketHistoryList_myTickets",
        "kind": "LinkedHandle",
        "name": "myTickets"
      }
    ]
  },
  "params": {
    "cacheID": "aa1f3e2ea62eef5e2c5da589da99fca4",
    "id": null,
    "metadata": {},
    "name": "TicketHistoryQuery",
    "operationKind": "query",
    "text": "query TicketHistoryQuery {\n  ...TicketHistoryList\n}\n\nfragment TicketCardDetails on Ticket {\n  id\n  stake\n  effectiveOdds\n  potentialPayout\n  payout\n  currency\n  status\n  settledAt\n  payoutCapped\n  rejectReason\n  boost {\n    boostedOdds\n    normalOdds\n  }\n  resettled\n  corrections {\n    id\n    itemId\n    kind\n    amount\n    previousPrice\n    newPrice\n    previousStatus\n    newStatus\n    createdAt\n  }\n  items {\n    id\n    eventName\n    marketName\n    outcomeName\n    priceAtAcceptance\n    status\n    eventStartTime\n    inPlay\n    scoreAtBet {\n      home\n      away\n    }\n    result {\n      home\n      away\n      halfTime {\n        home\n        away\n      }\n    }\n  }\n}\n\nfragment TicketHistoryDetails on Ticket {\n  id\n  betType\n  status\n  createdAt\n  resettled\n  resettlementSeen\n  items {\n    id\n  }\n  ...TicketCardDetails\n}\n\nfragment TicketHistoryList on Query {\n  myTickets(first: 20) {\n    edges {\n      node {\n        id\n        status\n        resettled\n        ...TicketRow\n        ...TicketHistoryDetails\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment TicketRow on Ticket {\n  betType\n  stake\n  effectiveOdds\n  potentialPayout\n  payout\n  currency\n  status\n  createdAt\n  resettled\n  resettlementSeen\n  items {\n    eventName\n    marketName\n    outcomeName\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "5cd68792717a49a361bbc0b39cb704ff";

export default node;
