/**
 * @generated SignedSource<<f565c008b574bd69dc5c3530a30915e1>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ComboOfWeekCard_bet$data = {
  readonly combinedPrice: any | null | undefined;
  readonly selections: ReadonlyArray<{
    readonly available: boolean;
    readonly eventName: string | null | undefined;
    readonly marketName: string | null | undefined;
    readonly outcomeId: string;
    readonly outcomeName: string | null | undefined;
    readonly price: any | null | undefined;
  }>;
  readonly subtitle: string | null | undefined;
  readonly title: string;
  readonly validTo: any | null | undefined;
  readonly " $fragmentType": "ComboOfWeekCard_bet";
};
export type ComboOfWeekCard_bet$key = {
  readonly " $data"?: ComboOfWeekCard_bet$data;
  readonly " $fragmentSpreads": FragmentRefs<"ComboOfWeekCard_bet">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ComboOfWeekCard_bet",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "title",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "subtitle",
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
          "name": "price",
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

(node as any).hash = "3a43b77a4d933d00f8b369f98d6f175a";

export default node;
