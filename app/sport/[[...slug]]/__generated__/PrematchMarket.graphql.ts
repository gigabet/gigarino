/**
 * @generated SignedSource<<8a7a402c39cb3465aa0983fa696114e1>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PrematchMarket$data = {
  readonly outcomes: ReadonlyArray<{
    readonly id: string;
    readonly index: number;
    readonly key: string;
    readonly name: string;
    readonly price: any;
  }>;
  readonly " $fragmentType": "PrematchMarket";
};
export type PrematchMarket$key = {
  readonly " $data"?: PrematchMarket$data;
  readonly " $fragmentSpreads": FragmentRefs<"PrematchMarket">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PrematchMarket",
  "selections": [
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
          "name": "price",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Market",
  "abstractKey": null
};

(node as any).hash = "408a6bf94944f8725ede3df03e11b3f6";

export default node;
