/**
 * @generated SignedSource<<a591080f9887943818c803bd1cdabae4>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SidebarCountryList$data = {
  readonly categories: ReadonlyArray<{
    readonly key: string;
    readonly " $fragmentSpreads": FragmentRefs<"SidebarCountryItem">;
  }>;
  readonly " $fragmentType": "SidebarCountryList";
};
export type SidebarCountryList$key = {
  readonly " $data"?: SidebarCountryList$data;
  readonly " $fragmentSpreads": FragmentRefs<"SidebarCountryList">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SidebarCountryList",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Category",
      "kind": "LinkedField",
      "name": "categories",
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
          "name": "SidebarCountryItem"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Sport",
  "abstractKey": null
};

(node as any).hash = "ed375bac10a0ffd3d9ce9598b7a6e9d8";

export default node;
