/**
 * @generated SignedSource<<3c58fcfc8e9ee6ca5d74a82d32a3e591>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type MatchOutcome = "D" | "L" | "W" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type StatisticsWidgetPastMatch$data = {
  readonly awayName: string;
  readonly awayScore: string | null | undefined;
  readonly competition: string | null | undefined;
  readonly homeName: string;
  readonly homeScore: string | null | undefined;
  readonly outcome: MatchOutcome | null | undefined;
  readonly startTime: string;
  readonly " $fragmentType": "StatisticsWidgetPastMatch";
};
export type StatisticsWidgetPastMatch$key = {
  readonly " $data"?: StatisticsWidgetPastMatch$data;
  readonly " $fragmentSpreads": FragmentRefs<"StatisticsWidgetPastMatch">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "StatisticsWidgetPastMatch",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "homeName",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "awayName",
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
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "competition",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "startTime",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "outcome",
      "storageKey": null
    }
  ],
  "type": "PastMatch",
  "abstractKey": null
};

(node as any).hash = "c05150910e782d462cc51dd163f06a33";

export default node;
