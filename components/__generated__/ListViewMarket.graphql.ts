/**
 * @generated SignedSource<<71a50a62f5d9e09226480e93d0dfdb5d>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ListViewMarket$data = {
  readonly outcomes: ReadonlyArray<{
    readonly id: string;
    readonly index: number;
    readonly key: string;
    readonly name: string;
    readonly price: any;
  }>;
  readonly " $fragmentType": "ListViewMarket";
};
export type ListViewMarket$key = {
  readonly " $data"?: ListViewMarket$data;
  readonly " $fragmentSpreads": FragmentRefs<"ListViewMarket">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ListViewMarket",
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

(node as any).hash = "0b2465214d8ed8aeae0e52cc879fbaed";

export default node;
