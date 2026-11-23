/**
 * @generated SignedSource<<f2327e34b00a8bf62f469e25ce0af9c0>>
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
  readonly " $fragmentSpreads": FragmentRefs<"BlockersBanner">;
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
    }
  ],
  "type": "BetslipQuote",
  "abstractKey": null
};

(node as any).hash = "72edf31bdaf4cec96ada2bf583f93be1";

export default node;
