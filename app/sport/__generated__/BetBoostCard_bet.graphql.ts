/**
 * @generated SignedSource<<fba10f106cf2b06f7a5600b35a03364e>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type BetBoostCard_bet$data = {
  readonly boostedPrice: any | null | undefined;
  readonly combinedPrice: any | null | undefined;
  readonly maxStake: any | null | undefined;
  readonly selections: ReadonlyArray<{
    readonly available: boolean;
    readonly eventName: string | null | undefined;
    readonly marketName: string | null | undefined;
    readonly outcomeId: string;
    readonly outcomeName: string | null | undefined;
  }>;
  readonly validTo: any | null | undefined;
  readonly " $fragmentType": "BetBoostCard_bet";
};
export type BetBoostCard_bet$key = {
  readonly " $data"?: BetBoostCard_bet$data;
  readonly " $fragmentSpreads": FragmentRefs<"BetBoostCard_bet">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "BetBoostCard_bet",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "boostedPrice",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "combinedPrice",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "maxStake",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "validTo",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "FeaturedBetSelection",
      "kind": "LinkedField",
      "name": "selections",
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
          "name": "outcomeName",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "marketName",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "eventName",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "available",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "FeaturedBet",
  "abstractKey": null
};

(node as any).hash = "a8dcb1f2c6c5646dfae810af04d2b8f6";

export default node;
