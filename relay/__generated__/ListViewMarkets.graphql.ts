/**
 * @generated SignedSource<<229f1f55cccc53d327f0e434696887a3>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type MarketPeriod = "FIRST_HALF" | "FIRST_PERIOD" | "FIRST_SET" | "FOURTH_PERIOD" | "FULL_TIME" | "INCLUDING_OVERTIME" | "SECOND_HALF" | "SECOND_PERIOD" | "SECOND_SET" | "THIRD_PERIOD" | "THIRD_SET" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type ListViewMarkets$data = {
  readonly markets: ReadonlyArray<{
    readonly id: string;
    readonly kind: string;
    readonly line: any | null | undefined;
    readonly outcomes: ReadonlyArray<{
      readonly price: any;
    }>;
    readonly period: MarketPeriod;
    readonly " $fragmentSpreads": FragmentRefs<"ListViewMarket">;
  }>;
  readonly sport: {
    readonly key: string;
  };
  readonly " $fragmentType": "ListViewMarkets";
};
export type ListViewMarkets$key = {
  readonly " $data"?: ListViewMarkets$data;
  readonly " $fragmentSpreads": FragmentRefs<"ListViewMarkets">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ListViewMarkets",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Sport",
      "kind": "LinkedField",
      "name": "sport",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "key",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Market",
      "kind": "LinkedField",
      "name": "markets",
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
          "name": "kind",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "period",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "line",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "Outcome",
          "kind": "LinkedField",
          "name": "outcomes",
          "plural": true,
          "selections": [
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
          "name": "ListViewMarket"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Event",
  "abstractKey": null
};

(node as any).hash = "32f2252bdfa15b62b788f0d49adeedfe";

export default node;
