/**
 * @generated SignedSource<<3155bcdbf121326c53455bc129a04657>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SidebarCountryList$data = {
  readonly categories: ReadonlyArray<{
    readonly countryCode: string | null | undefined;
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
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "countryCode",
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

(node as any).hash = "6979ca034076cb02bd2ec9776ee1c8c9";

export default node;
