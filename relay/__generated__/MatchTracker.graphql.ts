/**
 * @generated SignedSource<<3fae2be79aba16222c2d3664b5cb89f2>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MatchTracker$data = {
  readonly sportradarMatchId: string | null | undefined;
  readonly " $fragmentType": "MatchTracker";
};
export type MatchTracker$key = {
  readonly " $data"?: MatchTracker$data;
  readonly " $fragmentSpreads": FragmentRefs<"MatchTracker">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MatchTracker",
  "selections": [
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

(node as any).hash = "5bd74e818a430048f42dea3c116060fe";

export default node;
