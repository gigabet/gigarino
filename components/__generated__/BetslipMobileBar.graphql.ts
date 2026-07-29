/**
 * @generated SignedSource<<c31248cdeffd7115d6c352c8b579aa55>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type BetslipMobileBar$data = {
  readonly effectiveOdds: any;
  readonly items: ReadonlyArray<{
    readonly id: string;
  }>;
  readonly " $fragmentType": "BetslipMobileBar";
};
export type BetslipMobileBar$key = {
  readonly " $data"?: BetslipMobileBar$data;
  readonly " $fragmentSpreads": FragmentRefs<"BetslipMobileBar">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "BetslipMobileBar",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "effectiveOdds",
      "storageKey": null
    },
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
          "name": "id",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "BetslipQuote",
  "abstractKey": null
};

(node as any).hash = "7e4cea6f84f0fe56006a6ee62065b5f9";

export default node;
