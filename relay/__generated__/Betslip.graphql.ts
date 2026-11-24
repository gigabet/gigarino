/**
 * @generated SignedSource<<cd41d518e297fa4c18cff9ca318a790c>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Betslip$data = {
  readonly " $fragmentSpreads": FragmentRefs<"BetslipBody" | "BetslipFooter">;
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
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "BetslipFooter"
    }
  ],
  "type": "BetslipQuote",
  "abstractKey": null
};

(node as any).hash = "570ee8cdb8ee3b1b9509b7bccaf646d8";

export default node;
