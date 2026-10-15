/**
 * @generated SignedSource<<09647f786d48d3503e9f58c0fe6f67ef>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type TicketCardCashoutQuoteQuery$variables = {
  ticketId: string;
};
export type TicketCardCashoutQuoteQuery$data = {
  readonly cashoutQuote: {
    readonly amount: any;
    readonly available: boolean;
    readonly currency: string;
    readonly message: string | null | undefined;
    readonly ticketId: string;
  };
};
export type TicketCardCashoutQuoteQuery = {
  response: TicketCardCashoutQuoteQuery$data;
  variables: TicketCardCashoutQuoteQuery$variables;
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
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "ticketId",
        "variableName": "ticketId"
      }
    ],
    "concreteType": "CashoutQuote",
    "kind": "LinkedField",
    "name": "cashoutQuote",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "ticketId",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "available",
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
        "name": "currency",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "message",
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
    "name": "TicketCardCashoutQuoteQuery",
    "selections": (v1/*:: as any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*:: as any*/),
    "kind": "Operation",
    "name": "TicketCardCashoutQuoteQuery",
    "selections": (v1/*:: as any*/)
  },
  "params": {
    "cacheID": "56c7e606b2cec93f2ec6701ae9d7ed74",
    "id": null,
    "metadata": {},
    "name": "TicketCardCashoutQuoteQuery",
    "operationKind": "query",
    "text": "query TicketCardCashoutQuoteQuery(\n  $ticketId: ID!\n) {\n  cashoutQuote(ticketId: $ticketId) {\n    ticketId\n    available\n    amount\n    currency\n    message\n  }\n}\n"
  }
};
})();

(node as any).hash = "f4cec13e89162c69c5fb66d183b15889";

export default node;
