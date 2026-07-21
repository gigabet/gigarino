/**
 * @generated SignedSource<<5ef198aff685ab7463304f84c9bfb45e>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Sidebar$data = {
  readonly sb_topTournaments: ReadonlyArray<{
    readonly events: {
      readonly totalCount: number;
    };
  }>;
  readonly sports: ReadonlyArray<{
    readonly categories: ReadonlyArray<{
      readonly tournaments: ReadonlyArray<{
        readonly events: {
          readonly totalCount: number;
        };
      }>;
    }>;
    readonly key: string;
    readonly " $fragmentSpreads": FragmentRefs<"SidebarSport">;
  }>;
  readonly " $fragmentType": "Sidebar";
};
export type Sidebar$key = {
  readonly " $data"?: Sidebar$data;
  readonly " $fragmentSpreads": FragmentRefs<"Sidebar">;
};

const node: ReaderFragment = (function(){
var v0 = [
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
];
return {
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
                  "selections": (v0/*:: as any*/),
                  "storageKey": null
                }
              ],
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
    },
    {
      "kind": "Stream",
      "selections": [
        {
          "alias": "sb_topTournaments",
          "args": [
            {
              "kind": "Literal",
              "name": "first",
              "value": 4
            }
          ],
          "concreteType": "Tournament",
          "kind": "LinkedField",
          "name": "topTournaments",
          "plural": true,
          "selections": (v0/*:: as any*/),
          "storageKey": "topTournaments(first:4)"
        }
      ]
    }
  ],
  "type": "Query",
  "abstractKey": null
};
})();

(node as any).hash = "1f0dc76f7d481adcb7a75d31c1d867f4";

export default node;
