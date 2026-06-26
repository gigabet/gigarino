/**
 * @generated SignedSource<<6580f6e79a9ce02799600e269c3ce139>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type StreamContent_$data = {
  readonly streamableContent: ReadonlyArray<{
    readonly value: string;
  }>;
  readonly " $fragmentType": "StreamContent_";
};
export type StreamContent_$key = {
  readonly " $data"?: StreamContent_$data;
  readonly " $fragmentSpreads": FragmentRefs<"StreamContent_">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "StreamContent_",
  "selections": [
    {
      "kind": "Stream",
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "WrappedString",
          "kind": "LinkedField",
          "name": "streamableContent",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "value",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ]
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "0bc5ac5f00d8c6197854aa6a3c4ee68b";

export default node;
