/**
 * @generated SignedSource<<01af039133b8a87ed4a930912561b353>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type BetslipItemAvailability = "AVAILABLE" | "CUTOFF_PASSED" | "DUPLICATE_EVENT" | "EVENT_NOT_BETTABLE" | "NOT_FOUND" | "SUSPENDED" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type BetslipBody$data = {
  readonly items: ReadonlyArray<{
    readonly availability: BetslipItemAvailability;
    readonly expectedPrice: any | null | undefined;
    readonly outcomeId: string;
    readonly price: any | null | undefined;
    readonly priceChanged: boolean;
  }>;
  readonly " $fragmentSpreads": FragmentRefs<"BetTypeTabs" | "BetslipFooter" | "SelectionList" | "SystemSizeSelect">;
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
          "name": "availability",
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
    },
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
      "name": "SelectionList"
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

(node as any).hash = "b2bf7b8c6ea28687bf7dfb7518c497de";

export default node;
