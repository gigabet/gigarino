/**
 * @generated SignedSource<<fc38740c4cc2ecb33d63d02a67abab9a>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type BetslipItemAvailability = "AVAILABLE" | "CUTOFF_PASSED" | "DUPLICATE_EVENT" | "EVENT_NOT_BETTABLE" | "NOT_FOUND" | "SUSPENDED" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type InvalidBetsBanner$data = {
  readonly items: ReadonlyArray<{
    readonly availability: BetslipItemAvailability;
    readonly outcomeId: string;
  }>;
  readonly " $fragmentType": "InvalidBetsBanner";
};
export type InvalidBetsBanner$key = {
  readonly " $data"?: InvalidBetsBanner$data;
  readonly " $fragmentSpreads": FragmentRefs<"InvalidBetsBanner">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "InvalidBetsBanner",
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
        }
      ],
      "storageKey": null
    }
  ],
  "type": "BetslipQuote",
  "abstractKey": null
};

(node as any).hash = "0473fe59b137c5385e2eeca191a00bd1";

export default node;
