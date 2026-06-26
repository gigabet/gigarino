/**
 * @generated SignedSource<<4bdc60cef7a0755c7c0b5bac5057f787>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SideContent_$data = {
  readonly lazyContent: string;
  readonly " $fragmentType": "SideContent_";
};
export type SideContent_$key = {
  readonly " $data"?: SideContent_$data;
  readonly " $fragmentSpreads": FragmentRefs<"SideContent_">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SideContent_",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "lazyContent",
      "storageKey": null
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "63600f28461ecba11a017c043d7d6d0f";

export default node;
