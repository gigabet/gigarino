/**
 * @generated SignedSource<<27a6555cde2ff02c65eb5de36b21fe85>>
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
  "type": "LiveEvent",
  "abstractKey": null
};

(node as any).hash = "7972e460454e09b5624c835c61a930b5";

export default node;
