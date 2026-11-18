/**
 * @generated SignedSource<<4d68f74fd6514ae95ba531c4b6d8650a>>
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
};
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
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "home",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "away",
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
    "cacheID": "5059a2f15a1dd76d34fca1b5a1d7f53d",
    "id": null,
    "metadata": {},
    "name": "TicketUpdatesSubscription",
    "operationKind": "subscription",
    "text": "subscription TicketUpdatesSubscription {\n  myTicketUpdated {\n    reason\n    ticket {\n      id\n      ...TicketCard\n    }\n  }\n}\n\nfragment TicketCard on Ticket {\n  id\n  betType\n  stake\n  currency\n  status\n  createdAt\n  resettled\n  resettlementSeen\n  items {\n    id\n    eventName\n    outcomeName\n  }\n  ...TicketCardDetails\n}\n\nfragment TicketCardDetails on Ticket {\n  id\n  stake\n  effectiveOdds\n  potentialPayout\n  payout\n  currency\n  status\n  settledAt\n  resettled\n  corrections {\n    id\n    itemId\n    kind\n    amount\n    previousPrice\n    newPrice\n    previousStatus\n    newStatus\n    createdAt\n  }\n  items {\n    id\n    eventName\n    marketName\n    outcomeName\n    priceAtAcceptance\n    status\n    eventStartTime\n    inPlay\n    scoreAtBet {\n      home\n      away\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "78ff295f459eb1cb82896f8a1b71a4cf";

export default node;
