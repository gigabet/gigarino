/**
 * @generated SignedSource<<9717a9eeea9c8a1e91361d22dbba7ef1>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type TrackerButton$data = {
  readonly id: string;
  readonly sportradarMatchId: string | null | undefined;
  readonly " $fragmentType": "TrackerButton";
};
export type TrackerButton$key = {
  readonly " $data"?: TrackerButton$data;
  readonly " $fragmentSpreads": FragmentRefs<"TrackerButton">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "TrackerButton",
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
      "name": "sportradarMatchId",
      "storageKey": null
    }
  ],
  "type": "Event",
  "abstractKey": null
};

(node as any).hash = "7fe78045fd185e6658919c0942710c10";

export default node;
