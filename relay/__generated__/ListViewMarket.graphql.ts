/**
 * @generated SignedSource<<bb2750cfd86fe4b06e2c06846195483e>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type OutcomeStatus = "OPEN" | "REMOVED" | "SUSPENDED" | "%future added value";
export type SuspensionReason = "EVENT_CLOSED" | "EVENT_SUSPENDED" | "FEED_UNAVAILABLE" | "MARKET_SUSPENDED" | "NOT_OFFERED_LIVE" | "NO_PRICE" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type ListViewMarket$data = {
  readonly kind: string;
  readonly line: any | null | undefined;
  readonly outcomes: ReadonlyArray<{
    readonly id: string;
    readonly index: number;
    readonly key: string;
    readonly price: any;
    readonly status: OutcomeStatus;
    readonly suspensionReason: SuspensionReason | null | undefined;
  }>;
  readonly " $fragmentType": "ListViewMarket";
};
export type ListViewMarket$key = {
  readonly " $data"?: ListViewMarket$data;
  readonly " $fragmentSpreads": FragmentRefs<"ListViewMarket">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ListViewMarket",
  "selections": [
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
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "key",
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
          "name": "status",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "suspensionReason",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Market",
  "abstractKey": null
};

(node as any).hash = "fd7e6a3fa560697156d62ddb13885e45";

export default node;
