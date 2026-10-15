/**
 * @generated SignedSource<<303012b35bb2d3551ebc742fa3572922>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type LiveStripMarket$data = {
  readonly outcomes: ReadonlyArray<{
    readonly id: string;
    readonly index: number;
    readonly " $fragmentSpreads": FragmentRefs<"LiveStripOdd">;
  }>;
  readonly " $fragmentType": "LiveStripMarket";
};
export type LiveStripMarket$key = {
  readonly " $data"?: LiveStripMarket$data;
  readonly " $fragmentSpreads": FragmentRefs<"LiveStripMarket">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "LiveStripMarket",
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
          "args": null,
          "kind": "FragmentSpread",
          "name": "LiveStripOdd"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Market",
  "abstractKey": null
};

(node as any).hash = "689260316cdbbc7d28b94f9dafa404d6";

export default node;
