/**
 * @generated SignedSource<<8a34aff8995e8d8d3ad043db498ccdbf>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type TicketHistoryListPaginationQuery$variables = {
  after?: string | null | undefined;
  first?: number | null | undefined;
};
export type TicketHistoryListPaginationQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"TicketHistoryList">;
};
export type TicketHistoryListPaginationQuery = {
  response: TicketHistoryListPaginationQuery$data;
  variables: TicketHistoryListPaginationQuery$variables;
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
  "name": "createdAt",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "home",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "away",
  "storageKey": null
},
v7 = [
  (v5/*:: as any*/),
  (v6/*:: as any*/)
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*:: as any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "TicketHistoryListPaginationQuery",
    "selections": [
      {
        "args": (v1/*:: as any*/),
        "kind": "FragmentSpread",
        "name": "TicketHistoryList"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*:: as any*/),
    "kind": "Operation",
    "name": "TicketHistoryListPaginationQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*:: as any*/),
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
                  (v2/*:: as any*/),
                  (v3/*:: as any*/),
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
                  (v4/*:: as any*/),
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
                      (v2/*:: as any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "priceAtAcceptance",
                        "storageKey": null
                      },
                      (v3/*:: as any*/),
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
                        "selections": (v7/*:: as any*/),
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
                          (v5/*:: as any*/),
                          (v6/*:: as any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "TicketItemScore",
                            "kind": "LinkedField",
                            "name": "halfTime",
                            "plural": false,
                            "selections": (v7/*:: as any*/),
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
                      (v2/*:: as any*/),
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
                      (v4/*:: as any*/)
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
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v1/*:: as any*/),
        "filters": null,
        "handle": "connection",
        "key": "TicketHistoryList_myTickets",
        "kind": "LinkedHandle",
        "name": "myTickets"
      }
    ]
  },
  "params": {
    "cacheID": "899f1527579ccfaaaf769d320b28dbd8",
    "id": null,
    "metadata": {},
    "name": "TicketHistoryListPaginationQuery",
    "operationKind": "query",
    "text": "query TicketHistoryListPaginationQuery(\n  $after: String\n  $first: Int = 20\n) {\n  ...TicketHistoryList_2HEEH6\n}\n\nfragment TicketCardDetails on Ticket {\n  id\n  stake\n  effectiveOdds\n  potentialPayout\n  payout\n  currency\n  status\n  settledAt\n  payoutCapped\n  rejectReason\n  boost {\n    boostedOdds\n    normalOdds\n  }\n  resettled\n  corrections {\n    id\n    itemId\n    kind\n    amount\n    previousPrice\n    newPrice\n    previousStatus\n    newStatus\n    createdAt\n  }\n  items {\n    id\n    eventName\n    marketName\n    outcomeName\n    priceAtAcceptance\n    status\n    eventStartTime\n    inPlay\n    scoreAtBet {\n      home\n      away\n    }\n    result {\n      home\n      away\n      halfTime {\n        home\n        away\n      }\n    }\n  }\n}\n\nfragment TicketHistoryDetails on Ticket {\n  id\n  betType\n  status\n  createdAt\n  resettled\n  resettlementSeen\n  items {\n    id\n  }\n  ...TicketCardDetails\n}\n\nfragment TicketHistoryList_2HEEH6 on Query {\n  myTickets(first: $first, after: $after) {\n    edges {\n      node {\n        id\n        status\n        resettled\n        ...TicketRow\n        ...TicketHistoryDetails\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment TicketRow on Ticket {\n  betType\n  stake\n  effectiveOdds\n  potentialPayout\n  payout\n  currency\n  status\n  createdAt\n  resettled\n  resettlementSeen\n  items {\n    eventName\n    marketName\n    outcomeName\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "139e1048f14dcb09682fe4ae7be5682e";

export default node;
