/**
 * @generated SignedSource<<2596b5e1dcc7eaf56ff357ab26fe34c2>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type TradingStatus = "CLOSED" | "OPEN" | "SUSPENDED" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type LiveStripOdds$data = {
  readonly markets: ReadonlyArray<{
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
      "alias": null,
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

(node as any).hash = "7bb7f3cc89de4284a2fda314c135ead1";

export default node;
