/**
 * @generated SignedSource<<2fc351b6813d7210b205cbe52e2fe42c>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type MarketStatus = "CLOSED" | "OPEN" | "SUSPENDED" | "%future added value";
export type OutcomeStatus = "OPEN" | "REMOVED" | "SUSPENDED" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type MarketCard$data = {
  readonly line: any | null | undefined;
  readonly name: string;
  readonly outcomes: ReadonlyArray<{
    readonly id: string;
    readonly index: number;
    readonly name: string;
    readonly price: any;
    readonly status: OutcomeStatus;
  }>;
  readonly status: MarketStatus;
  readonly " $fragmentType": "MarketCard";
};
export type MarketCard$key = {
  readonly " $data"?: MarketCard$data;
  readonly " $fragmentSpreads": FragmentRefs<"MarketCard">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "status",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MarketCard",
  "selections": [
    (v0/*:: as any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "line",
      "storageKey": null
    },
    (v1/*:: as any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "Outcome",
      "kind": "LinkedField",
      "name": "outcomes",
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
          "name": "index",
          "storageKey": null
        },
        (v0/*:: as any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "price",
          "storageKey": null
        },
        (v1/*:: as any*/)
      ],
      "storageKey": null
    }
  ],
  "type": "Market",
  "abstractKey": null
};
})();

(node as any).hash = "42a25f475d241ac4e7783815a9fa6768";

export default node;
