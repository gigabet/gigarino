/**
 * @generated SignedSource<<0a21232cb7784734744fedddb149d973>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SidebarSport$data = {
  readonly categories: ReadonlyArray<{
    readonly tournaments: ReadonlyArray<{
      readonly events: {
        readonly totalCount: number;
      };
    }>;
  }>;
  readonly key: string;
  readonly name: string;
  readonly " $fragmentType": "SidebarSport";
};
export type SidebarSport$key = {
  readonly " $data"?: SidebarSport$data;
  readonly " $fragmentSpreads": FragmentRefs<"SidebarSport">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SidebarSport",
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
      "name": "name",
      "storageKey": null
    },
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
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Sport",
  "abstractKey": null
};

(node as any).hash = "9565c0b2cb818b806d0b76545b93554c";

export default node;
