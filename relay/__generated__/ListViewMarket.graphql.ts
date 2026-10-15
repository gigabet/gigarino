/**
 * @generated SignedSource<<5d37b240eaee37fadd6cb8f5eb4f38a1>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type OutcomeStatus = "OPEN" | "REMOVED" | "SUSPENDED" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type ListViewMarket$data = {
  readonly outcomes: ReadonlyArray<{
    readonly id: string;
    readonly index: number;
    readonly key: string;
    readonly price: any;
    readonly status: OutcomeStatus;
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
          "name": "key",
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
          "name": "status",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Market",
  "abstractKey": null
};

(node as any).hash = "a348d1f55f15495eb64f898df64c2732";

export default node;
