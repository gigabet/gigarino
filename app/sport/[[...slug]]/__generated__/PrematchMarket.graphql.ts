/**
 * @generated SignedSource<<9d4249acc0db12af106f92dbf9dd6ae7>>
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
          "name": "name",
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

(node as any).hash = "618c7efb33796b46175b8ed1c984960a";

export default node;
