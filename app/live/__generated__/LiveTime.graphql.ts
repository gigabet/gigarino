/**
 * @generated SignedSource<<3ee0c304422d175617cb7c98736eca86>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type MatchPeriod = "BREAK" | "EXTRA_TIME" | "FIRST_HALF" | "FIRST_PERIOD" | "HALF_TIME" | "PENALTIES" | "SECOND_HALF" | "SECOND_PERIOD" | "THIRD_PERIOD" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type LiveTime$data = {
  readonly clockAnchorAt: string | null | undefined;
  readonly clockElapsedSeconds: number | null | undefined;
  readonly clockRunning: boolean;
  readonly period: MatchPeriod | null | undefined;
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
    }
  ],
  "type": "LiveEvent",
  "abstractKey": null
};

(node as any).hash = "2676cc59a3e07d8b0516f5baf8e2caff";

export default node;
