/**
 * @generated SignedSource<<55cd226353cb9d95ee4f975f31293c18>>
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
    readonly tournaments: ReadonlyArray<{
      readonly events: {
        readonly totalCount: number;
      };
    }>;
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
          "concreteType": "Tournament",
          "kind": "LinkedField",
          "name": "tournaments",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "EventConnection",
              "kind": "LinkedField",
              "name": "events",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "totalCount",
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
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

(node as any).hash = "256c02d7b33841773f8c9eaab1b8fcdc";

export default node;
