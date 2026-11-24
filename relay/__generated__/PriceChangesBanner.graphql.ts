/**
 * @generated SignedSource<<062616672329b793d61ea13a028f0540>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PriceChangesBanner$data = {
  readonly " $fragmentSpreads": FragmentRefs<"usePriceChanges">;
  readonly " $fragmentType": "PriceChangesBanner";
};
export type PriceChangesBanner$key = {
  readonly " $data"?: PriceChangesBanner$data;
  readonly " $fragmentSpreads": FragmentRefs<"PriceChangesBanner">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PriceChangesBanner",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "usePriceChanges"
    }
  ],
  "type": "BetslipQuote",
  "abstractKey": null
};

(node as any).hash = "0f9cfd762c6b6706bdea2454f02fb02d";

export default node;
