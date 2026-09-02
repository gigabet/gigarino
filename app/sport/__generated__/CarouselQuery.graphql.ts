/**
 * @generated SignedSource<<41aa3f03f91be245d68d13accb028e90>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type FeaturedBetKind = "BET_BOOST" | "COMBO_OF_WEEK" | "FEATURED_GAME" | "%future added value";
export type CarouselQuery$variables = Record<PropertyKey, never>;
export type CarouselQuery$data = {
  readonly featuredBets: ReadonlyArray<{
    readonly boostedPrice: any | null | undefined;
    readonly combinedPrice: any | null | undefined;
    readonly id: string;
    readonly kind: FeaturedBetKind;
    readonly maxStake: any | null | undefined;
    readonly selections: ReadonlyArray<{
      readonly available: boolean;
      readonly eventId: string | null | undefined;
      readonly eventName: string | null | undefined;
      readonly marketName: string | null | undefined;
      readonly outcomeId: string;
      readonly outcomeName: string | null | undefined;
      readonly price: any | null | undefined;
    }>;
    readonly subtitle: string | null | undefined;
    readonly title: string;
    readonly validTo: any | null | undefined;
  }>;
};
export type CarouselQuery = {
  response: CarouselQuery$data;
  variables: CarouselQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "FeaturedBet",
    "kind": "LinkedField",
    "name": "featuredBets",
    "plural": true,
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
        "name": "kind",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "title",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "subtitle",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "combinedPrice",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "boostedPrice",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "maxStake",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "validTo",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "FeaturedBetSelection",
        "kind": "LinkedField",
        "name": "selections",
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
            "name": "eventId",
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
            "name": "outcomeName",
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
            "name": "available",
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
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "CarouselQuery",
    "selections": (v0/*:: as any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "CarouselQuery",
    "selections": (v0/*:: as any*/)
  },
  "params": {
    "cacheID": "fd3bb5f5d46a3413f5bcc85dfce790bf",
    "id": null,
    "metadata": {},
    "name": "CarouselQuery",
    "operationKind": "query",
    "text": "query CarouselQuery {\n  featuredBets {\n    id\n    kind\n    title\n    subtitle\n    combinedPrice\n    boostedPrice\n    maxStake\n    validTo\n    selections {\n      outcomeId\n      eventId\n      eventName\n      marketName\n      outcomeName\n      price\n      available\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "4243e376f58525b94ade1519c5ab77ff";

export default node;
