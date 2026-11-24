/**
 * @generated SignedSource<<2a1ce7b82e73c19f04a84f73747a922d>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type BetslipItemAvailability = "AVAILABLE" | "CUTOFF_PASSED" | "DUPLICATE_EVENT" | "EVENT_NOT_BETTABLE" | "NOT_FOUND" | "SUSPENDED" | "%future added value";
export type TicketType = "MULTIPLE" | "SINGLE" | "SYSTEM" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type BetslipFooter$data = {
  readonly betType: TicketType;
  readonly boostApplied: boolean;
  readonly effectiveOdds: any;
  readonly items: ReadonlyArray<{
    readonly availability: BetslipItemAvailability;
    readonly outcomeId: string;
    readonly price: any | null | undefined;
  }>;
  readonly payoutCapped: boolean;
  readonly placeable: boolean;
  readonly potentialPayout: any;
  readonly " $fragmentSpreads": FragmentRefs<"BlockersBanner" | "usePriceChanges">;
  readonly " $fragmentType": "BetslipFooter";
};
export type BetslipFooter$key = {
  readonly " $data"?: BetslipFooter$data;
  readonly " $fragmentSpreads": FragmentRefs<"BetslipFooter">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "BetslipFooter",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "betType",
      "storageKey": null
    },
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
      "kind": "ScalarField",
      "name": "potentialPayout",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "payoutCapped",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "boostApplied",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "placeable",
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
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "BlockersBanner"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "usePriceChanges"
    }
  ],
  "type": "BetslipQuote",
  "abstractKey": null
};

(node as any).hash = "f1d3bb9c1e1e352f58fe9fb1c762f00b";

export default node;
