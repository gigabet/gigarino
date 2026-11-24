/**
 * @generated SignedSource<<431db433dbb92861bf2b6507bf693e83>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type TicketUpdateReason = "RESETTLED" | "SETTLED" | "%future added value";
export type TicketUpdatesSubscription$variables = Record<PropertyKey, never>;
export type TicketUpdatesSubscription$data = {
  readonly myTicketUpdated: {
    readonly reason: TicketUpdateReason;
    readonly ticket: {
      readonly id: string;
      readonly " $fragmentSpreads": FragmentRefs<"TicketCard">;
    };
  };
};
export type TicketUpdatesSubscription = {
  response: TicketUpdatesSubscription$data;
  variables: TicketUpdatesSubscription$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "reason",
  "storageKey": null
},
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
    "name": "TicketUpdatesSubscription",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "TicketUpdate",
        "kind": "LinkedField",
        "name": "myTicketUpdated",
        "plural": false,
        "selections": [
          (v0/*:: as any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Ticket",
            "kind": "LinkedField",
            "name": "ticket",
            "plural": false,
            "selections": [
              (v1/*:: as any*/),
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
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "TicketUpdatesSubscription",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "TicketUpdate",
        "kind": "LinkedField",
        "name": "myTicketUpdated",
        "plural": false,
        "selections": [
          (v0/*:: as any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Ticket",
            "kind": "LinkedField",
            "name": "ticket",
            "plural": false,
            "selections": [
              (v1/*:: as any*/),
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
                  (v1/*:: as any*/),
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
    "cacheID": "7c2e49ed9bd97c356445ab4d4a1e1d0e",
    "id": null,
    "metadata": {},
    "name": "TicketUpdatesSubscription",
    "operationKind": "subscription",
    "text": "subscription TicketUpdatesSubscription {\n  myTicketUpdated {\n    reason\n    ticket {\n      id\n      ...TicketCard\n    }\n  }\n}\n\nfragment TicketCard on Ticket {\n  id\n  betType\n  stake\n  currency\n  status\n  createdAt\n  resettled\n  resettlementSeen\n  items {\n    id\n    eventName\n    outcomeName\n  }\n  ...TicketCardDetails\n}\n\nfragment TicketCardDetails on Ticket {\n  id\n  stake\n  effectiveOdds\n  potentialPayout\n  payout\n  currency\n  status\n  settledAt\n  payoutCapped\n  rejectReason\n  boost {\n    boostedOdds\n    normalOdds\n  }\n  resettled\n  corrections {\n    id\n    itemId\n    kind\n    amount\n    previousPrice\n    newPrice\n    previousStatus\n    newStatus\n    createdAt\n  }\n  items {\n    id\n    eventName\n    marketName\n    outcomeName\n    priceAtAcceptance\n    status\n    eventStartTime\n    inPlay\n    scoreAtBet {\n      home\n      away\n    }\n    result {\n      home\n      away\n      halfTime {\n        home\n        away\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "78ff295f459eb1cb82896f8a1b71a4cf";

export default node;
