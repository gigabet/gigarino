/**
 * @generated SignedSource<<99e404cdee86a7255b603d4add76b61e>>
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
    readonly " $fragmentSpreads": FragmentRefs<"SidebarSport">;
  }>;
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
    }
  ],
  "type": "Query",
  "abstractKey": null
};
})();

(node as any).hash = "830822a35bebffb7b5377fd62356bc4d";

export default node;
