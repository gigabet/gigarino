/**
 * @generated SignedSource<<218d228b204af8f0c1a4d1b6de4e2ed1>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Sidebar$data = {
  readonly sports: ReadonlyArray<{
    readonly key: string;
    readonly " $fragmentSpreads": FragmentRefs<"SidebarSport">;
  }>;
  readonly " $fragmentType": "Sidebar";
};
export type Sidebar$key = {
  readonly " $data"?: Sidebar$data;
  readonly " $fragmentSpreads": FragmentRefs<"Sidebar">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Sidebar",
  "selections": [
    {
      "kind": "Stream",
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "Sport",
          "kind": "LinkedField",
          "name": "sports",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "key",
              "storageKey": null
            },
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "SidebarSport"
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

(node as any).hash = "74f5130413a2e22b107ef8dd7b7c7b76";

export default node;
