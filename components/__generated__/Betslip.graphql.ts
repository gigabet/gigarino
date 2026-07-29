/**
 * @generated SignedSource<<e2d0461f746efa260074e2e34df6d0bb>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type BetslipItemAvailability = "AVAILABLE" | "CUTOFF_PASSED" | "DUPLICATE_EVENT" | "EVENT_NOT_BETTABLE" | "NOT_FOUND" | "SUSPENDED" | "%future added value";
export type TicketType = "MULTIPLE" | "SINGLE" | "SYSTEM" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type Betslip$data = {
  readonly betType: TicketType;
  readonly effectiveOdds: any;
  readonly items: ReadonlyArray<{
    readonly availability: BetslipItemAvailability;
    readonly id: string;
    readonly " $fragmentSpreads": FragmentRefs<"Tip">;
  }>;
  readonly placeable: boolean;
  readonly potentialPayout: any;
  readonly stake: any;
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
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "stake",
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
      "kind": "ScalarField",
      "name": "betType",
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
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "availability",
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "Tip"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "BetslipQuote",
  "abstractKey": null
};

(node as any).hash = "463d189865ec3cb6dcd04a70411c7b18";

export default node;
