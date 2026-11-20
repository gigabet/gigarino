/**
 * @generated SignedSource<<4ac961580299d642ab21b5a042aadb0f>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Sidebar$data = {
  readonly sb_topTournaments: ReadonlyArray<{
    readonly eventCount: number;
  }>;
  readonly sports: ReadonlyArray<{
    readonly eventCount: number;
    readonly key: string;
    readonly name: string;
    readonly " $fragmentSpreads": FragmentRefs<"SidebarSport">;
  }>;
  readonly " $fragmentSpreads": FragmentRefs<"TopTournaments">;
  readonly " $fragmentType": "Sidebar";
};
export type Sidebar$key = {
  readonly " $data"?: Sidebar$data;
  readonly " $fragmentSpreads": FragmentRefs<"Sidebar">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "eventCount",
  "storageKey": null
};
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
              "kind": "ScalarField",
              "name": "name",
              "storageKey": null
            },
            (v0/*:: as any*/),
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
          "selections": [
            (v0/*:: as any*/)
          ],
          "storageKey": "topTournaments(first:4)"
        }
      ]
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "TopTournaments"
    }
  ],
  "type": "Query",
  "abstractKey": null
};
})();

(node as any).hash = "8b94d9e68fa7b67b791f24e4e62ec55e";

export default node;
