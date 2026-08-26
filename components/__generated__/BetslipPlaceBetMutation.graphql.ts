/**
 * @generated SignedSource<<db365fb9331cb7e1a69a951db122bb9d>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type BetRejectionCode = "CASHOUT_UNAVAILABLE" | "CUTOFF_PASSED" | "DUPLICATE_EVENT" | "EVENT_NOT_BETTABLE" | "INSUFFICIENT_FUNDS" | "INTERNAL_ERROR" | "LIABILITY_LIMIT" | "MULTI_SINGLE_NOT_SUPPORTED" | "ODDS_LIMIT" | "OUTCOME_NOT_AVAILABLE" | "PRICE_CHANGED" | "PROVIDER_CURRENCY" | "STAKE_LIMIT" | "SYSTEM_NOT_SUPPORTED" | "WALLET_UNAVAILABLE" | "%future added value";
export type OddsChangePolicy = "ACCEPT_ANY" | "ACCEPT_HIGHER" | "REJECT" | "%future added value";
export type TicketStatus = "ACCEPTED" | "CASHED_OUT" | "LOST" | "PARTIALLY_CASHED_OUT" | "PENDING_ACCEPTANCE" | "REJECTED" | "VOID" | "WON" | "%future added value";
export type TicketType = "MULTIPLE" | "SINGLE" | "SYSTEM" | "%future added value";
export type PlaceBetInput = {
  betType: TicketType;
  clientRequestId?: string | null | undefined;
  items: ReadonlyArray<PlaceBetItemInput>;
  oddsPolicy?: OddsChangePolicy;
  stake: string;
  systemSize?: number | null | undefined;
};
export type PlaceBetItemInput = {
  expectedPrice: string;
  outcomeId: string;
  stake?: string | null | undefined;
};
export type BetslipPlaceBetMutation$variables = {
  input: PlaceBetInput;
};
export type BetslipPlaceBetMutation$data = {
  readonly placeBet: {
    readonly rejection: {
      readonly code: BetRejectionCode;
      readonly message: string;
      readonly priceChanges: ReadonlyArray<{
        readonly currentPrice: any;
        readonly expectedPrice: any;
        readonly outcomeId: string;
      }>;
    } | null | undefined;
    readonly ticket: {
      readonly id: string;
      readonly potentialPayout: any;
      readonly stake: any;
      readonly status: TicketStatus;
    } | null | undefined;
  };
};
export type BetslipPlaceBetMutation = {
  response: BetslipPlaceBetMutation$data;
  variables: BetslipPlaceBetMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "PlaceBetPayload",
    "kind": "LinkedField",
    "name": "placeBet",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Ticket",
        "kind": "LinkedField",
        "name": "ticket",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "status",
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
            "name": "potentialPayout",
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "BetRejection",
        "kind": "LinkedField",
        "name": "rejection",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "code",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "message",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "PriceChange",
            "kind": "LinkedField",
            "name": "priceChanges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "outcomeId",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "expectedPrice",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "currentPrice",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*:: as any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "BetslipPlaceBetMutation",
    "selections": (v1/*:: as any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*:: as any*/),
    "kind": "Operation",
    "name": "BetslipPlaceBetMutation",
    "selections": (v1/*:: as any*/)
  },
  "params": {
    "cacheID": "bdc66bf642a4546ab020f04718178852",
    "id": null,
    "metadata": {},
    "name": "BetslipPlaceBetMutation",
    "operationKind": "mutation",
    "text": "mutation BetslipPlaceBetMutation(\n  $input: PlaceBetInput!\n) {\n  placeBet(input: $input) {\n    ticket {\n      id\n      status\n      stake\n      potentialPayout\n    }\n    rejection {\n      code\n      message\n      priceChanges {\n        outcomeId\n        expectedPrice\n        currentPrice\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "1baa57d1a40983c894cec766f9f99a6b";

export default node;
