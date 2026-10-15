/**
 * @generated SignedSource<<2212462f1c991eed287c99029b083e83>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ComboOfWeekCard$data = {
  readonly combinedPrice: any | null | undefined;
  readonly selections: ReadonlyArray<{
    readonly available: boolean;
    readonly eventName: string | null | undefined;
    readonly marketName: string | null | undefined;
    readonly outcomeId: string;
    readonly outcomeName: string | null | undefined;
    readonly price: any | null | undefined;
  }>;
  readonly title: string;
  readonly validTo: any | null | undefined;
  readonly " $fragmentType": "ComboOfWeekCard";
};
export type ComboOfWeekCard$key = {
  readonly " $data"?: ComboOfWeekCard$data;
  readonly " $fragmentSpreads": FragmentRefs<"ComboOfWeekCard">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ComboOfWeekCard",
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

(node as any).hash = "91851a5062e550b8ba88270c825f0384";

export default node;
