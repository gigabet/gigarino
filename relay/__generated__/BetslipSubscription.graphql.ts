/**
 * @generated SignedSource<<d8b5232fd49a0e86310b3632dcb57ac7>>
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
  boostId?: string | null | undefined;
  items: ReadonlyArray<BetslipItemInput>;
  stake: string;
  systemSize?: number | null | undefined;
};
export type BetslipItemInput = {
  banker?: boolean;
  expectedPrice?: string | null | undefined;
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
                "name": "id",
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
                "name": "price",
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
                "name": "priceChanged",
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
                "name": "name",
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
                "name": "suspensionReason",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isLive",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "eventId",
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
            "name": "placeable",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "blockers",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "5ae86748efbef40b3e2b5e44d2f05162",
    "id": null,
    "metadata": {},
    "name": "BetslipSubscription",
    "operationKind": "subscription",
    "text": "subscription BetslipSubscription(\n  $input: BetslipQuoteInput!\n) {\n  betslipUpdated(input: $input) {\n    ...Betslip\n    ...BetslipMobileBar\n  }\n}\n\nfragment BetTypeTabs on BetslipQuote {\n  betType\n  items {\n    outcomeId\n    id\n  }\n}\n\nfragment Betslip on BetslipQuote {\n  ...BetslipBody\n  ...BetslipFooter\n}\n\nfragment BetslipBody on BetslipQuote {\n  ...BetTypeTabs\n  ...SystemSizeSelect\n  ...InvalidBetsBanner\n  ...PriceChangesBanner\n  ...SelectionList\n}\n\nfragment BetslipFooter on BetslipQuote {\n  betType\n  effectiveOdds\n  potentialPayout\n  placeable\n  items {\n    outcomeId\n    availability\n    price\n    id\n  }\n  ...BlockersBanner\n  ...usePriceChanges\n}\n\nfragment BetslipMobileBar on BetslipQuote {\n  effectiveOdds\n  items {\n    id\n  }\n}\n\nfragment BlockersBanner on BetslipQuote {\n  blockers\n}\n\nfragment InvalidBetsBanner on BetslipQuote {\n  items {\n    outcomeId\n    availability\n    id\n  }\n}\n\nfragment PriceChangesBanner on BetslipQuote {\n  ...usePriceChanges\n}\n\nfragment SelectionList on BetslipQuote {\n  items {\n    outcomeId\n    ...Tip\n    id\n  }\n}\n\nfragment SystemSizeSelect on BetslipQuote {\n  betType\n}\n\nfragment Tip on BetslipQuoteItem {\n  outcomeId\n  eventName\n  marketName\n  name\n  key\n  price\n  expectedPrice\n  priceChanged\n  availability\n  suspensionReason\n  isLive\n  eventId\n}\n\nfragment usePriceChanges on BetslipQuote {\n  items {\n    outcomeId\n    price\n    expectedPrice\n    priceChanged\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "72753464cbe0dc05f9c5be1776e3215c";

export default node;
