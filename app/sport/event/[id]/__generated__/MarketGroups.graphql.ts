/**
 * @generated SignedSource<<72e07faa94403579facd353e70d304b6>>
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
    readonly groups: ReadonlyArray<MarketGroup>;
    readonly id: string;
    readonly index: number;
    readonly kind: string;
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
          "name": "groups",
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
          "name": "index",
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

(node as any).hash = "5121b65b02b4cd13bf369cfcf4659458";

export default node;
