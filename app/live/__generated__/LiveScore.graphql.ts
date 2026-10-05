/**
 * @generated SignedSource<<c3ace6a6bc05e7c052e21ce2ccb5a70a>>
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
  "type": "LiveEvent",
  "abstractKey": null
};

(node as any).hash = "fa7929d9d32c150c215f9b3f688a3891";

export default node;
