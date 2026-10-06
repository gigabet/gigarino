/**
 * @generated SignedSource<<3e1095887c119c6d192463b331f1e9c8>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type EventStatus = "ABANDONED" | "CANCELLED" | "ENDED" | "LIVE" | "POSTPONED" | "SCHEDULED" | "%future added value";
export type TradingStatus = "CLOSED" | "OPEN" | "SUSPENDED" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type EventLiveState$data = {
  readonly awayScore: number | null | undefined;
  readonly homeScore: number | null | undefined;
  readonly status: EventStatus;
  readonly tradingStatus: TradingStatus;
  readonly " $fragmentType": "EventLiveState";
};
export type EventLiveState$key = {
  readonly " $data"?: EventLiveState$data;
  readonly " $fragmentSpreads": FragmentRefs<"EventLiveState">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "EventLiveState",
  "selections": [
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
      "name": "tradingStatus",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "homeScore",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "awayScore",
      "storageKey": null
    }
  ],
  "type": "Event",
  "abstractKey": null
};

(node as any).hash = "a578e7659e9c508f6f0013aacc2b95b4";

export default node;
