/**
 * @generated SignedSource<<9c194826a9b5bf68d3753c64e5a8f32d>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type BetBoostCard$data = {
  readonly betsRemaining: number | null | undefined;
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
  readonly " $fragmentType": "BetBoostCard";
};
export type BetBoostCard$key = {
  readonly " $data"?: BetBoostCard$data;
  readonly " $fragmentSpreads": FragmentRefs<"BetBoostCard">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "BetBoostCard",
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
      "name": "betsRemaining",
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

(node as any).hash = "e46b0360020c4bf99de062ca3838535f";

export default node;
