/**
 * @generated SignedSource<<f19c044f687b885740ada1f808e93376>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type LiveScore$data = {
  readonly awayScore: number | null | undefined;
  readonly homeScore: number | null | undefined;
  readonly " $fragmentType": "LiveScore";
};
export type LiveScore$key = {
  readonly " $data"?: LiveScore$data;
  readonly " $fragmentSpreads": FragmentRefs<"LiveScore">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "LiveScore",
  "selections": [
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

(node as any).hash = "f403c972cde0207da837483562172fbc";

export default node;
