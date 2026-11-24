/**
 * @generated SignedSource<<5b6bb1e82c6a7d8552aa72b152f5f135>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type MarketStatus = "CLOSED" | "OPEN" | "SUSPENDED" | "%future added value";
export type OutcomeStatus = "OPEN" | "REMOVED" | "SUSPENDED" | "%future added value";
export type SuspensionReason = "EVENT_CLOSED" | "EVENT_SUSPENDED" | "FEED_UNAVAILABLE" | "MARKET_SUSPENDED" | "NOT_OFFERED_LIVE" | "NO_PRICE" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type MarketCard$data = {
  readonly line: any | null | undefined;
  readonly name: string;
  readonly outcomes: ReadonlyArray<{
    readonly id: string;
    readonly index: number;
    readonly name: string;
    readonly price: any;
    readonly status: OutcomeStatus;
    readonly suspensionReason: SuspensionReason | null | undefined;
  }>;
  readonly status: MarketStatus;
  readonly suspensionReason: SuspensionReason | null | undefined;
  readonly " $fragmentType": "MarketCard";
};
export type MarketCard$key = {
  readonly " $data"?: MarketCard$data;
  readonly " $fragmentSpreads": FragmentRefs<"MarketCard">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "status",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "suspensionReason",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MarketCard",
  "selections": [
    (v0/*:: as any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "line",
      "storageKey": null
    },
    (v1/*:: as any*/),
    (v2/*:: as any*/),
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
          "name": "id",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "index",
          "storageKey": null
        },
        (v0/*:: as any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "price",
          "storageKey": null
        },
        (v1/*:: as any*/),
        (v2/*:: as any*/)
      ],
      "storageKey": null
    }
  ],
  "type": "Market",
  "abstractKey": null
};
})();

(node as any).hash = "b516d090dcf298f71bde0658a55d57ac";

export default node;
