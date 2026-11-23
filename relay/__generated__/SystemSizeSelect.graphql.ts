/**
 * @generated SignedSource<<89a5ec144be309f14449b9e7e6740e13>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type TicketType = "MULTIPLE" | "SINGLE" | "SYSTEM" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type SystemSizeSelect$data = {
  readonly betType: TicketType;
  readonly " $fragmentType": "SystemSizeSelect";
};
export type SystemSizeSelect$key = {
  readonly " $data"?: SystemSizeSelect$data;
  readonly " $fragmentSpreads": FragmentRefs<"SystemSizeSelect">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SystemSizeSelect",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "betType",
      "storageKey": null
    }
  ],
  "type": "BetslipQuote",
  "abstractKey": null
};

(node as any).hash = "5bdd574544c2654954603c5c7d6b004e";

export default node;
