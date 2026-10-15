/**
 * @generated SignedSource<<8b23fb467588a71f38099709809859cc>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type MatchPeriod = "BREAK" | "EXTRA_TIME" | "FIFTH_SET" | "FIRST_HALF" | "FIRST_PERIOD" | "FIRST_SET" | "FOURTH_PERIOD" | "FOURTH_SET" | "HALF_TIME" | "OVERTIME" | "PENALTIES" | "SECOND_HALF" | "SECOND_PERIOD" | "SECOND_SET" | "THIRD_PERIOD" | "THIRD_SET" | "%future added value";
export type TradingStatus = "CLOSED" | "OPEN" | "SUSPENDED" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type LiveTime$data = {
  readonly clockAnchorAt: string | null | undefined;
  readonly clockElapsedSeconds: number | null | undefined;
  readonly clockRunning: boolean;
  readonly period: MatchPeriod | null | undefined;
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

(node as any).hash = "6c6f8525c6a1ff8f79cfda2cff503ee2";

export default node;
