/**
 * @generated SignedSource<<7d0124b2e2518eca8980a66392125c2d>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type MarketGroup = "CARDS" | "CORNERS" | "GOALS" | "MAIN" | "PENALTIES" | "PLAYERS" | "SPECIAL" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type MarketGroups$data = {
  readonly markets: ReadonlyArray<{
    readonly group: MarketGroup;
    readonly id: string;
    readonly " $fragmentSpreads": FragmentRefs<"MarketCard">;
  }>;
  readonly " $fragmentType": "MarketGroups";
};
export type MarketGroups$key = {
  readonly " $data"?: MarketGroups$data;
  readonly " $fragmentSpreads": FragmentRefs<"MarketGroups">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MarketGroups",
  "selections": [
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
          "name": "group",
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "MarketCard"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Event",
  "abstractKey": "__isEvent"
};

(node as any).hash = "751c49bab3431bc2b98d2a5e7f161338";

export default node;
