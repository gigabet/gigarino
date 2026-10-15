/**
 * @generated SignedSource<<7cd2943ed12e5276259a04f3c10d9e52>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type TradingStatus = "CLOSED" | "OPEN" | "SUSPENDED" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type LiveEventStrip$data = {
  readonly id: string;
  readonly tradingStatus: TradingStatus;
  readonly " $fragmentSpreads": FragmentRefs<"LiveScore" | "LiveStripOdds" | "LiveTeams" | "LiveTime">;
  readonly " $fragmentType": "LiveEventStrip";
};
export type LiveEventStrip$key = {
  readonly " $data"?: LiveEventStrip$data;
  readonly " $fragmentSpreads": FragmentRefs<"LiveEventStrip">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "LiveEventStrip",
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
      "name": "tradingStatus",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "LiveTime"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "LiveTeams"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "LiveScore"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "LiveStripOdds"
    }
  ],
  "type": "Event",
  "abstractKey": null
};

(node as any).hash = "a81427eeb62671ab49b228c9335350b3";

export default node;
