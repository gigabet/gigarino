/**
 * @generated SignedSource<<6c60cb2d702f1d6454b9355b9dc2d408>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SidebarCountryList$data = {
  readonly categories: ReadonlyArray<{
    readonly eventCount: number;
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
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "eventCount",
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

(node as any).hash = "498558e8eba006ed943962a150ea3f7a";

export default node;
