/**
 * @generated SignedSource<<aa1c7373ceb7d0f9112e70a3a8b9cad1>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type BetRejectionCode = "BOOST_LIMIT" | "BOOST_UNAVAILABLE" | "CASHOUT_UNAVAILABLE" | "CUTOFF_PASSED" | "DUPLICATE_EVENT" | "EVENT_NOT_BETTABLE" | "INSUFFICIENT_FUNDS" | "INTERNAL_ERROR" | "LIABILITY_LIMIT" | "LIVE_STATE_CHANGED" | "MULTI_SINGLE_NOT_SUPPORTED" | "ODDS_LIMIT" | "ODDS_UNAVAILABLE" | "OUTCOME_NOT_AVAILABLE" | "PRICE_CHANGED" | "PROVIDER_CURRENCY" | "RESPONSIBLE_GAMING" | "STAKE_LIMIT" | "SYSTEM_NOT_SUPPORTED" | "WALLET_UNAVAILABLE" | "%future added value";
export type TicketStatus = "ACCEPTED" | "CASHED_OUT" | "CASHOUT_PENDING" | "LOST" | "PARTIALLY_CASHED_OUT" | "PENDING_ACCEPTANCE" | "REJECTED" | "VOID" | "WON" | "%future added value";
export type TicketCardCashoutMutation$variables = {
  expectedAmount?: any | null | undefined;
  ticketId: string;
};
export type TicketCardCashoutMutation$data = {
  readonly cashout: {
    readonly amount: any | null | undefined;
    readonly rejectionCode: BetRejectionCode | null | undefined;
    readonly rejectionMessage: string | null | undefined;
    readonly ticket: {
      readonly id: string;
      readonly status: TicketStatus;
      readonly " $fragmentSpreads": FragmentRefs<"TicketCard">;
    } | null | undefined;
  };
};
export type TicketCardCashoutMutation = {
  response: TicketCardCashoutMutation$data;
  variables: TicketCardCashoutMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "expectedAmount"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "ticketId"
},
v2 = [
  {
    "kind": "Variable",
    "name": "expectedAmount",
    "variableName": "expectedAmount"
  },
  {
    "kind": "Variable",
    "name": "ticketId",
    "variableName": "ticketId"
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "amount",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "rejectionCode",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "rejectionMessage",
  "storageKey": null
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
  "name": "status",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "createdAt",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "home",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "away",
  "storageKey": null
},
v11 = [
  (v9/*:: as any*/),
  (v10/*:: as any*/)
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*:: as any*/),
      (v1/*:: as any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "TicketCardCashoutMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*:: as any*/),
        "concreteType": "CashoutPayload",
        "kind": "LinkedField",
        "name": "cashout",
        "plural": false,
        "selections": [
          (v3/*:: as any*/),
          (v4/*:: as any*/),
          (v5/*:: as any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Ticket",
            "kind": "LinkedField",
            "name": "ticket",
            "plural": false,
            "selections": [
              (v6/*:: as any*/),
              (v7/*:: as any*/),
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "TicketCard"
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*:: as any*/),
      (v0/*:: as any*/)
    ],
    "kind": "Operation",
    "name": "TicketCardCashoutMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*:: as any*/),
        "concreteType": "CashoutPayload",
        "kind": "LinkedField",
        "name": "cashout",
        "plural": false,
        "selections": [
          (v3/*:: as any*/),
          (v4/*:: as any*/),
          (v5/*:: as any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Ticket",
            "kind": "LinkedField",
            "name": "ticket",
            "plural": false,
            "selections": [
              (v6/*:: as any*/),
              (v7/*:: as any*/),
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
                "name": "currency",
                "storageKey": null
              },
              (v8/*:: as any*/),
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
                  (v6/*:: as any*/),
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
                    "name": "priceAtAcceptance",
                    "storageKey": null
                  },
                  (v7/*:: as any*/),
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
                    "selections": (v11/*:: as any*/),
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
                      (v9/*:: as any*/),
                      (v10/*:: as any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "TicketItemScore",
                        "kind": "LinkedField",
                        "name": "halfTime",
                        "plural": false,
                        "selections": (v11/*:: as any*/),
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
                  (v6/*:: as any*/),
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
                  (v3/*:: as any*/),
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
                  (v8/*:: as any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "5716d8e1767086c1f2a82f3986a83ee1",
    "id": null,
    "metadata": {},
    "name": "TicketCardCashoutMutation",
    "operationKind": "mutation",
    "text": "mutation TicketCardCashoutMutation(\n  $ticketId: ID!\n  $expectedAmount: Decimal\n) {\n  cashout(ticketId: $ticketId, expectedAmount: $expectedAmount) {\n    amount\n    rejectionCode\n    rejectionMessage\n    ticket {\n      id\n      status\n      ...TicketCard\n    }\n  }\n}\n\nfragment TicketCard on Ticket {\n  id\n  betType\n  stake\n  currency\n  status\n  createdAt\n  resettled\n  resettlementSeen\n  items {\n    id\n    eventName\n    outcomeName\n  }\n  ...TicketCardDetails\n}\n\nfragment TicketCardDetails on Ticket {\n  id\n  stake\n  effectiveOdds\n  potentialPayout\n  payout\n  currency\n  status\n  settledAt\n  payoutCapped\n  rejectReason\n  boost {\n    boostedOdds\n    normalOdds\n  }\n  resettled\n  corrections {\n    id\n    itemId\n    kind\n    amount\n    previousPrice\n    newPrice\n    previousStatus\n    newStatus\n    createdAt\n  }\n  items {\n    id\n    eventName\n    marketName\n    outcomeName\n    priceAtAcceptance\n    status\n    eventStartTime\n    inPlay\n    scoreAtBet {\n      home\n      away\n    }\n    result {\n      home\n      away\n      halfTime {\n        home\n        away\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "ca97f1e51ee0c2128e6f38f75a556ff7";

export default node;
