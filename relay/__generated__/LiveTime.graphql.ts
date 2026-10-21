/**
 * @generated SignedSource<<33b0a020f26fea5b055e702ea6fae7f0>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type ClockDirection = "DOWN" | "UP" | "%future added value";
export type EventStatus = "ABANDONED" | "CANCELLED" | "ENDED" | "LIVE" | "POSTPONED" | "SCHEDULED" | "%future added value";
export type MatchPeriod = "BREAK" | "EXTRA_TIME" | "FIFTH_SET" | "FIRST_HALF" | "FIRST_PERIOD" | "FIRST_SET" | "FOURTH_PERIOD" | "FOURTH_SET" | "HALF_TIME" | "OVERTIME" | "PENALTIES" | "SECOND_HALF" | "SECOND_PERIOD" | "SECOND_SET" | "THIRD_PERIOD" | "THIRD_SET" | "%future added value";
export type TradingStatus = "CLOSED" | "OPEN" | "SUSPENDED" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type LiveTime$data = {
  readonly clockAnchorAt: string | null | undefined;
  readonly clockDirection: ClockDirection | null | undefined;
  readonly clockElapsedSeconds: number | null | undefined;
  readonly clockRunning: boolean;
  readonly period: MatchPeriod | null | undefined;
  readonly status: EventStatus;
  readonly tradingStatus: TradingStatus;
  readonly " $fragmentType": "LiveTime";
};
export type LiveTime$key = {
  readonly " $data"?: LiveTime$data;
  readonly " $fragmentSpreads": FragmentRefs<"LiveTime">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "LiveTime",
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
      "name": "period",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "clockRunning",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "clockDirection",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "clockElapsedSeconds",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "clockAnchorAt",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "tradingStatus",
      "storageKey": null
    }
  ],
  "type": "Event",
  "abstractKey": null
};

(node as any).hash = "6df15a1cb647241fb7ea0fc31bd2d31f";

export default node;
