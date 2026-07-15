/**
 * @generated SignedSource<<6621355626e770a125dc93516415172c>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ListViewMarkets$data = {
  readonly markets: ReadonlyArray<{
    readonly id: string;
    readonly kind: string;
    readonly " $fragmentSpreads": FragmentRefs<"PrematchMarket">;
  }>;
  readonly " $fragmentType": "ListViewMarkets";
};
export type ListViewMarkets$key = {
  readonly " $data"?: ListViewMarkets$data;
  readonly " $fragmentSpreads": FragmentRefs<"ListViewMarkets">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ListViewMarkets",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Market",
      "kind": "LinkedField",
      "name": "markets",
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
          "args": null,
          "kind": "FragmentSpread",
          "name": "PrematchMarket"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "PrematchEvent",
  "abstractKey": null
};

(node as any).hash = "f8a773da0316f08bb21823b7951ba83a";

export default node;
