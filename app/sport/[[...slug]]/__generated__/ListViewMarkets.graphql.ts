/**
 * @generated SignedSource<<2cd595abda00ea3d6e6b672073e9d335>>
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

(node as any).hash = "89eea40297ae773fbd8f04aac0ad20d0";

export default node;
