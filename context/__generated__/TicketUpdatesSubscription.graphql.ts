/**
 * @generated SignedSource<<17a1033b0e77b5e42c2481fb82a11ef4>>
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
              (v2/*:: as any*/),
              (v3/*:: as any*/),
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
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "priceAtAcceptance",
                    "storageKey": null
                  },
                  (v2/*:: as any*/)
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
    "cacheID": "4126aa82cdc91d0b6ec4cce2b8e7f701",
    "id": null,
    "metadata": {},
    "name": "TicketUpdatesSubscription",
    "operationKind": "subscription",
    "text": "subscription TicketUpdatesSubscription {\n  myTicketUpdated {\n    reason\n    ticket {\n      id\n      ...TicketCard\n    }\n  }\n}\n\nfragment TicketCard on Ticket {\n  id\n  betType\n  stake\n  effectiveOdds\n  potentialPayout\n  payout\n  currency\n  status\n  createdAt\n  settledAt\n  resettled\n  resettlementSeen\n  corrections {\n    id\n    itemId\n    kind\n    amount\n    previousPrice\n    newPrice\n    previousStatus\n    newStatus\n    createdAt\n  }\n  items {\n    id\n    eventName\n    marketName\n    outcomeName\n    priceAtAcceptance\n    status\n  }\n}\n"
  }
};
})();

(node as any).hash = "78ff295f459eb1cb82896f8a1b71a4cf";

export default node;
