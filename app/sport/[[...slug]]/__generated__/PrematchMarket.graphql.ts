/**
 * @generated SignedSource<<3fdca5d417e1ca3f2a98091bc6b931aa>>
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

(node as any).hash = "107d857834431d69dcfbbf2b84c7e947";

export default node;
