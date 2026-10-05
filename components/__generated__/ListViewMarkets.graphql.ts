/**
 * @generated SignedSource<<81a6428cb03147b3e39b7a53d7e8c5d8>>
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
    readonly " $fragmentSpreads": FragmentRefs<"ListViewMarket">;
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
          "name": "ListViewMarket"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Event",
  "abstractKey": "__isEvent"
};

(node as any).hash = "3bab0d46874caa713f2022feaebb9f8d";

export default node;
