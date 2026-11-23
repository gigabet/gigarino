/**
 * @generated SignedSource<<cee1724fece8e2f0a5f253461d07b14f>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SelectionList$data = {
  readonly items: ReadonlyArray<{
    readonly outcomeId: string;
    readonly " $fragmentSpreads": FragmentRefs<"Tip">;
  }>;
  readonly " $fragmentType": "SelectionList";
};
export type SelectionList$key = {
  readonly " $data"?: SelectionList$data;
  readonly " $fragmentSpreads": FragmentRefs<"SelectionList">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SelectionList",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "BetslipQuoteItem",
      "kind": "LinkedField",
      "name": "items",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "outcomeId",
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "Tip"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "BetslipQuote",
  "abstractKey": null
};

(node as any).hash = "bbcc3021ca1e647c671af2aaf7e345c7";

export default node;
