/**
 * @generated SignedSource<<5b3bc6d4a5c45fbde765fb198d89b962>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type TradingStatus = "CLOSED" | "OPEN" | "SUSPENDED" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type LiveStripOdds$data = {
  readonly mainMarkets: ReadonlyArray<{
    readonly id: string;
    readonly kind: string;
    readonly " $fragmentSpreads": FragmentRefs<"LiveStripMarket">;
  }>;
  readonly tradingStatus: TradingStatus;
  readonly " $fragmentType": "LiveStripOdds";
};
export type LiveStripOdds$key = {
  readonly " $data"?: LiveStripOdds$data;
  readonly " $fragmentSpreads": FragmentRefs<"LiveStripOdds">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "LiveStripOdds",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "tradingStatus",
      "storageKey": null
    },
    {
      "alias": "mainMarkets",
      "args": [
        {
          "kind": "Literal",
          "name": "groups",
          "value": [
            "MAIN"
          ]
        }
      ],
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
          "args": null,
          "kind": "FragmentSpread",
          "name": "LiveStripMarket"
        }
      ],
      "storageKey": "markets(groups:[\"MAIN\"])"
    }
  ],
  "type": "Event",
  "abstractKey": null
};

(node as any).hash = "f12b4333696985a7695a55f1e85ec416";

export default node;
