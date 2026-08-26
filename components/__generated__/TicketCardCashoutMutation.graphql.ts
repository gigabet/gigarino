/**
 * @generated SignedSource<<cbb6c98497ab8e953e02d93f2903c16b>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type BetRejectionCode = "CASHOUT_UNAVAILABLE" | "CUTOFF_PASSED" | "DUPLICATE_EVENT" | "EVENT_NOT_BETTABLE" | "INSUFFICIENT_FUNDS" | "INTERNAL_ERROR" | "LIABILITY_LIMIT" | "MULTI_SINGLE_NOT_SUPPORTED" | "ODDS_LIMIT" | "OUTCOME_NOT_AVAILABLE" | "PRICE_CHANGED" | "PROVIDER_CURRENCY" | "STAKE_LIMIT" | "SYSTEM_NOT_SUPPORTED" | "WALLET_UNAVAILABLE" | "%future added value";
export type TicketStatus = "ACCEPTED" | "CASHED_OUT" | "LOST" | "PARTIALLY_CASHED_OUT" | "PENDING_ACCEPTANCE" | "REJECTED" | "VOID" | "WON" | "%future added value";
export type TicketCardCashoutMutation$variables = {
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
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "ticketId"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "ticketId",
    "variableName": "ticketId"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "amount",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "rejectionCode",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "rejectionMessage",
  "storageKey": null
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
  "name": "status",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*:: as any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "TicketCardCashoutMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*:: as any*/),
        "concreteType": "CashoutPayload",
        "kind": "LinkedField",
        "name": "cashout",
        "plural": false,
        "selections": [
          (v2/*:: as any*/),
          (v3/*:: as any*/),
          (v4/*:: as any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Ticket",
            "kind": "LinkedField",
            "name": "ticket",
            "plural": false,
            "selections": [
              (v5/*:: as any*/),
              (v6/*:: as any*/),
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
    "argumentDefinitions": (v0/*:: as any*/),
    "kind": "Operation",
    "name": "TicketCardCashoutMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*:: as any*/),
        "concreteType": "CashoutPayload",
        "kind": "LinkedField",
        "name": "cashout",
        "plural": false,
        "selections": [
          (v2/*:: as any*/),
          (v3/*:: as any*/),
          (v4/*:: as any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Ticket",
            "kind": "LinkedField",
            "name": "ticket",
            "plural": false,
            "selections": [
              (v5/*:: as any*/),
              (v6/*:: as any*/),
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
                "name": "currency",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "createdAt",
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
                "concreteType": "TicketItem",
                "kind": "LinkedField",
                "name": "items",
                "plural": true,
                "selections": [
                  (v5/*:: as any*/),
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
                  (v6/*:: as any*/)
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
    "cacheID": "2b6c7ad5a7d7c87bf2442da42e86cb6b",
    "id": null,
    "metadata": {},
    "name": "TicketCardCashoutMutation",
    "operationKind": "mutation",
    "text": "mutation TicketCardCashoutMutation(\n  $ticketId: ID!\n) {\n  cashout(ticketId: $ticketId) {\n    amount\n    rejectionCode\n    rejectionMessage\n    ticket {\n      id\n      status\n      ...TicketCard\n    }\n  }\n}\n\nfragment TicketCard on Ticket {\n  id\n  betType\n  stake\n  effectiveOdds\n  potentialPayout\n  currency\n  status\n  createdAt\n  settledAt\n  items {\n    id\n    eventName\n    marketName\n    outcomeName\n    priceAtAcceptance\n    status\n  }\n}\n"
  }
};
})();

(node as any).hash = "bc0dd62b2a811447265d47de8e894bcd";

export default node;
