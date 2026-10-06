/**
 * @generated SignedSource<<5d83c580f09f7db3b6c981bb88ae682e>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type BetRejectionCode = "BOOST_UNAVAILABLE" | "CASHOUT_UNAVAILABLE" | "CUTOFF_PASSED" | "DUPLICATE_EVENT" | "EVENT_NOT_BETTABLE" | "INSUFFICIENT_FUNDS" | "INTERNAL_ERROR" | "LIABILITY_LIMIT" | "LIVE_STATE_CHANGED" | "MULTI_SINGLE_NOT_SUPPORTED" | "ODDS_LIMIT" | "ODDS_UNAVAILABLE" | "OUTCOME_NOT_AVAILABLE" | "PRICE_CHANGED" | "PROVIDER_CURRENCY" | "RESPONSIBLE_GAMING" | "STAKE_LIMIT" | "SYSTEM_NOT_SUPPORTED" | "WALLET_UNAVAILABLE" | "%future added value";
export type BetslipItemAvailability = "AVAILABLE" | "CUTOFF_PASSED" | "DUPLICATE_EVENT" | "EVENT_NOT_BETTABLE" | "NOT_FOUND" | "SUSPENDED" | "%future added value";
export type TicketType = "MULTIPLE" | "SINGLE" | "SYSTEM" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type Betslip$data = {
  readonly betType: TicketType;
  readonly blockers: ReadonlyArray<BetRejectionCode>;
  readonly effectiveOdds: any;
  readonly items: ReadonlyArray<{
    readonly availability: BetslipItemAvailability;
    readonly expectedPrice: any | null | undefined;
    readonly outcomeId: string;
    readonly price: any | null | undefined;
    readonly priceChanged: boolean;
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
      "kind": "ScalarField",
      "name": "blockers",
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

(node as any).hash = "4958a0309a981c82dabde331f7ec04e5";

export default node;
