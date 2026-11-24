/**
 * @generated SignedSource<<451f702717e75764f3ba30e92b7b941a>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type BetslipBody$data = {
  readonly " $fragmentSpreads": FragmentRefs<"BetTypeTabs" | "InvalidBetsBanner" | "PriceChangesBanner" | "SelectionList" | "SystemSizeSelect">;
  readonly " $fragmentType": "BetslipBody";
};
export type BetslipBody$key = {
  readonly " $data"?: BetslipBody$data;
  readonly " $fragmentSpreads": FragmentRefs<"BetslipBody">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "BetslipBody",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "BetTypeTabs"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SystemSizeSelect"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "InvalidBetsBanner"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PriceChangesBanner"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SelectionList"
    }
  ],
  "type": "BetslipQuote",
  "abstractKey": null
};

(node as any).hash = "3411e4d2a20e99b2889085e71f35785d";

export default node;
