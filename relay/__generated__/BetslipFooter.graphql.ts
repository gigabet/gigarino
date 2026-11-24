/**
 * @generated SignedSource<<4289fd2790a4246fc7c856c7f6742018>>
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
  readonly effectiveOdds: any;
  readonly items: ReadonlyArray<{
    readonly availability: BetslipItemAvailability;
    readonly outcomeId: string;
    readonly price: any | null | undefined;
  }>;
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

(node as any).hash = "6b826b045a26b77d8fa5522c03d2da51";

export default node;
