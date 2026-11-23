/**
 * @generated SignedSource<<0657028a6e36c2488803b5d99e500f6a>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Betslip$data = {
  readonly " $fragmentSpreads": FragmentRefs<"BetslipBody">;
  readonly " $fragmentType": "Betslip";
};
export type Betslip$key = {
  readonly " $data"?: Betslip$data;
  readonly " $fragmentSpreads": FragmentRefs<"Betslip">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Betslip",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "BetslipBody"
    }
  ],
  "type": "BetslipQuote",
  "abstractKey": null
};

(node as any).hash = "33a6aa2e4dc3402117d27c73c3a64076";

export default node;
