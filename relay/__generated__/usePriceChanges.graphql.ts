/**
 * @generated SignedSource<<9398f0339d641b38d6a9b43b78282d23>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type usePriceChanges$data = {
  readonly items: ReadonlyArray<{
    readonly expectedPrice: any | null | undefined;
    readonly outcomeId: string;
    readonly price: any | null | undefined;
    readonly priceChanged: boolean;
  }>;
  readonly " $fragmentType": "usePriceChanges";
};
export type usePriceChanges$key = {
  readonly " $data"?: usePriceChanges$data;
  readonly " $fragmentSpreads": FragmentRefs<"usePriceChanges">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "usePriceChanges",
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
          "name": "expectedPrice",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "priceChanged",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "BetslipQuote",
  "abstractKey": null
};

(node as any).hash = "a50298ffc250859a567201f5cae69bab";

export default node;
