/**
 * @generated SignedSource<<0821e98cf89a63876645d25d5d485683>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type MatchIncidentType = "CORNER" | "GOAL" | "PENALTY" | "RED_CARD" | "YELLOW_CARD" | "%future added value";
export type PenaltyOutcome = "MISSED" | "SCORED" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type StatisticsWidgetIncident$data = {
  readonly addedTime: number | null | undefined;
  readonly awayScore: number | null | undefined;
  readonly cancelled: boolean;
  readonly detail: string | null | undefined;
  readonly homeScore: number | null | undefined;
  readonly minute: number | null | undefined;
  readonly outcome: PenaltyOutcome | null | undefined;
  readonly penalty: boolean;
  readonly scorer: string | null | undefined;
  readonly type: MatchIncidentType;
  readonly " $fragmentType": "StatisticsWidgetIncident";
};
export type StatisticsWidgetIncident$key = {
  readonly " $data"?: StatisticsWidgetIncident$data;
  readonly " $fragmentSpreads": FragmentRefs<"StatisticsWidgetIncident">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "StatisticsWidgetIncident",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "type",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "minute",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "addedTime",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "scorer",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "detail",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "penalty",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "outcome",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "cancelled",
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
  "type": "MatchIncident",
  "abstractKey": null
};

(node as any).hash = "7f7a1a3d2fe716c351757cb4f643be40";

export default node;
