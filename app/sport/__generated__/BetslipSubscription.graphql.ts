/**
 * @generated SignedSource<<1d3cd426e9195410dd5461fd3d15c8b6>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type TicketType = "MULTIPLE" | "SINGLE" | "SYSTEM" | "%future added value";
export type BetslipQuoteInput = {
  betType: TicketType;
  items: ReadonlyArray<BetslipItemInput>;
  stake: string;
};
export type BetslipItemInput = {
  outcomeId: string;
  stake?: string | null | undefined;
};
export type BetslipSubscription$variables = {
  input: BetslipQuoteInput;
};
export type BetslipSubscription$data = {
  readonly betslipUpdated: {
    readonly " $fragmentSpreads": FragmentRefs<"Betslip" | "BetslipMobileBar">;
  };
};
export type BetslipSubscription = {
  response: BetslipSubscription$data;
  variables: BetslipSubscription$variables;
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
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*:: as any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "BetslipSubscription",
    "selections": [
      {
        "alias": null,
        "args": (v1/*:: as any*/),
        "concreteType": "BetslipQuote",
        "kind": "LinkedField",
        "name": "betslipUpdated",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "Betslip"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "BetslipMobileBar"
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
    "argumentDefinitions": (v0/*:: as any*/),
    "kind": "Operation",
    "name": "BetslipSubscription",
    "selections": [
      {
        "alias": null,
        "args": (v1/*:: as any*/),
        "concreteType": "BetslipQuote",
        "kind": "LinkedField",
        "name": "betslipUpdated",
        "plural": false,
        "selections": [
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
            "name": "placeable",
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
            "concreteType": "BetslipQuoteItem",
            "kind": "LinkedField",
            "name": "items",
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
                "name": "availability",
                "storageKey": null
              },
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
                "name": "key",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "price",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "id",
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
    "cacheID": "7a25564ec5a845a66996b76a6a40c9cf",
    "id": null,
    "metadata": {},
    "name": "BetslipSubscription",
    "operationKind": "subscription",
    "text": "subscription BetslipSubscription(\n  $input: BetslipQuoteInput!\n) {\n  betslipUpdated(input: $input) {\n    ...Betslip\n    ...BetslipMobileBar\n  }\n}\n\nfragment Betslip on BetslipQuote {\n  stake\n  effectiveOdds\n  potentialPayout\n  placeable\n  betType\n  items {\n    outcomeId\n    availability\n    ...Tip\n    id\n  }\n}\n\nfragment BetslipMobileBar on BetslipQuote {\n  effectiveOdds\n  items {\n    id\n  }\n}\n\nfragment Tip on BetslipQuoteItem {\n  outcomeId\n  eventName\n  marketName\n  key\n  price\n  availability\n}\n"
  }
};
})();

(node as any).hash = "72753464cbe0dc05f9c5be1776e3215c";

export default node;
